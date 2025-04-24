import dynamic from "next/dynamic";

import { HeroSection2 } from "@/components/hero-section2";
// import { FeaturesSection } from "@/components/features-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { TokenomicsSection } from "@/components/tokenomics-section";
import { RoadmapSection } from "@/components/roadmap-section";
import { FaqSection } from "@/components/faq-section";
import { CtaSection } from "@/components/cta-section";
// import { ProjectSection } from "@/components/project/project-section";
import { Metadata } from "next";
import { getPosts } from "@/lib/md/article";
import { ArticleDoc, ArticleType } from "@/types";
import { CommitteeSection } from "@/components/committee-section";
// import { LatestBlogPostSection } from "@/components/latest-blog-post-section";
import { FC } from "react";
import InfoSection from "@/components/info-section";
import { StatsSection } from "@/components/stats-section";
import { VideoSection } from "@/components/video/video-section";

const DynamicProjectSection = dynamic(
  () =>
    import("@/components/project/project-section").then(
      (mod) => mod.ProjectSection as FC
    ),
  {
    loading: () => <p className="text-white">Loading Project Section...</p>,
  }
);

const DynamicLatestBlogPostSection = dynamic(
  () =>
    import("@/components/latest-blog-post-section").then(
      (mod) => mod.LatestBlogPostSection as FC<{ posts: ArticleDoc[] }>
    ),
  {
    loading: () => (
      <p className="text-white">Loading Latest Blog Post Section...</p>
    ),
  }
);

export const metadata: Metadata = {
  title: "CancerCoin - Decentralized Cancer Research Funding",
  description:
    "CancerCoin: Fund life-saving cancer research through a decentralized Solana-based platform.",
  keywords: [
    "CancerCoin",
    "decentralized cancer research",
    "Solana biotech funding",
    "BIO token",
    "Web3",
    "cancer research funding",
  ],
  metadataBase: new URL("https://cancercoin.fun"),
  openGraph: {
    title: "CancerCoin - Decentralized Cancer Research Funding",
    description:
      "CancerCoin: Fund life-saving cancer research through a decentralized Solana-based platform.",
    url: "https://cancercoin.fun",
    siteName: "CancerCoin",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "CancerCoin - Decentralized Cancer Research Funding",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CancerCoin - Decentralized Cancer Research Funding",
    description:
      "CancerCoin: Fund life-saving cancer research through a decentralized Solana-based platform.",
    images: ["/images/og-image.png"],
    site: "@cancercoin",
  },
};

export default async function Home() {
  const articles = await getPosts(ArticleType.WHY);
  const posts = await getPosts(ArticleType.BLOG);
  return (
    <>
      {/* <HeroSection /> */}
      <HeroSection2 />
      <InfoSection />
      {/* <FeaturesSection articles={articles} /> */}
      <StatsSection />
      <DynamicProjectSection />
      <VideoSection />
      <RoadmapSection />
      <HowItWorksSection />
      <TokenomicsSection />
      <FaqSection />
      <CommitteeSection />
      <DynamicLatestBlogPostSection posts={posts} />
      <CtaSection />
    </>
  );
}
