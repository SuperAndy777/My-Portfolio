"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"

const BelieveImage = () => {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-800 dark:text-blue-400 mb-2 transition-colors duration-300">
            BELIEVE
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
            Motivational poster
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-80 h-60 md:w-96 md:h-72">
      <Image
        src="/images/believe-sign.png"
        alt="BELIEVE motivational poster"
        fill
        className="object-contain"
        onError={() => setImageError(true)}
      />
    </div>
  )
}

export default function BelieveSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-200px" })

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center pt-20 pb-24 px-6 bg-white dark:bg-gray-900 transition-colors duration-500"
    >
      <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <BelieveImage />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white transition-colors duration-500"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            The End
          </h2>
        </motion.div>

        <motion.div
          className="mt-8 text-gray-600 dark:text-gray-300 transition-colors duration-500"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-lg">
            Thank you for taking this journey with me.
            <br />
            The best stories are yet to be written.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
