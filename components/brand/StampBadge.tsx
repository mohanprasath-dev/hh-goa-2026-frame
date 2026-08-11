import React from 'react';

// TODO (Opus 4.6): Prompt 2 - SVG/brand asset structure
interface StampBadgeProps {
	className?: string;
	width?: number | string;
	height?: number | string;
}

export const StampBadge: React.FC<StampBadgeProps> = ({
	className = '',
	width = 90,
	height = 90,
}) => {
	return (
		<svg
			viewBox="0 0 100 100"
			width={width}
			height={height}
			className={`inline-block ${className}`}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			{/* Stamp Scalloped Border Outer */}
			<rect
				x="5"
				y="5"
				width="90"
				height="90"
				rx="4"
				fill="#F5F0E1"
				stroke="#F0176D"
				strokeWidth="3"
				strokeDasharray="4 2"
			/>
			{/* Inner Content */}
			<text
				x="50"
				y="35"
				textAnchor="middle"
				fill="#0B3D2E"
				fontSize="12"
				fontWeight="bold"
				letterSpacing="1.5"
			>
				GOA
			</text>
			{/* Sun icon */}
			<circle cx="50" cy="50" r="8" fill="#FFD400" />
			<text
				x="50"
				y="75"
				textAnchor="middle"
				fill="#0B3D2E"
				fontSize="10"
				fontWeight="bold"
				letterSpacing="1.5"
			>
				INDIA
			</text>
		</svg>
	);
};
