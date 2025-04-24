"use client";

import { Button } from "@/components/ui/button";
import { Application } from "@splinetool/runtime";
import {
  motion,
  useAnimation,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Routes } from "@/constants/routes";

// Animation variants
const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const paragraphVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut", delay },
  }),
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

export function HeroSection2() {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.1, once: true });
  const shouldReduceMotion = useReducedMotion();
  const [isLoadingSpline, setIsLoadingSpline] = useState(true);
  const splineRef = useRef<Application | null>(null);

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      const start = window.pageYOffset;
      const end = projectsSection.offsetTop;
      const duration = 1200; // Durasi dalam milliseconds (1.2 detik)
      const startTime = performance.now();

      function animate(currentTime: number) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function untuk smooth scroll
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

  useEffect(() => {
    // Nonaktifkan sementara untuk development
    if (process.env.NODE_ENV === 'development') {
      setIsLoadingSpline(false);
      return;
    }

    const timeout = setTimeout(() => {
      const canvas = document.getElementById("hero-spline-scene") as HTMLCanvasElement;
      if (!canvas) return;

      const app = new Application(canvas);
      splineRef.current = app;
      
      app
        .load("https://prod.spline.design/oqHYtZFwqq7sElL9/scene.splinecode")
        .then(() => setIsLoadingSpline(false))
        .catch((err) => {
          console.error("Spline load error:", err);
          setIsLoadingSpline(false);
        });

      return () => {
        app.dispose();
      };
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      className="relative overflow-hidden w-full bg-black"
      style={{ minHeight: "150vh" }}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-[#1a0b33] opacity-90" />

      {/* Spline Scene Container with gradient mask */}
      <div className="absolute inset-0 h-[85vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black z-10" />
        <canvas
          id="hero-spline-scene"
          className="w-full h-full relative z-0 [&>div]:hidden"
        />
      </div>

      {/* Additional dark gradient overlay for bottom blend */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-transparent via-black to-black z-10" 
        style={{ transform: 'translateY(2px)' }}
      />

      {/* Loading Overlay */}
      {isLoadingSpline && (
        <div className="absolute inset-0 z-20 bg-black/80 flex items-center justify-center">
          <div className="text-white text-sm animate-pulse">
            Loading visualization...
          </div>
        </div>
      )}

      {/* Main Content Container */}
      <div className="relative z-10 w-full h-full pt-24">
        {/* Content Wrapper - Positioned below Spline */}
        <div className="absolute bottom-0 left-0 right-0 w-full" style={{ top: "90vh" }}>
          <div 
            className="w-full px-8 py-16 relative"
            style={{
              background: "linear-gradient(to bottom, transparent, black 15%)",
            }}
          >
            {/* Main Header */}
            <div
              ref={ref}
              className="max-w-[1400px] mx-auto mb-8"
            >
              <motion.h1
                className="font-normal text-white leading-tight"
                style={{ fontSize: "60px", lineHeight: "1.2" }}
                variants={headerVariants}
                initial="hidden"
                animate={controls}
              >
                We are the catalyst driving{" "}
                <span className="block text-[#a857ff]" style={{ fontSize: "60px" }}>
                  decentralized in cancer research
                </span>
              </motion.h1>
            </div>

            {/* Subheader with CTAs */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 max-w-[1400px] mx-auto">
              <motion.p
                className="text-[#94A3B8] max-w-[1000px] whitespace-pre-line"
                style={{ fontSize: "20px", lineHeight: "1.5" }}
                variants={paragraphVariants}
                initial="hidden"
                animate={controls}
              >
                {"CancerFun is a platform for cancer research and development, engineered by researchers to accelerate\nCancer Focused Decentralized Science"}
              </motion.p>

              <div className="flex items-center gap-4">
                <motion.div custom={0.3} variants={buttonVariants} initial="hidden" animate={controls}>
                  <Button
                    className="bg-[#5A01B9] hover:bg-[#5A01B9]/90 text-white rounded-[100px] px-4 font-['Neue_Montreal'] text-[20px] font-medium"
                    style={{ 
                      height: "57px", 
                      width: "178px",
                      lineHeight: "24px",
                      padding: "8px 16px"
                    }}
                  >
                    <Link href={Routes.TOKEN}>Get $CANCER</Link>
                  </Button>
                </motion.div>

                <motion.div custom={0.4} variants={buttonVariants} initial="hidden" animate={controls}>
                  <motion.button
                    whileTap="tap"
                    variants={buttonVariants}
                    onClick={scrollToProjects}
                    className="bg-white hover:bg-[#5A01B9] text-[#5A01B9] hover:text-white transition-colors duration-200 rounded-[100px] px-4 font-['Neue_Montreal'] text-[20px] font-medium"
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
      </div>
    </section>
  );
}
