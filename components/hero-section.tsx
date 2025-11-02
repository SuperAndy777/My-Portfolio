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
        className="w-10 h-10 bg-accent/20 hover:bg-accent/30 backdrop-blur-sm border border-accent/40 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Linkedin size={18} className="text-accent" />
      </motion.a>

      <motion.a
        href="https://github.com/SuperAndy777"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 bg-accent/20 hover:bg-accent/30 backdrop-blur-sm border border-accent/40 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Github size={18} className="text-accent" />
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
        <div className="w-10 h-10 bg-muted/30 backdrop-blur-sm border border-border rounded-full flex items-center justify-center shadow-sm">
          <div className="w-5 h-5 bg-muted rounded animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="fixed top-6 right-6 z-10">
      <motion.button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="w-10 h-10 bg-secondary/50 hover:bg-secondary/70 backdrop-blur-sm border border-border rounded-full flex items-center justify-center transition-all duration-300 shadow-sm"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {theme === "dark" ? <Sun size={18} className="text-accent" /> : <Moon size={18} className="text-foreground" />}
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
          className="px-6 py-3 bg-accent text-primary rounded-lg hover:bg-accent/90 transition-colors duration-200 flex items-center gap-2 micro-bounce whitespace-nowrap font-medium"
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
    <section className="min-h-screen flex flex-col items-center justify-center pt-20 pb-12 px-6 bg-background transition-colors duration-500">
      <SocialLinks />
      <DarkModeToggle />

      {/* Main Content */}
      <div className="text-center max-w-4xl mx-auto flex-1 flex flex-col justify-center">
        <motion.h1
          className="text-6xl md:text-8xl font-bold text-foreground mb-8 slide-down transition-colors duration-500"
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
          <p className="text-2xl md:text-3xl text-muted-foreground font-medium transition-colors duration-500">
            Hello | 你好 | नमस्ते | ڀليڪار | नमस्कार
          </p>
          <p className="text-lg text-muted-foreground/80 italic transition-colors duration-500">
            (just a few languages you can talk to me in :) )
          </p>
        </motion.div>

        <ContactForm />
      </div>
    </section>
  )
}
