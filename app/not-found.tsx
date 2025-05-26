"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-black flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="heading-hero mb-4">404</h1>
          <h2 className="heading-medium text-light mb-6">Page Not Found</h2>
          <p className="text-body-large text-muted mb-8">The page you're looking for doesn't exist in this galaxy.</p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-[#66ccff]/20 border border-[#66ccff]/30 rounded-lg text-[#66ccff] hover:bg-[#66ccff]/30 transition-all duration-300"
          >
            Return to Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
