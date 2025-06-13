"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import HeroSection from "./hero-section"
import EnhancedTechSection from "./enhanced-tech-section"
import BusinessSection from "./business-section"
import FunSection from "./fun-section"
import BelieveSection from "./believe-section"
import { ParallaxGalaxyBackground } from "../components/parallax-galaxy-background"
import { ScrollProgressLightsaber } from "../components/scroll-progress-lightsaber"
import { AnimatedSectionDivider } from "../components/animated-section-divider"
import { ConstellationCursor } from "../components/constellation-cursor"

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
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return (
    <div
      className={`relative scroll-container ${isLoaded ? "loaded" : "loading"}`}
      style={{
        scrollBehavior: reducedMotion ? "auto" : "smooth",
      }}
    >
      {/* Enhanced parallax galaxy background */}
      <ParallaxGalaxyBackground />

      {/* Scroll progress lightsaber */}
      <ScrollProgressLightsaber />

      {/* Constellation cursor trail (desktop only) */}
      <ConstellationCursor />

      {/* Content sections with enhanced animations */}
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

        <AnimatedSectionDivider />

        <motion.div
          className="section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <EnhancedTechSection />
        </motion.div>

        <AnimatedSectionDivider />

        <motion.div
          className="section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <BusinessSection />
        </motion.div>

        <AnimatedSectionDivider />

        <motion.div
          className="section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <FunSection />
        </motion.div>

        <AnimatedSectionDivider />

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
