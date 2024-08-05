"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { slideInFromTop } from "@/utils/motion";
import dynamic from "next/dynamic";

// Dynamically import Plotly to avoid SSR issues
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const Insight = () => {
  const [dfCoordinates, setDfCoordinates] = useState<any[]>([]);

  useEffect(() => {
    // Fetch JSON data
    fetch("/df_coordinates.json")
      .then((response) => response.json())
      .then((data) => setDfCoordinates(data));
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-center items-start min-h-screen p-4">
      <div className="w-full md:w-2/3 p-4">
        <Plot
          data={[
            {
              type: "scattermapbox",
              lat: dfCoordinates.map((d) => d.latitude),
              lon: dfCoordinates.map((d) => d.longitude),
              text: dfCoordinates.map(
                (d) =>
                  `Postcode: ${d.postcode_crash}<br>Accidents: ${d.TOTAL_CRASH}`
              ),
              mode: "markers",
              marker: {
                size: dfCoordinates.map((d) => Math.sqrt(d.TOTAL_CRASH)),
                color: dfCoordinates.map((d) => d.TOTAL_CRASH),
                colorscale: "Jet",
                cmin: 0,
                cmax: 3000,
                showscale: true,
                colorbar: {
                  title: "Total Crashes",
                },
              },
            },
          ]}
          layout={{
            mapbox: {
              style: "open-street-map",
              center: { lat: -37.814, lon: 144.96332 },
              zoom: 10,
            },
            margin: { r: 0, t: 0, b: 0, l: 0 },
            autosize: true,
            height: 600, // Set the height explicitly
          }}
          config={{ mapboxAccessToken: "your-access-token" }}
        />
      </div>

      <div className="w-full md:w-1/3 p-4">
        <motion.div
          variants={slideInFromTop}
          className="text-[40px] font-medium text-center md:text-left text-gray-200"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-500">
            Historical{" "}
          </span>
          Data
        </motion.div>
        <p className="text-[14px] text-left font-medium text-white mt-4">
          The map of historical data is shown here. The map, on the left, shows
          in the form of a circular marker the total number of crashes. The radius
          of the circular marker is proportional to the number of crashes in that 
          particular location. The color represents the severity of the total 
          number of crashes with the legend for the number of crashes and the 
          colour scale shown in the map itself as reference. The map is also 
          zoomable and the user can zoom in and zoom out as required.
        </p>
      </div>
    </div>
  );
};

export default Insight;

