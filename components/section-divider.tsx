"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export const SectionDivider = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} className="relative w-full h-24 flex items-center justify-center">
      <motion.div
        className="lightsaber-divider"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
    </div>
  )
}
