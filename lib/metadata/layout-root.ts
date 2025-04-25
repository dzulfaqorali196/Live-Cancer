import { Metadata } from "next";

export const metadataLayoutRoot: Metadata = {
  title: {
    template: "%s | CancerFun",
    default: "CancerFun",
  },
  description:
    "CancerFun empowers a global community to fund decentralized cancer research using BIO tokens on Solana's blockchain, driving innovation in immunotherapy and AI diagnostics.",
  keywords: [
    "CancerFun",
    "BIO token",
    "Solana blockchain",
    "decentralized cancer research",
    "Web3",
    "cancer research funding",
    "immunotherapy",
    "AI diagnostics",
  ],
  metadataBase: new URL("https://cancerfun.fun"),
  openGraph: {
    title: "CancerFun - Fund Decentralized Cancer Research",
    description:
      "CancerFun empowers a global community to fund decentralized cancer research using BIO tokens on Solana's blockchain.",
    url: "https://cancerfun.fun",
    siteName: "CancerFun",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "CancerFun - Fund Decentralized Cancer Research",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CancerFun - Fund Decentralized Cancer Research",
    description:
      "CancerFun empowers a global community to fund decentralized cancer research using BIO tokens on Solana.",
    images: ["/images/og-image.png"],
    site: "@cancerfun",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  // viewport: "width=device-width, initial-scale=1",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://cancerfun.fun",
  },
};
