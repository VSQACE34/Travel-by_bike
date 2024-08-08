"use client"; // Ensure this is a client-side component

import React, { useEffect, useRef, useState } from "react";
import "./globals.css"; // Ensure you have the CSS file for styling

const MapWithDirections = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [currentLocationMarker, setCurrentLocationMarker] = useState<google.maps.Marker | null>(null);
  const autocompleteStartRef = useRef<google.maps.places.Autocomplete | null>(null);
  const autocompleteDestinationRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);

  useEffect(() => {
    const loadMap = () => {
      const map = new google.maps.Map(mapRef.current as HTMLElement, {
        zoom: 14,
        center: { lat: 37.422, lng: -122.084 }, // Default center location
      });

      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      // Initialize autocomplete for starting location
      const inputStart = document.getElementById("autocomplete") as HTMLInputElement;
      const autocompleteStart = new google.maps.places.Autocomplete(inputStart);
      autocompleteStart.bindTo("bounds", map);
      autocompleteStart.addListener("place_changed", () => {
        const place = autocompleteStart.getPlace();
        if (!place.geometry) {
          alert("No details available for the selected place.");
          return;
        }
        const startLocation = place.geometry.location;
        if (startLocation) {
          map.setCenter(startLocation);
          if (currentLocationMarker) {
            currentLocationMarker.setPosition(startLocation);
          } else {
            const marker = new google.maps.Marker({
              position: startLocation,
              map: map,
              title: "Start Location",
            });
            setCurrentLocationMarker(marker);
          }
        }
      });

      // Initialize autocomplete for destination
      const inputDestination = document.getElementById("destination") as HTMLInputElement;
      const autocompleteDestination = new google.maps.places.Autocomplete(inputDestination);
      autocompleteDestination.bindTo("bounds", map);

      setMap(map);
      setDirectionsService(directionsService);
      setDirectionsRenderer(directionsRenderer);
      autocompleteStartRef.current = autocompleteStart;
      autocompleteDestinationRef.current = autocompleteDestination;
    };

    if (typeof google !== "undefined") {
      loadMap();
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB8ZEOQUCDrSneL4nbpipnJ2bIwNSIwAA8&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = loadMap;
      document.head.appendChild(script);
    }
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = (position: GeolocationPosition) => {
    const newLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    map!.setCenter(newLocation);

    if (currentLocationMarker) {
      currentLocationMarker.setPosition(newLocation);
    } else {
      const marker = new google.maps.Marker({
        position: newLocation,
        map: map!,
        title: "Your Current Location",
      });
      setCurrentLocationMarker(marker);
    }
  };

  const showError = (error: GeolocationPositionError) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      default:
        alert("An unknown error occurred.");
        break;
    }
  };

  const calculateRoute = () => {
    const destination = (document.getElementById("destination") as HTMLInputElement).value;
    let startLocation: google.maps.LatLng | string | null = null;

    if (useCurrentLocation) {
      if (!currentLocationMarker) {
        getCurrentLocation();
        return;
      }
      startLocation = currentLocationMarker.getPosition() ?? null;
    } else {
      startLocation = (document.getElementById("autocomplete") as HTMLInputElement).value;
      if (!startLocation) {
        alert("Please enter a starting location.");
        return;
      }
    }

    if (typeof startLocation === "string") {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: startLocation }, (results, status) => {
        if (status === "OK" && results && results[0].geometry.location) {
          startLocation = results[0].geometry.location;
          requestRoute(startLocation, destination);
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });
    } else if (startLocation) {
      requestRoute(startLocation, destination);
    }
  };

  const requestRoute = (startLocation: google.maps.LatLng, destination: string) => {
    const request = {
      origin: startLocation,
      destination: destination,
      travelMode: google.maps.TravelMode.BICYCLING,
    };

    directionsService!.route(request, (result, status) => {
      if (status === "OK") {
        directionsRenderer!.setDirections(result);
      } else {
        alert("Directions request failed due to " + status);
      }
    });
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUseCurrentLocation(event.target.value === "current");
  };

  return (
    <div>
      <div className="flex justify-center items-center">
       <span className="text-transparent text-4xl bg-clip-text bg-gradient-to-r from-green-500 to-cyan-500">
            Navigate{" "}
          </span>
          <span className="text-4xl font-bold ml-2">to destination</span>
          </div>
      <div id="controls">
        <div className="form-group radio-group">
          <label>
            <input
              type="radio"
              name="startLocationType"
              value="current"
              checked={useCurrentLocation}
              onChange={handleRadioChange}
            />
            Use Current Location
          </label>
          <label>
            <input
              type="radio"
              name="startLocationType"
              value="manual"
              checked={!useCurrentLocation}
              onChange={handleRadioChange}
            />
            Enter a Starting Location
          </label>
        </div>
        <div id="manualLocation" style={{ display: useCurrentLocation ? "none" : "block" }}>
          <input type="text" id="autocomplete" placeholder="Enter starting location" />
        </div>
        <div className="form-group">
          <input type="text" id="destination" placeholder="Enter destination" />
        </div>
        <button onClick={calculateRoute} className="map-controls">
          Get Route
        </button>
      </div>
      <div id="map" ref={mapRef} style={{ height: "500px", width: "100%" }}></div>
    </div>
  );
};

export default MapWithDirections;
