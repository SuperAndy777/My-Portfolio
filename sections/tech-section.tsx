"use client"

import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Car, Bot, Gamepad2, ExternalLink } from "lucide-react"
import { useRef } from "react"

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
              y: -10,
              boxShadow: "0 20px 40px rgba(102, 204, 255, 0.2)",
            }}
            className="group h-full cursor-pointer"
          >
            <Card className="relative bg-slate-800/30 border-slate-600/50 hover:border-[#66ccff]/60 transition-all duration-500 overflow-hidden backdrop-blur-sm h-full">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
                {/* Glowing background on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#66ccff]/10 to-cyan-500/10 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.5 }}
                />

                <CardContent className="p-6 md:p-8 relative z-10 flex flex-col items-center text-center h-full">
                  {/* Icon */}
                  <motion.div
                    className="mb-6 p-4 bg-[#66ccff]/20 rounded-full border border-[#66ccff]/30 group-hover:border-[#66ccff]/60 transition-colors duration-300"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-[#66ccff] group-hover:text-[#66ccff]/80 transition-colors duration-300" />
                  </motion.div>

                  {/* Title */}
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="font-komika text-lg md:text-xl font-bold text-[#f1f1f1] group-hover:text-[#66ccff] transition-colors duration-300">
                      {title}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#66ccff] transition-colors duration-300 opacity-0 group-hover:opacity-100" />
                  </div>

                  {/* Description */}
                  <p className="font-montserrat text-sm md:text-base text-[#a0a0a0] leading-relaxed flex-1">
                    {description}
                  </p>
                </CardContent>

                {/* Glowing border effect */}
                <motion.div
                  className="absolute inset-0 border border-[#66ccff]/0 group-hover:border-[#66ccff]/50 rounded-lg transition-all duration-500"
                  whileHover={{
                    boxShadow: "0 0 30px rgba(102, 204, 255, 0.3)",
                  }}
                />
              </a>
            </Card>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-slate-800/90 text-white border-[#66ccff]/30 backdrop-blur-sm max-w-xs">
          <p className="font-montserrat text-sm">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default function TechSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-200px" })

  const techProjects = [
    {
      icon: Car,
      title: "Master-Shifu",
      description:
        "Enhances cab-driving platforms with real-time insights and gamification for better driver experience.",
      githubUrl: "https://github.com/SuperAndy777/Master-Shifu",
    },
    {
      icon: Bot,
      title: "Ultroid Bot",
      description: "Custom Telegram UserBot with extended functionalities and automated workflow management.",
      githubUrl: "https://github.com/SuperAndy777/Ultroid",
    },
    {
      icon: Gamepad2,
      title: "Tower Defense",
      description: "Strategic tower defense game showcasing game development skills and algorithmic thinking.",
      githubUrl: "https://github.com/SuperAndy777/Tower-Defense",
    },
  ]

  return (
    <section ref={ref} className="relative min-h-screen w-full flex flex-col justify-center px-6 lg:px-8 py-20">
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <motion.h2
            className="font-star-jedi heading-responsive text-[#f1f1f1] text-glow-blue mb-6 tracking-wider"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Tech Side
          </motion.h2>
          <motion.p
            className="font-komika subheading-responsive text-[#a0a0a0] max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Crafting code. Building systems.
          </motion.p>
        </motion.div>

        {/* Tech Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {techProjects.map((project, index) => (
            <TechCard
              key={index}
              icon={project.icon}
              title={project.title}
              description={project.description}
              githubUrl={project.githubUrl}
              delay={isInView ? 0.2 + index * 0.2 : 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
