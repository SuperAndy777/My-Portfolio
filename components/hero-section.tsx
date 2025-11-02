"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Send, Linkedin, Github, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

const SocialLinks = () => {
  return (
    <div className="fixed top-6 left-6 z-10 flex gap-3">
      <motion.a
        href="https://www.linkedin.com/in/anilguwalani/"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 bg-white/80 dark:bg-gray-800/80 rounded-full flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Linkedin size={18} className="text-blue-600" />
      </motion.a>

      <motion.a
        href="https://github.com/SuperAndy777"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 bg-white/80 dark:bg-gray-800/80 rounded-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Github size={18} className="text-gray-700 dark:text-gray-300" />
      </motion.a>
    </div>
  )
}

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-6 right-6 z-10 w-10 h-10 bg-white/80 dark:bg-gray-800/80 rounded-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </motion.button>
  )
}

export default function HeroSection() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailtoLink = `mailto:anil.guwalani@example.com?subject=Message from Portfolio&body=${encodeURIComponent(message)}`
    window.location.href = mailtoLink
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      <SocialLinks />
      <DarkModeToggle />

      <motion.div
        className="max-w-3xl w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">Hey! it's Anil!</h1>
        <p className="text-xl mb-4 text-muted-foreground">Hello | नमस्ते | ترحبا | पर्खार | नमस्कार</p>
        <p className="text-lg text-muted-foreground mb-8">(just a few languages you can talk to me in :))</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
          <div className="flex gap-2 flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Say hello..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-foreground text-background rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2 font-medium"
            >
              <Send size={18} />
              Send
            </button>
          </div>

          <a
            href="https://drive.google.com/file/d/1-h-vQVjTXAgDniuj7KASwm1Wi3eB4zjk/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-foreground text-background rounded-lg hover:opacity-90 transition font-medium w-full sm:w-auto"
          >
            Resume
          </a>
        </form>
      </motion.div>
    </section>
  )
}
