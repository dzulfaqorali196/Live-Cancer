"use client";

export const VideoSection = () => {
  return (
    <motion.section 
      className="w-full bg-black py-28 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Gradient overlay di bagian bawah */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0f0f0f] pointer-events-none"></div>
      
      <div className="relative w-full">
        // ... existing code ...
      </div>
    </motion.section>
  );
}; 