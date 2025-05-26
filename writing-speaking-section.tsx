"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BookOpen, Mic, Quote, Users } from "lucide-react"
import { useRef } from "react"

// Nebula background component
const NebulaBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Nebula clouds */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-blue-400/30 to-transparent rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-purple-400/20 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-radial from-cyan-400/15 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Floating particles */}
      {Array.from({ length: 30 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

// Sketched border component
const SketchedBorder = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ filter: "drop-shadow(0 0 1px rgba(255,255,255,0.1))" }}
      >
        <rect
          x="2"
          y="2"
          width="calc(100% - 4px)"
          height="calc(100% - 4px)"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          strokeDasharray="3,2"
          rx="8"
        />
      </svg>
      {children}
    </div>
  )
}

// Writing card component
const WritingCard = ({
  title,
  description,
  quote,
  delay = 0,
}: {
  title: string
  description: string
  quote: string
  delay?: number
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group"
    >
      <SketchedBorder>
        <Card className="relative bg-slate-800/30 border-slate-600/30 hover:border-blue-400/40 transition-all duration-500 overflow-hidden backdrop-blur-sm">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={false}
          />

          <CardContent className="p-6 relative z-10">
            <div className="flex items-start gap-3 mb-4">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mt-1"
              >
                <Quote className="w-5 h-5 text-blue-400" />
              </motion.div>
              <div className="flex-1">
                <h3 className="font-komika text-lg font-semibold text-[#f1f1f1] group-hover:text-blue-300 transition-colors duration-300 mb-2">
                  {title}
                </h3>
                <p className="font-montserrat text-[#a0a0a0] text-sm leading-relaxed mb-3">{description}</p>
              </div>
            </div>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              whileHover={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-3 border-t border-slate-700/30">
                <p className="font-montserrat text-blue-300/80 text-sm italic font-light">"{quote}"</p>
              </div>
            </motion.div>
          </CardContent>

          {/* Paper texture overlay */}
          <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml,%3Csvg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;100&quot; height=&quot;100&quot; viewBox=&quot;0 0 100 100&quot;%3E%3Cg fillOpacity=&quot;0.1&quot;%3E%3Cpath d=&quot;M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z&quot; fill=&quot;%23ffffff&quot;/%3E%3C/g%3E%3C/svg%3E')] pointer-events-none" />
        </Card>
      </SketchedBorder>
    </motion.div>
  )
}

// Speaking card component
const SpeakingCard = ({
  title,
  subtitle,
  delay = 0,
}: {
  title: string
  subtitle: string
  delay?: number
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50, rotateX: 10 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.8, delay }}
            whileHover={{ scale: 1.05, rotateY: 2 }}
            className="group cursor-pointer"
          >
            <SketchedBorder>
              <Card className="relative bg-purple-900/20 border-purple-600/30 hover:border-purple-400/50 transition-all duration-500 overflow-hidden backdrop-blur-sm">
                {/* Ripple effect on hover */}
                <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100" initial={false}>
                  {Array.from({ length: 3 }, (_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 border border-purple-400/30 rounded-lg"
                      initial={{ scale: 1, opacity: 0 }}
                      whileHover={{
                        scale: [1, 1.05, 1.1],
                        opacity: [0, 0.5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                  ))}
                </motion.div>

                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start gap-3">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="p-2 bg-purple-600/20 rounded-lg mt-1"
                    >
                      <Users className="w-5 h-5 text-purple-400" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-komika text-lg font-semibold text-[#f1f1f1] group-hover:text-purple-300 transition-colors duration-300 mb-2">
                        {title}
                      </h3>
                      <p className="font-montserrat text-purple-200/80 text-sm leading-relaxed">{subtitle}</p>
                    </div>
                  </div>
                </CardContent>

                {/* Sound wave visualization */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/50 to-pink-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-400 to-pink-400"
                    animate={{
                      scaleX: [0, 1, 0.8, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </Card>
            </SketchedBorder>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-purple-900 text-purple-100 border-purple-700">
          <p className="font-montserrat text-sm">Click to learn more about this speaking engagement</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default function WritingSpeakingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-200px" })

  const writingArticles = [
    {
      title: "From Code to Connection",
      description: "Writing about how storytelling makes engineering human.",
      quote: "Every engineer is a storyteller.",
    },
    {
      title: "Youth-Led Innovation for the SDGs",
      description: "Thoughts on youth impact and global goals.",
      quote: "The future belongs to those who believe in the beauty of their dreams.",
    },
  ]

  const speakingEngagements = [
    {
      title: "Facilitator, NLDS 2024",
      subtitle: "Mentoring the next generation of leaders",
    },
    {
      title: "AIESEC Youth Summit",
      subtitle: "Talking tech, business, and belief.",
    },
  ]

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 overflow-hidden">
      {/* Nebula background */}
      <NebulaBackground />

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Left Panel - Writing */}
        <motion.div
          className="flex-1 relative p-6 lg:p-12"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <div className="max-w-2xl mx-auto h-full flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12 text-center lg:text-left"
            >
              <motion.div
                className="flex justify-center lg:justify-start mb-4"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <BookOpen className="w-12 h-12 text-blue-400" />
              </motion.div>
              <h2 className="font-star-jedi text-4xl lg:text-5xl text-[#f1f1f1] text-glow-blue mb-3 tracking-wider">
                I Write
              </h2>
              <p className="font-komika text-xl text-[#a0a0a0]">Thoughts. Ideas. Observations.</p>
            </motion.div>

            <div className="flex-1 space-y-8">
              {writingArticles.map((article, index) => (
                <WritingCard
                  key={index}
                  title={article.title}
                  description={article.description}
                  quote={article.quote}
                  delay={0.4 + index * 0.2}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Center divider */}
        <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-slate-500/30 to-transparent" />

        {/* Right Panel - Speaking */}
        <motion.div
          className="flex-1 relative p-6 lg:p-12"
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <div className="max-w-2xl mx-auto h-full flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12 text-center lg:text-left"
            >
              <motion.div
                className="flex justify-center lg:justify-start mb-4"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <Mic className="w-12 h-12 text-purple-400" />
              </motion.div>
              <h2 className="font-star-jedi text-4xl lg:text-5xl text-[#f1f1f1] text-glow-purple mb-3 tracking-wider">
                I Speak
              </h2>
              <p className="font-komika text-xl text-purple-200">Facilitating conversations that matter.</p>
            </motion.div>

            <div className="flex-1 space-y-8">
              {speakingEngagements.map((engagement, index) => (
                <SpeakingCard
                  key={index}
                  title={engagement.title}
                  subtitle={engagement.subtitle}
                  delay={0.4 + index * 0.2}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
