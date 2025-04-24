import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const VideoSection = () => {
  return (
    <section className="w-full bg-black py-28">
      <div className="relative w-full">
        <div className="relative">
          {/* Decorative elements */}
          <img
            className="absolute top-[-50px] right-0 w-auto h-[393px] select-none pointer-events-none z-0"
            alt="Decorative elements"
            src="/Video Section/light-right.svg" /*Dekorasi Kanan*/
          />
          <img
            className="absolute top-[-50px] left-0 w-auto h-[393px] select-none pointer-events-none z-0"
            alt="Decorative elements"
            src="/Video Section/light-left.png" /*Dekorasi Kiri*/
          />

          {/* Main content */}
          <div className="flex flex-col items-center gap-10 pt-24">
            <h2 className="text-center text-[64px] leading-[64px] font-['Neue_Montreal'] max-w-[1350px] mx-auto px-4">
              <span className="text-white tracking-[0]">De</span>
              <span className="text-[#aaaaaa] tracking-[0]">Sci</span>
              <span className="text-white tracking-[0]"> is the </span>
              <span className="text-[#a857ff] tracking-[0]">
                Future of Science
              </span>
            </h2>

            {/* Video card container */}
            <div className="w-full px-4 md:px-8 lg:px-16">
              <Card className="w-full max-w-[1350px] mx-auto mt-6 bg-[#a6a6a61c] border-0 rounded-3xl">
                <CardContent className="flex items-center justify-center p-0 h-[586px]">
                  <button 
                    className="w-0 h-0 border-t-[30px] border-t-transparent border-l-[52px] border-l-[#a857ff] border-b-[30px] border-b-transparent hover:border-l-[#8a3dd9] transition-colors"
                    title="Play Video"
                    aria-label="Play Video"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 