"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export const SectionDivider = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} className="relative w-full h-24 flex items-center justify-center">
      <motion.div
        className="relative w-full max-w-md h-px"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {/* Main line */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#66ccff] to-transparent" />

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#66ccff] to-transparent blur-sm"
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Center dot */}
        <motion.div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#66ccff] rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  )
}
