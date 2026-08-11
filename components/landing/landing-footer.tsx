/**
 * Landing page footer — matches generator Layer 8 footer style.
 * #FrameInGoa + hhgoa.com on a deep green bar.
 */
export function LandingFooter() {
	return (
		<footer className="px-5 sm:px-8 py-6 mt-8">
			<div className="max-w-5xl mx-auto bg-hh-dark rounded-xl px-6 sm:px-8 py-4 flex items-center justify-between">
				<span className="text-hh-yellow text-xs sm:text-sm font-bold tracking-wider">
					#FrameInGoa
				</span>
				<a
					href="https://hhgoa.com"
					target="_blank"
					rel="noreferrer"
					className="text-hh-cream text-xs sm:text-sm font-bold tracking-wider hover:text-hh-yellow transition-colors"
				>
					hhgoa.com
				</a>
			</div>

			{/* Copyright micro-text */}
			<p className="text-center text-hh-cream/20 text-[10px] font-medium mt-4 pb-2">
				Hacker House Goa 2026 · 2:47 PM Studio
			</p>
		</footer>
	);
}
