import React from "react";
import { Card, CardContent } from "./ui/card";

// Define data for the stat cards to enable mapping
const statCards = [
  {
    id: "01",
    value: "8BioDAOs",
    description: "Launched & Funded",
  },
  {
    id: "02",
    value: "$30.3M",
    description: "Related For Research",
  },
  {
    id: "03",
    value: "$7.2M",
    description: "Deployed For Research",
  },
];

export function StatsSection() {
  return (
    <section className="relative w-full bg-black pb-0 overflow-hidden">
      <div className="relative w-full max-w-[1920px] mx-auto px-4 md:px-8">
        {/* Background elements */}
        <div className="absolute right-0 -top-32 w-full max-w-[1133px] h-auto">
          <img
            className="w-full h-auto object-contain"
            alt="Elements"
            src="/statscard/Elements.svg"
          />
        </div>

        <div className="max-w-[1300px] mx-auto">
          {/* Main heading */}
          <div className="relative mt-[74px]">
            <div className="[font-family:'Neue_Montreal-Regular',Helvetica] font-normal text-[64px] leading-[64px]">
              <span className="text-white tracking-[0]">Curate &amp; </span>
              <span className="text-[#a857ff] tracking-[0]">Fund Cancer</span>
              <div className="text-white tracking-[0]">Research Projects</div>
            </div>
          </div>

          {/* Stats cards container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-[147px] mb-0">
            {statCards.map((card, index) => (
              <Card
                key={card.id}
                className="w-full h-[301px] rounded-[12.37px] overflow-hidden border-none bg-gradient-to-b from-[rgba(27,27,27,0.51)] to-[rgba(46,46,46,0.51)]"
              >
                <CardContent className="flex flex-col h-full items-start justify-end gap-[16.49px] p-[32.99px] relative">
                  {/* Radial gradient background */}
                  <div className="absolute w-[707px] h-[564px] top-[66px] left-[-147px] rounded-[353.57px/281.93px] [background:radial-gradient(50%_50%_at_50%_50%,rgba(0,0,0,0)_0%,rgba(27,27,27,1)_100%)]" />

                  {/* Line decorations - same for all cards */}
                  <div className="absolute w-[436px] h-[369px] top-[-34px] left-[25px] pointer-events-none">
                    <div 
                      className="absolute w-[1px] h-[51px] top-[34px] left-[363px] bg-gradient-to-b from-transparent via-white/20 to-transparent shadow-[0_0_5px_rgba(255,255,255,0.3)] after:absolute after:w-full after:h-full after:bg-white/10 after:blur-[2px]"
                    />
                    <div 
                      className="absolute w-[1px] h-[52px] top-[283px] left-[218px] bg-gradient-to-b from-transparent via-white/20 to-transparent shadow-[0_0_5px_rgba(255,255,255,0.3)] after:absolute after:w-full after:h-full after:bg-white/10 after:blur-[2px]"
                    />
                    <div 
                      className="absolute w-[1px] h-[85px] top-[34px] left-[73px] bg-gradient-to-b from-transparent via-white/20 to-transparent shadow-[0_0_5px_rgba(255,255,255,0.3)] after:absolute after:w-full after:h-full after:bg-white/10 after:blur-[2px]"
                    />
                    <div 
                      className="absolute w-[1px] h-[85px] top-[180px] left-0 bg-gradient-to-b from-transparent via-white/20 to-transparent shadow-[0_0_5px_rgba(255,255,255,0.3)] after:absolute after:w-full after:h-full after:bg-white/10 after:blur-[2px]"
                    />
                  </div>

                  <div className="flex flex-col h-[235.03px] items-start justify-between relative self-stretch w-full">
                    <div className="relative w-fit mt-[-1.03px] [font-family:'Unbounded'] font-medium text-white text-[33px] text-center tracking-[0] leading-[49.5px] whitespace-nowrap">
                      {card.id}
                    </div>

                    <div className="flex flex-col items-start gap-[10.31px] relative self-stretch w-full flex-[0_0_auto]">
                      <div className="relative self-stretch mt-[-1.03px] [font-family:'Unbounded'] font-medium text-white text-[33px] tracking-[0] leading-[46.2px]">
                        {card.value}
                      </div>

                      <div className="relative self-stretch [font-family:'Unbounded'] font-light text-[#b5b5b5cc] text-base tracking-[0] leading-[22.4px]">
                        {card.description}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 