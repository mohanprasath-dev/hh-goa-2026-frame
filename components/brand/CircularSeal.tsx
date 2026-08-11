import React from 'react';

interface CircularSealProps {
	className?: string;
	width?: number | string;
	height?: number | string;
}

export const CircularSeal: React.FC<CircularSealProps> = ({
	className = '',
	width = 120,
	height = 120,
}) => {
	return (
		<svg
			viewBox="0 0 140 140"
			width={width}
			height={height}
			className={`inline-block ${className}`}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label="Build in Goa, Ship from Paradise circular seal"
		>
			{/* Outer ring — solid deep green */}
			<circle cx="70" cy="70" r="65" stroke="#0B3D2E" strokeWidth="3" fill="none" />

			{/* Inner ring — dashed yellow */}
			<circle
				cx="70"
				cy="70"
				r="56"
				stroke="#FFD400"
				strokeWidth="2"
				strokeDasharray="5 3"
				fill="none"
			/>

			{/* Inner decorative ring */}
			<circle cx="70" cy="70" r="48" stroke="#0B3D2E" strokeWidth="1" fill="none" opacity="0.3" />

			{/* Circular text paths */}
			<defs>
				{/* Arc path for top text — "BUILD IN GOA" curving along the top */}
				<path
					id="topArc"
					d="M 20 70 A 50 50 0 0 1 120 70"
				/>
				{/* Arc path for bottom text — "SHIP FROM PARADISE" curving along the bottom */}
				<path
					id="bottomArc"
					d="M 120 70 A 50 50 0 0 1 20 70"
				/>
			</defs>

			{/* Top arc text */}
			<text fill="#0B3D2E" fontSize="9.5" fontWeight="700" fontFamily="Georgia, serif" letterSpacing="3">
				<textPath href="#topArc" startOffset="50%" textAnchor="middle">
					BUILD IN GOA
				</textPath>
			</text>

			{/* Bottom arc text */}
			<text fill="#0B3D2E" fontSize="8.5" fontWeight="700" fontFamily="Georgia, serif" letterSpacing="2.5">
				<textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
					SHIP FROM PARADISE
				</textPath>
			</text>

			{/* Centre compass / star decorative element */}
			{/* Outer star points */}
			<polygon
				points="70,48 73,62 87,62 76,70 79,84 70,76 61,84 64,70 53,62 67,62"
				fill="#FFD400"
				stroke="#0B3D2E"
				strokeWidth="1"
			/>
			{/* Inner dot */}
			<circle cx="70" cy="68" r="4" fill="#F0176D" />

			{/* Separator dots on the horizontal axis */}
			<circle cx="18" cy="70" r="2.5" fill="#F0176D" />
			<circle cx="122" cy="70" r="2.5" fill="#F0176D" />
		</svg>
	);
};
