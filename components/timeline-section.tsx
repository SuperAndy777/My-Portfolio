"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"

interface TimelineItem {
  id: number
  title: string
  period: string
  description: string
  imageUrl: string
  imageAlt: string
  fallbackInitials: string
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Early Days",
    period: "2000-2018",
    description: "From curious kid to ambitious student, building the foundation for everything that followed.",
    imageUrl: "https://placehold.co/400x400?text=Early+Days",
    imageAlt: "Early childhood and school years",
    fallbackInitials: "ED",
  },
  {
    id: 2,
    title: "University Adventures",
    period: "2018-2022",
    description: "Computer Science at BITS Pilani, where code met creativity and friendships were forged.",
    imageUrl: "https://placehold.co/400x400?text=University",
    imageAlt: "University life and studies",
    fallbackInitials: "UA",
  },
  {
    id: 3,
    title: "AIESEC Leadership",
    period: "2020-2022",
    description: "Leading teams, building partnerships, and facilitating youth experiences across borders.",
    imageUrl: "https://placehold.co/400x400?text=AIESEC",
    imageAlt: "AIESEC leadership experience",
    fallbackInitials: "AL",
  },
  {
    id: 4,
    title: "Professional Journey",
    period: "2022-Present",
    description: "Engineering solutions, leading projects, and continuously learning in the tech world.",
    imageUrl: "https://placehold.co/400x400?text=Professional",
    imageAlt: "Professional career",
    fallbackInitials: "PJ",
  },
]

const ImageWithFallback = ({
  src,
  alt,
  fallbackInitials,
  className,
}: {
  src: string
  alt: string
  fallbackInitials: string
  className?: string
}) => {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return (
      <div className={`${className} bg-gray-200 flex items-center justify-center`}>
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-600 mb-2">{fallbackInitials}</div>
          <div className="text-sm text-gray-500 px-4">{alt}</div>
        </div>
      </div>
    )
  }

  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      fill
      unoptimized
      className={`${className} object-cover`}
      onError={() => setImageError(true)}
    />
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
        <ImageWithFallback
          src={item.imageUrl || "/placeholder.svg"}
          alt={item.imageAlt}
          fallbackInitials={item.fallbackInitials}
          className="w-full h-full"
        />
      </div>

      {/* Content */}
      <div className={`flex-1 text-center md:text-left ${isLeft ? "md:text-right" : ""}`}>
        <h3 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Sora, sans-serif" }}>
          {item.title}
        </h3>
        <p className="text-lg text-blue-600 font-medium mb-4">{item.period}</p>
        <p className="text-gray-600 text-lg leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  )
}

export default function TimelineSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-200px" })

  return (
    <section ref={ref} className="pt-20 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Sora, sans-serif" }}>
            Into the Me-Verse
          </h2>
          <p className="text-xl text-gray-600">Snapshots from schoolyards to boardrooms</p>
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
