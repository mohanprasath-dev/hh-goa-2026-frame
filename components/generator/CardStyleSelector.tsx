'use client';

import React from 'react';
import type { CardStyle } from '@/types/builder';

interface CardStyleOption {
	value: CardStyle;
	label: string;
	sublabel: string;
	aspect: string; // Tailwind aspect class for thumbnail shape
	icon: string;
}

const CARD_STYLES: CardStyleOption[] = [
	{
		value: 'tropical',
		label: 'Tropical',
		sublabel: 'Original',
		aspect: 'aspect-[2/3]',
		icon: '🌴',
	},
	{
		value: 'dark-id-front',
		label: 'Dark ID',
		sublabel: 'Front',
		aspect: 'aspect-[2/3]',
		icon: '🪪',
	},
	{
		value: 'dark-id-back',
		label: 'Dark ID',
		sublabel: 'Back',
		aspect: 'aspect-[2/3]',
		icon: '📡',
	},
	{
		value: 'pfp',
		label: 'PFP',
		sublabel: 'Frame',
		aspect: 'aspect-square',
		icon: '🖼️',
	},
];

interface CardStyleSelectorProps {
	selected: CardStyle;
	onChange: (style: CardStyle) => void;
}

export const CardStyleSelector: React.FC<CardStyleSelectorProps> = ({
	selected,
	onChange,
}) => {
	return (
		<div className="w-full">
			<label className="block text-xs font-bold uppercase tracking-wider text-[#0B3D2E] mb-2">
				Card Style
			</label>
			<div className="grid grid-cols-4 gap-2">
				{CARD_STYLES.map((style) => {
					const isActive = selected === style.value;
					return (
						<button
							key={style.value}
							type="button"
							onClick={() => onChange(style.value)}
							className={`
								relative flex flex-col items-center gap-1.5 p-2.5 rounded-xl
								border-2 transition-all duration-200 cursor-pointer
								min-h-[80px] touch-manipulation
								${isActive
									? 'border-[#F0176D] bg-[#0B3D2E] text-white shadow-lg shadow-[#F0176D]/20 scale-[1.02]'
									: 'border-[#0B3D2E]/15 bg-white/60 text-[#0B3D2E] hover:border-[#0B3D2E]/40 hover:bg-white/80'
								}
							`}
						>
							{/* Active indicator dot */}
							{isActive && (
								<div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#F0176D] border-2 border-white shadow-sm" />
							)}

							{/* Card shape thumbnail */}
							<div
								className={`
									w-8 ${style.aspect} rounded-sm
									${isActive
										? 'bg-[#FFD400]/30 border border-[#FFD400]/50'
										: 'bg-[#0B3D2E]/10 border border-[#0B3D2E]/15'
									}
									flex items-center justify-center text-sm
								`}
							>
								{style.icon}
							</div>

							{/* Label */}
							<div className="text-center leading-tight">
								<span className={`block text-[11px] font-bold ${isActive ? 'text-[#FFD400]' : ''}`}>
									{style.label}
								</span>
								<span className={`block text-[9px] font-semibold ${isActive ? 'text-white/70' : 'text-[#0B3D2E]/50'}`}>
									{style.sublabel}
								</span>
							</div>
						</button>
					);
				})}
			</div>
		</div>
	);
};
