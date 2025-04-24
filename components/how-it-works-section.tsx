"use client";

import SectionHeader from "@/components/section-header";
import { howItWorksSteps } from "@/constants/howitwork-steps";
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

const stepVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    y: -10,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const numberVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "backOut"
    }
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3
    }
  }
};

const lineVariants = {
  hidden: { width: 0, opacity: 0 },
  visible: {
    width: "6rem",
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    width: "8rem",
    transition: {
      duration: 0.3
    }
  }
};

const connectorVariants = {
  hidden: { width: 0, opacity: 0 },
  visible: {
    width: "100%",
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.3
    }
  }
};

export function HowItWorksSection() {
  return (
    <motion.section
      id="how-it-works"
      className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-b from-black via-black to-[#0c0c0c]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Background Effects */}
      <motion.div 
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#a857ff]/5 blur-3xl pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />
      <motion.div 
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#a857ff]/5 blur-3xl pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />

      <div className="container relative z-10">
        <SectionHeader
          title1="How CancerFun"
          title2="Works?"
          description="Explore how the $CANCER token fuels decentralized cancer research on Solana."
        />
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          variants={containerVariants}
        >
          {howItWorksSteps.map((step, index) => (
            <motion.div 
              key={index} 
              className="relative group"
              variants={stepVariants}
              whileHover="hover"
            >
              <div className="mb-8 relative">
                <motion.div 
                  className="flex items-center"
                  variants={numberVariants}
                >
                  <span className="text-7xl font-normal text-[#a857ff]">
                    {step.number}
                  </span>
                </motion.div>
                <motion.div 
                  className="h-1 bg-gradient-to-r from-[#a857ff] to-[#8a3dd9] mt-4 rounded-full"
                  variants={lineVariants}
                />
              </div>
              <motion.h3 
                className="text-2xl font-semibold mb-4 text-white group-hover:text-[#a857ff] transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {step.title}
              </motion.h3>
              <motion.p 
                className="text-gray-400 text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {step.description}
              </motion.p>
              {index < howItWorksSteps.length - 1 && (
                <motion.div 
                  className="hidden lg:block absolute top-12 right-0 w-full h-[2px] translate-x-1/2 bg-gradient-to-r from-[#a857ff]/30 to-transparent"
                  variants={connectorVariants}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
