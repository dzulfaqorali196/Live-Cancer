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
      className="bg-web3-darker border-web3-gray"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="container py-8">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center"
          variants={itemVariants}
        >
          <motion.p 
            className="text-sm text-muted-foreground mb-4 md:mb-0"
            variants={itemVariants}
          >
            © {new Date().getFullYear()} CancerFun. All rights reserved.
          </motion.p>
          <Link
            href="/terms"
            className="text-sm text-muted-foreground hover:text-white transition-colors"
          >
            Terms of Service
          </Link>
        </motion.div>
      </div>
    </motion.footer>
  );
}
