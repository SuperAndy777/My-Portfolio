"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { Music, ExternalLink, Play, Pause, AlertCircle } from "lucide-react"
import Image from "next/image"

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
  "https://anilg.vercel.app/api/auth/callback/spotify",
)}&scope=user-read-currently-playing%20user-read-playback-state`

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

export default function SpotifyWidget() {
  const [data, setData] = useState<SpotifyData>({ isPlaying: false })
  const [loading, setLoading] = useState(true)

  const fetchNowPlaying = async () => {
    try {
      const response = await fetch("/api/spotify/now-playing")
      const spotifyData = await response.json()
      setData(spotifyData)
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
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="flex-1 space-y-2">
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
        <div className="border border-orange-300 dark:border-orange-600 rounded-lg p-4 bg-orange-50/50 dark:bg-orange-900/20 backdrop-blur-sm">
          <div className="flex items-center gap-3 text-orange-600 dark:text-orange-400">
            <div className="w-12 h-12 border border-orange-300 dark:border-orange-600 rounded flex items-center justify-center">
              <AlertCircle size={20} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-orange-900 dark:text-orange-200">
                {isTokenError ? "Spotify Token Issue" : isConfigError ? "Spotify Setup Needed" : "Spotify Error"}
              </p>
              <p className="text-sm">
                {isTokenError
                  ? "Refresh token expired — click below to reconnect."
                  : isConfigError
                    ? "Add a refresh token to finish setup."
                    : "Temporary connection issue"}
              </p>
              {data.error === "invalid_refresh_token" ? (
                <a
                  href={AUTH_URL}
                  className="inline-flex mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  Re-authorise Spotify
                </a>
              ) : null}
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
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300">
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
            <div className="w-12 h-12 border border-gray-300 dark:border-gray-600 rounded flex items-center justify-center">
              <Music size={20} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-white">Not playing</p>
              <p className="text-sm">Spotify is quiet right now</p>
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
          className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 group cursor-pointer"
          onClick={() => data.songUrl && window.open(data.songUrl, "_blank")}
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <div className="relative">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75" />
              </div>
              <span className="text-sm font-medium">Now Playing</span>
            </div>
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ExternalLink size={14} className="text-gray-500 dark:text-gray-400" />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex items-center gap-3">
            {/* Album Art */}
            <div className="relative w-12 h-12 flex-shrink-0">
              {data.albumImageUrl ? (
                <Image
                  src={data.albumImageUrl || "/placeholder.svg"}
                  alt={`${data.album} cover`}
                  fill
                  className="rounded object-cover border border-gray-200 dark:border-gray-700"
                  unoptimized
                />
              ) : (
                <div className="w-12 h-12 border border-gray-300 dark:border-gray-600 rounded flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <Music size={20} className="text-gray-400 dark:text-gray-500" />
                </div>
              )}

              {/* Play/Pause Indicator */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center">
                {data.isPlaying ? (
                  <Pause size={10} className="text-gray-700 dark:text-gray-300" />
                ) : (
                  <Play size={10} className="text-gray-700 dark:text-gray-300" />
                )}
              </div>
            </div>

            {/* Track Info */}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 dark:text-white truncate text-sm">{data.title}</p>
              <p className="text-gray-600 dark:text-gray-400 truncate text-xs">{data.artist}</p>
              {data.album && <p className="text-gray-500 dark:text-gray-500 truncate text-xs">{data.album}</p>}
            </div>
          </div>

          {/* Progress Bar */}
          {data.progress && data.duration && (
            <div className="mt-3 space-y-1">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 overflow-hidden">
                <motion.div
                  className="h-full bg-gray-600 dark:bg-gray-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{formatTime(data.progress)}</span>
                <span>{formatTime(data.duration)}</span>
              </div>
            </div>
          )}

          {/* Spotify Logo */}
          <div className="flex items-center justify-center mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <span>Powered by</span>
              <span className="font-semibold text-green-600 dark:text-green-400">Spotify</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
