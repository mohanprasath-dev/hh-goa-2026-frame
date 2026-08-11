import React from 'react';

interface PalmTreesProps {
	className?: string;
	width?: number | string;
	height?: number | string;
	variant?: 1 | 2 | 3;
}

/**
 * Variant 1: Single tall palm with curved trunk and drooping fronds.
 * Variant 2: Double palm cluster leaning apart.
 * Variant 3: Short stubby palm with dense canopy.
 */
export const PalmTrees: React.FC<PalmTreesProps> = ({
	className = '',
	width = 100,
	height = 120,
	variant = 1,
}) => {
	return (
		<svg
			viewBox="0 0 100 120"
			width={width}
			height={height}
			className={`inline-block ${className}`}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label="Palm tree illustration"
		>
			{variant === 1 && (
				<>
					{/* Trunk — curved single palm */}
					<path
						d="M50 115 C 47 95, 44 70, 48 45 C 50 35, 52 28, 50 20"
						stroke="#0B3D2E"
						strokeWidth="5"
						strokeLinecap="round"
						fill="none"
					/>
					{/* Trunk texture rings */}
					<path d="M46 80 Q50 78, 52 80" stroke="#0B3D2E" strokeWidth="1.5" opacity="0.4" />
					<path d="M46 70 Q50 68, 52 70" stroke="#0B3D2E" strokeWidth="1.5" opacity="0.4" />
					<path d="M47 60 Q50 58, 52 60" stroke="#0B3D2E" strokeWidth="1.5" opacity="0.4" />

					{/* Left fronds — green */}
					<path d="M50 20 C 35 10, 15 12, 5 25" stroke="#0B3D2E" strokeWidth="3" strokeLinecap="round" />
					<path d="M50 20 C 30 15, 10 22, 2 35" stroke="#0B3D2E" strokeWidth="2.5" strokeLinecap="round" />
					<path d="M50 20 C 38 22, 22 30, 12 42" stroke="#0B3D2E" strokeWidth="2" strokeLinecap="round" />

					{/* Right fronds — green */}
					<path d="M50 20 C 65 10, 85 12, 95 25" stroke="#0B3D2E" strokeWidth="3" strokeLinecap="round" />
					<path d="M50 20 C 70 15, 90 22, 98 35" stroke="#0B3D2E" strokeWidth="2.5" strokeLinecap="round" />
					<path d="M50 20 C 62 22, 78 30, 88 42" stroke="#0B3D2E" strokeWidth="2" strokeLinecap="round" />

					{/* Top frond — yellow accent */}
					<path d="M50 20 C 45 5, 55 5, 50 20" stroke="#FFD400" strokeWidth="3" fill="none" />
					<path d="M50 20 C 42 8, 58 8, 50 20" stroke="#FFD400" strokeWidth="2" fill="none" opacity="0.6" />

					{/* Coconuts */}
					<circle cx="47" cy="23" r="3.5" fill="#FFD400" />
					<circle cx="53" cy="22" r="3" fill="#FFD400" />
				</>
			)}

			{variant === 2 && (
				<>
					{/* Left palm trunk — leaning left */}
					<path
						d="M40 115 C 35 90, 30 65, 28 40 C 26 30, 25 22, 28 15"
						stroke="#0B3D2E"
						strokeWidth="4.5"
						strokeLinecap="round"
					/>
					{/* Left fronds */}
					<path d="M28 15 C 15 5, 2 10, 0 22" stroke="#0B3D2E" strokeWidth="2.5" strokeLinecap="round" />
					<path d="M28 15 C 10 12, 0 20, 0 32" stroke="#0B3D2E" strokeWidth="2" strokeLinecap="round" />
					<path d="M28 15 C 38 5, 48 8, 52 18" stroke="#FFD400" strokeWidth="2.5" strokeLinecap="round" />
					<path d="M28 15 C 20 25, 12 32, 5 38" stroke="#FFD400" strokeWidth="2" strokeLinecap="round" />
					<circle cx="26" cy="18" r="3" fill="#FFD400" />

					{/* Right palm trunk — leaning right */}
					<path
						d="M60 115 C 65 90, 70 65, 72 40 C 74 30, 75 22, 72 15"
						stroke="#0B3D2E"
						strokeWidth="4.5"
						strokeLinecap="round"
					/>
					{/* Right fronds */}
					<path d="M72 15 C 85 5, 98 10, 100 22" stroke="#0B3D2E" strokeWidth="2.5" strokeLinecap="round" />
					<path d="M72 15 C 90 12, 100 20, 100 32" stroke="#0B3D2E" strokeWidth="2" strokeLinecap="round" />
					<path d="M72 15 C 62 5, 52 8, 48 18" stroke="#FFD400" strokeWidth="2.5" strokeLinecap="round" />
					<path d="M72 15 C 80 25, 88 32, 95 38" stroke="#FFD400" strokeWidth="2" strokeLinecap="round" />
					<circle cx="74" cy="18" r="3" fill="#FFD400" />

					{/* Ground line */}
					<path d="M20 115 L 80 115" stroke="#0B3D2E" strokeWidth="2" opacity="0.3" />
				</>
			)}

			{variant === 3 && (
				<>
					{/* Short stubby trunk */}
					<path
						d="M50 115 C 49 100, 48 85, 50 65"
						stroke="#0B3D2E"
						strokeWidth="6"
						strokeLinecap="round"
					/>
					{/* Trunk rings */}
					<path d="M47 95 Q50 93, 53 95" stroke="#0B3D2E" strokeWidth="1.5" opacity="0.4" />
					<path d="M47 85 Q50 83, 53 85" stroke="#0B3D2E" strokeWidth="1.5" opacity="0.4" />

					{/* Dense canopy — radiating fronds */}
					<path d="M50 65 C 30 50, 10 45, 2 50" stroke="#0B3D2E" strokeWidth="3" strokeLinecap="round" />
					<path d="M50 65 C 25 55, 8 55, 0 60" stroke="#0B3D2E" strokeWidth="2.5" strokeLinecap="round" />
					<path d="M50 65 C 35 60, 18 65, 8 72" stroke="#0B3D2E" strokeWidth="2" strokeLinecap="round" />

					<path d="M50 65 C 70 50, 90 45, 98 50" stroke="#0B3D2E" strokeWidth="3" strokeLinecap="round" />
					<path d="M50 65 C 75 55, 92 55, 100 60" stroke="#0B3D2E" strokeWidth="2.5" strokeLinecap="round" />
					<path d="M50 65 C 65 60, 82 65, 92 72" stroke="#0B3D2E" strokeWidth="2" strokeLinecap="round" />

					{/* Top fronds — yellow */}
					<path d="M50 65 C 40 40, 60 40, 50 65" stroke="#FFD400" strokeWidth="3" fill="none" />
					<path d="M50 65 C 45 45, 55 45, 50 65" stroke="#FFD400" strokeWidth="2" fill="none" opacity="0.6" />

					{/* Coconut cluster */}
					<circle cx="47" cy="66" r="4" fill="#FFD400" />
					<circle cx="53" cy="64" r="3.5" fill="#FFD400" />
					<circle cx="50" cy="60" r="3" fill="#FFD400" />
				</>
			)}
		</svg>
	);
};
