"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface TimelineItem {
  id: number
  title: string
  period: string
  description: string
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Early Days",
    period: "2003-2021",
    description:
      "Born in Bhopal. Elementary schooling in Washim, Maharashtra. Completed high school back in Bhopal, building the foundation for everything that followed.",
  },
  {
    id: 2,
    title: "University Adventure",
    period: "2022-2026",
    description:
      "Computer Science with Gaming Tech at SRMIST KTR. Where code met creativity, gaming passion came alive, and ambitions were refined.",
  },
  {
    id: 3,
    title: "AIESEC Leadership",
    period: "2023-2025",
    description:
      "Started as Marketing Manager, progressed to Head of External Relations and Business Development. Led teams, built partnerships, and facilitated countless youth experiences.",
  },
  {
    id: 4,
    title: "Professional Journey",
    period: "2025-Present",
    description:
      "Interned at Taipei Economic and Cultural Centre in India. Now leading projects, seeking opportunities to learn, grow, and make a meaningful impact.",
  },
]

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
          className="absolute bg-white rounded-full opacity-60 dark:opacity-60"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
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

export default function TimelineSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 py-20 px-4 overflow-hidden transition-colors duration-500"
    >
      <FloatingStars />

      <div className="absolute inset-0 opacity-20 dark:opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-400/15 dark:bg-cyan-400/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 1, type: "spring", stiffness: 100, damping: 20 }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-200 dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent"
            whileInView={{ scale: [0.9, 1.05, 1] }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            Into the Me-Verse
          </motion.h2>
          <motion.p
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Snapshots from schoolyards to boardrooms
          </motion.p>

          <motion.div
            className="flex justify-center items-center mt-8 gap-4"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-cyan-400 dark:to-cyan-400" />
            <div className="w-3 h-3 bg-cyan-400 dark:bg-cyan-400 rounded-full animate-pulse" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-cyan-400 dark:to-cyan-400" />
          </motion.div>
        </motion.div>

        <div className="space-y-8">
          {timelineData.map((item, index) => (
            <TimelineCard key={item.id} item={item} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TimelineCard({
  item,
  index,
  isInView,
}: {
  item: TimelineItem
  index: number
  isInView: boolean
}) {
  const ref = useRef(null)
  const isCardInView = useInView(ref, { once: false, margin: "-50px" })

  const shouldAnimate = isCardInView && isInView

  return (
    <motion.div
      ref={ref}
      className="relative pl-8 pb-8 group"
      initial={{ opacity: 0, x: -50 }}
      animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
        damping: 25,
      }}
    >
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-blue-400 to-indigo-400 rounded-full"
        initial={{ scaleY: 0 }}
        animate={shouldAnimate ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{
          duration: 1,
          delay: index * 0.15 + 0.2,
          type: "spring",
          stiffness: 80,
        }}
        style={{ transformOrigin: "top" }}
      />

      <motion.div
        className="absolute left-0 top-0 w-4 h-4 bg-gradient-to-br from-cyan-300 to-blue-400 rounded-full transform -translate-x-[9px]"
        initial={{ scale: 0, opacity: 0 }}
        animate={shouldAnimate ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{
          duration: 0.6,
          delay: index * 0.15 + 0.4,
          type: "spring",
          stiffness: 150,
        }}
        whileHover={{ scale: 1.4, boxShadow: "0 0 20px rgba(0, 255, 255, 0.6)" }}
      />

      <motion.div
        className="absolute left-0 top-0 w-4 h-4 border-2 border-cyan-300 rounded-full transform -translate-x-[9px] opacity-0 group-hover:opacity-100"
        animate={{
          scale: [1, 1.3, 1.6, 1.3, 1],
          opacity: [0.8, 0.4, 0, 0.4, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800/60 dark:to-slate-900/40 backdrop-blur-sm p-6 rounded-lg border border-slate-200 dark:border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/20"
        whileHover={{
          scale: 1.02,
          y: -5,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 dark:from-cyan-500/5 dark:to-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
          initial={false}
        />

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
            <motion.h3
              className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-200 dark:to-blue-200 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 + 0.5 }}
            >
              {item.title}
            </motion.h3>

            <motion.span
              className="text-sm font-medium text-cyan-600 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-300 dark:border-cyan-500/30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15 + 0.6,
                type: "spring",
                stiffness: 100,
              }}
            >
              {item.period}
            </motion.span>
          </div>

          <motion.p
            className="text-slate-600 dark:text-slate-300 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{
              duration: 0.7,
              delay: index * 0.15 + 0.7,
              type: "spring",
              stiffness: 80,
            }}
          >
            {item.description}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  )
}
