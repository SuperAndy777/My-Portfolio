"use client"

import { motion } from "framer-motion"
import { GalaxyBackground } from "../components/galaxy-background"
import { SectionDivider } from "../components/section-divider"
import HeroSection from "../sections/hero-section"
import TechSection from "../sections/tech-section"
import BusinessSection from "../sections/business-section"
import BelieveSection from "../sections/believe-section"
import { useEffect, useState } from "react"

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
