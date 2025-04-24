"use client";

import React from "react";
import { Button } from "@/components/ui/button";
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

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.3,
      ease: "easeOut"
    }
  }
};

export function CommitteeSection() {
  // Committee member data
  const committeeMembers = [
    {
      id: 2,
      name: "Hsun Hung",
      position: "Founder",
      image: "/OurComitte/Founder.jpg",
      quote: '"From market awareness with real-time sentiment analysis and technical indicators to automated portfolio"',
      style: { width: 331, height: 379 }
    }
  ];

  return (
    <motion.section 
      className="w-full bg-black py-28"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="relative w-full">
        <div className="relative">
          {/* Decorative elements */}
          <motion.img
            className="absolute top-[-50px] right-0 w-auto h-[393px] select-none pointer-events-none z-0"
            alt="Decorative elements"
            src="/OurComitte/light-right.svg"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
          <motion.img
            className="absolute top-[-50px] left-0 w-auto h-[393px] select-none pointer-events-none z-0"
            alt="Decorative elements"
            src="/OurComitte/light-left.png"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />

          {/* Main content */}
          <motion.div 
            className="flex flex-col items-center gap-10 pt-24"
            variants={containerVariants}
          >
            <motion.h2 
              className="text-center text-[64px] leading-[64px] font-['Neue_Montreal']"
              variants={headingVariants}
            >
              <span className="text-white">Our </span>
              <span className="text-[#a857ff]">Founder</span>
            </motion.h2>

            <motion.div 
              className="relative flex justify-center items-center min-h-[500px] w-full max-w-[1400px] mx-auto"
              variants={containerVariants}
            >
              {committeeMembers.map((member) => (
                <motion.div 
                  key={member.id} 
                  className="relative"
                  variants={imageVariants}
                >
                  {/* Frame wrapper with smooth border radius */}
                  <motion.div 
                    className="relative overflow-hidden hover:scale-105 transition-transform duration-300"
                    style={{ 
                      width: `${member.style.width}px`,
                      height: `${member.style.height}px`,
                      borderRadius: '32px',
                      overflow: 'hidden',
                    }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div 
                      style={{
                        height: '100%',
                        width: '100%',
                        position: 'relative',
                        borderRadius: '32px',
                        overflow: 'hidden'
                      }}
                    >
                      <motion.img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        style={{
                          borderRadius: '32px'
                        }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                      {/* Purple overlay */}
                      <div className="absolute inset-0 bg-[#7C3AED] mix-blend-color opacity-20"></div>
                      {/* Quote overlay */}
                      <motion.div 
                        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#7C3AED]/80 to-transparent p-6 flex items-end"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <p className="text-white text-base leading-5 font-['Neue_Montreal'] text-center">
                          {member.quote}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  {/* Text content */}
                  <motion.div 
                    className="mt-4 text-center"
                    variants={textVariants}
                  >
                    <h3 className="text-white text-xl leading-[30px] font-['Neue_Montreal']">
                      {member.name}
                    </h3>
                    <p className="text-[#afafaf] text-base leading-6 font-['Neue_Montreal']">
                      {member.position}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div 
              className="flex justify-center mt-12"
              variants={buttonVariants}
            >
              <Button className="h-[67px] w-[372px] rounded-[50px] border-[1.4px] border-solid border-[#b49fee] [background:linear-gradient(319deg,rgba(217,213,222,1)_0%,rgba(210,174,245,0)_51%,rgba(239,219,255,1)_100%),linear-gradient(0deg,rgba(168,88,255,1)_0%,rgba(168,88,255,1)_100%)] font-['Neue_Montreal'] font-bold text-white text-xl">
                Apply to be Cancer Comitte
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
