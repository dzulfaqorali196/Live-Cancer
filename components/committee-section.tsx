"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function CommitteeSection() {
  // Committee member data
  const committeeMembers = [
    {
      id: 2,
      name: "Hsun Hung",
      position: "Founder",
      image: "/OurComitte/Founder.jpg",
      quote: '"From market awareness with real-time sentiment analysis and technical indicators to automated portfolio"',
      style: { width: 331, height: 379 }
    }
  ];

  return (
    <section className="w-full bg-black py-28">
      <div className="relative w-full">
        <div className="relative">
          {/* Decorative elements */}
          <img
            className="absolute top-[-50px] right-0 w-auto h-[393px] select-none pointer-events-none z-0"
            alt="Decorative elements"
            src="/OurComitte/light-right.svg"
          />
          <img
            className="absolute top-[-50px] left-0 w-auto h-[393px] select-none pointer-events-none z-0"
            alt="Decorative elements"
            src="/OurComitte/light-left.png"
          />

          {/* Main content */}
          <div className="flex flex-col items-center gap-10 pt-24">
            <h2 className="text-center text-[64px] leading-[64px] font-['Neue_Montreal']">
              <span className="text-white">Our </span>
              <span className="text-[#a857ff]">Founder</span>
            </h2>

            <div className="relative flex justify-center items-center min-h-[500px] w-full max-w-[1400px] mx-auto">
              {committeeMembers.map((member) => (
                <div 
                  key={member.id} 
                  className="relative"
                >
                  {/* Frame wrapper with smooth border radius */}
                  <div 
                    className="relative overflow-hidden hover:scale-105 transition-transform duration-300"
                    style={{ 
                      width: `${member.style.width}px`,
                      height: `${member.style.height}px`,
                      borderRadius: '32px',
                      overflow: 'hidden',
                    }}
                  >
                    <div 
                      style={{
                        height: '100%',
                        width: '100%',
                        position: 'relative',
                        borderRadius: '32px',
                        overflow: 'hidden'
                      }}
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        style={{
                          borderRadius: '32px'
                        }}
                      />
                      {/* Purple overlay */}
                      <div className="absolute inset-0 bg-[#7C3AED] mix-blend-color opacity-20"></div>
                      {/* Quote overlay */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#7C3AED]/80 to-transparent p-6 flex items-end">
                        <p className="text-white text-base leading-5 font-['Neue_Montreal'] text-center">
                          {member.quote}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Text content */}
                  <div className="mt-4 text-center">
                    <h3 className="text-white text-xl leading-[30px] font-['Neue_Montreal']">
                      {member.name}
                    </h3>
                    <p className="text-[#afafaf] text-base leading-6 font-['Neue_Montreal']">
                      {member.position}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex justify-center mt-12">
              <Button className="h-[67px] w-[372px] rounded-[50px] border-[1.4px] border-solid border-[#b49fee] [background:linear-gradient(319deg,rgba(217,213,222,1)_0%,rgba(210,174,245,0)_51%,rgba(239,219,255,1)_100%),linear-gradient(0deg,rgba(168,88,255,1)_0%,rgba(168,88,255,1)_100%)] font-['Neue_Montreal'] font-bold text-white text-xl">
                Apply to be Cancer Comitte
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
