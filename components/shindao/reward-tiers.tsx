"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useRef, useState } from "react"
import { useInView } from "framer-motion"

export default function RewardTiers() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // Variants untuk animasi
  const containerVariants = {
    hidden: { 
      opacity: 0
    },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  const tierVariants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      backgroundColor: "rgba(31, 41, 55, 0)"
    },
    visible: { 
      y: 0, 
      opacity: 1,
      backgroundColor: "rgba(31, 41, 55, 0)",
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }
  }

  const noteVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        delay: 0.8,
        duration: 0.5
      }
    }
  }

  // Fungsi untuk handling mouse
  const handleMouseEnter = (index: number) => {
    setActiveIndex(index)
  }

  const handleMouseLeave = () => {
    setActiveIndex(null)
  }

  // Gradients untuk card
  const cardGradients = [
    {
      active: "linear-gradient(135deg, rgba(31, 41, 55, 0.7), rgba(17, 24, 39, 0.9))",
      default: "linear-gradient(135deg, rgba(31, 41, 55, 0.6), rgba(17, 24, 39, 0.8))",
      glow: "rgba(59, 130, 246, 0.3)",
      radial: "radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.3), transparent 70%)"
    },
    {
      active: "linear-gradient(135deg, rgba(31, 41, 55, 0.7), rgba(17, 24, 39, 0.9))",
      default: "linear-gradient(135deg, rgba(31, 41, 55, 0.6), rgba(17, 24, 39, 0.8))",
      glow: "rgba(245, 158, 11, 0.3)",
      radial: "radial-gradient(circle at 50% 0%, rgba(245, 158, 11, 0.3), transparent 70%)"
    },
    {
      active: "linear-gradient(135deg, rgba(31, 41, 55, 0.7), rgba(17, 24, 39, 0.9))",
      default: "linear-gradient(135deg, rgba(31, 41, 55, 0.6), rgba(17, 24, 39, 0.8))",
      glow: "rgba(220, 38, 38, 0.3)",
      radial: "radial-gradient(circle at 50% 0%, rgba(220, 38, 38, 0.3), transparent 70%)"
    }
  ]

  return (
    <>
      <section 
        ref={sectionRef}
        className="bg-black text-white w-full py-12"
      >
        <div className="px-4 md:px-12 max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="bg-blue-600 rounded-3xl p-8 relative"
            style={{
              background: "linear-gradient(135deg, rgba(37, 99, 235, 0.9), rgba(30, 58, 138, 0.95))",
              boxShadow: "0 8px 32px 0 rgba(0,0,0,0.36)"
            }}
          >
            {/* Reward header */}
            <motion.div 
              className="bg-green-300 text-black text-center py-3 rounded-full text-xl font-medium mb-12 relative overflow-hidden"
              variants={containerVariants}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 0 15px rgba(0, 255, 0, 0.5)",
              }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: "linear-gradient(90deg, rgba(134, 239, 172, 0.9), rgba(74, 222, 128, 0.95))",
                backdropFilter: "blur(10px)"
              }}
            >
              <motion.span 
                className="relative z-10"
                whileHover={{ textShadow: "0 0 8px rgba(0,0,0,0.3)" }}
              >
                Creation Reward
              </motion.span>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 relative">
              {/* Tier 1 */}
              <motion.div 
                className="p-6 rounded-lg flex flex-col items-center cursor-pointer relative overflow-hidden group"
                variants={tierVariants}
                onMouseEnter={() => handleMouseEnter(0)}
                onMouseLeave={handleMouseLeave}
                animate={activeIndex === 0 ? { scale: 1.05 } : { scale: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                  background: activeIndex === 0 
                    ? cardGradients[0].active
                    : cardGradients[0].default,
                  backdropFilter: "blur(10px)",
                  boxShadow: activeIndex === 0 
                    ? `0 8px 32px 0 rgba(0, 0, 0, 0.3), 0 0 5px 2px ${cardGradients[0].glow}` 
                    : "0 4px 16px 0 rgba(0, 0, 0, 0.4)",
                  transition: "all 0.3s ease"
                }}
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-full"
                  style={{
                    background: cardGradients[0].radial,
                    opacity: activeIndex === 0 ? 1 : 0,
                    transition: "opacity 0.5s ease"
                  }}
                />
                <motion.div 
                  className="w-48 h-48 rounded-2xl relative mb-6 z-10"
                  whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.4 } }}
                  animate={activeIndex === 0 ? {
                    y: [0, -10, 0],
                    transition: {
                      y: {
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut"
                      }
                    }
                  } : {}}
                >
                  <Image 
                    src="/Shindao/TierSection/tier 1.png" 
                    alt="Tier 1 Badge"
                    fill
                    sizes="(max-width: 768px) 100vw, 192px"
                    className="object-cover"
                    priority
                  />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-4 relative z-10">
                  Tier 1 : Initiator
                </h3>
                <motion.div 
                  className="text-center text-gray-200 relative z-10"
                  animate={activeIndex === 0 ? { scale: 1.05 } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <p>Less than 200K</p>
                  <p>$CANCER Contribution</p>
                  <p>(no multiplier)</p>
                </motion.div>
              </motion.div>

              {/* Tier 2 */}
              <motion.div 
                className="p-6 rounded-lg flex flex-col items-center cursor-pointer relative overflow-hidden group"
                variants={tierVariants}
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={handleMouseLeave}
                animate={activeIndex === 1 ? { scale: 1.05 } : { scale: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                  background: activeIndex === 1 
                    ? cardGradients[1].active
                    : cardGradients[1].default,
                  backdropFilter: "blur(10px)",
                  boxShadow: activeIndex === 1 
                    ? `0 8px 32px 0 rgba(0, 0, 0, 0.3), 0 0 5px 2px ${cardGradients[1].glow}` 
                    : "0 4px 16px 0 rgba(0, 0, 0, 0.4)",
                  transition: "all 0.3s ease"
                }}
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-full"
                  style={{
                    background: cardGradients[1].radial,
                    opacity: activeIndex === 1 ? 1 : 0,
                    transition: "opacity 0.5s ease"
                  }}
                />
                <motion.div 
                  className="w-48 h-48 rounded-2xl relative mb-6 z-10"
                  whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.4 } }}
                  animate={activeIndex === 1 ? {
                    y: [0, -10, 0],
                    transition: {
                      y: {
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut"
                      }
                    }
                  } : {}}
                >
                  <Image 
                    src="/Shindao/TierSection/tier 2.png" 
                    alt="Tier 2 Badge"
                    fill
                    sizes="(max-width: 768px) 100vw, 192px"
                    className="object-cover"
                    priority
                  />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-4 relative z-10">
                  Tier 2 : Catalyst
                </h3>
                <motion.div 
                  className="text-center text-gray-200 relative z-10"
                  animate={activeIndex === 1 ? { scale: 1.05 } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <p>Between 200K - 1M</p>
                  <p>$CANCER Contribution</p>
                  <p>(1.5x multiplier)</p>
                </motion.div>
              </motion.div>

              {/* Tier 3 */}
              <motion.div 
                className="p-6 rounded-lg flex flex-col items-center cursor-pointer relative overflow-hidden group"
                variants={tierVariants}
                onMouseEnter={() => handleMouseEnter(2)}
                onMouseLeave={handleMouseLeave}
                animate={activeIndex === 2 ? { scale: 1.05 } : { scale: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                  background: activeIndex === 2 
                    ? cardGradients[2].active
                    : cardGradients[2].default,
                  backdropFilter: "blur(10px)",
                  boxShadow: activeIndex === 2 
                    ? `0 8px 32px 0 rgba(0, 0, 0, 0.3), 0 0 5px 2px ${cardGradients[2].glow}` 
                    : "0 4px 16px 0 rgba(0, 0, 0, 0.4)",
                  transition: "all 0.3s ease"
                }}
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-full"
                  style={{
                    background: cardGradients[2].radial,
                    opacity: activeIndex === 2 ? 1 : 0,
                    transition: "opacity 0.5s ease"
                  }}
                />
                <motion.div 
                  className="w-48 h-48 rounded-2xl relative mb-6 z-10"
                  whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.4 } }}
                  animate={activeIndex === 2 ? {
                    y: [0, -10, 0],
                    transition: {
                      y: {
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut"
                      }
                    }
                  } : {}}
                >
                  <Image 
                    src="/Shindao/TierSection/tier 3.png" 
                    alt="Tier 3 Badge"
                    fill
                    sizes="(max-width: 768px) 100vw, 192px"
                    className="object-cover"
                    priority
                  />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-4 relative z-10">
                  Tier 3 : Apex
                </h3>
                <motion.div 
                  className="text-center text-gray-200 relative z-10"
                  animate={activeIndex === 2 ? { scale: 1.05 } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <p>More than 1M $CANCER</p>
                  <p>Contribution</p>
                  <p>(2x multiplier)</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Note text as full-width banner */}
      <motion.div 
        className="bg-blue-600 py-4 w-full text-white"
        variants={noteVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{
          background: "linear-gradient(90deg, rgba(37, 99, 235, 0.9), rgba(30, 58, 138, 0.95))",
          backdropFilter: "blur(5px)"
        }}
      >
        <motion.p 
          className="text-center italic text-lg"
          whileHover={{ scale: 1.02 }}
        >
          *To Understand more about creation process and reward multiplier visit our{" "}
          <motion.span
            className="relative inline-block"
          >
            <Link href="/docs" className="underline font-medium relative z-10">
              Docs
            </Link>
            <motion.div
              className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"
              initial={{ width: "0%" }}
              whileHover={{ 
                width: "100%", 
                height: "100%", 
                bottom: "-2px", 
                left: "-2px",
                opacity: 0.3
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.span>
        </motion.p>
      </motion.div>
    </>
  )
} 