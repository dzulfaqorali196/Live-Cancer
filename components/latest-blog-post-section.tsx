"use client";

import { useAnimation, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
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
      className="pt-32 pb-20 md:py-32 bg-web3-dark relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="absolute top-0 left-0 right-0 h-16 md:h-24 bg-gradient-to-b from-black via-black to-transparent pointer-events-none opacity-80"></div>

      <div className="container relative z-10">
        <motion.div variants={contentVariants} className="text-center max-w-5xl mx-auto mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal mb-6 text-center">
            <span className="text-white">Latest </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A855F7] to-[#E9D5FF]">Posts</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-center">
            Stay updated on CancerFun's mission to fund decentralized cancer research with BIO tokens on Solana's blockchain.
          </p>
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
