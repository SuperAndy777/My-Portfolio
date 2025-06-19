"use client"

import { useEffect, useState } from "react"
import HeroSection from "../components/hero-section"
import TimelineSection from "../components/timeline-section"
import JournalSection from "../components/journal-section"
import FunSection from "../components/fun-section"
import BelieveSection from "../components/believe-section"

export default function Page() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className={`${isLoaded ? "loaded" : "loading"}`}>
      <HeroSection />
      <TimelineSection />
      <JournalSection />
      <FunSection />
      <BelieveSection />
    </div>
  )
}
