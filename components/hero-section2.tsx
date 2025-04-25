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
import { Application } from "@splinetool/runtime";

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

const splineContainerVariants = {
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
  const splineRef = useRef<Application | null>(null);
  const inView = useInView(ref, { amount: 0.1, once: true });
  const shouldReduceMotion = useReducedMotion();
  const [isSplineReady, setIsSplineReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const isDevelopment = process.env.NODE_ENV === 'development';

  useEffect(() => {
    // Skip Spline initialization in development mode
    if (isDevelopment) {
      setIsSplineReady(true);
      return;
    }

    let progressInterval: NodeJS.Timeout;

    const initializeSpline = async () => {
      try {
        const canvas = document.getElementById("hero-spline-scene") as HTMLCanvasElement;
        if (!canvas) throw new Error("Canvas not found");

        progressInterval = setInterval(() => {
          setLoadingProgress(prev => {
            if (prev >= 90) return prev;
            return prev + Math.random() * 10;
          });
        }, 300);

        const app = new Application(canvas);
        splineRef.current = app;

        await app.load("https://prod.spline.design/oqHYtZFwqq7sElL9/scene.splinecode");
        
        canvas.style.cursor = 'pointer';
        
        setLoadingProgress(100);
        clearInterval(progressInterval);
        
        setTimeout(() => {
          setIsSplineReady(true);
        }, 500);

      } catch (error) {
        console.error("Spline load error:", error);
        setLoadingError("Failed to load 3D scene. Please refresh the page.");
        clearInterval(progressInterval);
        setLoadingProgress(0);
      }
    };

    initializeSpline();

    return () => {
      clearInterval(progressInterval);
      if (splineRef.current) {
        splineRef.current.dispose();
      }
    };
  }, [isDevelopment]);

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
        variants={splineContainerVariants}
        className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-[#1a0b33]/30 opacity-60" 
      />

      {/* Spline Container */}
      {!isDevelopment && (
        <motion.div 
          variants={splineContainerVariants}
          className="relative w-full h-screen overflow-hidden" 
          style={{ marginTop: "-5vh" }}
        >
          {/* Gradient untuk transisi yang lebih halus */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black z-10" 
               style={{
                 background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,0.95) 100%)'
               }}
          />
          
          <canvas
            id="hero-spline-scene"
            className={`w-full h-full object-cover transition-all duration-700 ${
              isSplineReady ? 'opacity-100' : 'opacity-0'
            }`}
          ></canvas>
        </motion.div>
      )}

      {/* Loading Overlay - hanya ditampilkan di production */}
      {!isDevelopment && !isSplineReady && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-20 bg-black/80 flex flex-col items-center justify-center gap-4 transition-opacity duration-300"
        >
          {loadingError ? (
            <div className="text-red-500 text-sm">{loadingError}</div>
          ) : (
            <>
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
            </>
          )}
        </motion.div>
      )}

      {/* Content Container */}
      <motion.div 
        variants={splineContainerVariants}
        className="absolute inset-x-0 bottom-0 z-10 pb-20"
      >
        <div className="w-full max-w-[1400px] mx-auto px-8">
          {/* Subtle dark overlay untuk text area */}
          <div className="relative">
            <motion.div 
              variants={splineContainerVariants}
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
