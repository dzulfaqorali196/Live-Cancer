export interface FAQItem {
  question: string;
  answer: string;
  icon: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "What is CancerFun?",
    answer: "CancerFun is a decentralized funding and development layer for cancer research. It connects scientists, patients, and crypto communities to collaboratively fund and build early-stage cancer biotech projects.",
    icon: "SiGoogleearth",
  },
  {
    question: "What makes CancerFun different from traditional cancer research funding?",
    answer: "CancerFun removes institutional gatekeeping and introduces permissionless participation. It supports researchers from the idea stage and uses a crypto-native, community-owned model to accelerate development and widen access.",
    icon: "SiBitcoin",
  },
  {
    question: "How can researchers apply for support?",
    answer: "Researchers can apply through the CancerFun Creation Program form.",
    icon: "SiRocket",
  },
  {
    question: "What types of projects are eligible?",
    answer: "Projects across all stages from ideation to IND-enabling or clinical trials are welcome. CancerFun prioritizes bold, high-impact, and underfunded cancer research.",
    icon: "SiHiveBlockchain",
  },
  {
    question: "What is the $CANCER token?",
    answer: "$CANCER is the native governance token of CancerFun. It gives holders power to vote on funding decisions, support DAOs, access exclusive opportunities, and earn rewards for contributions. visit our Docs to find out more about $CANCER",
    icon: "SiSolana",
  },
  {
    question: "How does CancerFun launch new research DAOs?",
    answer: "Through its Launchpad, a secure, audited fundraising and distribution system tailored for cancer biotech projects. for more information visit our docs.",
    icon: "SiInternetcomputer",
  },
  {
    question: "What risks should I be aware of?",
    answer: "Blockchain systems are volatile. Users face risks including irreversible transactions, wallet security issues, gas fee fluctuation, smart contract bugs, and regulatory changes. You participate at your own risk.",
    icon: "SiStarship",
  },
];
