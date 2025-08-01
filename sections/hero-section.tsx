"use client"

import { motion, useInView } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Linkedin, Github } from "lucide-react"
import { useRef } from "react"

// CSS-based Grogu Pod (no external images)
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
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56">
        {/* Pod shell */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full shadow-2xl">
          <div className="absolute inset-2 bg-gradient-to-br from-gray-100 to-gray-300 rounded-full">
            <div className="absolute inset-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center overflow-hidden">
              {/* CSS-based Grogu character */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Grogu's head */}
                <div className="relative w-16 h-20 bg-gradient-to-b from-green-200 to-green-300 rounded-full">
                  {/* Eyes */}
                  <div className="absolute top-6 left-3 w-3 h-4 bg-black rounded-full"></div>
                  <div className="absolute top-6 right-3 w-3 h-4 bg-black rounded-full"></div>
                  {/* Ears */}
                  <div className="absolute -top-2 -left-2 w-4 h-8 bg-gradient-to-b from-green-200 to-green-300 rounded-full transform -rotate-12"></div>
                  <div className="absolute -top-2 -right-2 w-4 h-8 bg-gradient-to-b from-green-200 to-green-300 rounded-full transform rotate-12"></div>
                  {/* Ice cream cone */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div
                      className="w-3 h-6 bg-gradient-to-b from-yellow-200 to-yellow-400 transform rotate-180"
                      style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                    ></div>
                    <div className="w-4 h-3 bg-gradient-to-b from-pink-200 to-pink-300 rounded-t-full -mt-1"></div>
                  </div>
                </div>
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

// CSS-based Avatar (no external images)
const JediAvatar = () => {
  return (
    <div className="relative">
      <div className="relative w-48 h-60 sm:w-56 sm:h-72 md:w-64 md:h-80 lg:w-72 lg:h-88">
        {/* Avatar container */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-2xl overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* CSS-based portrait */}
            <div className="relative w-32 h-40 bg-gradient-to-b from-amber-100 to-amber-200 rounded-lg">
              {/* Head */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-gradient-to-b from-amber-100 to-amber-200 rounded-full">
                {/* Hair */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-18 h-8 bg-gradient-to-b from-gray-800 to-gray-700 rounded-full"></div>
                {/* Eyes */}
                <div className="absolute top-6 left-3 w-2 h-2 bg-gray-800 rounded-full"></div>
                <div className="absolute top-6 right-3 w-2 h-2 bg-gray-800 rounded-full"></div>
                {/* Smile */}
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-4 h-2 border-b-2 border-gray-800 rounded-full"></div>
              </div>
              {/* Body/Shirt */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-24 bg-gradient-to-b from-blue-600 to-blue-800 rounded-t-lg">
                {/* Collar */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-white rounded-b-lg"></div>
              </div>
            </div>

            {/* Tech elements overlay */}
            <div className="absolute inset-0 opacity-20">
              {/* Code symbols */}
              <div className="absolute top-4 left-4 text-[#66ccff] font-mono text-xs">&lt;/&gt;</div>
              <div className="absolute top-8 right-6 text-[#66ccff] font-mono text-xs">{"{}"}</div>
              <div className="absolute bottom-12 left-6 text-[#66ccff] font-mono text-xs">[]</div>
              <div className="absolute bottom-8 right-4 text-[#66ccff] font-mono text-xs">=&gt;</div>
            </div>

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute inset-0 bg-blue-900/10" />
          </div>
        </div>

        {/* Glowing stylus */}
        <motion.div
          className="absolute bottom-12 right-6 w-1 h-12 bg-gradient-to-t from-[#66ccff] to-cyan-300 rounded-full shadow-lg"
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
            className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-800/50 border border-[#66ccff]/30 hover:border-[#66ccff]/60 transition-all duration-300 flex items-center justify-center group cursor-pointer z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#66ccff] group-hover:text-[#66ccff]/80 transition-colors duration-300 pointer-events-none" />
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
          <p className="text-body-small">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default function HeroSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-200px" })

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 md:px-8 py-8"
    >
      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Mobile Layout - Stack vertically */}
        <div className="block lg:hidden">
          {/* Mobile: Center content first */}
          <motion.div
            className="text-center space-y-6 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Name */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <h1 className="heading-hero tracking-wide">
                <span className="block">Anil</span>
                <span className="block -mt-2 sm:-mt-3">Guwalani</span>
              </h1>

              {/* Glowing underline */}
              <motion.div
                className="absolute -bottom-2 sm:-bottom-3 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-[#66ccff] to-transparent rounded-full"
                initial={{ width: 0 }}
                animate={isInView ? { width: "60%" } : {}}
                transition={{ duration: 1.5, delay: 1.2 }}
              />
            </motion.div>

            {/* Subtitle */}
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <p className="heading-medium text-light leading-tight">
                Engineering the future.
                <br />
                Leading with purpose.
              </p>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              className="flex justify-center items-center space-x-4 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1.4 }}
            >
              <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-[#66ccff]" />
              <div className="w-2 h-2 bg-[#66ccff] rounded-full animate-pulse" />
              <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-[#66ccff]" />
            </motion.div>
          </motion.div>

          {/* Mobile: Images side by side */}
          <div className="flex justify-center items-center gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <JediAvatar />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <GroguPod />
            </motion.div>
          </div>
        </div>

        {/* Desktop Layout - Three columns */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 items-center">
          {/* Left side - Your Profile Avatar */}
          <motion.div
            className="flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <JediAvatar />
          </motion.div>

          {/* Center - Main content */}
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Name */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <h1 className="heading-hero tracking-wide">
                <span className="block">Anil</span>
                <span className="block -mt-4 md:-mt-6">Guwalani</span>
              </h1>

              {/* Glowing underline */}
              <motion.div
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-[#66ccff] to-transparent rounded-full"
                initial={{ width: 0 }}
                animate={isInView ? { width: "60%" } : {}}
                transition={{ duration: 1.5, delay: 1.2 }}
              />
            </motion.div>

            {/* Subtitle */}
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <p className="heading-medium text-light leading-tight">
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
      </div>

      {/* Social icons - Bottom right */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 flex flex-col space-y-3 sm:space-y-4 z-50"
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
