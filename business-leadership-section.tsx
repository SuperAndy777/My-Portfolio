"use client"

import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Briefcase, Network, Users } from "lucide-react"
import { useRef } from "react"

// Floating stars background
const FloatingStars = () => {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 4,
    delay: Math.random() * 2,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full opacity-40"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Business card component
const BusinessCard = ({
  icon: Icon,
  title,
  description,
  tooltip,
  delay = 0,
}: {
  icon: any
  title: string
  description: string
  tooltip: string
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
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay }}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              rotateX: 5,
            }}
            className="group cursor-pointer h-full"
          >
            <Card className="relative bg-purple-950/30 border-purple-700/40 hover:border-purple-400/60 transition-all duration-500 overflow-hidden backdrop-blur-sm h-full">
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
              />

              <CardContent className="p-8 relative z-10 flex flex-col items-center text-center h-full">
                {/* Icon with animated background */}
                <motion.div
                  className="relative mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-4 bg-purple-600/20 rounded-full border border-purple-500/30 group-hover:border-purple-400/50 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                  </div>

                  {/* Pulsing ring effect */}
                  <motion.div
                    className="absolute inset-0 border-2 border-purple-400/30 rounded-full opacity-0 group-hover:opacity-100"
                    animate={{
                      scale: [1, 1.2, 1.4],
                      opacity: [0.5, 0.2, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeOut",
                    }}
                  />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300 mb-4 leading-tight">
                  {title}
                </h3>

                {/* Description */}
                <p className="text-purple-200/80 text-sm leading-relaxed flex-1">{description}</p>

                {/* Hover indicator */}
                <motion.div
                  className="mt-4 text-xs text-purple-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                >
                  Hover for insights
                </motion.div>
              </CardContent>

              {/* Subtle glow effect */}
              <motion.div
                className="absolute inset-0 bg-purple-400/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                initial={false}
              />

              {/* Floating particles on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {Array.from({ length: 8 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-purple-400/60 rounded-full"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </Card>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="bg-purple-900/90 text-purple-100 border-purple-700 max-w-xs backdrop-blur-sm"
        >
          <p className="text-sm font-medium">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default function BusinessLeadershipSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-200px" })

  const businessCards = [
    {
      icon: Briefcase,
      title: "AIESEC - Board of Advisors Liaison",
      description: "Facilitated engagement between the organization and its advisory board.",
      tooltip: "Managed external relations with senior advisory members and alumni.",
    },
    {
      icon: Network,
      title: "Strategic Partnerships & Hosting",
      description: "Built strong partnerships and hosted national-level youth events.",
      tooltip: "Handled multiple partners and led large-scale youth forums.",
    },
    {
      icon: Users,
      title: "Team Leadership (26 Members)",
      description: "Empowered a diverse team to execute projects with impact.",
      tooltip: "Led a cross-functional team across design, BD, and operations.",
    },
  ]

  return (
    <div
      ref={ref}
      className="relative w-full min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-900 overflow-hidden py-20"
    >
      {/* Floating stars background */}
      <FloatingStars />

      {/* Deep space nebula effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-purple-600/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-indigo-500/15 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-radial from-pink-500/10 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-indigo-200 bg-clip-text text-transparent">
              Business & Leadership
            </span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-purple-200/80 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Driving strategy, empowering youth, and building impact.
          </motion.p>

          {/* Decorative line */}
          <motion.div
            className="flex justify-center items-center mt-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-purple-400" />
            <div className="w-3 h-3 bg-purple-400 rounded-full mx-4 animate-pulse" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-purple-400" />
          </motion.div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {businessCards.map((card, index) => (
            <BusinessCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
              tooltip={card.tooltip}
              delay={0.8 + index * 0.2}
            />
          ))}
        </div>

        {/* Bottom accent */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
