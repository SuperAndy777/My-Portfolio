"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface TimelineItem {
  id: number
  title: string
  period: string
  description: string
  imageAlt: string
  fallbackInitials: string
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Early Days",
    period: "2003-2021",
    description:
      "Born in Bhopal. Elementary schooling in Washim, Maharashtra. Completed high school back in Bhopal, building the foundation for everything that followed.",
    imageAlt: "Early childhood and school years",
    fallbackInitials: "ED",
  },
  {
    id: 2,
    title: "University Adventure",
    period: "2022-2026",
    description:
      "Computer Science with Gaming Tech at SRMIST KTR. Where code met creativity, gaming passion came alive, and ambitions were refined.",
    imageAlt: "University life and studies",
    fallbackInitials: "UA",
  },
  {
    id: 3,
    title: "AIESEC Leadership",
    period: "2023-2025",
    description:
      "Started as Marketing Manager, progressed to Head of External Relations and Business Development. Led teams, built partnerships, and facilitated countless youth experiences.",
    imageAlt: "AIESEC leadership experience",
    fallbackInitials: "AL",
  },
  {
    id: 4,
    title: "Professional Journey",
    period: "2025-Present",
    description:
      "Interned at Taipei Economic and Cultural Centre in India. Now leading projects, seeking opportunities to learn, grow, and make a meaningful impact.",
    imageAlt: "Professional career",
    fallbackInitials: "PJ",
  },
]

const ImageWithFallback = ({
  alt,
  fallbackInitials,
  className = "",
}: {
  src?: string
  alt: string
  fallbackInitials: string
  className?: string
}) => {
  return (
    <div
      className={`${className} bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center transition-colors duration-500`}
    >
      <div className="text-center">
        <div className="text-4xl font-bold text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-500">
          {fallbackInitials}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 px-4 transition-colors duration-500">{alt}</div>
      </div>
    </div>
  )
}

const TimelineItemComponent = ({
  item,
  index,
  isLeft,
}: {
  item: TimelineItem
  index: number
  isLeft: boolean
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-16 ${isLeft ? "md:flex-row-reverse" : ""}`}
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Image */}
      <div className="relative w-80 h-80 rounded-full overflow-hidden flex-shrink-0 shadow-lg">
        <ImageWithFallback alt={item.imageAlt} fallbackInitials={item.fallbackInitials} className="w-full h-full" />
      </div>

      {/* Content */}
      <div className={`flex-1 text-center md:text-left ${isLeft ? "md:text-right" : ""}`}>
        <h3
          className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-500"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          {item.title}
        </h3>
        <p className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-4 transition-colors duration-500">
          {item.period}
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed transition-colors duration-500">
          {item.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function TimelineSection() {
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
            Into the Me-Verse
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-500">
            Snapshots from schoolyards to boardrooms
          </p>
        </motion.div>

        <div className="space-y-0">
          {timelineData.map((item, index) => (
            <TimelineItemComponent key={item.id} item={item} index={index} isLeft={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
