import { PlusIcon, GitForkIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export const ProjectSection = () => {
  // Project data for mapping
  const projects = [
    {
      id: 1,
      title: "SHINDhao",
      description: "Lorem ipsum dolor amet",
      isActive: true,
      image: "/project/Shindao.jpeg"
    },
    {
      id: 2,
      title: "Propose Your Project",
      description: "Lorem ipsum dolor amet",
      isActive: false,
    },
    {
      id: 3,
      title: "Propose Your Project",
      description: "Lorem ipsum dolor amet",
      isActive: false,
    },
  ];

  return (
    <section id="projects" className="w-full bg-black pt-[200px] pb-28 relative overflow-hidden">
      <div className="relative w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16">
        {/* Background elements */}
        <img
          className="absolute w-full max-w-[1920px] h-[785px] top-[-200px] left-1/2 transform -translate-x-1/2 select-none pointer-events-none z-0"
          alt="Elements"
          src="/project/light.svg"
          style={{ mixBlendMode: 'screen' }}
        />
        
        <div className="relative flex flex-col items-center gap-24 z-10">
          <h2 className="text-[64px] leading-[64px] text-center font-normal [font-family:'Neue_Montreal-Regular',Helvetica] max-w-[1350px] mx-auto">
            <span className="text-white tracking-[0]">Explore </span>
            <span className="text-[#a857ff] tracking-[0]">Active Projects</span>
          </h2>

          <div className="flex flex-col gap-4 w-full max-w-[1920px]">
            {/* First row of projects */}
            <div className="flex flex-col items-start w-full">
              <div className="flex items-start gap-4 w-full justify-center">
                {projects.map((project) => (
                  <Card
                    key={project.id}
                    className="flex flex-col h-[351.8px] w-full max-w-[600px] border-0 rounded-none bg-transparent"
                  >
                    <div
                      className={`relative flex flex-col items-center justify-center h-[241.75px] w-full rounded-[17.38px_17.38px_0px_0px] border-t-[2.17px] border-r-[2.17px] border-l-[2.17px] overflow-hidden ${
                        project.isActive
                          ? "bg-[#4d139d26] border-[#b37feb]"
                          : "bg-[#f5f5f508] border-[#212121]"
                      }`}
                    >
                      {project.isActive && project.image ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-t-[17.38px]"
                          />
                          <div className="absolute inset-0 bg-[#4d139d] opacity-20"></div>
                        </div>
                      ) : (
                        <PlusIcon className="w-[61px] h-[61px] text-white" />
                      )}
                    </div>

                    <CardContent
                      className={`flex flex-col items-start gap-[9.41px] p-6 rounded-[0px_0px_17.38px_17.38px] border-r-[1.57px] border-b-[1.57px] border-l-[1.57px] ${
                        project.isActive
                          ? "border-[#b37feb]"
                          : "bg-[#ffffff0f] border-[#212121]"
                      }`}
                    >
                      <div className="flex items-center justify-around gap-[9.41px] w-full">
                        <div className="flex flex-col items-start gap-[9.41px] flex-1">
                          <h3 className="mt-[-1.57px] font-['Neue_Montreal'] font-bold text-white text-[26.1px] tracking-[0] leading-normal">
                            {project.title}
                          </h3>
                          <p className="font-['Neue_Montreal'] font-normal text-[#b7afaf] text-base tracking-[0] leading-normal whitespace-nowrap">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Second row of projects */}
            <div className="flex flex-col items-start w-full">
              <div className="flex items-start gap-4 w-full justify-center">
                {projects.map((project) => (
                  <Card
                    key={`row2-${project.id}`}
                    className="flex flex-col h-[351.8px] w-full max-w-[600px] border-0 rounded-none bg-transparent"
                  >
                    <div className="flex flex-col items-center justify-center h-[241.75px] w-full rounded-[17.38px_17.38px_0px_0px] border-t-[2.17px] border-r-[2.17px] border-l-[2.17px] bg-[#f5f5f508] border-[#212121]">
                      <PlusIcon className="w-[61px] h-[61px] text-white" />
                    </div>

                    <CardContent className="flex flex-col items-start gap-[9.41px] p-6 rounded-[0px_0px_17.38px_17.38px] border-r-[1.57px] border-b-[1.57px] border-l-[1.57px] bg-[#ffffff0f] border-[#212121]">
                      <div className="flex items-center justify-around gap-[9.41px] w-full">
                        <div className="flex flex-col items-start gap-[9.41px] flex-1">
                          <h3 className="mt-[-1.57px] font-['Neue_Montreal'] font-bold text-white text-[26.1px] tracking-[0] leading-normal">
                            Propose Your Project
                          </h3>
                          <p className="font-['Neue_Montreal'] font-normal text-[#b7afaf] text-base tracking-[0] leading-normal whitespace-nowrap">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
