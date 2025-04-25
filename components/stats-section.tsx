"use client";

import React from "react";
import { Card, CardContent } from "./ui/card";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { 
    opacity: 0
  },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const headingVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
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

const cardHoverVariants = {
  initial: {
    scale: 1,
    y: 0,
    boxShadow: "0 0 0 rgba(168, 87, 255, 0)"
  },
  hover: {
    scale: 1.02,
    y: -8,
    boxShadow: "0 8px 30px rgba(168, 87, 255, 0.15)",
    transition: {
      duration: 0.3,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

const glowVariants = {
  initial: {
    opacity: 0,
    scale: 0.6
  },
  hover: {
    opacity: 0.15,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const lineVariants = {
  initial: {
    scaleY: 1,
    opacity: 0.2
  },
  hover: {
    scaleY: 1.5,
    opacity: 0.4,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const textVariants = {
  initial: {
    color: "#ffffff",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  hover: {
    color: "#a857ff",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// Define data for the stat cards to enable mapping
const statCards = [
  {
    id: "01",
    value: "8BioDAOs",
    description: "Launched & Funded",
  },
  {
    id: "02",
    value: "$30.3M",
    description: "Related For Research",
  },
  {
    id: "03",
    value: "$7.2M",
    description: "Deployed For Research",
  },
];

export function StatsSection() {
  return (
    <motion.section 
      className="relative w-full bg-black pb-0 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="relative w-full max-w-[1920px] mx-auto px-4 md:px-8">
        {/* Background elements */}
        <div className="absolute right-0 -top-16 md:-top-32 w-full max-w-[1133px] h-auto">
          <img
            className="w-full h-auto object-contain"
            alt="Elements"
            src="/statscard/Elements.svg"
          />
        </div>

        <div className="max-w-[1300px] mx-auto">
          {/* Main heading */}
          <motion.div 
            className="relative mt-12 md:mt-[74px]"
            variants={headingVariants}
          >
            <div className="[font-family:'Neue_Montreal-Regular',Helvetica] font-normal text-4xl md:text-[64px] leading-[1.2] md:leading-[64px]">
              <span className="text-white tracking-[0]">Curate &amp; </span>
              <span className="text-[#a857ff] tracking-[0]">Fund Cancer</span>
              <div className="text-white tracking-[0]">Research Projects</div>
            </div>
          </motion.div>

          {/* Stats cards container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full mt-16 md:mt-[147px] mb-0">
            {statCards.map((card, index) => (
              <motion.div
                key={card.id}
                variants={cardVariants}
                className="cursor-pointer perspective-1000"
              >
                <motion.div
                  variants={cardHoverVariants}
                  initial="initial"
                  whileHover="hover"
                  className="w-full h-[250px] md:h-[301px] rounded-[12.37px] overflow-hidden border-none bg-gradient-to-b from-[rgba(27,27,27,0.51)] to-[rgba(46,46,46,0.51)] relative group transform-gpu"
                >
                  <motion.div
                    variants={glowVariants}
                    className="absolute inset-0"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#a857ff] via-[#a857ff40] to-transparent blur-2xl" />
                  </motion.div>

                  <CardContent className="flex flex-col h-full items-start justify-end gap-3 md:gap-[16.49px] p-4 md:p-[32.99px] relative">
                    {/* Radial gradient background */}
                    <div className="absolute w-[500px] md:w-[707px] h-[400px] md:h-[564px] top-[50px] md:top-[66px] left-[-100px] md:left-[-147px] rounded-[250px/200px] md:rounded-[353.57px/281.93px] [background:radial-gradient(50%_50%_at_50%_50%,rgba(0,0,0,0)_0%,rgba(27,27,27,1)_100%)]" />

                    {/* Line decorations */}
                    <div className="absolute w-[300px] md:w-[436px] h-[250px] md:h-[369px] top-[-20px] md:top-[-34px] left-[15px] md:left-[25px] pointer-events-none">
                      {[
                        { height: "40px", top: "25px", left: "250px" },
                        { height: "40px", top: "200px", left: "150px" },
                        { height: "60px", top: "25px", left: "50px" },
                        { height: "60px", top: "130px", left: "0" }
                      ].map((line, i) => (
                        <motion.div
                          key={i}
                          variants={lineVariants}
                          className={`absolute w-[1px] h-[${line.height}] top-[${line.top}] left-[${line.left}] bg-gradient-to-b from-transparent via-white/20 to-transparent shadow-[0_0_5px_rgba(255,255,255,0.3)] after:absolute after:w-full after:h-full after:bg-white/10 after:blur-[2px]`}
                        />
                      ))}
                    </div>

                    <div className="flex flex-col h-[200px] md:h-[235.03px] items-start justify-between relative self-stretch w-full">
                      <motion.div 
                        variants={textVariants}
                        className="relative w-fit mt-[-1.03px] [font-family:'Unbounded'] font-medium text-2xl md:text-[33px] text-center tracking-[0] leading-[1.5] md:leading-[49.5px] whitespace-nowrap"
                      >
                        {card.id}
                      </motion.div>

                      <div className="flex flex-col items-start gap-2 md:gap-[10.31px] relative self-stretch w-full flex-[0_0_auto]">
                        <motion.div 
                          variants={textVariants}
                          className="relative self-stretch mt-[-1.03px] [font-family:'Unbounded'] font-medium text-2xl md:text-[33px] tracking-[0] leading-[1.4] md:leading-[46.2px]"
                        >
                          {card.value}
                        </motion.div>

                        <motion.div 
                          variants={{
                            initial: { color: "rgba(181, 181, 181, 0.8)" },
                            hover: { color: "#ffffff" }
                          }}
                          className="relative self-stretch [font-family:'Unbounded'] font-light text-sm md:text-base tracking-[0] leading-[1.4] md:leading-[22.4px]"
                        >
                          {card.description}
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
} 