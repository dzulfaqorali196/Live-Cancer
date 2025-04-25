"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export function Footer() {
  return (
    <motion.footer 
      className="bg-black border-t border-white/10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="max-w-[1300px] mx-auto px-4 py-6 md:py-8">
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8"
          variants={itemVariants}
        >
          <motion.div 
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8"
            variants={itemVariants}
          >
            <p className="[font-family:'Neue_Montreal-Regular',Helvetica] text-sm text-gray-400 text-center sm:text-left">
              © {new Date().getFullYear()} CancerFun. All rights reserved.
            </p>
            <div className="flex items-center gap-4 sm:gap-8">
              <Link
                href="/terms"
                className="[font-family:'Neue_Montreal-Regular',Helvetica] text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="[font-family:'Neue_Montreal-Regular',Helvetica] text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-4"
            variants={itemVariants}
          >
            <a
              href="https://twitter.com/cancerfun"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Twitter
            </a>
            <a
              href="https://discord.gg/cancerfun"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Discord
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
