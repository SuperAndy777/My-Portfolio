"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ExternalLink, Music, Users } from "lucide-react"

const SpotifyWidget = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <div className="flex items-center gap-3 mb-4">
        <Music className="text-green-500" size={24} />
        <span className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">Now Playing</span>
      </div>
      <div className="space-y-3">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden transition-colors duration-300">
          <motion.div
            className="h-full bg-green-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "60%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>
        <div>
          <p className="font-medium text-gray-900 dark:text-white transition-colors duration-300">Bohemian Rhapsody</p>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Queen</p>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
          Currently vibing to some classics 🎧
        </div>
      </div>
    </div>
  )
}

const DiscordButton = () => {
  return (
    <motion.a
      href="https://discordid.netlify.app/?id=727821827384016916"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 px-6 py-4 bg-indigo-600 dark:bg-indigo-500 text-white rounded-full hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-300 micro-bounce shadow-lg hover:shadow-xl"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Users size={20} />
      <span className="font-medium">Connect on Discord</span>
      <ExternalLink size={16} />
    </motion.a>
  )
}

export default function FunSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-200px" })

  return (
    <section ref={ref} className="pt-20 pb-24 px-6 bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-500"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            I Have Fun
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-500">
            Code, chaos, chords
          </p>
          <div className="text-2xl space-x-2">
            <span>🎧</span>
            <span>🧠</span>
            <span>✍️</span>
            <span>🎮</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SpotifyWidget />
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <DiscordButton />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
