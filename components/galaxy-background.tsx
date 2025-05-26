"use client"

import { motion } from "framer-motion"

// Animated galaxy background component
export const GalaxyBackground = () => {
  // Generate stars with different layers for depth
  const starLayers = [
    // Background stars (small, slow)
    Array.from({ length: 150 }, (_, i) => ({
      id: `bg-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      duration: Math.random() * 30 + 20,
      delay: Math.random() * 5,
    })),
    // Mid-ground stars (medium, medium speed)
    Array.from({ length: 100 }, (_, i) => ({
      id: `mid-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 3,
    })),
    // Foreground stars (larger, faster)
    Array.from({ length: 50 }, (_, i) => ({
      id: `fg-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1.5,
      opacity: Math.random() * 0.8 + 0.3,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 2,
    })),
  ]

  const allStars = starLayers.flat()

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-950 to-black" />

      {/* Nebula effects */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-blue-500/30 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-2/3 right-1/3 w-80 h-80 bg-gradient-radial from-purple-500/20 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-2/3 w-64 h-64 bg-gradient-radial from-cyan-500/15 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      {/* Animated stars */}
      <div className="absolute inset-0">
        {allStars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            animate={{
              opacity: [star.opacity * 0.5, star.opacity, star.opacity * 0.5],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
    </div>
  )
}
