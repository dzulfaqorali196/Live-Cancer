"use client";

import { Button } from "@/components/ui/button";
import { SiteSettings } from "@/constants/settings";
import { SiSolana } from "react-icons/si";
import { FaGlobe } from "react-icons/fa6";

import {
  motion,
  useAnimation,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef } from "react";
import {
  headerVariants,
  paragraphVariants,
  statVariants,
  blurVariants,
} from "@/styles/motion";
import Link from "next/link";
import { Routes } from "@/constants/routes";
import { FaLongArrowAltRight } from "react-icons/fa";

export function HeroSection1() {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.1, once: true });
  const shouldReduceMotion = useReducedMotion();

  // Start animation when in view
  useEffect(() => {
    if (inView && !shouldReduceMotion) {
      controls.start("visible");
    }
  }, [controls, inView, shouldReduceMotion]);

  return (
    <section className="relative pt-24 pb-16 md:pt-40 md:pb-32 overflow-hidden">
      {process.env.NODE_ENV !== 'development' && (
        <>
          <motion.div
            className="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] rounded-full bg-web3-primary/5 blur-3xl pointer-events-none"
            variants={blurVariants}
            initial="hidden"
            animate={controls}
          />
          <motion.div
            className="absolute top-40 right-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] rounded-full bg-web3-accent/5 blur-3xl pointer-events-none"
            variants={blurVariants}
            initial="hidden"
            animate={controls}
          />
        </>
      )}

      <div className="container relative z-10 px-4 md:px-6">
        <div ref={ref} className="max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-3xl md:text-6xl font-bold mb-4 md:mb-6"
            variants={headerVariants}
            initial="hidden"
            animate={controls}
          >
            {SiteSettings.title.part1}{" "}
            <span className="gradient-text">{SiteSettings.title.part2}</span>
          </motion.h1>
          <motion.p
            className="text-base md:text-xl text-muted-foreground mb-6 md:mb-10"
            variants={paragraphVariants}
            initial="hidden"
            animate={controls}
          >
            {SiteSettings.description}
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button
              size="sm"
              className="bg-web3-primary hover:bg-web3-primary/90 text-white text-sm md:text-base"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                shouldReduceMotion
                  ? { opacity: 1, scale: 1 }
                  : {
                      opacity: 1,
                      scale: 1,
                      transition: {
                        duration: 0.8,
                        ease: "easeOut",
                        delay: 0.2,
                      },
                    }
              }
            >
              <Link
                href={Routes.PROJECTS}
                className="flex flex-row items-center gap-1"
              >
                Explore Projects <FaLongArrowAltRight className="h-3 w-3 md:h-4 md:w-4" />
              </Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-web3-primary text-web3-primary hover:bg-web3-primary/10 text-sm md:text-base"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                shouldReduceMotion
                  ? { opacity: 1, scale: 1 }
                  : {
                      opacity: 1,
                      scale: 1,
                      transition: {
                        duration: 0.8,
                        ease: "easeOut",
                        delay: 0.3,
                      },
                    }
              }
            >
              <Link
                href={Routes.CONTACT}
                className="flex flex-row items-center gap-1"
              >
                Get Involved <FaLongArrowAltRight className="h-3 w-3 md:h-4 md:w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-8 md:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-10">
            {[
              { value: "$1.0B+", label: "BIO Tokens", icon: null },
              { value: "65K", label: "TPS Solana's Speed", icon: SiSolana },
              { value: "5+", label: "Countries in Network", icon: FaGlobe },
              { value: "100%", label: "Community Governance", icon: null },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center"
                variants={statVariants}
                custom={index}
                initial="hidden"
                animate={controls}
              >
                <p className="text-2xl md:text-4xl font-bold gradient-text flex items-center gap-1">
                  {stat.icon && (
                    <stat.icon className="h-5 w-5 md:h-7 md:w-7" fill="#9300f8" />
                  )}{" "}
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
