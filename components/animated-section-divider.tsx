"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export const AnimatedSectionDivider = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} className="relative w-full h-32 flex items-center justify-center overflow-hidden">
      {/* Energy wave background */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        {/* Horizontal energy lines */}
        {Array.from({ length: 3 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ffff] to-transparent"
            style={{ top: `${40 + i * 10}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 0.6 } : {}}
            transition={{
              duration: 1.5,
              delay: i * 0.2,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Pulsing energy waves */}
        <motion.div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.8, 0, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="w-4 h-4 border-2 border-[#00ffff] rounded-full" />
        </motion.div>
      </motion.div>

      {/* Central lightsaber divider */}
      <motion.div
        className="relative z-10 w-1 h-20 bg-gradient-to-b from-transparent via-[#00ffff] to-transparent rounded-full"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{
          boxShadow: "0 0 20px #00ffff, 0 0 40px #00ffff",
        }}
      >
        {/* Inner glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent rounded-full blur-sm opacity-60" />
      </motion.div>

      {/* Side energy particles */}
      {Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#00ffff] rounded-full"
          style={{
            left: `${30 + Math.random() * 40}%`,
            top: `${40 + Math.random() * 20}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
