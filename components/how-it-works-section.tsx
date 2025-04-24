"use client";

import SectionHeader from "@/components/section-header";
import { howItWorksSteps } from "@/constants/howitwork-steps";
import { motion } from "framer-motion";

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-b from-black via-black to-[#0c0c0c]"
    >
      {/* Background Effects */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#a857ff]/5 blur-3xl pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#a857ff]/5 blur-3xl pointer-events-none"></div>

      <div className="container relative z-10">
        <SectionHeader
          title1="How CancerFun"
          title2="Works?"
          description="Explore how the $CANCER token fuels decentralized cancer research on Solana."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {howItWorksSteps.map((step, index) => (
            <motion.div 
              key={index} 
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-8 relative">
                <div className="flex items-center">
                  <span 
                    className="text-7xl font-normal text-[#a857ff] group-hover:scale-110 transition-transform duration-300"
                  >
                    {step.number}
                  </span>
                </div>
                <div className="h-1 w-24 bg-gradient-to-r from-[#a857ff] to-[#8a3dd9] mt-4 rounded-full group-hover:w-32 transition-all duration-300"></div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-[#a857ff] transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                {step.description}
              </p>
              {index < howItWorksSteps.length - 1 && (
                <div className="hidden lg:block absolute top-12 right-0 w-full h-[2px] translate-x-1/2 bg-gradient-to-r from-[#a857ff]/30 to-transparent"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
