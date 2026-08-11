import React from 'react';

// TODO (Opus 4.6): Prompt 2 - SVG/brand asset structure
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
		>
			<circle cx="70" cy="70" r="62" stroke="#0B3D2E" strokeWidth="3" />
			<circle
				cx="70"
				cy="70"
				r="54"
				stroke="#FFD400"
				strokeWidth="2"
				strokeDasharray="4 3"
			/>
			<text
				x="70"
				y="62"
				textAnchor="middle"
				fill="#0B3D2E"
				fontSize="10"
				fontWeight="bold"
			>
				BUILD IN GOA
			</text>
			<text
				x="70"
				y="74"
				textAnchor="middle"
				fill="#F0176D"
				fontSize="12"
				fontWeight="bold"
			>
				★
			</text>
			<text
				x="70"
				y="88"
				textAnchor="middle"
				fill="#0B3D2E"
				fontSize="9"
				fontWeight="bold"
			>
				SHIP FROM PARADISE
			</text>
		</svg>
	);
};
