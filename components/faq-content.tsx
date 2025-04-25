"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

// FAQ data organized by categories
const faqData = {
  general: [
    {
      question: "What is CancerFun?",
      answer: "CancerFun is a decentralized funding and development layer for cancer research. It connects scientists, patients, and crypto communities to collaboratively fund and build early-stage cancer biotech projects."
    },
    {
      question: "What makes CancerFun different from traditional cancer research funding?",
      answer: "CancerFun removes institutional gatekeeping and introduces permissionless participation. It supports researchers from the idea stage and uses a crypto-native, community-owned model to accelerate development and widen access."
    },
    {
      question: "What risks should I be aware of?",
      answer: "Blockchain systems are volatile. Users face risks including irreversible transactions, wallet security issues, gas fee fluctuation, smart contract bugs, and regulatory changes. You participate at your own risk."
    }
  ],
  research: [
    {
      question: "How can researchers apply for support?",
      answer: "Researchers can apply through the CancerFun Creation Program form."
    },
    {
      question: "What types of projects are eligible?",
      answer: "Projects across all stages from ideation to IND-enabling or clinical trials are welcome. CancerFun prioritizes bold, high-impact, and underfunded cancer research."
    },
    {
      question: "Do I need to be affiliated with a university or institution?",
      answer: "No. Independent researchers and decentralized teams are encouraged to apply. Institutional backing is optional but can strengthen the proposal."
    },
    {
      question: "What can the funding be used for?",
      answer: "Funding may be used for lab supplies, experiments, salaries, data collection, or tech development. CancerFun also supports milestone- or token-based structures if preferred."
    }
  ],
  token: [
    {
      question: "What is the $CANCER token?",
      answer: "$CANCER is the native governance token of CancerFun. It gives holders power to vote on funding decisions, support DAOs, access exclusive opportunities, and earn rewards for contributions. Visit our Docs to find out more about $CANCER."
    },
    {
      question: "On which blockchain is $CANCER deployed?",
      answer: "Solana. Contract address: xxxxxxxJ."
    },
    {
      question: "Is the token supply fixed?",
      answer: "Yes. The total supply is capped at 1 billion tokens. Any changes must be approved by governance proposals."
    },
    {
      question: "How does CancerFun launch new research DAOs?",
      answer: "Through its Launchpad, a secure, audited fundraising and distribution system tailored for cancer biotech projects. For more information visit our docs."
    }
  ],
  committee: [
    {
      question: "Can I apply to become a Committee Member?",
      answer: "Yes. Anyone with experience in cancer research, biotech, DAO tooling, or healthcare innovation can apply. Crypto experience is not required. Apply Here."
    },
    {
      question: "Is committee work paid?",
      answer: "Currently voluntary. Future compensation via token incentives or governance rewards may be introduced."
    },
    {
      question: "Who can participate in the token sale or platform use?",
      answer: "Anyone not residing in a restricted jurisdiction. Use of VPNs to bypass these rules is prohibited."
    }
  ]
};

const searchVariants = {
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

const tabsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.2,
      ease: "easeOut"
    }
  }
};

const accordionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export function FaqContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter FAQs based on search query
  const filterFaqs = (faqs: { question: string; answer: string }[]) => {
    if (!searchQuery) return faqs;
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Get all FAQs for the "All" tab
  const allFaqs = Object.values(faqData).flat();

  // Get FAQs for the current tab and filter by search
  const getFaqsForTab = () => {
    if (activeTab === "all") return filterFaqs(allFaqs);
    return filterFaqs(faqData[activeTab as keyof typeof faqData] || []);
  };

  const displayFaqs = getFaqsForTab();

  return (
    <motion.div 
      className="max-w-4xl mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.div 
        className="mb-8 relative"
        variants={searchVariants}
      >
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <Input
          type="search"
          placeholder="Search for answers..."
          className="pl-10 bg-web3-dark border-web3-gray"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </motion.div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <motion.div variants={tabsVariants}>
        <TabsList className="w-full mb-8 bg-web3-dark border border-web3-gray rounded-lg p-1 overflow-x-auto flex flex-nowrap">
          <TabsTrigger value="all" className="flex-1">
            All
          </TabsTrigger>
          <TabsTrigger value="general" className="flex-1">
            General
          </TabsTrigger>
          <TabsTrigger value="research" className="flex-1">
            Research
          </TabsTrigger>
          <TabsTrigger value="token" className="flex-1">
            Token
          </TabsTrigger>
          <TabsTrigger value="committee" className="flex-1">
            Committee
          </TabsTrigger>
        </TabsList>
        </motion.div>
        <motion.div 
          className="space-y-6"
          variants={accordionVariants}
        >
          {displayFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {displayFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={accordionVariants}
                  custom={index}
                >
                  <AccordionItem
                  value={`item-${index}`}
                  className="border-web3-gray"
                >
                  <AccordionTrigger className="text-left hover:text-web3-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          ) : (
            <motion.div 
              className="text-center py-12"
              variants={accordionVariants}
            >
              <p className="text-muted-foreground mb-4">
                No results found for {searchQuery}
              </p>
              <p className="text-sm">
                Try a different search term or{" "}
                <a
                  href="/contact"
                  className="text-web3-primary hover:underline"
                >
                  contact us
                </a>{" "}
                for assistance.
              </p>
            </motion.div>
          )}
        </motion.div>
      </Tabs>
    </motion.div>
  );
}
