"use client";
import React, { useEffect, useRef } from "react";

const MapWithAccidents = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMap = async () => {
      if (typeof google === "undefined") {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyALzlJje7227h-ze58W_JFLBPRMck1VzmI&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          initMap();
        };
        document.head.appendChild(script);
      } else {
        initMap();
      }
    };

    const initMap = async () => {
      const map = new google.maps.Map(mapRef.current as HTMLElement, {
        center: { lat: -37.8136, lng: 144.9631 },
        zoom: 13,
        mapId: "ff0154203f1d6862",
      });

      const localityLayer = map.getFeatureLayer("LOCALITY" as any);
      const regions: Record<string, number | string> = {
        "ChIJx_d-ZwZd1moRUNeMIXVWBAU": 776, // Flemington
        "ChIJfaTcgQ5d1moRcOeMIXVWBAU": 395, // Kensington
        "ChIJeduNNNhC1moR8OeMIXVWBAU": 762, // West Melbourne
        "ChIJZWnLOihd1moRYOeMIXVWBAU": 687, // North Melbourne
        "ChIJTRICMtdc1moREOeMIXVWBAU": 595, // Parkville
        "ChIJOROExDFD1moRQNeMIXVWBAU": 528, // Carlton North
        "ChIJ0S2YU9FC1moRgOeMIXVWBAU": 724, // Carlton
        "ChIJb9QWRmdd1moR8P2MIXVWBAU": 852, // Docklands
        "ChIJD-GLCkVd1moRwP6MIXVWBAU": 916, // Southbank
        "ChIJgf0RD69C1moR4OeMIXVWBAU": 2696, // Melbourne
        "ChIJz25SvMFC1moRAOiMIXVWBAU": 434, // East Melbourne
        "ChIJm4WGJS9o1moRgOiMIXVWBAU": 782, // South Yarra
        "ChIJ1YQ5tfdn1moRAAGNIXVWBAU": "N/A", // South Wharf
        "ChIJ9zHvuD9m1moRQOiMIXVWBAU": 754, // Port Melbourne
        "ChIJYZwbBPxn1moRUOiMIXVWBAU": 603, // South Melbourne  
      };

      localityLayer.style = (featureStyleFunctionOptions: google.maps.FeatureStyleFunctionOptions) => {
        const placeFeature = featureStyleFunctionOptions.feature as any;
        const placeId = placeFeature.placeId || placeFeature.getProperty('place_id');
        const accident = regions[placeId];
        let fillColor = "gray";

        if (typeof accident === "number") {
          if (accident < 400) {
            fillColor = "blue";
          } else if (accident < 600) {
            fillColor = "#00ffff";
          } else if (accident < 800) {
            fillColor = "green";
          } else if (accident < 1000) {
            fillColor = "yellow";
          } else if (accident >= 1000) {
            fillColor = "red";
          }
        }

        return {
          fillColor,
          fillOpacity: 0.5,
        };
      };

      const legend = document.createElement('div');
      legend.id = 'legend';
      legend.classList.add('legend');
      legend.innerHTML =
        `
        <h3>Accidents Legend</h3>
        <div><span style="background-color: gray;"></span>N/A</div>
        <div><span style="background-color: blue;"></span>Less than 400</div>
        <div><span style="background-color: #00ffff;"></span>400 - 599</div>
        <div><span style="background-color: green;"></span>600 - 799</div>
        <div><span style="background-color: yellow;"></span>800 - 999</div>
        <div><span style="background-color: red;"></span>1000 or more</div>
        `;
      
      // Add the legend to the map
      map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
    };

    loadMap();
  }, []);
  
  return (
    <div style={{ height: "110vh", width: "100%" }}>
    <div className="flex justify-center items-center">
      <span className="text-transparent text-4xl bg-clip-text bg-gradient-to-r from-green-500 to-cyan-500">
        Chloropleth{" "}
      </span>
      <span className="text-4xl font-bold ml-2">Map</span>
    </div>
    <div id="map" ref={mapRef} style={{ height: "100%" }}></div>
  </div>
);
};

export default MapWithAccidents;