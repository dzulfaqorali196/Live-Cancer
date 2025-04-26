"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle2, Circle } from "lucide-react"
import { motion, useAnimation, useInView } from "framer-motion"

interface RoadmapItem {
  quarter: string
  items: string[]
  completed: boolean
}

export default function RoadmapSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const element = scrollRef.current
        const rect = element.getBoundingClientRect()
        const windowHeight = window.innerHeight
        
        // Hitung posisi relatif elemen terhadap viewport
        const elementTop = rect.top
        const elementBottom = rect.bottom
        
        // Hitung progress berdasarkan posisi scroll
        let progress
        
        if (elementTop >= windowHeight) {
          // Elemen belum terlihat
          progress = 0
        } else if (elementBottom <= 0) {
          // Elemen sudah terlewati
          progress = 1
        } else {
          // Elemen sedang terlihat
          const totalScrollDistance = rect.height + windowHeight
          const scrolled = windowHeight - elementTop
          progress = Math.max(0, Math.min(1, scrolled / totalScrollDistance))
        }
        
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const roadmapItems: RoadmapItem[] = [
    {
      quarter: "Q2–Q3 2025",
      items: [
        "DAO formation & core contributor onboarding",
        "First protease design for mutant p53",
        "Community governance design & testnet vote"
      ],
      completed: true
    },
    {
      quarter: "Q4 2025",
      items: [
        "Wet lab results published",
        "Licensing options launched",
        "Tokenomics finalized"
      ],
      completed: false
    },
    {
      quarter: "Q1 2026",
      items: [
        "DAO-wide vote on next target (e.g., Parkinson's)",
        "Token launch with contributor rewards",
        "Partnership with CROs for preclinical studies"
      ],
      completed: false
    }
  ]

  return (
    <section className="bg-black text-white w-full py-16">
      <div className="px-4 md:px-12 max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-white">Shin</span>
          <span className="text-purple-500">DAO</span>
          <span className="text-white"> Roadmap</span>
        </motion.h2>

        <div ref={scrollRef} className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-400/30 transform -translate-x-1/2 hidden md:block">
            <motion.div 
              className="absolute w-full bg-blue-400"
              style={{ 
                height: `${scrollProgress * 100}%`,
                top: 0,
                transition: 'height 0.3s ease-out'
              }}
            />
          </div>

          {/* Mobile line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-400/30 md:hidden">
            <motion.div 
              className="absolute w-full bg-blue-400"
              style={{ 
                height: `${scrollProgress * 100}%`,
                top: 0,
                transition: 'height 0.3s ease-out'
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {roadmapItems.map((item, index) => (
              <RoadmapCard 
                key={index}
                item={item} 
                index={index} 
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface RoadmapCardProps {
  item: RoadmapItem
  index: number
  isLeft: boolean
}

function RoadmapCard({ item, index, isLeft }: RoadmapCardProps) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3, once: true })

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, x: 0 })
    }
  }, [controls, inView])

  return (
    <>
      {/* Left side card */}
      {isLeft ? (
        <motion.div 
          ref={ref}
          className="md:pr-12 flex justify-end relative"
          initial={{ opacity: 0, x: -50 }}
          animate={controls}
          transition={{ duration: 0.6, delay: index * 0.2 }}
        >
          <motion.div 
            className="bg-green-300 hover:bg-green-400 rounded-3xl p-6 w-full md:max-w-md transition-all duration-300 relative z-10"
            whileHover={{ 
              scale: 1.03, 
              boxShadow: "0 10px 25px -5px rgba(0, 255, 0, 0.1), 0 10px 10px -5px rgba(0, 255, 0, 0.04)" 
            }}
          >
            <h3 className="text-2xl font-bold text-center mb-4 text-black">{item.quarter}</h3>
            <ul className="list-disc pl-6 space-y-2 text-black">
              {item.items.map((listItem, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.2 + i * 0.1 }}
                >
                  {listItem}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      ) : (
        <div className="hidden md:block"></div>
      )}

      {/* Right side card */}
      {!isLeft ? (
        <motion.div 
          ref={ref}
          className="md:pl-12 relative"
          initial={{ opacity: 0, x: 50 }}
          animate={controls}
          transition={{ duration: 0.6, delay: index * 0.2 }}
        >
          <motion.div 
            className="bg-green-300 hover:bg-green-400 rounded-3xl p-6 w-full md:max-w-md transition-all duration-300 relative z-10"
            whileHover={{ 
              scale: 1.03, 
              boxShadow: "0 10px 25px -5px rgba(0, 255, 0, 0.1), 0 10px 10px -5px rgba(0, 255, 0, 0.04)" 
            }}
          >
            <h3 className="text-2xl font-bold text-center mb-4 text-black">{item.quarter}</h3>
            <ul className="list-disc pl-6 space-y-2 text-black">
              {item.items.map((listItem, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.2 + i * 0.1 }}
                >
                  {listItem}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      ) : (
        <div className="hidden md:block"></div>
      )}
    </>
  )
} 