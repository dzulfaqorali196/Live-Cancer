"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function PresaleBanner() {
  const bannerRef = useRef(null)
  const isInView = useInView(bannerRef, { once: true, amount: 0.1 })

  // Variants untuk animasi
  const bannerContentVariants = {
    hidden: { 
      opacity: 0
    },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren"
      }
    }
  }

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.5
      }
    }
  }

  // Effect untuk blink
  const blinkVariants = {
    animate: {
      color: ["#ffffff", "#FFD700", "#ffffff"],
      textShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 8px rgba(255,215,0,0.8)", "0px 0px 0px rgba(255,255,255,0)"],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  }

  return (
    <section 
      ref={bannerRef}
      className="bg-black text-white w-full overflow-hidden"
    >
      <motion.div 
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={bannerContentVariants}
        className="bg-blue-600 py-4 text-white text-center overflow-hidden whitespace-nowrap relative"
      >
        <motion.div 
          variants={textVariants}
          className="inline-block whitespace-nowrap"
          style={{
            animation: "scroll 40s linear infinite",
          }}
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          {Array(8).fill(0).map((_, i) => (
            <motion.span 
              key={i}
              className="text-lg font-medium px-4 inline-block"
              animate={{
                color: ["#ffffff", "#FFD700", "#ffffff"],
                textShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 8px rgba(255,215,0,0.8)", "0px 0px 0px rgba(255,255,255,0)"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              PRESALE · PRESALE · PRESALE · PRESALE · PRESALE · PRESALE · PRESALE · PRESALE · PRESALE · PRESALE · PRESALE · PRESALE ·
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
} 