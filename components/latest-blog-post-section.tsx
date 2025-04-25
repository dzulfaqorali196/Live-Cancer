"use client";

import { useAnimation, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import SectionHeader from "@/components/section-header";
import { ArticleDoc } from "@/types";
import BlogPosts from "@/components/blog/posts";
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

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export function LatestBlogPostSection({ posts }: { posts: ArticleDoc[] }) {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.1, once: true });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (inView && !shouldReduceMotion) {
      controls.start("visible");
    }
  }, [controls, inView, shouldReduceMotion]);

  return (
    <motion.section 
      id="features" 
      className="py-20 md:py-32 bg-web3-dark relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black via-black to-web3-dark pointer-events-none"></div>

      <div className="container">
        <motion.div variants={contentVariants}>
        <SectionHeader
          title1="Latest"
          title2="Posts"
            description="Stay updated on CancerFun's mission to fund decentralized cancer research with BIO tokens on Solana's blockchain."
        />
        </motion.div>
        <motion.div 
          variants={contentVariants}
          ref={ref}
        >
        <BlogPosts posts={posts} />
        </motion.div>
      </div>
    </motion.section>
  );
}
