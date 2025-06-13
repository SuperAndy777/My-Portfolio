"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface HolographicCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
}

export const HolographicCard = ({ children, className = "", glowColor = "#00ffff" }: HolographicCardProps) => {
  return (
    <motion.div
      className={`relative group ${className}`}
      whileHover={{
        scale: 1.02,
        rotateY: 2,
        rotateX: 2,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      {/* Holographic background */}
      <div
        className="absolute inset-0 rounded-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(99, 102, 241, 0.1) 0%, 
              rgba(0, 255, 255, 0.1) 50%, 
              rgba(99, 102, 241, 0.1) 100%
            )
          `,
          backdropFilter: "blur(10px)",
        }}
      />

      {/* Glowing border */}
      <motion.div
        className="absolute inset-0 rounded-lg border border-transparent"
        style={{
          background: `linear-gradient(135deg, ${glowColor}40, transparent, ${glowColor}40) border-box`,
          mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
        }}
        animate={{
          boxShadow: [`0 0 20px ${glowColor}30`, `0 0 40px ${glowColor}50`, `0 0 20px ${glowColor}30`],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Scanning line effect */}
      <motion.div
        className="absolute inset-0 rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      >
        <motion.div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ffff] to-transparent"
          animate={{
            y: [0, 200, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 p-6 rounded-lg backdrop-blur-sm">{children}</div>

      {/* Corner accents */}
      {[
        { top: 0, left: 0, rotate: 0 },
        { top: 0, right: 0, rotate: 90 },
        { bottom: 0, right: 0, rotate: 180 },
        { bottom: 0, left: 0, rotate: 270 },
      ].map((corner, index) => (
        <motion.div
          key={index}
          className="absolute w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            ...corner,
            transform: `rotate(${corner.rotate}deg)`,
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            delay: index * 0.2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M1 1L1 5M1 1L5 1" stroke={glowColor} strokeWidth="1" strokeLinecap="round" />
          </svg>
        </motion.div>
      ))}
    </motion.div>
  )
}
