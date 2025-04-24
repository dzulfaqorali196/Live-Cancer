"use client";

import { PlusIcon, GitForkIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";

// Variants untuk animasi
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
  },
  hover: {
    y: -10,
    scale: 1.02,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const imageVariants = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4
    }
  },
  hover: {
    y: -5,
    transition: {
      duration: 0.3
    }
  }
};

const plusIconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
      ease: "backOut"
    }
  },
  hover: {
    scale: 1.2,
    rotate: 90,
    transition: {
      duration: 0.3
    }
  }
};

export const ProjectSection = () => {
  // Project data for mapping
  const projects = [
    {
      id: 1,
      title: "SHINDhao",
      description: "Lorem ipsum dolor amet",
      isActive: true,
      image: "/project/Shindao.jpeg"
    },
    {
      id: 2,
      title: "Propose Your Project",
      description: "Lorem ipsum dolor amet",
      isActive: false,
    },
    {
      id: 3,
      title: "Propose Your Project",
      description: "Lorem ipsum dolor amet",
      isActive: false,
    },
  ];

  return (
    <motion.section 
      id="projects" 
      className="w-full bg-black pt-[200px] pb-28 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="relative w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16">
        {/* Background elements */}
        <motion.img
          className="absolute w-full max-w-[1920px] h-[785px] top-[-200px] left-1/2 transform -translate-x-1/2 select-none pointer-events-none z-0"
          alt="Elements"
          src="/project/light.svg"
          style={{ mixBlendMode: 'screen' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        
        <div className="relative flex flex-col items-center gap-24 z-10">
          <motion.h2 
            className="text-[64px] leading-[64px] text-center font-normal [font-family:'Neue_Montreal-Regular',Helvetica] max-w-[1350px] mx-auto"
            variants={headingVariants}
          >
            <span className="text-white tracking-[0]">Explore </span>
            <span className="text-[#a857ff] tracking-[0]">Active Projects</span>
          </motion.h2>

          <div className="flex flex-col gap-4 w-full max-w-[1920px]">
            {/* First row of projects */}
            <div className="flex flex-col items-start w-full">
              <div className="flex items-start gap-4 w-full justify-center">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={cardVariants}
                    whileHover="hover"
                    className="w-full max-w-[600px]"
                  >
                    <Card className="flex flex-col h-[351.8px] w-full border-0 rounded-none bg-transparent overflow-hidden">
                      <motion.div
                        className={`relative flex flex-col items-center justify-center h-[241.75px] w-full rounded-[17.38px_17.38px_0px_0px] border-t-[2.17px] border-r-[2.17px] border-l-[2.17px] overflow-hidden ${
                          project.isActive
                            ? "bg-[#4d139d26] border-[#b37feb]"
                            : "bg-[#f5f5f508] border-[#212121]"
                        }`}
                      >
                        {project.isActive && project.image ? (
                          <motion.div 
                            className="relative w-full h-full"
                            variants={imageVariants}
                          >
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              style={{ objectFit: 'cover' }}
                              className="rounded-t-[17.38px]"
                            />
                            <motion.div 
                              className="absolute inset-0 bg-[#4d139d] opacity-20"
                              whileHover={{ opacity: 0.1 }}
                            />
                          </motion.div>
                        ) : (
                          <motion.div variants={plusIconVariants}>
                            <PlusIcon className="w-[61px] h-[61px] text-white" />
                          </motion.div>
                        )}
                      </motion.div>

                      <motion.div
                        variants={contentVariants}
                        className={`flex flex-col items-start gap-[9.41px] p-6 rounded-[0px_0px_17.38px_17.38px] border-r-[1.57px] border-b-[1.57px] border-l-[1.57px] ${
                          project.isActive
                            ? "border-[#b37feb]"
                            : "bg-[#ffffff0f] border-[#212121]"
                        }`}
                      >
                        <div className="flex items-center justify-around gap-[9.41px] w-full">
                          <div className="flex flex-col items-start gap-[9.41px] flex-1">
                            <motion.h3 
                              className="mt-[-1.57px] font-['Neue_Montreal'] font-bold text-white text-[26.1px] tracking-[0] leading-normal"
                              whileHover={{ x: 5 }}
                            >
                              {project.title}
                            </motion.h3>
                            <motion.p 
                              className="font-['Neue_Montreal'] font-normal text-[#b7afaf] text-base tracking-[0] leading-normal whitespace-nowrap"
                              whileHover={{ x: 5 }}
                            >
                              {project.description}
                            </motion.p>
                          </div>
                        </div>
                      </motion.div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Second row of projects */}
            <div className="flex flex-col items-start w-full">
              <div className="flex items-start gap-4 w-full justify-center">
                {projects.map((project) => (
                  <motion.div
                    key={`row2-${project.id}`}
                    variants={cardVariants}
                    whileHover="hover"
                    className="w-full max-w-[600px]"
                  >
                    <Card className="flex flex-col h-[351.8px] w-full border-0 rounded-none bg-transparent overflow-hidden">
                      <motion.div
                        className="flex flex-col items-center justify-center h-[241.75px] w-full rounded-[17.38px_17.38px_0px_0px] border-t-[2.17px] border-r-[2.17px] border-l-[2.17px] bg-[#f5f5f508] border-[#212121]"
                      >
                        <motion.div 
                          variants={plusIconVariants}
                          whileHover={{ scale: 1.2, rotate: 90 }}
                        >
                          <PlusIcon className="w-[61px] h-[61px] text-white" />
                        </motion.div>
                      </motion.div>

                      <motion.div
                        variants={contentVariants}
                        className="flex flex-col items-start gap-[9.41px] p-6 rounded-[0px_0px_17.38px_17.38px] border-r-[1.57px] border-b-[1.57px] border-l-[1.57px] bg-[#ffffff0f] border-[#212121]"
                      >
                        <div className="flex items-center justify-around gap-[9.41px] w-full">
                          <div className="flex flex-col items-start gap-[9.41px] flex-1">
                            <motion.h3 
                              className="mt-[-1.57px] font-['Neue_Montreal'] font-bold text-white text-[26.1px] tracking-[0] leading-normal"
                              whileHover={{ x: 5 }}
                            >
                              Propose Your Project
                            </motion.h3>
                            <motion.p 
                              className="font-['Neue_Montreal'] font-normal text-[#b7afaf] text-base tracking-[0] leading-normal whitespace-nowrap"
                              whileHover={{ x: 5 }}
                            >
                              {project.description}
                            </motion.p>
                          </div>
                        </div>
                      </motion.div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
