"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useState } from "react"

// Star field layer component
const StarField = ({
  count,
  speed,
  size,
  opacity,
  color = "white",
}: {
  count: number
  speed: number
  size: { min: number; max: number }
  opacity: { min: number; max: number }
  color?: string
}) => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, -speed])

  const [stars] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (size.max - size.min) + size.min,
      opacity: Math.random() * (opacity.max - opacity.min) + opacity.min,
      twinkleDelay: Math.random() * 3,
    })),
  )

  return (
    <motion.div className="absolute inset-0 overflow-hidden" style={{ y }}>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: color,
            opacity: star.opacity,
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: star.twinkleDelay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  )
}

// Nebula cloud component
const NebulaCloud = ({
  position,
  size,
  color,
  speed,
}: {
  position: { x: number; y: number }
  size: number
  color: string
  speed: number
}) => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, -speed])

  return (
    <motion.div
      className="absolute rounded-full blur-3xl"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: `${size}px`,
        height: `${size}px`,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        y,
      }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  )
}

export const ParallaxGalaxyBackground = () => {
  const [nebulae] = useState(() => [
    { position: { x: 20, y: 15 }, size: 400, color: "#6366f1", speed: 50 },
    { position: { x: 70, y: 30 }, size: 350, color: "#0a0a23", speed: 30 },
    { position: { x: 40, y: 60 }, size: 300, color: "#00ffff", speed: 40 },
    { position: { x: 80, y: 80 }, size: 250, color: "#6366f1", speed: 25 },
  ])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base deep space gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a23] via-[#1a1a3a] to-black" />

      {/* Distant stars (slowest) */}
      <StarField count={150} speed={20} size={{ min: 0.5, max: 1 }} opacity={{ min: 0.2, max: 0.4 }} />

      {/* Mid-distance stars */}
      <StarField count={100} speed={40} size={{ min: 1, max: 2 }} opacity={{ min: 0.4, max: 0.7 }} />

      {/* Close stars (fastest) */}
      <StarField count={50} speed={80} size={{ min: 1.5, max: 3 }} opacity={{ min: 0.6, max: 1 }} color="#00ffff" />

      {/* Nebula clouds */}
      {nebulae.map((nebula, index) => (
        <NebulaCloud key={index} {...nebula} />
      ))}

      {/* Cosmic dust overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, #6366f1 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, #00ffff 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, #6366f1 0%, transparent 50%)
            `,
          }}
        />
      </div>
    </div>
  )
}
