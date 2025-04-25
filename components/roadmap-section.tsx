"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import SectionHeader from "@/components/section-header";
import { RoadmapItem, roadmapItems } from "@/data/roadmap";

interface MilestoneCardProps {
  item: RoadmapItem;
  index: number;
  isEven: boolean;
}

const MilestoneCard = ({ item, index, isEven }: MilestoneCardProps) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.1, once: true });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, scale: 1 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative flex flex-col md:flex-row",
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={controls}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 * index }}
    >
      {/* Mobile Timeline Dot */}
      <div className="absolute left-4 top-6 md:hidden">
        <div
          className={cn(
            "h-3 w-3 rounded-full",
            item.completed ? "bg-purple-400" : "bg-gray-600"
          )}
        />
      </div>

      <div className="md:w-1/2 md:px-8 pl-12 md:pl-0">
        <div className="p-4 md:p-6 rounded-xl bg-black/20 backdrop-blur-sm hover:bg-purple-500/10 transition-all duration-300">
          <div className="flex items-center mb-3 md:mb-4">
            {item.completed ? (
              <CheckCircle2
                className="h-4 w-4 md:h-5 md:w-5 text-purple-400 mr-2"
                aria-label="Completed"
              />
            ) : (
              <Circle
                className="h-4 w-4 md:h-5 md:w-5 text-gray-500 mr-2"
                aria-label="In Progress"
              />
            )}
            <span
              className={cn(
                "text-xs md:text-sm font-medium",
                item.completed ? "text-purple-400" : "text-gray-500"
              )}
            >
              {item.quarter}
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-white">
            {item.title}
          </h3>
          <ul className="space-y-2">
            {item.items.map((listItem, listIndex) => (
              <li key={listIndex} className="flex items-center">
                <div className="mr-2 md:mr-3 h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-purple-400"></div>
                <span className="text-gray-300 text-xs md:text-sm">{listItem}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Desktop Timeline Dot */}
      <div className="absolute left-1/2 top-6 -translate-x-1/2 hidden md:block">
        <div
          className={cn(
            "h-5 w-5 rounded-full",
            item.completed ? "bg-purple-400" : "bg-gray-600"
          )}
        />
      </div>
    </motion.div>
  );
};

export function RoadmapSection() {
  return (
    <section id="roadmap" className="py-12 md:py-32 relative overflow-hidden bg-black">
      <div className="absolute top-0 left-0 right-0 h-24 md:h-48 bg-gradient-to-t from-black via-black to-black pointer-events-none"></div>
      
      <div className="absolute bottom-0 left-0 right-0 h-[200px] md:h-[400px] bg-gradient-to-t from-black via-black to-black pointer-events-none"></div>
      
      <div className="container relative z-10">
        <div className="text-center md:text-left">
          <SectionHeader
            title1="CancerFun's"
            title2="Roadmap to a Cure"
            description="Our journey to revolutionize cancer research through decentralized science, powered by BIO tokens and Solana's blockchain."
          />
        </div>
        <div className="relative mt-8 md:mt-12">
          {/* Mobile Timeline Line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700 md:hidden" />
          
          {/* Desktop Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-700 -translate-x-1/2 hidden md:block" />
          
          <div className="space-y-8 md:space-y-16">
            {roadmapItems.map((item, index) => (
              <MilestoneCard
                key={item.title}
                item={item}
                index={index}
                isEven={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
