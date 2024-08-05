"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-row items-center justify-center px-20 mt-[-40px] w-full z-[10]"
    >
      <div className="h-full w-full flex flex-col gap-2 justify-center m-auto text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[5px] h-5 w-7" />
          <h1 className="Welcome-text text-[12px]">
            Website Overview
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-4xl font-bold text-white max-w-[600px] w-auto h-auto"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-500">
            {" "}
            Travel By Bike{" "}
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-white my-[-2] max-w-[600px]"
        >
         This website is aimed at active cyclists and those who wish to utilise bicycles for city travel. 
         This category includes those who want to include cycling into their everyday lives, either 
         for health, environmental concerns, or as a practical form of transportation. They want easy 
         access to credible information on safe riding routes and infrastructure in cities.
        </motion.p>

      </div>
      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center"
      >
        <Image
          src="/nothing.svg"
          alt="work around"
          height={650}
          width={650}
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
