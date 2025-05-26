import { GalaxyBackground } from "../components/galaxy-background"
import { SectionDivider } from "../components/section-divider"
import HeroSection from "../sections/hero-section"
import TechSection from "../sections/tech-section"
import BusinessSection from "../sections/business-section"
import BelieveSection from "../sections/believe-section"

export default function Page() {
  return (
    <div className="relative">
      {/* Consistent galaxy background across all sections */}
      <GalaxyBackground />

      {/* Content sections with consistent spacing */}
      <div className="relative z-10">
        <HeroSection />

        <SectionDivider />

        <TechSection />

        <SectionDivider />

        <BusinessSection />

        <SectionDivider />

        <BelieveSection />
      </div>
    </div>
  )
}
