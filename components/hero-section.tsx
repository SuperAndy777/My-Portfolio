"use client"

import React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Send, Linkedin, Github, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

const SocialLinks = () => {
  return (
    <div className="fixed top-6 left-6 z-10 flex gap-3">
      <motion.a
        href="https://www.linkedin.com/in/anilguwalani/"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 shadow-sm"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Linkedin size={18} className="text-blue-600 dark:text-blue-400" />
      </motion.a>

      <motion.a
        href="https://github.com/SuperAndy777"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300 shadow-sm"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Github size={18} className="text-gray-700 dark:text-gray-300" />
      </motion.a>
    </div>
  )
}

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="fixed top-6 right-6 z-10">
        <div className="w-10 h-10 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full flex items-center justify-center shadow-sm">
          <div className="w-5 h-5 bg-gray-300 rounded animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="fixed top-6 right-6 z-10">
      <motion.button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="w-10 h-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300 shadow-sm"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {theme === "dark" ? (
          <Sun size={18} className="text-yellow-500" />
        ) : (
          <Moon size={18} className="text-gray-700" />
        )}
      </motion.button>
    </div>
  )
}

const ContactForm = () => {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = "Hello from your portfolio!"
    const body = message || "Hi Anil, I'd love to connect!"
    window.location.href = `mailto:anilguwalani78@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex gap-3 max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Say hello..."
        className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2 micro-bounce"
      >
        <Send size={16} />
        Send
      </button>
    </motion.form>
  )
}

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-24 px-6 bg-white dark:bg-gray-900 transition-colors duration-500">
      <SocialLinks />
      <DarkModeToggle />

      <div className="text-center max-w-4xl mx-auto">
        <motion.h1
          className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-8 slide-down transition-colors duration-500"
          style={{ fontFamily: "Sora, sans-serif" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Hey! it's Anil!
        </motion.h1>

        <motion.div
          className="space-y-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 font-medium transition-colors duration-500">
            Hello | 你好 | नमस्ते | ڀليڪار | नमस्कार
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 italic transition-colors duration-500">
            (just a few languages you can talk to me in :) )
          </p>
        </motion.div>

        <ContactForm />
      </div>
    </section>
  )
}
