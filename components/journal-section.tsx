"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Calendar, Coffee, Pen, BookOpen } from "lucide-react"

interface JournalEntry {
  id: number
  title: string
  date: string
  excerpt: string
  category: "tech" | "leadership" | "creative"
}

const journalEntries: JournalEntry[] = [
  {
    id: 1,
    title: "Building with Next.js 15",
    date: "Dec 15, 2024",
    excerpt:
      "Exploring the new features and performance improvements. The app router continues to impress with its flexibility and developer experience.",
    category: "tech",
  },
  {
    id: 2,
    title: "Leadership Lessons from AIESEC",
    date: "Dec 10, 2024",
    excerpt:
      "Reflecting on managing a 26-person team. The key was empowerment over control, trust over micromanagement.",
    category: "leadership",
  },
  {
    id: 3,
    title: "The Art of Clean Code",
    date: "Dec 5, 2024",
    excerpt:
      "Sometimes the best code is the code you don't write. Simplicity and readability trump cleverness every time.",
    category: "tech",
  },
  {
    id: 4,
    title: "Sketching New Universes",
    date: "Dec 1, 2024",
    excerpt:
      "Every story begins with a single line. Today I'm exploring character arcs that mirror real leadership journeys.",
    category: "creative",
  },
]

// Floating stars background
const FloatingStars = () => {
  const stars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    duration: Math.random() * 8 + 4,
    delay: Math.random() * 2,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full opacity-30"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Paper texture overlay
const PaperTexture = () => (
  <div
    className="absolute inset-0 opacity-[0.03] pointer-events-none"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fillOpacity='0.1'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%23ffffff'/%3E%3C/g%3E%3C/svg%3E")`,
    }}
  />
)

// Category icon
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "tech":
      return <BookOpen size={16} className="text-blue-400" />
    case "leadership":
      return <Pen size={16} className="text-purple-400" />
    case "creative":
      return <Coffee size={16} className="text-amber-400" />
    default:
      return <BookOpen size={16} className="text-gray-400" />
  }
}

// Journal entry card with writing page aesthetic
const JournalCard = ({ entry, index }: { entry: JournalEntry; index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      className="relative group"
      initial={{ opacity: 0, y: 30, rotateX: 5 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{
        scale: 1.02,
        y: -5,
        rotateX: -2,
        rotateY: 1,
      }}
    >
      {/* Paper-like card */}
      <div className="relative bg-slate-800/40 border border-slate-600/30 rounded-lg p-6 backdrop-blur-sm overflow-hidden shadow-lg hover:border-slate-500/50 transition-all duration-500">
        {/* Paper texture */}
        <PaperTexture />

        {/* Subtle glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
          initial={false}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Header with date and category */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Calendar size={14} />
              <span>{entry.date}</span>
            </div>
            <div className="flex items-center gap-1">{getCategoryIcon(entry.category)}</div>
          </div>

          {/* Title with handwritten feel */}
          <h3 className="text-xl font-semibold text-white mb-3 leading-tight group-hover:text-blue-300 transition-colors duration-300">
            {entry.title}
          </h3>

          {/* Excerpt with typewriter-like styling */}
          <p className="text-slate-300 leading-relaxed text-sm font-light tracking-wide">{entry.excerpt}</p>

          {/* Decorative underline */}
          <motion.div
            className="mt-4 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={false}
          />
        </div>

        {/* Corner fold effect */}
        <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-0 h-0 border-l-8 border-b-8 border-l-transparent border-b-slate-700/50 transform rotate-0"></div>
        </div>

        {/* Margin line (like notebook paper) */}
        <div className="absolute left-12 top-0 bottom-0 w-px bg-slate-600/20"></div>
      </div>

      {/* Shadow effect */}
      <div className="absolute inset-0 bg-black/20 rounded-lg blur-xl -z-10 transform translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
    </motion.div>
  )
}

export default function JournalSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-200px" })

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden py-20 px-6"
    >
      {/* Floating stars background */}
      <FloatingStars />

      {/* Deep space nebula effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-blue-600/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-purple-500/15 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header with writing theme */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Floating pen icon */}
          <motion.div
            className="flex justify-center mb-6"
            animate={{
              y: [0, -5, 0],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div className="p-4 bg-slate-800/50 rounded-full border border-slate-600/30 backdrop-blur-sm">
              <Pen className="w-8 h-8 text-blue-400" />
            </div>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            What am I up to?
          </motion.h2>

          <motion.p
            className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Pages from my digital journal — thoughts on code, leadership, and creativity.
          </motion.p>

          {/* Decorative line */}
          <motion.div
            className="flex justify-center items-center mt-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-slate-500" />
            <div className="w-2 h-2 bg-slate-500 rounded-full mx-4 animate-pulse" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-slate-500" />
          </motion.div>
        </motion.div>

        {/* Journal entries grid */}
        <div className="grid gap-8 md:gap-10">
          {journalEntries.map((entry, index) => (
            <JournalCard key={entry.id} entry={entry} index={index} />
          ))}
        </div>

        {/* Footer with coffee note */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="flex items-center justify-center gap-3 text-slate-400 italic">
            <Coffee size={18} className="text-amber-400" />
            <span>Written with curiosity, powered by coffee</span>
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              ✨
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
