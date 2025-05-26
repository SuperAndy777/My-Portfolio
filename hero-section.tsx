"use client"

import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Linkedin, Github } from "lucide-react"
import Image from "next/image"

// Animated stars component
const AnimatedStars = () => {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 3 + 2,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full opacity-70"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1],
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
        <div className="absolute inset-0 bg-blue-400 rounded-full opacity-20 blur-xl animate-pulse" />
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
          className="absolute bottom-16 right-8 w-1 h-16 bg-gradient-to-t from-blue-400 to-cyan-300 rounded-full shadow-lg"
          animate={{
            opacity: [0.7, 1, 0.7],
            boxShadow: ["0 0 10px #60a5fa", "0 0 20px #60a5fa, 0 0 30px #22d3ee", "0 0 10px #60a5fa"],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Frame border effect */}
        <div className="absolute inset-0 rounded-lg border-2 border-blue-400/20 shadow-inner" />
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
            className="relative w-12 h-12 rounded-full bg-gray-800/50 border border-blue-500/30 hover:border-blue-400/60 transition-all duration-300 flex items-center justify-center group cursor-pointer z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300 pointer-events-none" />
            <motion.div
              className="absolute inset-0 rounded-full bg-blue-400/20 pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{
                opacity: 1,
                scale: 1.2,
                boxShadow: "0 0 20px rgba(96, 165, 250, 0.5)",
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-gray-800 text-white border-gray-700">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default function HeroSection() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      {/* Animated stars background */}
      <AnimatedStars />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 md:px-8">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left side - Your Profile Photo */}
          <motion.div
            className="flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <JediAvatar />
          </motion.div>

          {/* Center - Main content with enhanced typography */}
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Name with enhanced styling */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-none">
                <span className="block bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent drop-shadow-2xl">
                  Anil
                </span>
                <span className="block bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl -mt-1 md:-mt-2 lg:-mt-3">
                  Guwalani
                </span>
              </h1>

              {/* Glowing underline */}
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "60%" }}
                transition={{ duration: 1.5, delay: 1.2 }}
              />

              {/* Subtle glow effect behind text */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-purple-600/20 blur-3xl -z-10 scale-150" />
            </motion.div>

            {/* Enhanced subtitle */}
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light tracking-wide leading-relaxed">
                <span className="bg-gradient-to-r from-gray-200 via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                  Engineering the future.
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Leading with purpose.
                </span>
              </p>

              {/* Floating accent dots */}
              <motion.div
                className="absolute -left-4 top-1/2 w-2 h-2 bg-blue-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -right-4 top-1/2 w-2 h-2 bg-cyan-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  delay: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              className="flex justify-center items-center space-x-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-blue-400" />
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-cyan-400" />
            </motion.div>
          </motion.div>

          {/* Right side - Grogu Pod */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <GroguPod />
          </motion.div>
        </div>
      </div>

      {/* Social icons - Bottom right */}
      <motion.div
        className="absolute bottom-8 right-8 flex flex-col space-y-4 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <SocialIcon icon={Linkedin} href="https://www.linkedin.com/in/anilguwalani/" label="LinkedIn" />
        <SocialIcon icon={Github} href="https://github.com/SuperAndy777" label="GitHub" />
      </motion.div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </div>
  )
}
