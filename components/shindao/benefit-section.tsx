"use client"

import { useEffect, useState, useRef } from "react"
import React from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"

export default function BenefitSection() {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Efek parallax saat mouse bergerak
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - card.left) / card.width;
    const y = (e.clientY - card.top) / card.height;
    setMousePosition({ x, y });
  };

  // Variants untuk animasi entrance elemen
  const containerVariants = {
    hidden: { 
      opacity: 0,
      transition: {
        staggerChildren: 0.2
      }
    },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.9
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        type: "spring",
        stiffness: 100,
        damping: 15,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  const textVariants = {
    hidden: { 
      opacity: 0,
      y: 10
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  const characterVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        bounce: 0.4
      }
    }
  }

  return (
    <section 
      ref={sectionRef}
      className="bg-black text-white w-full py-8 md:py-12"
    >
      <div className="px-4 md:px-12 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="bg-blue-600 rounded-3xl p-4 sm:p-6 md:p-8"
        >
          {/* Benefit header */}
          <motion.div 
            variants={itemVariants}
            className="bg-green-300 text-black text-center py-2 md:py-3 rounded-full text-lg md:text-xl font-medium mb-6 md:mb-12 hover:bg-green-400 transition-colors duration-300"
          >
            Creation Benefit for Contributor
          </motion.div>

          {/* Purple card with wavy background */}
          <motion.div 
            variants={cardVariants}
            className="bg-purple-500 rounded-3xl p-4 sm:p-6 md:p-8 relative overflow-hidden mx-0 sm:mx-4 transition-all duration-500 transform hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
            style={{
              transform: isHovering 
                ? `perspective(1000px) rotateX(${(mousePosition.y - 0.5) * -5}deg) rotateY(${(mousePosition.x - 0.5) * 5}deg)` 
                : 'perspective(1000px) rotateX(0) rotateY(0)',
              transition: 'transform 0.3s ease'
            }}
          >
            {/* Wavy background pattern - using CSS background for the waves */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)",
                backgroundSize: "100px 100px",
                animation: "moveWaves 20s linear infinite",
              }}
            ></div>
            
            {/* Tambahan diagonal lines dengan arah berbeda */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)",
                backgroundSize: "100px 100px",
                animation: "moveWavesReverse 15s linear infinite",
              }}
            ></div>

            {/* Content container */}
            <div className="relative z-10">
              {/* Main heading */}
              <motion.div 
                variants={textVariants}
                className="text-center mb-3 md:mb-4 mt-4 md:mt-8"
              >
                <motion.h2 
                  variants={textVariants}
                  className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-1 md:mb-2 transition-transform duration-300 hover:scale-105"
                >
                  Thank You For Contributing to
                </motion.h2>
                <motion.h2 
                  variants={textVariants}
                  className="text-2xl sm:text-3xl md:text-5xl font-bold text-yellow-300 mb-1 md:mb-2 animate-pulse"
                >
                  ShinDAO
                </motion.h2>
                <motion.p 
                  variants={textVariants}
                  className="text-purple-300 text-lg sm:text-xl"
                >
                  <span>Cancer</span> <span className="text-green-400">Fun</span>
                </motion.p>
              </motion.div>

              {/* Main text */}
              <motion.div 
                variants={textVariants}
                className="max-w-3xl mx-auto text-white text-center mb-4 md:mb-8"
              >
                <motion.p 
                  variants={textVariants}
                  className="text-sm sm:text-base mb-2 transition-opacity duration-300 hover:opacity-90"
                >
                  Thank you for fueling the future of science. Your contribution unlocks $SHIN a utility token that grants{" "}
                  <span className="text-yellow-200 hover:text-yellow-100 transition-colors duration-300">voting rights</span>,{" "}
                  <span className="text-yellow-200 hover:text-yellow-100 transition-colors duration-300">early research access</span>, and a{" "}
                  <span className="text-yellow-200 hover:text-yellow-100 transition-colors duration-300">stake</span> in biotech breakthroughs.
                </motion.p>
                <motion.p 
                  variants={textVariants}
                  className="text-sm sm:text-base transition-opacity duration-300 hover:opacity-90"
                >
                  Whether you contribute 10K or 10M $CANCER, you're part of a transparent, tokenized, community-driven
                  research movement.
                </motion.p>
              </motion.div>

              {/* Signature */}
              <motion.div 
                variants={textVariants}
                className="text-center text-yellow-200 mb-6 md:mb-12 text-sm sm:text-base transition-all duration-300 hover:tracking-wider"
              >
                — Hsun4, ShinDAO Commitee
              </motion.div>

              {/* Character images */}
              <div className="flex justify-between mt-0 md:-mt-4">
                {/* Left character */}
                <motion.div 
                  variants={characterVariants}
                  className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 transition-transform duration-500 hover:scale-110 hover:-translate-y-2"
                >
                  <img
                    src="/Shindao/Benefit/char.png"
                    alt="ShinDAO Character"
                    className="w-full h-full object-contain transform -scale-x-100"
                    style={{
                      transform: isHovering 
                        ? `translateX(${(mousePosition.x - 0.5) * -20}px) translateY(${(mousePosition.y - 0.5) * -10}px) scale(-1, 1)` 
                        : 'scale(-1, 1)'
                    }}
                  />
                </motion.div>

                {/* Right character */}
                <motion.div 
                  variants={characterVariants}
                  className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 transition-transform duration-500 hover:scale-110 hover:-translate-y-2"
                >
                  <img
                    src="/Shindao/Benefit/char.png"
                    alt="ShinDAO Character"
                    className="w-full h-full object-contain"
                    style={{
                      transform: isHovering 
                        ? `translateX(${(mousePosition.x - 0.5) * 20}px) translateY(${(mousePosition.y - 0.5) * -10}px)` 
                        : 'none'
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Animasi CSS */}
          <style jsx global>{`
            @keyframes moveWaves {
              0% {
                background-position: 0 0;
              }
              100% {
                background-position: 100px 100px;
              }
            }
            
            @keyframes moveWavesReverse {
              0% {
                background-position: 0 0;
              }
              100% {
                background-position: -100px -100px;
              }
            }
            
            @keyframes pulse {
              0%, 100% {
                opacity: 1;
              }
              50% {
                opacity: 0.8;
              }
            }
          `}</style>
        </motion.div>
      </div>
    </section>
  )
} 