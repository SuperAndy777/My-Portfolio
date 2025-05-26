"use client"

import { motion, useInView } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Linkedin, Github } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"

// Grogu floating pod component
const GroguPod = () => {
  return (
    <motion.div
      className="relative"
      animate={{
        y: [-10, 10, -10],
        rotate: [-2, 2, -2],
      }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      <div className="relative w-48 h-48 md:w-64 md:h-64">
        {/* Pod shell */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full shadow-2xl">
          <div className="absolute inset-2 bg-gradient-to-br from-gray-100 to-gray-300 rounded-full">
            <div className="absolute inset-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center overflow-hidden">
              {/* Grogu with ice cream - perfectly round */}
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/images/grogu-ice-cream.jpg"
                  alt="Grogu with ice cream"
                  fill
                  className="object-cover object-center scale-110"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
        {/* Pod glow effect */}
        <div className="absolute inset-0 bg-[#66ccff] rounded-full opacity-20 blur-xl animate-pulse" />
      </div>
    </motion.div>
  )
}

// Jedi avatar component
const JediAvatar = () => {
  return (
    <div className="relative">
      <div className="relative w-64 h-80 md:w-80 md:h-96">
        {/* Avatar with your actual photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-2xl overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src="/images/profile-photo.jpg"
              alt="Anil Guwalani"
              fill
              className="object-cover"
              priority
              style={{
                filter: "contrast(1.1) brightness(0.95) saturate(1.1)",
              }}
            />
            {/* Subtle overlay for the space theme */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            {/* Sketch overlay effect */}
            <div className="absolute inset-0 bg-blue-900/10" />
          </div>
        </div>

        {/* Glowing stylus */}
        <motion.div
          className="absolute bottom-16 right-8 w-1 h-16 bg-gradient-to-t from-[#66ccff] to-cyan-300 rounded-full shadow-lg"
          animate={{
            opacity: [0.7, 1, 0.7],
            boxShadow: ["0 0 10px #66ccff", "0 0 20px #66ccff, 0 0 30px #22d3ee", "0 0 10px #66ccff"],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Frame border effect */}
        <div className="absolute inset-0 rounded-lg border-2 border-[#66ccff]/20 shadow-inner" />
      </div>
    </div>
  )
}

// Social icon component
const SocialIcon = ({ icon: Icon, href, label }: { icon: any; href: string; label: string }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-12 h-12 rounded-full bg-gray-800/50 border border-[#66ccff]/30 hover:border-[#66ccff]/60 transition-all duration-300 flex items-center justify-center group cursor-pointer z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className="w-6 h-6 text-[#66ccff] group-hover:text-[#66ccff]/80 transition-colors duration-300 pointer-events-none" />
            <motion.div
              className="absolute inset-0 rounded-full bg-[#66ccff]/20 pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{
                opacity: 1,
                scale: 1.2,
                boxShadow: "0 0 20px rgba(102, 204, 255, 0.5)",
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-gray-800 text-white border-gray-700">
          <p className="font-montserrat text-sm">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default function HeroSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-200px" })

  return (
    <section ref={ref} className="relative min-h-screen w-full flex items-center justify-center px-4 md:px-8">
      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        {/* Left side - Your Profile Photo */}
        <motion.div
          className="flex justify-center lg:justify-start"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <JediAvatar />
        </motion.div>

        {/* Center - Main content with enhanced typography */}
        <motion.div
          className="text-center space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {/* Name with Star Jedi font */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <h1 className="font-star-jedi heading-responsive text-[#f1f1f1] text-glow-blue tracking-wider">
              <span className="block">Anil</span>
              <span className="block -mt-2 md:-mt-4">Guwalani</span>
            </h1>

            {/* Glowing underline */}
            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-[#66ccff] to-transparent rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: "60%" } : {}}
              transition={{ duration: 1.5, delay: 1.2 }}
            />
          </motion.div>

          {/* Enhanced subtitle with Komika Axis */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <p className="font-komika subheading-responsive text-[#a0a0a0] leading-relaxed">
              Engineering the future.
              <br />
              Leading with purpose.
            </p>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            className="flex justify-center items-center space-x-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.4 }}
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#66ccff]" />
            <div className="w-2 h-2 bg-[#66ccff] rounded-full animate-pulse" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#66ccff]" />
          </motion.div>
        </motion.div>

        {/* Right side - Grogu Pod */}
        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <GroguPod />
        </motion.div>
      </div>

      {/* Social icons - Bottom right */}
      <motion.div
        className="absolute bottom-8 right-8 flex flex-col space-y-4 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 1 }}
      >
        <SocialIcon icon={Linkedin} href="https://www.linkedin.com/in/anilguwalani/" label="LinkedIn" />
        <SocialIcon icon={Github} href="https://github.com/SuperAndy777" label="GitHub" />
      </motion.div>
    </section>
  )
}
