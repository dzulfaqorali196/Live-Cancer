export interface RoadmapItem {
  quarter: string;
  icon: string;
  title: string;
  completed: boolean;
  items: string[];
}

export const roadmapItems: RoadmapItem[] = [
  {
    quarter: "Q2 2025",
    icon: "SiStarship",
    title: "Launch CancerFun Platform",
    completed: true,
    items: [
      "Deploy BIO token smart contracts on Solana",
      "Launch CancerFun web platform for funding",
      "Fund initial immunotherapy and diagnostic projects",
      "Onboard early adopters and community members",
    ],
  },
  {
    quarter: "Q4 2025",
    icon: "SiHiveBlockchain",
    title: "Activate Community Governance",
    completed: false,
    items: [
      "Enable BIO token voting for research projects",
      "Form initial research DAOs for funding",
      "Release governance documentation and guides",
      "Engage community through voting campaigns",
    ],
  },
  {
    quarter: "Q2 2026",
    icon: "SiGoogleearth",
    title: "Expand Global Research Network",
    completed: false,
    items: [
      "Fund research projects in 10+ countries",
      "Partner with labs in Asia, Europe, and beyond",
      "Translate platform into multiple languages",
      "Host global virtual research summits",
    ],
  },
  {
    quarter: "Q3 2026",
    icon: "SiInternetcomputer",
    title: "Launch Transparency Dashboard",
    completed: false,
    items: [
      "Develop public dashboard for BIO token tracking",
      "Integrate Solana blockchain data for transparency",
      "Ensure accessibility for non-technical users",
      "Promote dashboard through community channels",
    ],
  },
  {
    quarter: "Q4 2026",
    icon: "SiBitcoin",
    title: "Achieve Key Research Milestones",
    completed: false,
    items: [
      "Fund 50+ projects across immunotherapy and AI",
      "Support diverse research in 5+ fields",
      "Publish project outcomes on public dashboard",
      "Celebrate breakthroughs with global community",
    ],
  },
  {
    quarter: "Q4 2026",
    icon: "SiSolana",
    title: "Build Developer Ecosystem",
    completed: false,
    items: [
      "Release APIs for CancerCoin platform integrations",
      "Offer developer grants for tool creation",
      "Host hackathons for research funding solutions",
      "Integrate third-party tools for enhanced functionality",
    ],
  },
];

export function RoadmapSection() {
  return {
    title: "CancerCoin’s Roadmap to a Cure",
    subtitle:
      "Our journey to revolutionize cancer research through decentralized science, powered by BIO tokens and Solana’s blockchain.",
    milestones: roadmapItems,
  };
}
