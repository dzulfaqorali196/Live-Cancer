"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"

export default function HeroSection() {
  // Countdown timer functionality
  const [timeLeft, setTimeLeft] = useState({
    days: 70,
    hours: 0,
    minutes: 37,
    seconds: 0,
  })

  useEffect(() => {
    // Update the countdown every second
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        // Calculate new time
        let newSeconds = prevTime.seconds - 1
        let newMinutes = prevTime.minutes
        let newHours = prevTime.hours
        let newDays = prevTime.days

        // Handle time rollover
        if (newSeconds < 0) {
          newSeconds = 59
          newMinutes -= 1
        }

        if (newMinutes < 0) {
          newMinutes = 59
          newHours -= 1
        }

        if (newHours < 0) {
          newHours = 23
          newDays -= 1
        }

        // Stop at zero
        if (newDays === 0 && newHours === 0 && newMinutes === 0 && newSeconds === 0) {
          clearInterval(timer)
        }

        return {
          days: newDays,
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds,
        }
      })
    }, 1000)

    // Clean up the interval on component unmount
    return () => clearInterval(timer)
  }, [])

  // Format the time display
  const formatTime = (days: number, minutes: number) => {
    return `in ${days.toString().padStart(2, "0")}d ${minutes.toString().padStart(2, "0")}m`
  }

  // State untuk animasi progress bar
  const [progressAnimation, setProgressAnimation] = useState(false)
  const [progressPercentage, setProgressPercentage] = useState(0)
  const [committedValue, setCommittedValue] = useState(0)
  const [limitValue, setLimitValue] = useState(0)
  
  // Refs untuk section yang akan dianimasikan saat tampil di viewport
  const videoRef = useRef(null)
  const isVideoInView = useInView(videoRef, { once: true, amount: 0.3 })

  const contentRef = useRef(null)
  const isContentInView = useInView(contentRef, { once: true, amount: 0.3 })

  const progressRef = useRef(null)
  const isProgressInView = useInView(progressRef, { once: true, amount: 0.3 })

  // Button hover states
  const [contributeHover, setContributeHover] = useState(false)
  const [whyHover, setWhyHover] = useState(false)
  
  useEffect(() => {
    // Aktifkan animasi jika progress section terlihat
    if (isProgressInView) {
      const timer = setTimeout(() => {
        setProgressAnimation(true)
      }, 500)
      
      return () => clearTimeout(timer)
    }
  }, [isProgressInView])
  
  useEffect(() => {
    // Animasi persentase dan nilai committed/limit
    if (progressAnimation) {
      // Animasi persentase dari 0 ke 50
      let startPercentage = 0
      const targetPercentage = 50
      const duration = 1500 // 1.5s
      const steps = 50 // Jumlah langkah (1% per langkah)
      const stepTime = duration / steps
      
      // Animasi nilai committed dari 0M ke 50M
      let startCommitted = 0
      const targetCommitted = 50
      const committedIncrement = targetCommitted / steps
      
      // Animasi nilai limit dari 0M ke 100M
      let startLimit = 0
      const targetLimit = 100
      const limitIncrement = targetLimit / steps
      
      const interval = setInterval(() => {
        if (startPercentage < targetPercentage) {
          // Update persentase
          startPercentage += 1
          setProgressPercentage(startPercentage)
          
          // Update committed value
          startCommitted += committedIncrement
          setCommittedValue(Math.min(Math.round(startCommitted * 10) / 10, targetCommitted))
          
          // Update limit value
          startLimit += limitIncrement
          setLimitValue(Math.min(Math.round(startLimit * 10) / 10, targetLimit))
        } else {
          clearInterval(interval)
          // Pastikan nilai akhir tepat
          setProgressPercentage(targetPercentage)
          setCommittedValue(targetCommitted)
          setLimitValue(targetLimit)
        }
      }, stepTime)
      
      return () => clearInterval(interval)
    }
  }, [progressAnimation])

  // Variants untuk animasi
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      } 
    }
  }

  const staggerChildrenVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const logoHoverVariants = {
    hover: { 
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3 }
    }
  }

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      transition: { 
        duration: 0.3,
        type: "spring", 
        stiffness: 400
      }
    },
    tap: { 
      scale: 0.95
    }
  }

  return (
    <section className="bg-black text-white w-full py-8 md:py-12 pt-16 md:pt-24 overflow-hidden">
      <div className="px-4 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Left side - Video placeholder */}
          <motion.div 
            ref={videoRef}
            initial="hidden"
            animate={isVideoInView ? "visible" : "hidden"}
            variants={fadeInUpVariants}
            className="bg-blue-600 rounded-3xl aspect-[4/3] flex items-center justify-center text-white text-lg md:text-xl font-medium overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { 
                  delay: 0.5,
                  duration: 0.8
                }
              }}
              className="text-center px-4"
            >
              VIDEO OF <span className="text-purple-400 font-bold">shin</span><span className="text-yellow-300 font-bold">DAO</span>
            </motion.div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div 
            ref={contentRef}
            initial="hidden"
            animate={isContentInView ? "visible" : "hidden"}
            variants={staggerChildrenVariants}
            className="flex flex-col space-y-4 md:space-y-6 mt-4 md:mt-0"
          >
            <motion.div 
              variants={fadeInUpVariants}
              className="flex flex-col sm:flex-row items-center sm:justify-between gap-4"
            >
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl font-bold"
                whileHover={{ 
                  scale: 1.05, 
                  transition: { duration: 0.2 } 
                }}
              >
                <span className="text-purple-400">Shin</span><span className="text-yellow-300">DAO</span>
              </motion.h1>

              <motion.div 
                variants={fadeInUpVariants}
                className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4"
              >
                {/* Logo with project image */}
                <motion.div 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden relative"
                  whileHover={logoHoverVariants.hover}
                >
                  <Image
                    src="/project/Shindao.jpeg"
                    alt="ShinDAO Logo"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="absolute inset-0 bg-[#4d139d] opacity-20"></div>
                </motion.div>
                <div className="flex space-x-2">
                  <motion.a
                    href="https://pubmed.ncbi.nlm.nih.gov/38473938/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-[#4d139d] rounded-full flex items-center justify-center text-white text-xs hover:bg-[#634db8] transition-colors cursor-pointer"
                    title="Research Paper"
                    whileHover={{ scale: 1.1, backgroundColor: "#634db8" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Paper
                  </motion.a>
                  <motion.div 
                    className="w-8 h-8 rounded-full overflow-hidden relative"
                    whileHover={logoHoverVariants.hover}
                  >
                    <Image
                      src="/project/Shindao.jpeg"
                      alt="ShinDAO Logo"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="absolute inset-0 bg-[#4d139d] opacity-20"></div>
                  </motion.div>
                </div>

                {/* Presale countdown - Now dynamic */}
                <motion.div 
                  className="bg-green-300 rounded-full px-3 sm:px-4 min-w-[120px] sm:min-w-32 flex items-center justify-center text-black text-xs sm:text-sm font-medium h-7 sm:h-8"
                  whileHover={{ scale: 1.05, backgroundColor: "#86efac" }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  Presale Ends {formatTime(timeLeft.days, timeLeft.minutes)}
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Description text */}
            <motion.div 
              variants={fadeInUpVariants}
              className="text-sm sm:text-base"
            >
              <motion.p 
                className="mb-3 md:mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                IFI6 is a gene found to be overactive in esophageal cancer and it helps tumors hide from the immune
                system. At <span className="text-purple-400 font-medium">ShinDAO</span>, we're pioneering decentralized cancer research by targeting IFI6 to unlock new
                therapies. Your contributions help fund lab experiments, immune profiling, and drug discovery all governed
                by the DAO.
              </motion.p>
              <motion.p 
                className="font-bold text-sm sm:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                Join us in rewriting the future of cancer research powered by community, not corporations
              </motion.p>
            </motion.div>

            {/* Action buttons */}
            <motion.div 
              variants={fadeInUpVariants}
              className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 md:space-x-6 pt-2"
            >
              <motion.div
                onHoverStart={() => setContributeHover(true)}
                onHoverEnd={() => setContributeHover(false)}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="w-full sm:w-auto"
              >
                <Button className="bg-yellow-300 hover:bg-yellow-400 text-black rounded-full px-6 md:px-12 py-6 md:py-8 text-lg md:text-xl font-bold shadow-lg w-full sm:w-auto">
                  <motion.span
                    animate={contributeHover ? { y: [0, -5, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    Contribute
                  </motion.span>
                </Button>
              </motion.div>
              
              <motion.div
                onHoverStart={() => setWhyHover(true)}
                onHoverEnd={() => setWhyHover(false)}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="w-full sm:w-auto"
              >
                <Button className="bg-yellow-300 hover:bg-yellow-400 text-black rounded-full px-6 md:px-12 py-6 md:py-8 text-lg md:text-xl font-bold shadow-lg w-full sm:w-auto">
                  <motion.span
                    animate={whyHover ? { y: [0, -5, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    Why This Matters
                  </motion.span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Progress Section */}
        <motion.div 
          ref={progressRef}
          initial="hidden"
          animate={isProgressInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          className="mt-8 md:mt-12"
        >
          <motion.div 
            className="bg-blue-600 rounded-3xl p-6 md:p-8"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            {/* Progress header */}
            <motion.div 
              className="bg-green-300 text-black text-center py-2 md:py-3 rounded-full text-lg md:text-xl font-medium mb-8 md:mb-12"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ backgroundColor: "#86efac" }}
            >
              Creation Progress
            </motion.div>

            <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-5 md:gap-0">
              {/* Left side - Creation Committed */}
              <motion.div 
                className="text-center md:text-left mb-2 md:mb-0 w-full md:w-auto"
                variants={fadeInUpVariants}
              >
                <motion.h3 
                  className="text-xl md:text-2xl font-bold text-black"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Creation Commited
                </motion.h3>
                <motion.p 
                  className="text-2xl md:text-3xl font-bold text-black"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {committedValue}M $Cancer
                </motion.p>
              </motion.div>

              {/* Progress bar */}
              <motion.div 
                className="w-full md:w-1/2 mx-0 md:mx-4"
                variants={fadeInUpVariants}
              >
                <motion.div 
                  className="h-6 md:h-8 bg-white rounded-full overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <motion.div 
                    className="h-full bg-black rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ 
                      width: progressAnimation ? "50%" : "0%"
                    }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
                  ></motion.div>
                </motion.div>
                <motion.div 
                  className="text-center mt-2 text-lg md:text-xl text-black flex justify-center items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <motion.span 
                    className="font-bold"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
                  >
                    {progressPercentage}%
                  </motion.span>
                </motion.div>
              </motion.div>

              {/* Right side - Creation Limit */}
              <motion.div 
                className="text-center md:text-right mt-2 md:mt-0 w-full md:w-auto"
                variants={fadeInUpVariants}
              >
                <motion.h3 
                  className="text-xl md:text-2xl font-bold text-black"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Creation Limit
                </motion.h3>
                <motion.p 
                  className="text-2xl md:text-3xl font-bold text-black"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {limitValue}M $Cancer
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 