import { NavBar } from "@/components/landing/nav-bar";
import { HeroSection } from "@/components/landing/hero-section";
import { TaskIntro } from "@/components/landing/task-intro";
import { SelectionStrip } from "@/components/landing/selection-strip";
import { WhatWhySection } from "@/components/landing/WhatWhySection";
import { LogisticsSection } from "@/components/landing/LogisticsSection";
import { PastBuildersSection } from "@/components/landing/PastBuildersSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { ClosingCtaSection } from "@/components/landing/ClosingCtaSection";
import { LandingFooter } from "@/components/landing/landing-footer";
import { PalmTrees } from "@/components/brand/PalmTrees";
import { CircularSeal } from "@/components/brand/CircularSeal";
import { StampBadge } from "@/components/brand/StampBadge";

/**
 * Marketing landing page for HH Goa 2026.
 * Extended with full brand storytelling, logistics, alumni proof, FAQ, and closing CTA.
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen text-hh-cream relative overflow-x-hidden bg-[#0B3D2E]">
      <NavBar />

      {/* Decorative background accents — subtle, low opacity */}
      <div
        className="absolute top-[15%] left-6 opacity-[0.06] pointer-events-none hidden lg:block"
        aria-hidden="true"
      >
        <PalmTrees width={160} height={190} variant={1} />
      </div>
      <div
        className="absolute top-[15%] right-6 opacity-[0.06] pointer-events-none hidden lg:block"
        aria-hidden="true"
      >
        <PalmTrees width={140} height={170} variant={2} />
      </div>
      <div
        className="absolute top-[45%] left-8 opacity-[0.05] pointer-events-none hidden lg:block"
        aria-hidden="true"
      >
        <StampBadge width={100} height={100} />
      </div>
      <div
        className="absolute bottom-[20%] right-10 opacity-[0.04] pointer-events-none hidden lg:block"
        aria-hidden="true"
      >
        <CircularSeal width={120} height={120} />
      </div>

      {/* Hero section — kept untouched */}
      <HeroSection />
      
      {/* Existing Task 01 Intro & Selection Step Tracker */}
      <TaskIntro />
      <SelectionStrip />

      {/* New Extended Landing Sections */}
      <WhatWhySection />
      <LogisticsSection />
      <PastBuildersSection />
      <FaqSection />
      <ClosingCtaSection />

      {/* Enhanced Themed Footer */}
      <LandingFooter />
    </div>
  );
}
