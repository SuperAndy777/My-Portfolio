"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Star {
  id: number
  x: number
  y: number
  timestamp: number
}

export const ConstellationCursor = () => {
  const [stars, setStars] = useState<Star[]>([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      const newStar: Star = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
      }

      setStars((prev) => [...prev.slice(-8), newStar]) // Keep last 8 stars
    }

    // Clean up old stars
    const cleanup = setInterval(() => {
      const now = Date.now()
      setStars((prev) => prev.filter((star) => now - star.timestamp < 2000))
    }, 100)

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      clearInterval(cleanup)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {stars.map((star, index) => (
        <motion.div
          key={star.id}
          className="absolute w-1 h-1 bg-[#00ffff] rounded-full"
          style={{
            left: star.x - 2,
            top: star.y - 2,
          }}
          initial={{
            opacity: 0.8,
            scale: 1,
            boxShadow: "0 0 4px #00ffff",
          }}
          animate={{
            opacity: 0,
            scale: 0,
            boxShadow: "0 0 8px #00ffff",
          }}
          transition={{
            duration: 2,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Connect stars with lines */}
      <svg className="absolute inset-0 w-full h-full">
        {stars.slice(0, -1).map((star, index) => {
          const nextStar = stars[index + 1]
          if (!nextStar) return null

          const distance = Math.sqrt(Math.pow(nextStar.x - star.x, 2) + Math.pow(nextStar.y - star.y, 2))

          // Only draw line if stars are close enough
          if (distance > 100) return null

          return (
            <motion.line
              key={`${star.id}-${nextStar.id}`}
              x1={star.x}
              y1={star.y}
              x2={nextStar.x}
              y2={nextStar.y}
              stroke="#00ffff"
              strokeWidth="0.5"
              opacity={0.3}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
            />
          )
        })}
      </svg>
    </div>
  )
}
