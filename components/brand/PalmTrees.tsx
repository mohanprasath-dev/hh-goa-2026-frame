import React from 'react';

// TODO (Opus 4.6): Prompt 2 - SVG/brand asset structure
interface PalmTreesProps {
	className?: string;
	width?: number | string;
	height?: number | string;
	variant?: 1 | 2 | 3;
}

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
		>
			{/* Palm Trunk */}
			<path
				d="M48 110 C 45 80, 52 50, 50 25"
				stroke="#0B3D2E"
				strokeWidth="5"
				strokeLinecap="round"
			/>
			{/* Palm Leaves */}
			<path
				d="M50 25 C 30 10, 10 20, 5 30"
				stroke="#0B3D2E"
				strokeWidth="4"
				fill="none"
			/>
			<path
				d="M50 25 C 70 10, 90 20, 95 30"
				stroke="#0B3D2E"
				strokeWidth="4"
				fill="none"
			/>
			<path
				d="M50 25 C 40 5, 60 5, 50 25"
				stroke="#FFD400"
				strokeWidth="4"
				fill="none"
			/>
			<path
				d="M50 25 C 25 35, 15 45, 10 50"
				stroke="#FFD400"
				strokeWidth="3"
				fill="none"
			/>
			<path
				d="M50 25 C 75 35, 85 45, 90 50"
				stroke="#FFD400"
				strokeWidth="3"
				fill="none"
			/>
		</svg>
	);
};
