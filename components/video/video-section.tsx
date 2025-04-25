"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const lightVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const videoPlaceholderVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.9,
    filter: "blur(10px)"
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.3
    }
  }
};

const playButtonVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
      ease: "backOut",
      delay: 0.5
    }
  },
  hover: {
    scale: 1.1,
    rotate: 180,
    transition: {
      duration: 0.3
    }
  }
};

export const VideoSection = () => {
  return (
    <motion.section 
      className="w-full bg-black py-12 md:py-28"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="relative w-full">
        <div className="relative">
          {/* Decorative elements */}
          <motion.img
            className="absolute top-[-25px] md:top-[-50px] right-0 w-auto h-[200px] md:h-[393px] select-none pointer-events-none z-0"
            alt="Decorative elements"
            src="/Video Section/light-right.svg"
            variants={lightVariants}
          />
          <motion.img
            className="absolute top-[-25px] md:top-[-50px] left-0 w-auto h-[200px] md:h-[393px] select-none pointer-events-none z-0"
            alt="Decorative elements"
            src="/Video Section/light-left.png"
            variants={lightVariants}
          />

          {/* Main content */}
          <div className="flex flex-col items-center gap-6 md:gap-10 pt-12 md:pt-24">
            <motion.h2 
              className="text-center text-3xl md:text-[64px] leading-[1.2] md:leading-[64px] font-['Neue_Montreal'] max-w-[1350px] mx-auto px-4"
              variants={headingVariants}
            >
              <span className="text-white tracking-[0]">De</span>
              <span className="text-[#aaaaaa] tracking-[0]">Sci</span>
              <span className="text-white tracking-[0]"> is the </span>
              <span className="text-[#a857ff] tracking-[0]">
                Future of Science
              </span>
            </motion.h2>

            {/* Video card container */}
            <div className="w-full px-4 md:px-8 lg:px-16">
              <motion.div variants={cardVariants}>
                <Card className="w-full max-w-[1350px] mx-auto mt-4 md:mt-6 bg-[#a6a6a61c] border-0 rounded-xl md:rounded-3xl overflow-hidden">
                  <CardContent className="flex items-center justify-center p-0 h-[200px] sm:h-[350px] md:h-[586px] relative">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-[#a6a6a61c] to-[#a6a6a61c]"
                      variants={videoPlaceholderVariants}
                    />
                    <motion.button 
                      className="w-0 h-0 border-t-[20px] md:border-t-[30px] border-t-transparent border-l-[35px] md:border-l-[52px] border-l-[#a857ff] border-b-[20px] md:border-b-[30px] border-b-transparent hover:border-l-[#8a3dd9] transition-colors z-10"
                    title="Play Video"
                    aria-label="Play Video"
                      variants={playButtonVariants}
                      whileHover="hover"
                  />
                </CardContent>
              </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}; 