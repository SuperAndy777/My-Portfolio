"use client"

import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Code2, Car, Bot, Gamepad2, Briefcase, Network, Users } from "lucide-react"
import { useRef } from "react"

// Galaxy starfield background
const GalaxyStarfield = ({ density = 100, speed = 1 }: { density?: number; speed?: number }) => {
  const stars = Array.from({ length: density }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.8 + 0.2,
    duration: (Math.random() * 20 + 10) / speed,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
          }}
          animate={{
            y: [0, -100],
            opacity: [star.opacity, 0, star.opacity],
          }}
          transition={{
            duration: star.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

// Animated code matrix background
const CodeMatrix = () => {
  const columns = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: (i * 100) / 50,
    chars: Array.from({ length: 20 }, () => (Math.random() > 0.5 ? "1" : "0")),
    speed: Math.random() * 2 + 1,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.05]">
      {columns.map((column) => (
        <motion.div
          key={column.id}
          className="absolute top-0 font-mono text-green-400 text-xs leading-4"
          style={{ left: `${column.x}%` }}
          animate={{
            y: ["-100%", "100vh"],
          }}
          transition={{
            duration: 10 / column.speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {column.chars.map((char, index) => (
            <div key={index} className="opacity-80">
              {char}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  )
}

// Tech project card
const TechCard = ({
  icon: Icon,
  title,
  description,
  githubUrl,
  delay = 0,
}: {
  icon: any
  title: string
  description: string
  githubUrl: string
  delay?: number
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="group h-full"
    >
      <Card className="relative bg-slate-800/40 border-slate-600/50 hover:border-blue-400/60 transition-all duration-500 overflow-hidden backdrop-blur-sm h-full cursor-pointer">
        <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
          {/* Pulsing background on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100"
            animate={{
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          <CardContent className="p-8 relative z-10 flex flex-col items-center text-center h-full">
            {/* Icon */}
            <motion.div
              className="mb-6 p-4 bg-blue-600/20 rounded-full border border-blue-500/30 group-hover:border-blue-400/60 transition-colors duration-300"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Icon className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
            </motion.div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300 mb-4">
              {title}
            </h3>

            {/* Description on hover */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              whileHover={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="text-slate-400 text-sm leading-relaxed pt-4 border-t border-slate-700/30">{description}</p>
            </motion.div>
          </CardContent>

          {/* Glowing border effect */}
          <motion.div
            className="absolute inset-0 border border-blue-400/0 group-hover:border-blue-400/50 rounded-lg transition-all duration-500"
            whileHover={{
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
            }}
          />
        </a>
      </Card>
    </motion.div>
  )
}

// Business card
const BusinessCard = ({
  icon: Icon,
  title,
  tooltip,
  delay = 0,
}: {
  icon: any
  title: string
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
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay }}
            whileHover={{
              scale: 1.02,
              rotateY: 3,
              rotateX: 2,
            }}
            className="group cursor-pointer mb-8 last:mb-0"
          >
            <Card className="relative bg-purple-900/30 border-purple-600/40 hover:border-purple-400/60 transition-all duration-500 overflow-hidden backdrop-blur-sm">
              {/* Glowing background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
              />

              <CardContent className="p-8 relative z-10">
                <div className="flex items-center gap-6">
                  {/* Icon */}
                  <motion.div
                    className="p-4 bg-purple-600/20 rounded-full border border-purple-500/30 group-hover:border-purple-400/60 transition-colors duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                      {title}
                    </h3>
                  </div>
                </div>
              </CardContent>

              {/* Glowing border */}
              <motion.div
                className="absolute inset-0 border border-purple-400/0 group-hover:border-purple-400/50 rounded-lg transition-all duration-500"
                whileHover={{
                  boxShadow: "0 0 20px rgba(147, 51, 234, 0.3)",
                }}
              />
            </Card>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="bg-purple-900/90 text-purple-100 border-purple-700 max-w-xs backdrop-blur-sm"
        >
          <p className="text-sm font-medium">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Lightsaber divider
const LightsaberDivider = ({ delay = 0 }: { delay?: number }) => {
  return (
    <motion.div
      className="relative w-px h-32 mx-8"
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ duration: 1, delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400 to-transparent" />
      <motion.div
        className="absolute inset-0 bg-blue-400 blur-sm"
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  )
}

export default function TechBusinessScrollSection() {
  const techRef = useRef(null)
  const businessRef = useRef(null)
  const techInView = useInView(techRef, { once: true, margin: "-200px" })
  const businessInView = useInView(businessRef, { once: true, margin: "-200px" })

  const techProjects = [
    {
      icon: Car,
      title: "Master-Shifu",
      description: "Enhances cab-driving platforms with real-time insights and gamification.",
      githubUrl: "https://github.com/SuperAndy777/Master-Shifu",
    },
    {
      icon: Bot,
      title: "Ultroid Telegram Bot Fork",
      description: "Custom automation and bot workflow.",
      githubUrl: "https://github.com/SuperAndy777/Ultroid",
    },
    {
      icon: Gamepad2,
      title: "Tower Defense Game",
      description: "Building strategy, one tower at a time.",
      githubUrl: "https://github.com/SuperAndy777/Tower-Defense",
    },
  ]

  const businessRoles = [
    {
      icon: Briefcase,
      title: "Board of Advisors Liaison",
      tooltip: "Managing external advisory influence.",
    },
    {
      icon: Network,
      title: "Strategic Partnerships & Hosting",
      tooltip: "Youth forums. Partner ecosystems.",
    },
    {
      icon: Users,
      title: "Team Leadership – 26 Members",
      tooltip: "Design, BD, and operations together.",
    },
  ]

  return (
    <div className="relative">
      {/* Section 1: Tech Side */}
      <section
        ref={techRef}
        className="relative min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 overflow-hidden"
      >
        {/* Galaxy background */}
        <GalaxyStarfield density={80} speed={0.5} />

        {/* Code matrix */}
        <CodeMatrix />

        <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            {/* Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={techInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <Code2 className="w-10 h-10 text-blue-400" />
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                  Tech Side
                </h2>
              </div>
              <p className="text-lg md:text-xl lg:text-2xl text-slate-300 max-w-3xl mx-auto">
                Crafting systems. Automating flow. Building the future.
              </p>
            </motion.div>

            {/* Tech Cards */}
            <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 max-w-6xl mx-auto">
              {techProjects.map((project, index) => (
                <div key={index} className="flex items-center flex-1">
                  <div className="w-full">
                    <TechCard
                      icon={project.icon}
                      title={project.title}
                      description={project.description}
                      githubUrl={project.githubUrl}
                      delay={techInView ? 0.2 + index * 0.2 : 0}
                    />
                  </div>
                  {index < techProjects.length - 1 && (
                    <div className="hidden lg:block">
                      <LightsaberDivider delay={techInView ? 0.8 + index * 0.2 : 0} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nebula transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-950/50 to-transparent" />
      </section>

      {/* Section 2: Business & Leadership */}
      <section
        ref={businessRef}
        className="relative min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-900 overflow-hidden"
      >
        {/* Galaxy background */}
        <GalaxyStarfield density={120} speed={0.3} />

        {/* Nebula effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-purple-500/30 to-transparent rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-pink-500/20 to-transparent rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 lg:px-8">
          <div className="max-w-4xl mx-auto w-full">
            {/* Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={businessInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <Briefcase className="w-10 h-10 text-purple-400" />
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-200 via-pink-200 to-purple-300 bg-clip-text text-transparent">
                  Business & Leadership
                </h2>
              </div>
              <p className="text-lg md:text-xl lg:text-2xl text-purple-200 max-w-3xl mx-auto">
                Leading teams. Building partnerships. Hosting experiences.
              </p>
            </motion.div>

            {/* Business Cards */}
            <div className="max-w-2xl mx-auto">
              {businessRoles.map((role, index) => (
                <BusinessCard
                  key={index}
                  icon={role.icon}
                  title={role.title}
                  tooltip={role.tooltip}
                  delay={businessInView ? 0.2 + index * 0.2 : 0}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Galaxy fade out */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
      </section>
    </div>
  )
}
