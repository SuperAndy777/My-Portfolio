"use client"

import { motion, useInView } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useRef } from "react"

// Moving stars background
const MovingStars = () => {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    speed: Math.random() * 0.5 + 0.1,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full opacity-60"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            x: [0, -100],
            opacity: [0.6, 0.2, 0.6],
          }}
          transition={{
            duration: 20 / star.speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

// Galaxy background
const GalaxyBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-purple-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-gradient-radial from-cyan-400/15 via-purple-400/10 to-transparent rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute top-1/2 right-1/2 w-64 h-64 bg-gradient-radial from-pink-400/10 to-transparent rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "6s" }}
      />
    </div>
  )
}

// Bicycle rider with trail
const BicycleRider = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="relative w-full h-96 flex items-center justify-center">
      {/* Nebula trail */}
      <motion.div
        className="absolute left-0 top-1/2 w-full h-2"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 0.6 } : {}}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <div className="w-full h-full bg-gradient-to-r from-transparent via-cyan-400/40 to-blue-500/60 blur-sm rounded-full" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/30 to-blue-400/50 blur-md rounded-full"
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scaleY: [1, 1.5, 1],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Bicycle rider */}
      <motion.div
        className="relative z-10"
        initial={{ x: -100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.3 }}
      >
        <div className="relative w-48 h-32">
          {/* Sketch-style bicycle and rider */}
          <svg
            viewBox="0 0 200 120"
            className="w-full h-full filter drop-shadow-lg"
            style={{ filter: "drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))" }}
          >
            {/* Bicycle wheels */}
            <circle
              cx="40"
              cy="80"
              r="25"
              fill="none"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="2"
              strokeDasharray="3,2"
            />
            <circle
              cx="140"
              cy="80"
              r="25"
              fill="none"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="2"
              strokeDasharray="3,2"
            />

            {/* Bicycle frame */}
            <path
              d="M40 80 L90 50 L140 80 M90 50 L90 30 M70 30 L110 30"
              fill="none"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Rider */}
            <circle cx="90" cy="25" r="8" fill="rgba(255,255,255,0.7)" />
            <path
              d="M90 33 L90 55 M90 45 L75 40 M90 45 L105 50 M90 55 L80 75 M90 55 L100 75"
              fill="none"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          {/* Motion pulse */}
          <motion.div
            className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </div>
  )
}

// Hobby icon bubble
const HobbyIcon = ({
  emoji,
  tooltip,
  delay = 0,
}: {
  emoji: string
  tooltip: string
  delay?: number
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="relative group cursor-pointer"
          >
            <div className="w-16 h-16 bg-slate-800/50 border-2 border-slate-600/50 rounded-full flex items-center justify-center backdrop-blur-sm hover:border-blue-400/50 transition-all duration-300">
              <span className="text-2xl">{emoji}</span>

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />

              {/* Sketched border */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <circle
                  cx="50%"
                  cy="50%"
                  r="30"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                  strokeDasharray="2,1"
                />
              </svg>
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="bg-yellow-100 text-slate-800 border-yellow-300 shadow-lg transform rotate-1"
          style={{
            fontFamily: "Comic Sans MS, cursive",
            filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.2))",
          }}
        >
          <p className="text-sm font-medium">{tooltip}</p>
          {/* Sticky note corner */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-200 transform rotate-45" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default function FunSection() {
  const hobbies = [
    { emoji: "🎬", tooltip: "Analyzing cinema like a film Jedi." },
    { emoji: "🎮", tooltip: "Building puzzle games, not just playing." },
    { emoji: "✍️", tooltip: "Always sketching a new universe." },
    { emoji: "🌌", tooltip: "Forever curious." },
  ]

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-800 overflow-hidden">
      {/* Background elements */}
      <MovingStars />
      <GalaxyBackground />

      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center">
        {/* Left side - Bicycle rider */}
        <motion.div
          className="flex-1 p-6 lg:p-12"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <BicycleRider />
        </motion.div>

        {/* Right side - Content */}
        <motion.div
          className="flex-1 p-6 lg:p-12 text-center lg:text-left"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="max-w-lg mx-auto lg:mx-0">
            <motion.h2
              className="text-5xl lg:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              I Have Fun
            </motion.h2>

            <motion.p
              className="text-xl text-slate-300 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Movies. Games. Writing. Curiosity.
            </motion.p>

            <div className="flex justify-center lg:justify-start gap-6 flex-wrap">
              {hobbies.map((hobby, index) => (
                <HobbyIcon key={index} emoji={hobby.emoji} tooltip={hobby.tooltip} delay={0.8 + index * 0.1} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
