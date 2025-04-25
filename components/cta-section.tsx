"use client";

import SectionHeader from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { Routes } from "@/constants/routes";
import Link from "next/link";
import { SiRocket } from "react-icons/si";
import { motion } from "framer-motion";

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

const glowVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: "easeOut"
    }
  }
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

export function CtaSection() {
  return (
    <motion.section 
      className="py-12 md:py-20 lg:py-32 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="absolute inset-0 bg-web3-dark"></div>
      
      {/* Gradient ungu horizontal */}
      <div className="absolute inset-0 bg-gradient-to-r from-web3-dark via-web3-primary/20 to-web3-dark"></div>
      
      {/* Efek glow ungu tambahan */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[200px] md:h-[400px] bg-web3-primary/10 blur-[50px] md:blur-[100px]"></div>
      
      {/* Gradient atas dan bawah */}
      <div className="absolute top-0 left-0 right-0 h-16 md:h-24 bg-gradient-to-b from-web3-dark via-web3-dark to-transparent pointer-events-none z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-12 md:h-16 bg-gradient-to-t from-web3-darker via-web3-darker to-transparent pointer-events-none z-10"></div>
      
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] rounded-full bg-web3-primary/10 blur-2xl md:blur-3xl pointer-events-none"
        variants={glowVariants}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity
        }}
      ></motion.div>
      <motion.div 
        className="container relative z-10 px-4 md:px-6"
        variants={containerVariants}
      >
        <motion.div variants={containerVariants} className="flex flex-col items-center md:items-start">
          <div className="w-full text-center md:text-left">
            <SectionHeader
              title1="Ready to Join"
              title2="Our Community?"
              description="Be part of CancerFun's global mission to fund innovative cancer research with BIO tokens on Solana's blockchain."
            />
          </div>
        </motion.div>
        <motion.div 
          className="max-w-4xl mx-auto text-center mt-6 md:mt-8"
          variants={containerVariants}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
            >
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto bg-web3-primary hover:bg-web3-primary/90 text-white text-sm md:text-base px-6 py-3 md:px-8 md:py-4"
            >
              <Link href={Routes.CONTACT} className="flex items-center gap-2">
                  <motion.div
                    animate={{
                      x: [0, 5, 0],
                      rotate: [0, 10, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut",
                      repeat: Infinity
                    }}
                  >
                <SiRocket className="w-4 h-4 md:w-5 md:h-5" />
                  </motion.div>
                <span>Join CancerFun Now</span>
              </Link>
            </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
