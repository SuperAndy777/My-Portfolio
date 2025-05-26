"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

// Spaceship bridge background
const SpaceshipBridge = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Bridge panels */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-slate-600/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-700/40 to-transparent" />
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-slate-600/20 to-transparent" />
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-slate-600/20 to-transparent" />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl" />
    </div>
  )
}

// BELIEVE sign component
const BelieveSign = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} className="relative">
      {/* Hanging string */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-yellow-600/60 to-transparent"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.5 }}
      />

      {/* BELIEVE sign image */}
      <motion.div
        className="relative transform"
        initial={{ opacity: 0, y: -50, rotateX: 20 }}
        animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
        style={{
          filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))",
        }}
      >
        <div className="relative w-80 h-48 md:w-96 md:h-56">
          <Image src="/images/believe-sign.png" alt="BELIEVE sign" fill className="object-contain" priority />
        </div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-yellow-400/20 rounded-lg blur-xl -z-10"
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  )
}

export default function BelieveSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-200px" })

  return (
    <div
      ref={ref}
      className="relative w-full min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Spaceship bridge background */}
      <SpaceshipBridge />

      <div className="relative z-10 text-center px-6">
        {/* BELIEVE sign */}
        <div className="mb-12">
          <BelieveSign />
        </div>

        {/* Thank you message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="space-y-4"
        >
          <p className="text-xl text-slate-300 font-light">Thank you for visiting.</p>
          <motion.p
            className="text-lg text-blue-300 font-medium"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1.8 }}
          >
            May the Force be with you.
          </motion.p>
        </motion.div>

        {/* Subtle sparkles */}
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              delay: Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  )
}
