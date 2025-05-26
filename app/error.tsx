"use client"

import { motion } from "framer-motion"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-black flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="heading-section mb-4">Something went wrong!</h1>
          <p className="text-body-large text-muted mb-8">A disturbance in the Force has occurred.</p>
          <button
            onClick={reset}
            className="inline-flex items-center px-6 py-3 bg-[#66ccff]/20 border border-[#66ccff]/30 rounded-lg text-[#66ccff] hover:bg-[#66ccff]/30 transition-all duration-300"
          >
            Try again
          </button>
        </motion.div>
      </div>
    </div>
  )
}
