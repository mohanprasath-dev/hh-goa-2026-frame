import React from 'react';

interface IconProps {
	className?: string;
	size?: number;
	color?: string;
}

/**
 * Surfboard icon — elongated teardrop with centre stringer line and fin detail.
 */
export const SurfboardIcon: React.FC<IconProps> = ({
	className = '',
	size = 24,
	color = '#0B3D2E',
}) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		className={className}
		xmlns="http://www.w3.org/2000/svg"
		role="img"
		aria-label="Surfboard icon"
	>
		{/* Board outline — tapered teardrop shape */}
		<path
			d="M12 1.5 C 8.5 5, 6.5 10, 6 15 C 5.5 18.5, 8 22.5, 12 22.5 C 16 22.5, 18.5 18.5, 18 15 C 17.5 10, 15.5 5, 12 1.5Z"
			stroke={color}
			strokeWidth="1.5"
			fill="none"
			strokeLinejoin="round"
		/>
		{/* Centre stringer line */}
		<line x1="12" y1="3" x2="12" y2="21" stroke="#F0176D" strokeWidth="1" />
		{/* Fin at the bottom */}
		<path
			d="M12 19 L 10 22 L 12 21 L 14 22 Z"
			fill={color}
			stroke={color}
			strokeWidth="0.5"
		/>
		{/* Cross stringer */}
		<line x1="8" y1="12" x2="16" y2="12" stroke="#FFD400" strokeWidth="1" opacity="0.7" />
	</svg>
);

/**
 * Signpost icon — wooden pole with two directional arrow boards.
 */
export const SignpostIcon: React.FC<IconProps> = ({
	className = '',
	size = 24,
	color = '#0B3D2E',
}) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		className={className}
		xmlns="http://www.w3.org/2000/svg"
		role="img"
		aria-label="Signpost icon"
	>
		{/* Wooden pole with base */}
		<line x1="12" y1="2" x2="12" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round" />
		{/* Cross support at base */}
		<line x1="9" y1="22" x2="15" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round" />

		{/* Top sign board — pointing right (yellow) */}
		<path
			d="M6 5 H17 L20 7.5 L17 10 H6 V5Z"
			fill="#FFD400"
			stroke={color}
			strokeWidth="1.2"
			strokeLinejoin="round"
		/>
		{/* Text lines on top board */}
		<line x1="8" y1="7.5" x2="14" y2="7.5" stroke={color} strokeWidth="1" opacity="0.5" />

		{/* Bottom sign board — pointing left (pink) */}
		<path
			d="M18 12 H7 L4 14.5 L7 17 H18 V12Z"
			fill="#F0176D"
			stroke={color}
			strokeWidth="1.2"
			strokeLinejoin="round"
		/>
		{/* Text lines on bottom board */}
		<line x1="10" y1="14.5" x2="16" y2="14.5" stroke="#F5F0E1" strokeWidth="1" opacity="0.7" />

		{/* Nail dot at junction */}
		<circle cx="12" cy="7.5" r="1" fill={color} />
		<circle cx="12" cy="14.5" r="1" fill={color} />
	</svg>
);

/**
 * Beach hut icon — A-frame hut with thatched roof, stilts, and door.
 */
export const BeachHutIcon: React.FC<IconProps> = ({
	className = '',
	size = 24,
	color = '#0B3D2E',
}) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		className={className}
		xmlns="http://www.w3.org/2000/svg"
		role="img"
		aria-label="Beach hut icon"
	>
		{/* Thatched roof — A-frame triangle */}
		<path
			d="M2 11 L12 2 L22 11"
			stroke={color}
			strokeWidth="2"
			fill="#FFD400"
			strokeLinejoin="round"
			strokeLinecap="round"
		/>
		{/* Roof thatch texture lines */}
		<line x1="7" y1="6.5" x2="12" y2="2.5" stroke={color} strokeWidth="0.8" opacity="0.4" />
		<line x1="17" y1="6.5" x2="12" y2="2.5" stroke={color} strokeWidth="0.8" opacity="0.4" />
		<line x1="5" y1="9" x2="12" y2="3" stroke={color} strokeWidth="0.6" opacity="0.3" />
		<line x1="19" y1="9" x2="12" y2="3" stroke={color} strokeWidth="0.6" opacity="0.3" />

		{/* Hut body / walls */}
		<rect x="5" y="11" width="14" height="9" stroke={color} strokeWidth="1.5" fill="none" />

		{/* Stilts below */}
		<line x1="7" y1="20" x2="7" y2="23" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
		<line x1="17" y1="20" x2="17" y2="23" stroke={color} strokeWidth="1.5" strokeLinecap="round" />

		{/* Door */}
		<rect x="10" y="14" width="4" height="6" rx="1" fill="#F0176D" stroke={color} strokeWidth="1" />

		{/* Window */}
		<rect x="6.5" y="13" width="3" height="3" rx="0.5" stroke={color} strokeWidth="0.8" fill="#F5F0E1" />
	</svg>
);
