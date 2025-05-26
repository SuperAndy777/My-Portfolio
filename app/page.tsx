"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import HeroSection from "./hero-section"
import TechSection from "./tech-section"
import BusinessSection from "./business-section"
import BelieveSection from "./believe-section"

// Galaxy background component (inline)
const GalaxyBackground = () => {
  const stars = Array.from({ length: 200 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.8 + 0.2,
    duration: Math.random() * 30 + 20,
    delay: Math.random() * 5,
  }))

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
      </div>

      {/* Animated stars */}
      <div className="absolute inset-0">
        {stars.map((star) => (
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
    </div>
  )
}

// Section divider component (inline)
const SectionDivider = () => {
  return (
    <div className="relative w-full h-24 flex items-center justify-center">
      <motion.div
        className="w-1 h-16 bg-gradient-to-b from-transparent via-[#66ccff] to-transparent rounded-full"
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{
          boxShadow: "0 0 10px #66ccff",
        }}
      />
    </div>
  )
}

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export default function Page() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className={`relative scroll-container ${isLoaded ? "loaded" : "loading"}`}>
      {/* Consistent galaxy background across all sections */}
      <GalaxyBackground />

      {/* Content sections with scroll snap */}
      <div className="relative z-10">
        <motion.div
          className="section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <HeroSection />
        </motion.div>

        <SectionDivider />

        <motion.div
          className="section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <TechSection />
        </motion.div>

        <SectionDivider />

        <motion.div
          className="section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <BusinessSection />
        </motion.div>

        <SectionDivider />

        <motion.div
          className="section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <BelieveSection />
        </motion.div>
      </div>
    </div>
  )
}
