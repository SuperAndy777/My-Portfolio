"use client"

import { motion, useScroll, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

export const ScrollProgressLightsaber = () => {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setIsVisible(latest > 0.01)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  if (!isVisible) return null

  return (
    <div className="fixed top-0 right-4 sm:right-6 z-50 h-screen flex items-center pointer-events-none">
      {/* Lightsaber hilt */}
      <div className="relative">
        {/* Hilt base */}
        <div className="w-3 h-16 bg-gradient-to-b from-gray-400 via-gray-600 to-gray-800 rounded-full shadow-lg border border-gray-500">
          {/* Hilt details */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-red-500 rounded-full opacity-60"></div>
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1.5 h-8 bg-gradient-to-b from-gray-300 to-gray-500 rounded-full"></div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full opacity-80"></div>
        </div>

        {/* Lightsaber blade */}
        <div
          className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 origin-bottom"
          style={{ height: "calc(100vh - 8rem)" }}
        >
          <motion.div
            className="w-full bg-gradient-to-t from-[#00ffff] via-[#00ccff] to-[#ffffff] rounded-full relative"
            style={{
              scaleY,
              filter: "drop-shadow(0 0 8px #00ffff) drop-shadow(0 0 16px #00ffff)",
            }}
            initial={{ scaleY: 0 }}
          >
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#00ffff]/60 to-white/80 rounded-full blur-sm"></div>

            {/* Outer glow */}
            <motion.div
              className="absolute inset-0 bg-[#00ffff]/40 rounded-full blur-md scale-150"
              animate={{
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
