"use client"

import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"

export default function MountainSection() {
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  useEffect(() => {
    // Cek apakah tampilan mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Panggil saat komponen dimuat
    checkIfMobile();
    
    // Tambahkan event listener untuk resize
    window.addEventListener('resize', checkIfMobile);
    
    // Hapus event listener saat komponen di-unmount
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
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
      x: isMobile ? 0 : 100
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

  // Hitung tinggi section responsif untuk mobile
  const getSectionHeight = () => {
    if (imageDimensions.height <= 0) return "auto";
    
    if (isMobile) {
      // Untuk mobile, gunakan tinggi yang lebih pendek
      return "auto";
    } else {
      // Untuk desktop, gunakan tinggi asli gambar
      return `${imageDimensions.height}px`;
    }
  };

  return (
    <motion.section 
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="bg-black text-white w-full relative overflow-hidden min-h-[500px] md:min-h-0" 
      style={{ height: getSectionHeight() }}
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
          className="object-cover md:object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 100vw"
          style={{
            objectPosition: isMobile ? 'center 70%' : 'center',
            mixBlendMode: 'screen' as const
          }}
        />
      </motion.div>
      
      {/* Content overlay */}
      <div className="px-4 md:px-12 max-w-7xl mx-auto relative z-10 h-full flex flex-col md:block">
        <motion.div 
          variants={contentVariants}
          className="w-full md:w-1/2 md:ml-auto pt-12 pb-16 md:pt-16 md:pb-0 pl-0 md:pl-40 text-center md:text-left"
        >
          <div className="bg-black/40 p-4 md:p-0 rounded-lg md:bg-transparent">
            <motion.h2 
              variants={textVariants}
              className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-white"
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
              className="text-xl sm:text-2xl md:text-4xl font-bold"
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
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
} 