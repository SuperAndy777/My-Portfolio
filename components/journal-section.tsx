"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Calendar, Coffee } from "lucide-react"

interface JournalEntry {
  id: number
  title: string
  date: string
  excerpt: string
}

const journalEntries: JournalEntry[] = [
  {
    id: 1,
    title: "Building with Next.js 15",
    date: "Dec 15, 2024",
    excerpt:
      "Exploring the new features and performance improvements. The app router continues to impress with its flexibility and developer experience.",
  },
  {
    id: 2,
    title: "Leadership Lessons from AIESEC",
    date: "Dec 10, 2024",
    excerpt:
      "Reflecting on managing a 26-person team. The key was empowerment over control, trust over micromanagement.",
  },
  {
    id: 3,
    title: "The Art of Clean Code",
    date: "Dec 5, 2024",
    excerpt:
      "Sometimes the best code is the code you don't write. Simplicity and readability trump cleverness every time.",
  },
]

const JournalCard = ({ entry, index }: { entry: JournalEntry; index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
        <Calendar size={14} />
        {entry.date}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: "Sora, sans-serif" }}>
        {entry.title}
      </h3>
      <p className="text-gray-600 leading-relaxed">{entry.excerpt}</p>
    </motion.div>
  )
}

export default function JournalSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-200px" })

  return (
    <section ref={ref} className="pt-20 pb-24 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Sora, sans-serif" }}>
            What am I up to?
          </h2>
          <p className="text-xl text-gray-600">Quick logs from my learning & creative mess</p>
        </motion.div>

        <div className="grid gap-6 md:gap-8 space-y-0">
          {journalEntries.map((entry, index) => (
            <JournalCard key={entry.id} entry={entry} index={index} />
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 text-gray-500 italic">
            <span>Powered by markdown, fueled by coffee</span>
            <Coffee size={16} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
