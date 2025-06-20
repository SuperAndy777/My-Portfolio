"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { Music, ExternalLink, Play, Pause, AlertCircle, Headphones, Volume2 } from "lucide-react"
import Image from "next/image"

interface SpotifyData {
  isPlaying: boolean
  title?: string
  artist?: string
  album?: string
  albumImageUrl?: string
  songUrl?: string
  progress?: number
  duration?: number
  error?: string
}

const formatTime = (ms: number) => {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

const LoadingSpinner = () => (
  <motion.div
    className="w-4 h-4 border-2 border-gray-300 border-t-green-500 rounded-full"
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
  />
)

const SpotifyLogo = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-green-500">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
)

export default function EnhancedSpotifyWidget() {
  const [data, setData] = useState<SpotifyData>({ isPlaying: false })
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchNowPlaying = async () => {
    try {
      const response = await fetch("/api/spotify/now-playing")
      const spotifyData = await response.json()
      setData(spotifyData)
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Error fetching Spotify data:", error)
      setData({ isPlaying: false, error: "Failed to fetch" })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNowPlaying()
    const interval = setInterval(fetchNowPlaying, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <motion.div
        className="w-full max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="border border-gray-300 dark:border-gray-600 rounded-xl p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse flex items-center justify-center">
              <LoadingSpinner />
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <SpotifyLogo />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Loading music...</span>
              </div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse" />
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  if (data.error) {
    const isTokenError = data.error.includes("Token refresh failed") || data.error.includes("authorization")
    const isConfigError = data.error.includes("No refresh token") || data.error.includes("Missing")

    return (
      <motion.div
        className="w-full max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="border border-orange-300 dark:border-orange-600 rounded-xl p-6 bg-orange-50/50 dark:bg-orange-900/20 backdrop-blur-sm">
          <div className="flex items-center gap-4 text-orange-600 dark:text-orange-400">
            <div className="w-16 h-16 border-2 border-orange-300 dark:border-orange-600 rounded-lg flex items-center justify-center">
              <AlertCircle size={24} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <SpotifyLogo />
                <span className="font-medium text-orange-900 dark:text-orange-200">
                  {isTokenError ? "Token Issue" : isConfigError ? "Setup Needed" : "Connection Error"}
                </span>
              </div>
              <p className="text-sm text-orange-800 dark:text-orange-300">
                {isTokenError
                  ? "Refresh token needs renewal"
                  : isConfigError
                    ? "Spotify integration pending"
                    : "Temporary connection issue"}
              </p>
              {lastUpdated && (
                <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                  Last checked: {lastUpdated.toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  if (!data.isPlaying) {
    return (
      <motion.div
        className="w-full max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="border border-gray-300 dark:border-gray-600 rounded-xl p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300">
          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
            <div className="w-16 h-16 border-2 border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center bg-gray-50 dark:bg-gray-800">
              <Headphones size={24} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <SpotifyLogo />
                <span className="font-medium text-gray-900 dark:text-white">Spotify</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Nothing playing right now</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">Waiting for the next track...</p>
              {lastUpdated && (
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  Last checked: {lastUpdated.toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  const progressPercentage = data.progress && data.duration ? (data.progress / data.duration) * 100 : 0

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={data.title}
          className="border border-gray-300 dark:border-gray-600 rounded-xl p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 group cursor-pointer relative overflow-hidden"
          onClick={() => data.songUrl && window.open(data.songUrl, "_blank")}
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-blue-500/5 to-purple-500/5"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(34, 197, 94, 0.05), rgba(59, 130, 246, 0.05), rgba(168, 85, 247, 0.05))",
                "linear-gradient(45deg, rgba(168, 85, 247, 0.05), rgba(34, 197, 94, 0.05), rgba(59, 130, 246, 0.05))",
                "linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(168, 85, 247, 0.05), rgba(34, 197, 94, 0.05))",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Volume2 size={16} />
                </motion.div>
                <span className="text-sm font-medium">Now Playing</span>
                <motion.div
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ExternalLink size={16} className="text-gray-500 dark:text-gray-400" />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex items-center gap-4">
              {/* Album Art */}
              <div className="relative w-16 h-16 flex-shrink-0">
                {data.albumImageUrl ? (
                  <Image
                    src={data.albumImageUrl || "/placeholder.svg"}
                    alt={`${data.album} cover`}
                    fill
                    className="rounded-lg object-cover border border-gray-200 dark:border-gray-700 shadow-lg"
                    unoptimized
                  />
                ) : (
                  <div className="w-16 h-16 border-2 border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                    <Music size={24} className="text-gray-400 dark:text-gray-500" />
                  </div>
                )}

                {/* Play/Pause Indicator */}
                <motion.div
                  className="absolute -bottom-1 -right-1 w-6 h-6 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center shadow-lg"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  {data.isPlaying ? (
                    <Pause size={12} className="text-green-600 dark:text-green-400" />
                  ) : (
                    <Play size={12} className="text-gray-600 dark:text-gray-400" />
                  )}
                </motion.div>
              </div>

              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <motion.p
                  className="font-semibold text-gray-900 dark:text-white truncate text-base mb-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {data.title}
                </motion.p>
                <motion.p
                  className="text-gray-600 dark:text-gray-400 truncate text-sm mb-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {data.artist}
                </motion.p>
                {data.album && (
                  <motion.p
                    className="text-gray-500 dark:text-gray-500 truncate text-xs"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {data.album}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            {data.progress && data.duration && (
              <motion.div
                className="mt-4 space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full relative"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    {/* Animated shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                  </motion.div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{formatTime(data.progress)}</span>
                  <span>{formatTime(data.duration)}</span>
                </div>
              </motion.div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <SpotifyLogo />
                <span className="text-xs text-gray-500 dark:text-gray-400">Powered by Spotify</span>
              </div>
              {lastUpdated && (
                <span className="text-xs text-gray-400 dark:text-gray-500">{lastUpdated.toLocaleTimeString()}</span>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
