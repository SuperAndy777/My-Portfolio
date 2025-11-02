"use client"

import HeroSection from "@/components/hero-section"
import TimelineSection from "@/components/timeline-section"
import BelieveSection from "@/components/believe-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <TimelineSection />
      <BelieveSection />
    </main>
  )
}
