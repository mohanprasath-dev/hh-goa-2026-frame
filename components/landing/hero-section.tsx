/**
 * Hero section — large editorial wordmark with poster-print shadow typography.
 * Static server component, no client-side state.
 */
export function HeroSection() {
	return (
		<section className="relative min-h-[85vh] sm:min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 pt-20 pb-12 overflow-hidden">
			{/* Grain texture overlay */}
			<div
				className="absolute inset-0 pointer-events-none opacity-[0.04] z-10"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
					backgroundRepeat: 'repeat',
					backgroundSize: '150px 150px',
				}}
			/>

			{/* Hero Wordmark — poster-print style with hard offset shadows */}
			<div className="relative z-20 flex flex-col items-center text-center select-none">
				{/* "HACKER" + "गोवा" + "HOUSE" — inline on desktop, stacked on mobile */}
				<div className="flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-3 md:gap-4">
					{/* HACKER */}
					<h1 className="relative">
						{/* Shadow layer */}
						<span
							className="absolute top-[3px] left-[3px] text-[clamp(3.5rem,12vw,8rem)] font-serif font-black italic leading-[0.9] tracking-tight text-black/25"
							aria-hidden="true"
						>
							HACKER
						</span>
						{/* Main text */}
						<span className="relative text-[clamp(3.5rem,12vw,8rem)] font-serif font-black italic leading-[0.9] tracking-tight text-hh-yellow">
							HACKER
						</span>
					</h1>

					{/* गोवा pill badge */}
					<div className="relative -my-2 sm:my-0 sm:-mx-1 z-30">
						{/* Shadow */}
						<div
							className="absolute top-[2px] left-[2px] bg-black/20 rounded-full px-4 sm:px-5 py-1.5 sm:py-2"
							aria-hidden="true"
						>
							<span className="text-[clamp(2rem,7vw,4.5rem)] font-bold font-devanagari text-transparent leading-none">
								गोवा
							</span>
						</div>
						{/* Main pill */}
						<div className="relative bg-hh-pink rounded-full px-4 sm:px-5 py-1.5 sm:py-2 transform sm:-rotate-3">
							<span className="text-[clamp(2rem,7vw,4.5rem)] font-bold font-devanagari text-hh-yellow leading-none drop-shadow-[1px_1px_0_rgba(0,0,0,0.3)]">
								गोवा
							</span>
						</div>
					</div>

					{/* HOUSE */}
					<h1 className="relative">
						{/* Shadow layer */}
						<span
							className="absolute top-[3px] left-[3px] text-[clamp(3.5rem,12vw,8rem)] font-serif font-black italic leading-[0.9] tracking-tight text-black/25"
							aria-hidden="true"
						>
							HOUSE
						</span>
						{/* Main text */}
						<span className="relative text-[clamp(3.5rem,12vw,8rem)] font-serif font-black italic leading-[0.9] tracking-tight text-hh-yellow">
							HOUSE
						</span>
					</h1>
				</div>

				{/* Sub-line: Location + Date | Studio Credit */}
				<div className="mt-8 sm:mt-10 flex items-center gap-3 sm:gap-5 text-hh-yellow text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase font-sans">
					<span>GOA, INDIA · 28–31 OCT 2026</span>
					<span className="w-px h-4 bg-hh-yellow/40" aria-hidden="true" />
					<span>2:47 PM STUDIO</span>
				</div>
			</div>

			{/* Scroll hint */}
			<div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 opacity-50 animate-bounce">
				<div className="w-px h-8 bg-hh-cream/50" />
			</div>
		</section>
	);
}
