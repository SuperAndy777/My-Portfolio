"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export default function BelieveSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 px-4 flex items-center justify-center min-h-screen">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-8 flex justify-center">
          <Image
            src="/images/believe-sign.png"
            alt="BELIEVE sign"
            width={600}
            height={300}
            priority
            className="w-full max-w-2xl h-auto"
          />
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          In yourself, in your journey, in the power of growth and continuous learning.
        </p>
      </motion.div>
    </section>
  )
}
