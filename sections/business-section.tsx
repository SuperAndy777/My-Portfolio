"use client"

import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Briefcase, Network, Users } from "lucide-react"
import { useRef } from "react"

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
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 15px #66ccff33",
            }}
            className="group cursor-pointer mb-6 lg:mb-8 last:mb-0"
          >
            <Card className="relative bg-slate-800/30 border-slate-600/40 hover:border-[#66ccff]/60 transition-all duration-500 overflow-hidden backdrop-blur-sm">
              {/* Glowing background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#66ccff]/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
              />

              <CardContent className="p-6 lg:p-8 relative z-10">
                <div className="flex items-center gap-6">
                  {/* Icon */}
                  <motion.div
                    className="p-4 bg-[#66ccff]/20 rounded-full border border-[#66ccff]/30 group-hover:border-[#66ccff]/60 transition-colors duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-[#66ccff] group-hover:text-[#66ccff]/80 transition-colors duration-300" />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="heading-small group-hover:text-accent transition-colors duration-300 mb-2">
                      {title}
                    </h3>
                    <p className="text-body-medium text-light leading-relaxed">{description}</p>
                  </div>
                </div>
              </CardContent>

              {/* Glowing border */}
              <motion.div
                className="absolute inset-0 border border-[#66ccff]/0 group-hover:border-[#66ccff]/50 rounded-lg transition-all duration-500"
                whileHover={{
                  boxShadow: "0 0 30px rgba(102, 204, 255, 0.2)",
                }}
              />
            </Card>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="bg-slate-800/90 text-white border-[#66ccff]/30 backdrop-blur-sm max-w-xs"
        >
          <p className="text-body-small">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default function BusinessSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-200px" })

  const businessRoles = [
    {
      icon: Briefcase,
      title: "Board of Advisors Liaison",
      description:
        "Facilitated engagement between the organization and its advisory board, managing external relations with senior advisory members.",
      tooltip: "Managing strategic advisory relationships and external stakeholder communications.",
    },
    {
      icon: Network,
      title: "Partnerships & Youth Events",
      description:
        "Built strategic partnerships and hosted national-level youth events, creating impactful experiences for diverse audiences.",
      tooltip: "Leading partnership development and large-scale youth forum coordination.",
    },
    {
      icon: Users,
      title: "Leading 26-Person Team",
      description:
        "Empowered a diverse cross-functional team across design, business development, and operations to execute high-impact projects.",
      tooltip: "Team leadership across multiple disciplines with focus on empowerment and results.",
    },
  ]

  return (
    <section ref={ref} className="relative min-h-screen w-full flex flex-col justify-center px-6 lg:px-8 py-20">
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
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
            Business & Leadership
          </motion.h1>
          <motion.p
            className="heading-medium text-light mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            Leading with clarity. Building with purpose.
          </motion.p>
        </motion.div>

        {/* Business Cards */}
        <div className="space-y-6">
          {businessRoles.map((role, index) => (
            <BusinessCard
              key={index}
              icon={role.icon}
              title={role.title}
              description={role.description}
              tooltip={role.tooltip}
              delay={isInView ? 0.2 + index * 0.1 : 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
