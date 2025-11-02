"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Send, Linkedin, Github, Moon, Sun } from "lucide-react"

const SocialLinks = () => {
  return (
    <div className="fixed top-6 left-6 z-10 flex gap-3">
      <motion.a
        href="https://www.linkedin.com/in/anilguwalani/"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-accent/25 hover:bg-accent/40 border-2 border-accent rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Linkedin size={20} className="text-accent" />
      </motion.a>

      <motion.a
        href="https://github.com/SuperAndy777"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-accent/25 hover:bg-accent/40 border-2 border-accent rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Github size={20} className="text-accent" />
      </motion.a>
    </div>
  )
}

const DarkModeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setMounted(true)
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const stored = localStorage.getItem("theme")

    if (stored) {
      setIsDark(stored === "dark")
      document.documentElement.classList.toggle("dark", stored === "dark")
    } else {
      setIsDark(prefersDark)
      document.documentElement.classList.toggle("dark", prefersDark)
    }
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    localStorage.setItem("theme", newIsDark ? "dark" : "light")
    document.documentElement.classList.toggle("dark", newIsDark)
  }

  if (!mounted) {
    return (
      <div className="fixed top-6 right-6 z-10">
        <div className="w-10 h-10 bg-muted/30 backdrop-blur-sm border border-border rounded-full flex items-center justify-center shadow-sm">
          <div className="w-5 h-5 bg-muted rounded animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="fixed top-6 right-6 z-10">
      <motion.button
        onClick={toggleTheme}
        className="w-10 h-10 bg-secondary/50 hover:bg-secondary/70 backdrop-blur-sm border border-border rounded-full flex items-center justify-center transition-all duration-300 shadow-sm"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        aria-label="Toggle theme"
      >
        {isDark ? <Sun size={18} className="text-accent" /> : <Moon size={18} className="text-foreground" />}
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
    <motion.div
      className="flex flex-col md:flex-row items-center gap-4 justify-center flex-wrap"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="flex gap-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Say hello..."
          className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-secondary text-foreground placeholder-muted-foreground transition-colors duration-300"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-200 flex items-center gap-2 micro-bounce whitespace-nowrap font-semibold shadow-md hover:shadow-lg"
        >
          <Send size={16} />
          Send
        </button>
      </div>

      <motion.a
        href="https://drive.google.com/file/d/1-h-vQVjTXAgDniuj7KASwm1Wi3eB4zjk/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors duration-200 font-medium border border-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        Resume
      </motion.a>
    </motion.div>
  )
}

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-32 pb-12 px-6 bg-background overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />

      <SocialLinks />
      <DarkModeToggle />

      {/* Main Content */}
      <div className="text-center max-w-4xl mx-auto flex-1 flex flex-col justify-center relative z-10">
        <motion.h1
          className="text-7xl md:text-8xl lg:text-9xl font-extrabold text-foreground mb-8 leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Hey! it's Anil!
        </motion.h1>

        <motion.div
          className="space-y-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-3xl md:text-4xl text-accent font-bold">Hello | 你好 | नमस्ते | ڀليڪار | नमस्कार</p>
          <p className="text-lg md:text-xl text-muted-foreground italic">
            (just a few languages you can talk to me in :) )
          </p>
        </motion.div>

        <ContactForm />
      </div>
    </section>
  )
}
