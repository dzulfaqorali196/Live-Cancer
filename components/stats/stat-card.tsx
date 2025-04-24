import Image from "next/image";

interface StatCardProps {
  index: string;
  number: string;
  label: string;
}

export function StatCard({ index, number, label }: StatCardProps) {
  return (
    <div 
      className="relative overflow-hidden"
      style={{ 
        width: "412.33px",
        height: "301px",
        borderRadius: "12.37px",
        border: "1.03px solid #141414",
        padding: "32.99px",
        backgroundColor: "#141414",
      }}
    >
      {/* Background Eclipse Effect */}
      <div 
        className="absolute"
        style={{
          width: "707px",
          height: "563px",
          borderRadius: "50%",
          background: "#333333",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
          opacity: 0.4
        }}
      />

      {/* Purple Glow Lines */}
      <div 
        className="absolute top-0 left-[20%] w-[1px] h-[30%]"
        style={{
          background: "linear-gradient(180deg, rgba(90, 1, 185, 0.3) 0%, rgba(90, 1, 185, 0) 100%)"
        }}
      />
      <div 
        className="absolute bottom-0 right-[30%] w-[1px] h-[40%]"
        style={{
          background: "linear-gradient(0deg, rgba(90, 1, 185, 0.3) 0%, rgba(90, 1, 185, 0) 100%)"
        }}
      />

      <div className="relative z-10 flex flex-col gap-[16.49px]">
        {/* Index Number */}
        <div 
          className="text-white font-['Neue_Montreal']"
          style={{ 
            fontSize: "64px",
            lineHeight: "100%",
            letterSpacing: "-3%",
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
          }}
        >
          {index}
        </div>

        {/* Main Number */}
        <div 
          className="text-white font-['Neue_Montreal']"
          style={{ 
            fontSize: "64px",
            lineHeight: "100%",
            letterSpacing: "-3%",
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
          }}
        >
          {number}
        </div>

        {/* Label */}
        <div 
          className="text-[#94A3B8]"
          style={{ 
            fontSize: "18px",
            lineHeight: "28px",
            letterSpacing: "-0.5%"
          }}
        >
          {label}
        </div>
      </div>

      {/* Card Border Glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(167.96deg, rgba(90, 1, 185, 0.05) 0%, rgba(90, 1, 185, 0) 100%)",
          borderRadius: "12.37px",
        }}
      />

      {/* Hover Effect */}
      <div 
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "linear-gradient(180deg, rgba(90, 1, 185, 0.05) 0%, rgba(90, 1, 185, 0) 100%)",
          borderRadius: "12.37px",
        }}
      />
    </div>
  );
} 