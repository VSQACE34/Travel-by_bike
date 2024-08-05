import React from "react";
import HeroContent from "../sub/HeroContent";

const Hero = () => {
  return (
    <div className="relative flex flex-col h-full w-full" id="about-project">
      <img
        src="/istockphoto.jpg" // Path to your image file
        alt="Cyclist"
        className="absolute left-[50%] top-[50%] transform translate-x-[50%] translate-y-[-50%] h-[300px] w-[300px] object-cover z-[1] rounded-md"
      />
      <HeroContent />
    </div>
  );
};

export default Hero;

