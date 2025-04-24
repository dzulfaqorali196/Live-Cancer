"use client";

import { useAnimation, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import SectionHeader from "@/components/section-header";
import { ArticleDoc } from "@/types";
import BlogPosts from "@/components/blog/posts";

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
    <section id="features" className="py-20 md:py-32 bg-web3-dark">
      <div className="container">
        <SectionHeader
          title1="Latest"
          title2="Posts"
          description="Stay updated on CancerFun’s mission to fund decentralized cancer research with BIO tokens on Solana’s blockchain."
        />
        <BlogPosts posts={posts} />
      </div>
    </section>
  );
}
