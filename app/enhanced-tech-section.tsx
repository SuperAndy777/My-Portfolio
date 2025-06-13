"use client"

import { motion, useInView } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Car, Bot, Gamepad2, ExternalLink } from "lucide-react"
import { useRef } from "react"
import { HolographicCard } from "../components/holographic-card"

// Enhanced tech project card with holographic effects
const EnhancedTechCard = ({
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
            className="group h-full cursor-pointer"
          >
            <HolographicCard className="h-full" glowColor="#00ffff">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
                <div className="flex flex-col items-center text-center h-full">
                  {/* Icon with enhanced glow */}
                  <motion.div
                    className="mb-6 p-4 rounded-full border border-[#00ffff]/30 group-hover:border-[#00ffff]/60 transition-colors duration-300 relative"
                    style={{
                      background: "radial-gradient(circle, rgba(0,255,255,0.1) 0%, transparent 70%)",
                    }}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Icon className="w-8 h-8 text-[#00ffff] group-hover:text-white transition-colors duration-300" />

                    {/* Icon glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(0,255,255,0.3)",
                          "0 0 40px rgba(0,255,255,0.6)",
                          "0 0 20px rgba(0,255,255,0.3)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>

                  {/* Title with enhanced styling */}
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="heading-small text-white group-hover:text-[#00ffff] transition-colors duration-300">
                      {title}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#00ffff] transition-colors duration-300 opacity-0 group-hover:opacity-100" />
                  </div>

                  {/* Description with reveal animation */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    whileHover={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-body-medium text-gray-300 leading-relaxed pt-2 border-t border-[#00ffff]/20">
                      {description}
                    </p>
                  </motion.div>
                </div>
              </a>
            </HolographicCard>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="bg-[#0a0a23]/90 text-[#00ffff] border-[#00ffff]/30 backdrop-blur-sm max-w-xs"
          style={{
            boxShadow: "0 0 20px rgba(0,255,255,0.3)",
          }}
        >
          <p className="text-body-small">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default function EnhancedTechSection() {
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
    <section
      ref={ref}
      className="relative min-h-screen w-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h1
            className="heading-section tracking-wide text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            style={{
              textShadow: "0 0 20px rgba(0,255,255,0.5)",
            }}
          >
            Tech Side
          </motion.h1>
          <motion.p
            className="heading-medium text-[#00ffff] mt-3 sm:mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            Crafting code. Building systems.
          </motion.p>
        </motion.div>

        {/* Enhanced Tech Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {techProjects.map((project, index) => (
            <EnhancedTechCard
              key={index}
              icon={project.icon}
              title={project.title}
              description={project.description}
              githubUrl={project.githubUrl}
              delay={isInView ? 0.2 + index * 0.1 : 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
