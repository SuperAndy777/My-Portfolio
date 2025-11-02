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
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-8 sm:h-10 bg-gradient-to-b from-accent/60 to-transparent"
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
          filter: "drop-shadow(0 10px 30px rgba(32, 178, 170, 0.3))",
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
          className="relative w-80 h-56 sm:w-96 sm:h-64 md:w-[28rem] md:h-72 lg:w-[32rem] lg:h-80"
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
            <div className="w-full h-full bg-gradient-to-br from-accent/80 to-accent/60 rounded-lg shadow-2xl flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-primary tracking-wider transform -rotate-1">
                  BELIEVE
                </h2>
              </div>
              {/* Tape corners */}
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-muted transform rotate-45 opacity-60"></div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-muted transform rotate-45 opacity-60"></div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-muted transform rotate-45 opacity-60"></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-muted transform rotate-45 opacity-60"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-lg"></div>
            </div>
          )}
        </motion.div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-accent/20 rounded-xl blur-2xl -z-10"
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
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 py-24 bg-background"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-accent/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 text-center flex items-center justify-center min-h-screen w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <BelieveSign />
        </motion.div>

        {/* Subtle sparkles */}
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-accent rounded-full"
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
