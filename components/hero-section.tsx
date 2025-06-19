"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Send } from "lucide-react"
import Image from "next/image"

const PaperPlaneWatermark = () => {
  return (
    <div className="fixed top-6 left-6 z-10 opacity-30">
      <Image src="/paper-plane.svg" alt="Paper plane" width={24} height={24} className="text-gray-400" />
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
        className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 micro-bounce"
      >
        <Send size={16} />
        Send
      </button>
    </motion.form>
  )
}

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-24 px-6">
      <PaperPlaneWatermark />

      <div className="text-center max-w-4xl mx-auto">
        <motion.h1
          className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 slide-down"
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
          <p className="text-2xl md:text-3xl text-gray-700 font-medium">Hello | 你好 | नमस्ते | ڀليڪار | नमस्कार</p>
          <p className="text-lg text-gray-500 italic">(just a few languages you can talk to me in :) )</p>
        </motion.div>

        <ContactForm />
      </div>
    </section>
  )
}
