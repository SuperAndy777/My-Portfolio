"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Calendar, Coffee, Pen, BookOpen, RefreshCw, ExternalLink, Wifi, WifiOff, AlertCircle } from "lucide-react"
import { useTheme } from "next-themes"

interface JournalEntry {
  id: string
  title: string
  date: string
  excerpt: string
  category: "tech" | "leadership" | "creative"
  status: "published" | "draft"
  tags?: string[]
  lastEdited: string
}

interface JournalResponse {
  entries: JournalEntry[]
  count: number
  timestamp: string
  source: "notion" | "fallback"
  error?: string
}

// Floating stars background
const FloatingStars = () => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

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
          className={`absolute rounded-full ${isDark ? "bg-white opacity-30" : "bg-slate-400 opacity-20"}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: isDark ? [0.2, 0.6, 0.2] : [0.1, 0.3, 0.1],
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
const PaperTexture = () => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${isDark ? "opacity-[0.03]" : "opacity-[0.02]"}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fillOpacity='0.1'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%23${isDark ? "ffffff" : "000000"}'/%3E%3C/g%3E%3C/svg%3E")`,
      }}
    />
  )
}

// Category icon
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "tech":
      return <BookOpen size={16} className="text-blue-500 dark:text-blue-400" />
    case "leadership":
      return <Pen size={16} className="text-purple-500 dark:text-purple-400" />
    case "creative":
      return <Coffee size={16} className="text-amber-500 dark:text-amber-400" />
    default:
      return <BookOpen size={16} className="text-gray-500 dark:text-gray-400" />
  }
}

// Loading skeleton
const LoadingSkeleton = () => (
  <div className="space-y-8">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="bg-white/50 dark:bg-slate-800/40 border border-gray-200 dark:border-slate-600/30 rounded-lg p-6 animate-pulse"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-24"></div>
          <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-4"></div>
        </div>
        <div className="h-6 bg-gray-300 dark:bg-slate-700 rounded w-3/4 mb-3"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-5/6"></div>
        </div>
      </div>
    ))}
  </div>
)

// Error state
const ErrorState = ({ onRetry, error }: { onRetry: () => void; error?: string }) => (
  <div className="text-center py-12">
    <div className="flex justify-center mb-4">
      <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-full border border-red-200 dark:border-red-600/30">
        <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
      </div>
    </div>
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Connection Issue</h3>
    <p className="text-gray-600 dark:text-slate-400 mb-2">Having trouble loading the latest journal entries.</p>
    {error && (
      <p className="text-sm text-red-600 dark:text-red-400 mb-4 font-mono bg-red-50 dark:bg-red-900/10 px-3 py-1 rounded border border-red-200 dark:border-red-600/20">
        {error}
      </p>
    )}
    <button
      onClick={onRetry}
      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-900 dark:text-white rounded-lg transition-colors duration-200"
    >
      <RefreshCw size={16} />
      Try Again
    </button>
  </div>
)

// Status indicator
const StatusIndicator = ({ source, timestamp }: { source: "notion" | "fallback"; timestamp: string }) => (
  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-slate-500">
    {source === "notion" ? (
      <>
        <Wifi size={12} className="text-green-500 dark:text-green-400" />
        <span>Live from Notion</span>
      </>
    ) : (
      <>
        <WifiOff size={12} className="text-amber-500 dark:text-amber-400" />
        <span>Sample content</span>
      </>
    )}
    <span>•</span>
    <span>{new Date(timestamp).toLocaleTimeString()}</span>
  </div>
)

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
      <div className="relative bg-white/80 dark:bg-slate-800/40 border border-gray-200 dark:border-slate-600/30 rounded-lg p-6 backdrop-blur-sm overflow-hidden shadow-lg hover:border-gray-300 dark:hover:border-slate-500/50 transition-all duration-500 cursor-pointer">
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
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
              <Calendar size={14} />
              <span>{entry.date}</span>
            </div>
            <div className="flex items-center gap-2">
              {getCategoryIcon(entry.category)}
              <ExternalLink
                size={14}
                className="text-gray-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>

          {/* Title with handwritten feel */}
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-300">
            {entry.title}
          </h3>

          {/* Excerpt with typewriter-like styling */}
          <p className="text-gray-700 dark:text-slate-300 leading-relaxed text-sm font-light tracking-wide mb-4">
            {entry.excerpt}
          </p>

          {/* Tags */}
          {entry.tags && entry.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {entry.tags.slice(0, 3).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-slate-700/50 text-gray-600 dark:text-slate-300 rounded border border-gray-200 dark:border-slate-600/30"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Decorative underline */}
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-slate-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={false}
          />
        </div>

        {/* Corner fold effect */}
        <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-0 h-0 border-l-8 border-b-8 border-l-transparent border-b-gray-200 dark:border-b-slate-700/50 transform rotate-0"></div>
        </div>

        {/* Margin line (like notebook paper) */}
        <div className="absolute left-12 top-0 bottom-0 w-px bg-gray-200 dark:bg-slate-600/20"></div>
      </div>

      {/* Shadow effect */}
      <div className="absolute inset-0 bg-black/10 dark:bg-black/20 rounded-lg blur-xl -z-10 transform translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
    </motion.div>
  )
}

export default function JournalSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-200px" })
  const { theme } = useTheme()

  const [data, setData] = useState<JournalResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEntries = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("🔄 Fetching journal entries...")
      const response = await fetch("/api/journal", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const journalData: JournalResponse = await response.json()
      console.log("📊 Received journal data:", journalData)

      setData(journalData)
    } catch (err) {
      console.error("❌ Error fetching journal entries:", err)
      setError(err instanceof Error ? err.message : "Unknown error occurred")

      // Set fallback data even on error
      setData({
        entries: [
          {
            id: "error-fallback",
            title: "Connection Restored Soon",
            date: "Dec 25, 2024",
            excerpt:
              "We're working on restoring the connection to the journal database. In the meantime, enjoy this sample content that showcases the journal's design and functionality.",
            category: "tech",
            status: "published",
            tags: ["status", "maintenance"],
            lastEdited: new Date().toISOString(),
          },
        ],
        count: 1,
        timestamp: new Date().toISOString(),
        source: "fallback",
        error: err instanceof Error ? err.message : "Unknown error",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEntries()
  }, [])

  return (
    <section
      ref={ref}
      className="section relative min-h-screen w-full bg-background overflow-hidden py-20 px-6 transition-colors duration-500"
    >
      {/* Floating stars background */}
      <FloatingStars />

      {/* Deep space nebula effect */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-blue-400/20 dark:from-blue-600/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-purple-400/15 dark:from-purple-500/15 to-transparent rounded-full blur-3xl animate-pulse"
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
            <div className="p-4 bg-card rounded-full border border-border backdrop-blur-sm">
              <Pen className="w-8 h-8 text-blue-500 dark:text-blue-400" />
            </div>
          </motion.div>

          <motion.h2
            className="heading-section text-5xl md:text-6xl font-bold mb-6 text-foreground"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            What am I up to?
          </motion.h2>

          <motion.p
            className="text-body-large text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Live from my Notion workspace — thoughts on code, leadership, and creativity.
          </motion.p>

          {/* Status indicator */}
          {data && !loading && (
            <motion.div
              className="flex justify-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <StatusIndicator source={data.source} timestamp={data.timestamp} />
            </motion.div>
          )}

          {/* Decorative line */}
          <motion.div
            className="flex justify-center items-center mt-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-muted-foreground"></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full mx-4 animate-pulse"></div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-muted-foreground"></div>
          </motion.div>
        </motion.div>

        {/* Content */}
        {loading ? (
          <LoadingSkeleton />
        ) : error && !data ? (
          <ErrorState onRetry={fetchEntries} error={error} />
        ) : data ? (
          <>
            {/* Journal entries grid */}
            <div className="grid gap-8 md:gap-10">
              {data.entries.map((entry, index) => (
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
              <div className="flex items-center justify-center gap-3 text-muted-foreground italic">
                <Coffee size={18} className="text-amber-500 dark:text-amber-400" />
                <span>
                  {data.source === "notion"
                    ? "Synced from Notion, powered by coffee"
                    : "Sample content, powered by resilience"}
                </span>
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
          </>
        ) : null}
      </div>
    </section>
  )
}
