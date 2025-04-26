"use client"

import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"

export default function MountainSection() {
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  useEffect(() => {
    // Mendapatkan dimensi asli gambar
    const img = new window.Image();
    img.onload = () => {
      setImageDimensions({
        width: img.width,
        height: img.height
      });
    };
    img.src = "/Shindao/Mountain/Mountain.png";
  }, []);

  // Variants untuk animasi
  const mountainVariants = {
    hidden: { 
      opacity: 0,
      scale: 1.2
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0,
      x: 100
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.section 
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="bg-black text-white w-full relative overflow-hidden" 
      style={{ height: imageDimensions.height > 0 ? `${imageDimensions.height}px` : "auto" }}
    >
      {/* Background solid color */}
      <div className="absolute inset-0 bg-black z-0"></div>
      
      {/* Background image */}
      <motion.div 
        variants={mountainVariants}
        className="absolute inset-0 w-full h-full z-0 mix-blend-screen"
      >
        <Image
          src="/Shindao/Mountain/Mountain.png"
          alt="ShinDAO Mountain"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          style={{
            objectPosition: 'center',
            mixBlendMode: 'screen'
          }}
        />
      </motion.div>
      
      {/* Content overlay */}
      <div className="px-4 md:px-12 max-w-7xl mx-auto relative z-10 h-full">
        <motion.div 
          variants={contentVariants}
          className="md:w-1/2 md:ml-auto pt-8 md:pt-16 pl-0 md:pl-40 text-left"
        >
          <motion.h2 
            variants={textVariants}
            className="text-3xl md:text-5xl font-bold mb-6 text-white"
          >
            From <motion.span
                    initial={{ color: "#fff" }}
                    animate={isInView ? { color: "#c084fc" } : { color: "#fff" }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="text-purple-400"
                  >
                    cancer-curing
                  </motion.span> enzymes to<br />
            a <motion.span
                 initial={{ color: "#fff" }}
                 animate={isInView ? { color: "#c084fc" } : { color: "#fff" }}
                 transition={{ delay: 1.5, duration: 0.8 }}
                 className="text-purple-400"
               >
                 decentralized
               </motion.span> biotech pipeline
          </motion.h2>
          <motion.p 
            variants={textVariants}
            className="text-2xl md:text-4xl font-bold"
          >
            <motion.span
              initial={{ color: "#fff", scale: 1 }}
              animate={isInView ? { color: "#c084fc", scale: [1, 1.1, 1] } : { color: "#fff", scale: 1 }}
              transition={{ delay: 1.8, duration: 1, times: [0, 0.5, 1] }}
              className="text-purple-400"
            >
              ShinDAO
            </motion.span> makes it possible.
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  )
} 