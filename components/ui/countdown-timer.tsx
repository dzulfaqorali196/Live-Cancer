"use client"

import { useEffect, useState } from "react"

interface CountdownTimerProps {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer({ days, hours, minutes, seconds }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days,
    hours,
    minutes,
    seconds,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
        clearInterval(timer)
        return
      }

      let newSeconds = timeLeft.seconds - 1
      let newMinutes = timeLeft.minutes
      let newHours = timeLeft.hours
      let newDays = timeLeft.days

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

      setTimeLeft({
        days: newDays,
        hours: newHours,
        minutes: newMinutes,
        seconds: newSeconds,
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  return (
    <div className="flex justify-center items-center space-x-4">
      <div className="text-center">
        <div className="bg-black/50 rounded-lg p-4 w-20">
          <span className="text-3xl font-bold text-purple-400">{timeLeft.days.toString().padStart(2, "0")}</span>
        </div>
        <p className="text-sm mt-2 text-gray-400">Days</p>
      </div>

      <div className="text-center">
        <div className="bg-black/50 rounded-lg p-4 w-20">
          <span className="text-3xl font-bold text-purple-400">{timeLeft.hours.toString().padStart(2, "0")}</span>
        </div>
        <p className="text-sm mt-2 text-gray-400">Hours</p>
      </div>

      <div className="text-center">
        <div className="bg-black/50 rounded-lg p-4 w-20">
          <span className="text-3xl font-bold text-purple-400">{timeLeft.minutes.toString().padStart(2, "0")}</span>
        </div>
        <p className="text-sm mt-2 text-gray-400">Minutes</p>
      </div>

      <div className="text-center">
        <div className="bg-black/50 rounded-lg p-4 w-20">
          <span className="text-3xl font-bold text-purple-400">{timeLeft.seconds.toString().padStart(2, "0")}</span>
        </div>
        <p className="text-sm mt-2 text-gray-400">Seconds</p>
      </div>
    </div>
  )
}