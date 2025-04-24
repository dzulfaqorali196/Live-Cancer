"use client";

import { Button } from "@/components/ui/button";
import {
  motion,
  useAnimation,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Routes } from "@/constants/routes";
import { Loader2 } from "lucide-react";
import { useVideoSource } from "@/lib/utils/video";

// Animation variants
const sectionVariants = {
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
};

const videoContainerVariants = {
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
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const paragraphVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const buttonVariants = {
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
};

export function HeroSection2() {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { amount: 0.1, once: true });
  const shouldReduceMotion = useReducedMotion();
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const videoSrc = useVideoSource();

  // Check if component is mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (videoRef.current) {
      const video = videoRef.current;
      video.playbackRate = 0.75;

      const handleProgress = () => {
        if (video.buffered.length > 0) {
          const duration = video.duration;
          const buffered = video.buffered.end(0);
          const progress = Math.round((buffered / duration) * 100);
          setLoadingProgress(progress);
        }
      };
      
      const handleCanPlay = () => {
        setIsVideoReady(true);
        video.play().catch(() => {
          // Handle autoplay error silently
        });
      };

      video.addEventListener('progress', handleProgress);
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('playing', () => setIsVideoReady(true));
      
      return () => {
        video.removeEventListener('progress', handleProgress);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('playing', () => setIsVideoReady(true));
      };
    }
  }, [videoSrc, isMounted]);

  // Smooth looping effect
  useEffect(() => {
    if (!isMounted) return;

    if (videoRef.current) {
      const video = videoRef.current;
      
      const handleTimeUpdate = () => {
        const duration = video.duration;
        const timeLeft = duration - video.currentTime;
        
        if (timeLeft < 0.5) {
          video.style.opacity = `${timeLeft * 2}`;
        } else if (video.currentTime < 0.5) {
          video.style.opacity = `${video.currentTime * 2}`;
        } else {
          video.style.opacity = '1';
        }
      };

      const handleEnded = () => {
        video.currentTime = 0;
        video.play();
      };

      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('ended', handleEnded);

      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, [isMounted]);

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      const start = window.pageYOffset;
      const end = projectsSection.offsetTop;
      const duration = 1200;
      const startTime = performance.now();

      function animate(currentTime: number) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeInOutCubic = (t: number) => 
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const currentPosition = start + (end - start) * easeInOutCubic(progress);
        window.scrollTo(0, currentPosition);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      }

      requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (inView && !shouldReduceMotion) {
      controls.start("visible");
    }
  }, [controls, inView, shouldReduceMotion]);

  // Add preload hint
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.href = videoSrc;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [videoSrc]); // Update preload when source changes

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden w-full bg-black flex flex-col"
      style={{ minHeight: "100vh" }}
    >
      {/* Background gradient overlay - subtle */}
      <motion.div 
        variants={videoContainerVariants}
        className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-[#1a0b33]/30 opacity-60" 
      />

      {/* Video Container - Seamless */}
      <motion.div 
        variants={videoContainerVariants}
        className="relative w-full h-screen overflow-hidden" 
        style={{ marginTop: "-5vh" }}
      >
        {/* Gradient untuk transisi yang lebih halus */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black z-10" 
             style={{
               background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,0.95) 100%)'
             }}
        />
        
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isVideoReady ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            filter: 'brightness(1.2)',
            transform: 'scale(1.02)',
            objectPosition: 'center 15%',
            transition: 'opacity 500ms ease-in-out'
          }}
          playsInline
          autoPlay
          muted
          loop
          preload="auto"
          poster={isMounted && window.matchMedia('(max-width: 767px)').matches 
            ? '/HeroSection/poster-mobile.jpg' 
            : '/HeroSection/poster.jpg'}
        >
          <source src={videoSrc} type="video/webm" />
        </video>
      </motion.div>

      {/* Loading Overlay - Simplified */}
      {!isVideoReady && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-20 bg-black/80 flex flex-col items-center justify-center gap-4 transition-opacity duration-300"
        >
          <Loader2 className="h-8 w-8 text-purple-400 animate-spin" />
          <div className="flex flex-col items-center">
            <div className="text-white text-sm mb-2">Loading visualization...</div>
            <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-400 transition-all duration-300 rounded-full"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <div className="text-gray-400 text-xs mt-1">{loadingProgress}%</div>
          </div>
        </motion.div>
      )}

      {/* Content Container */}
      <motion.div 
        variants={videoContainerVariants}
        className="absolute inset-x-0 bottom-0 z-10 pb-20"
      >
        <div className="w-full max-w-[1400px] mx-auto px-8">
          {/* Subtle dark overlay untuk text area */}
          <div className="relative">
            <motion.div 
              variants={videoContainerVariants}
              className="absolute inset-0 bg-black/10 backdrop-blur-[2px] rounded-xl -m-4 p-4" 
            />
            
            {/* Main Header */}
            <div ref={ref} className="mb-8 relative">
              <motion.h1
                className="font-normal text-white leading-tight md:text-[60px] text-4xl"
                variants={headerVariants}
              >
                We are the catalyst driving{" "}
                <motion.span 
                  variants={headerVariants}
                  className="block text-[#a857ff] md:text-[60px] text-4xl"
                >
                  decentralized in cancer research
                </motion.span>
              </motion.h1>
            </div>

            {/* Subheader with CTAs */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative">
              <motion.p
                variants={paragraphVariants}
                className="text-[#94A3B8] max-w-[600px] md:text-[20px] text-base"
              >
                Nucleo is a platform for cancer research and development, engineered by researchers to accelerate Cancer Focused Decentralized Science
              </motion.p>

              <div className="flex items-center gap-4">
                <motion.div custom={0.3} variants={buttonVariants}>
                  <Button
                    className="bg-[#5A01B9] hover:bg-[#5A01B9]/90 text-white rounded-[100px] px-4 font-['Neue_Montreal'] md:text-[20px] text-base font-medium"
                    style={{ 
                      height: "56px", 
                      width: "166px",
                      lineHeight: "24px",
                      padding: "8px 16px"
                    }}
                  >
                    <Link href={Routes.TOKEN}>Get $NUCLEO</Link>
                  </Button>
                </motion.div>

                <motion.div custom={0.4} variants={buttonVariants}>
                  <motion.button
                    whileTap="tap"
                    onClick={scrollToProjects}
                    className="bg-white hover:bg-[#5A01B9] text-[#5A01B9] hover:text-white transition-colors duration-200 rounded-[100px] px-4 font-['Neue_Montreal'] md:text-[20px] text-base font-medium"
                    style={{ 
                      height: "56px", 
                      width: "166px",
                      lineHeight: "24px",
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
