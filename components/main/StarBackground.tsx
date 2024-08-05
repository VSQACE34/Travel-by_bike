"use client";

import React from "react";

const StarsCanvas = () => (
  <div
    className="w-full h-screen fixed inset-0 z-[-10] bg-cover bg-center bg-fixed"
    style={{
      backgroundImage: "url('/Map.png')",
      filter: "blur(8px)",
    }}
  >
    {/* Dark overlay */}
    <div className="absolute inset-0 bg-black opacity-50"></div>
  </div>
);

export default StarsCanvas;

