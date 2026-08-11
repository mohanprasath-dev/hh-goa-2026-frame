/**
 * Horizontal selection process step tracker.
 * Static server component — current step highlighted in pink.
 */

const STEPS = [
	{ label: 'Open Trials', active: true },
	{ label: 'Alpha Selection', active: false },
	{ label: 'Beta Selection', active: false },
	{ label: 'Charlie Selection', active: false },
	{ label: 'Delta Selection', active: false },
	{ label: 'Partner Trials', active: false },
	{ label: 'RSVP & Stake', active: false },
	{ label: 'Residency', active: false },
] as const;

export function SelectionStrip() {
	return (
		<section className="px-5 sm:px-8 py-10 sm:py-14 overflow-x-auto">
			<div className="max-w-5xl mx-auto">
				{/* Section label */}
				<p className="text-hh-cream/40 text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-center mb-6">
					SELECTION PROCESS
				</p>

				{/* Step track */}
				<div className="flex items-center justify-start sm:justify-center gap-0 min-w-max sm:min-w-0 mx-auto">
					{STEPS.map((step, i) => (
						<div key={step.label} className="flex items-center">
							{/* Step dot + label */}
							<div className="flex flex-col items-center gap-1.5">
								<div
									className={`w-2.5 h-2.5 rounded-full transition-colors ${
										step.active
											? 'bg-hh-pink shadow-[0_0_8px_rgba(240,23,109,0.5)]'
											: 'bg-hh-cream/20'
									}`}
								/>
								<span
									className={`text-[9px] sm:text-[10px] font-bold tracking-wider uppercase whitespace-nowrap ${
										step.active
											? 'text-hh-pink'
											: 'text-hh-cream/30'
									}`}
								>
									{step.label}
								</span>
							</div>

							{/* Connector line between steps */}
							{i < STEPS.length - 1 && (
								<div className="w-6 sm:w-10 h-px bg-hh-cream/10 mx-1 sm:mx-2 mt-[-14px]" />
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
