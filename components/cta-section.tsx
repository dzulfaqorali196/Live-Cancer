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
      className="py-20 md:py-32 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="absolute inset-0 bg-linear-to-b from-web3-darker to-web3-dark"></div>
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-web3-primary/10 blur-3xl pointer-events-none"
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
        className="container relative z-10"
        variants={containerVariants}
      >
        <motion.div variants={containerVariants}>
          <SectionHeader
            title1="Ready to Join"
            title2="Our Community?"
            description="Be part of CancerFun's global mission to fund innovative cancer research with BIO tokens on Solana's blockchain."
          />
        </motion.div>
        <motion.div 
          className="max-w-4xl mx-auto text-center"
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
                className="bg-web3-primary hover:bg-web3-primary/90 text-white"
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
                    <SiRocket />
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
