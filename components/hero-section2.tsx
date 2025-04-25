"use client";

import { Button } from "@/components/ui/button";
import { motion, useAnimation, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Routes } from "@/constants/routes";
import React from "react";

// Optimasi animation variants dengan memoization
const variants = {
  section: {
    hidden: { 
      opacity: 0,
    },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  },
  videoContainer: {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  },
  header: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  },
  paragraph: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  },
  button: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (delay = 0) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut", delay }
    }),
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  }
};

export function HeroSection2() {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const inView = useInView(ref, { amount: 0.1, once: true });
  const shouldReduceMotion = useReducedMotion();

  // Memoize scroll handler
  const scrollToProjects = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      const start = window.pageYOffset;
      const end = projectsSection.offsetTop;
      const duration = 1200;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeInOutCubic = (t: number) => 
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const currentPosition = start + (end - start) * easeInOutCubic(progress);
        window.scrollTo(0, currentPosition);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Optimasi video loading
    video.preload = "auto";
    video.playbackRate = 0.95;

    const handleCanPlay = () => {
      setIsVideoLoaded(true);
      video.play();
    };

    const handleTimeUpdate = () => {
      if (video.currentTime >= video.duration - 0.5) {
        video.style.opacity = '0';
      } else if (video.currentTime <= 0.5) {
        video.style.opacity = '1';
      }
    };

    const handleEnded = () => {
      video.currentTime = 0;
      video.style.opacity = '1';
      video.play();
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    // Optimasi buffer
    if (video.buffered.length === 0) {
      video.load();
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (inView && !shouldReduceMotion) {
      controls.start("visible");
    }
  }, [controls, inView, shouldReduceMotion]);

  return (
    <motion.section
      id="hero-section"
      variants={variants.section}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden w-full bg-black flex flex-col will-change-transform"
      style={{ minHeight: "100vh" }}
    >
      {/* Video Container */}
      <motion.div 
        variants={variants.videoContainer}
        className="relative w-full h-screen overflow-hidden will-change-transform" 
        style={{ 
          marginTop: "-5vh",
          zIndex: 1,
          transform: 'translateZ(0)'  // Hardware acceleration
        }}
      >
        {/* Loading placeholder */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#a857ff] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-cover ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 2,
            transition: 'opacity 0.5s ease-in-out'
          }}
        >
          <source 
            src="/HeroSection/spline.webm" 
            type="video/webm"
          />
        </video>
      </motion.div>

      {/* Content Container */}
      <motion.div 
        variants={variants.videoContainer}
        className="absolute inset-x-0 bottom-0 z-10 pb-12 md:pb-20 will-change-transform"
        style={{ transform: 'translateZ(0)' }}
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="relative">
            {/* Main Header */}
            <div ref={ref} className="mb-4 md:mb-8 relative">
              <motion.h1
                className="font-normal text-white leading-tight text-3xl md:text-[60px] will-change-transform"
                variants={variants.header}
              >
                We are the catalyst driving{" "}
                <motion.span 
                  variants={variants.header}
                  className="block text-[#a857ff] text-3xl md:text-[60px]"
                >
                  decentralized in cancer research
                </motion.span>
              </motion.h1>
            </div>

            {/* Subheader with CTAs */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8 relative">
              <motion.p
                variants={variants.paragraph}
                className="text-[#94A3B8] max-w-[600px] text-sm md:text-[20px] will-change-transform"
              >
                CancerFun is a platform for cancer research and development, engineered by researchers to accelerate Cancer Focused Decentralized Science
              </motion.p>

              <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full md:w-auto">
                <motion.div custom={0.3} variants={variants.button} className="w-full sm:w-auto">
                  <Button
                    className="bg-[#5A01B9] hover:bg-[#5A01B9]/90 text-white rounded-[100px] px-4 font-['Neue_Montreal'] text-sm md:text-[20px] font-medium w-full sm:w-auto"
                    style={{ 
                      height: "40px", 
                      width: "100%",
                      lineHeight: "20px",
                      padding: "8px 16px"
                    }}
                  >
                    <Link href={Routes.TOKEN}>Get $CANCER</Link>
                  </Button>
                </motion.div>

                <motion.div custom={0.4} variants={variants.button} className="w-full sm:w-auto">
                  <motion.button
                    whileTap="tap"
                    onClick={scrollToProjects}
                    className="bg-white hover:bg-[#5A01B9] text-[#5A01B9] hover:text-white transition-colors duration-200 rounded-[100px] px-4 font-['Neue_Montreal'] text-sm md:text-[20px] font-medium w-full sm:w-auto"
                    style={{ 
                      height: "40px", 
                      width: "100%",
                      lineHeight: "20px",
                      padding: "8px 16px"
                    }}
                  >
                    Get Started
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
