import { NavBar } from '@/components/landing/nav-bar';
import { HeroSection } from '@/components/landing/hero-section';
import { TaskIntro } from '@/components/landing/task-intro';
import { SelectionStrip } from '@/components/landing/selection-strip';
import { LandingFooter } from '@/components/landing/landing-footer';
import { PalmTrees } from '@/components/brand/PalmTrees';
import { CircularSeal } from '@/components/brand/CircularSeal';

/**
 * Marketing landing page for HH Goa 2026.
 * Static server component — no client-side state.
 */
export default function LandingPage() {
	return (
		<div className="min-h-screen bg-hh-green text-hh-cream relative overflow-x-hidden">
			<NavBar />

			{/* Decorative background accents — subtle, low opacity */}
			<div className="absolute top-[15%] left-6 opacity-[0.06] pointer-events-none hidden lg:block" aria-hidden="true">
				<PalmTrees width={160} height={190} variant={1} />
			</div>
			<div className="absolute top-[15%] right-6 opacity-[0.06] pointer-events-none hidden lg:block" aria-hidden="true">
				<PalmTrees width={140} height={170} variant={2} />
			</div>
			<div className="absolute bottom-[20%] left-10 opacity-[0.04] pointer-events-none hidden lg:block" aria-hidden="true">
				<CircularSeal width={100} height={100} />
			</div>

			<HeroSection />
			<TaskIntro />
			<SelectionStrip />
			<LandingFooter />
		</div>
	);
}
