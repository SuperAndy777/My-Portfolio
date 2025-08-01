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
              scale: 1.03,
              boxShadow: "0 0 15px #66ccff33",
            }}
            className="group h-full cursor-pointer"
          >
            <Card className="portfolio-card h-full">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
                {/* Glowing background on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#66ccff]/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 rounded-lg"
                  transition={{ duration: 0.5 }}
                />

                <CardContent className="p-4 sm:p-6 md:p-8 relative z-10 flex flex-col items-center text-center h-full">
                  {/* Icon */}
                  <motion.div
                    className="mb-4 sm:mb-6 p-3 sm:p-4 bg-[#66ccff]/20 rounded-full border border-[#66ccff]/30 group-hover:border-[#66ccff]/60 transition-colors duration-300"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#66ccff] group-hover:text-[#66ccff]/80 transition-colors duration-300" />
                  </motion.div>

                  {/* Title */}
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <h3 className="heading-small group-hover:text-accent transition-colors duration-300">{title}</h3>
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-[#66ccff] transition-colors duration-300 opacity-0 group-hover:opacity-100" />
                  </div>

                  {/* Description */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    whileHover={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-body-medium text-light leading-relaxed pt-2 border-t border-slate-700/30">
                      {description}
                    </p>
                  </motion.div>
                </CardContent>
              </a>
            </Card>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-slate-800/90 text-white border-[#66ccff]/30 backdrop-blur-sm max-w-xs">
          <p className="text-body-small">{description}</p>
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
    <section
      ref={ref}
      className="relative min-h-screen w-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h1
            className="heading-section tracking-wide fade-in-up"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            Tech Side
          </motion.h1>
          <motion.p
            className="heading-medium text-light mt-3 sm:mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            Crafting code. Building systems.
          </motion.p>
        </motion.div>

        {/* Tech Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {techProjects.map((project, index) => (
            <TechCard
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
