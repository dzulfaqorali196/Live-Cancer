"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const textVariants = {
  hidden: { 
    opacity: 0,
    y: 10
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function InfoSection() {
  return (
    <motion.div 
      className="relative h-[90px]"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ 
        once: true,
        amount: 0.3
      }}
    >
      {/* Top info bar */}
      <motion.div 
        className="flex w-full h-[90px] items-center justify-center gap-2.5 px-8 py-5 bg-[#1717179e] backdrop-blur-sm"
        variants={containerVariants}
      >
        <motion.div 
          className="relative w-fit [font-family:'Neue_Montreal-Regular',Helvetica] font-normal text-xl tracking-[0] leading-[normal] whitespace-nowrap"
          variants={textVariants}
        >
          <motion.span 
            className="text-[#8e8888]"
            variants={textVariants}
          >
            We are committed to advancing cancer research by harnessing
          </motion.span>
          <motion.span 
            className="text-[#303030]"
            variants={textVariants}
          >&nbsp;</motion.span>
          <motion.span 
            className="text-[#5f1fe7]"
            variants={textVariants}
            whileHover={{ 
              scale: 1.05,
              color: "#a857ff",
              transition: { duration: 0.2 }
            }}
          >
            decentralized science
          </motion.span>
          <motion.span 
            className="text-[#8e8888]"
            variants={textVariants}
          >
            {" "}
            to accelerate breakthroughs and enhance patient outcomes.
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
