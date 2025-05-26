"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Zap, Users, Target, Network, Code2, Briefcase, ExternalLink } from "lucide-react"

// Parallax stars component
const ParallaxStars = () => {
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.8 + 0.2,
    duration: Math.random() * 20 + 10,
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
            y: [0, -10, 0],
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
          }}
          transition={{
            duration: star.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Binary matrix background
const BinaryMatrix = () => {
  const binaryRows = Array.from({ length: 25 }, () =>
    Array.from({ length: 60 }, () => (Math.random() > 0.5 ? "1" : "0")).join(""),
  )

  return (
    <div className="absolute inset-0 opacity-[0.03] overflow-hidden">
      <div className="font-mono text-xs leading-4 text-green-400 p-4">
        {binaryRows.map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: i * 0.05 }}
            className="whitespace-nowrap"
          >
            {row}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Neural network background
const NeuralNetwork = () => {
  const nodes = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    connections: Math.floor(Math.random() * 3) + 1,
  }))

  return (
    <div className="absolute inset-0 opacity-[0.08] overflow-hidden">
      <svg className="w-full h-full">
        {/* Connection lines */}
        {nodes.map((node, i) =>
          nodes
            .slice(i + 1, i + node.connections + 1)
            .map((targetNode, j) => (
              <motion.line
                key={`${i}-${j}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${targetNode.x}%`}
                y2={`${targetNode.y}%`}
                stroke="rgb(147, 51, 234)"
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 2, delay: i * 0.1 }}
              />
            )),
        )}

        {/* Nodes */}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r="1.5"
            fill="rgb(147, 51, 234)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 1, delay: node.id * 0.05 }}
          />
        ))}
      </svg>
    </div>
  )
}

// Tech project card
const TechCard = ({
  title,
  description,
  tags,
  githubUrl,
  delay = 0,
}: {
  title: string
  description: string
  tags: string[]
  githubUrl: string
  delay?: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.03 }}
      className="group"
    >
      <Card className="relative bg-slate-800/40 border-slate-700/50 hover:border-blue-400/50 transition-all duration-300 overflow-hidden backdrop-blur-sm cursor-pointer">
        <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="block">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />

          <CardContent className="p-5 relative z-10">
            <div className="flex items-start gap-3 mb-3">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mt-0.5"
              >
                <Zap className="w-4 h-4 text-blue-400" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-white group-hover:text-blue-300 transition-colors duration-300 truncate">
                    {title}
                  </h3>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-400 transition-colors duration-300 opacity-0 group-hover:opacity-100" />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs bg-slate-700/50 text-slate-300 hover:bg-blue-600/20 hover:text-blue-300 transition-colors duration-300"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              whileHover={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="text-slate-400 text-sm leading-relaxed pt-2 border-t border-slate-700/30">{description}</p>
            </motion.div>
          </CardContent>

          {/* Subtle glow effect */}
          <motion.div
            className="absolute inset-0 bg-blue-400/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
            initial={false}
          />
        </a>
      </Card>
    </motion.div>
  )
}

// Business achievement card
const BusinessCard = ({
  title,
  description,
  icon: Icon,
  delay = 0,
}: {
  title: string
  description: string
  icon: any
  delay?: number
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            whileHover={{
              scale: 1.05,
              rotateY: 3,
              rotateX: 3,
            }}
            className="group cursor-pointer"
          >
            <Card className="relative bg-purple-900/30 border-purple-700/50 hover:border-purple-400/50 transition-all duration-300 overflow-hidden backdrop-blur-sm">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />

              <CardContent className="p-5 relative z-10">
                <div className="flex items-start gap-3">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="p-2 bg-purple-600/20 rounded-lg mt-0.5"
                  >
                    <Icon className="w-4 h-4 text-purple-400" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
                      {title}
                    </h3>
                    <p className="text-purple-200/80 text-sm mt-2 leading-relaxed">{description}</p>
                  </div>
                </div>
              </CardContent>

              {/* Subtle glow effect */}
              <motion.div
                className="absolute inset-0 bg-purple-400/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                initial={false}
              />
            </Card>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-purple-900 text-purple-100 border-purple-700 max-w-xs">
          <p className="text-sm">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default function DualPanelSection() {
  const techProjects = [
    {
      title: "Encryption-Decryption-CPP",
      description: "Demonstrates basic encryption and decryption techniques.",
      tags: ["C++"],
      githubUrl: "https://github.com/SuperAndy777/Encryption-Decryption-CPP",
    },
    {
      title: "Ultroid (Forked)",
      description: "Customized Telegram UserBot with extended functionalities.",
      tags: ["Python", "Telegram Bot"],
      githubUrl: "https://github.com/SuperAndy777/Ultroid",
    },
    {
      title: "Team-Rudra-Project",
      description: "Prints digits of π up to N digits using pattern generation.",
      tags: ["Erlang"],
      githubUrl: "https://github.com/SuperAndy777/Team-Rudra-Project",
    },
    {
      title: "Master-Shifu",
      description: "Enhances cab-driving platforms with real-time insights and gamification.",
      tags: ["JavaScript"],
      githubUrl: "https://github.com/SuperAndy777/Master-Shifu",
    },
    {
      title: "Tower-Defense",
      description: "A strategic tower defense game showcasing game development skills.",
      tags: ["C#", "Game Development"],
      githubUrl: "https://github.com/SuperAndy777/Tower-Defense",
    },
  ]

  const businessAchievements = [
    {
      title: "AIESEC – Head of BD",
      description: "Led cross-border BD initiatives across 15+ countries.",
      icon: Users,
    },
    {
      title: "National Partnerships Manager",
      description: "Secured $2M+ in impact-focused partnerships.",
      icon: Target,
    },
    {
      title: "Youth Facilitation & Speaking",
      description: "Facilitated 500+ youth via events, talks, and mentorship.",
      icon: Network,
    },
  ]

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-black overflow-hidden">
      {/* Parallax stars background */}
      <ParallaxStars />

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Left Panel - Tech Side */}
        <motion.div
          className="flex-1 relative bg-slate-900/50 backdrop-blur-sm"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <BinaryMatrix />

          <div className="relative z-10 p-6 lg:p-12 h-full flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-3">
                <Code2 className="w-7 h-7 text-blue-400" />
                <h2 className="text-3xl lg:text-4xl font-bold text-white">Tech Side</h2>
              </div>
              <p className="text-lg text-slate-300">Building intelligent systems & crafting clean code.</p>
            </motion.div>

            <div className="flex-1 space-y-4 max-w-2xl">
              {techProjects.map((project, index) => (
                <TechCard
                  key={index}
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  githubUrl={project.githubUrl}
                  delay={0.4 + index * 0.1}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Center divider with lightsaber glow */}
        <div className="relative w-px lg:w-1 bg-gradient-to-b from-transparent via-blue-400 to-transparent">
          <motion.div
            className="absolute inset-0 bg-blue-400 blur-sm"
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Right Panel - Business & Leadership */}
        <motion.div
          className="flex-1 relative bg-purple-950/50 backdrop-blur-sm"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <NeuralNetwork />

          <div className="relative z-10 p-6 lg:p-12 h-full flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-3">
                <Briefcase className="w-7 h-7 text-purple-400" />
                <h2 className="text-3xl lg:text-4xl font-bold text-white">Business & Leadership</h2>
              </div>
              <p className="text-lg text-purple-200">Strategic partnerships. Bold communication.</p>
            </motion.div>

            <div className="flex-1 space-y-6 max-w-2xl">
              {businessAchievements.map((achievement, index) => (
                <BusinessCard
                  key={index}
                  title={achievement.title}
                  description={achievement.description}
                  icon={achievement.icon}
                  delay={0.4 + index * 0.15}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
