"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"

// BELIEVE sign component with actual image
const BelieveSign = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [imageError, setImageError] = useState(false)

  return (
    <div ref={ref} className="relative">
      {/* Hanging string */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-6 sm:h-8 bg-gradient-to-b from-yellow-600/60 to-transparent"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.5 }}
      />

      {/* BELIEVE sign with actual image */}
      <motion.div
        className="relative transform"
        initial={{ opacity: 0, y: -50, rotateX: 20 }}
        animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
        style={{
          filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))",
        }}
      >
        <motion.div
          animate={{
            rotate: [0, 1, -1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="relative w-64 h-40 sm:w-80 sm:h-48 md:w-96 md:h-56"
        >
          {!imageError ? (
            <Image
              src="/images/believe-sign.png"
              alt="BELIEVE sign"
              fill
              className="object-contain"
              priority
              onError={() => setImageError(true)}
            />
          ) : (
            // Fallback CSS BELIEVE sign if image fails
            <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-lg shadow-2xl flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-blue-800 tracking-wider transform -rotate-1">
                  BELIEVE
                </h2>
              </div>
              {/* Tape corners */}
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-gray-400 transform rotate-45 opacity-60"></div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-400 transform rotate-45 opacity-60"></div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gray-400 transform rotate-45 opacity-60"></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-400 transform rotate-45 opacity-60"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg"></div>
            </div>
          )}
        </motion.div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-yellow-400/20 rounded-xl blur-2xl -z-10"
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
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
    <section
      ref={ref}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 py-12 sm:py-16"
    >
      {/* Darker vignette overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40" />

      <div className="relative z-10 text-center">
        {/* BELIEVE sign */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <BelieveSign />
        </motion.div>

        {/* Thank you message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
          className="space-y-3 sm:space-y-4"
        >
          <p className="heading-medium text-light">Thank you for visiting.</p>
          <motion.p
            className="text-body-large text-accent hover-glow"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.8, ease: "easeOut" }}
          >
            May the Force be with you.
          </motion.p>
        </motion.div>

        {/* Subtle sparkles */}
        {Array.from({ length: 15 }, (_, i) => (
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
    </section>
  )
}
