import React from 'react';

// TODO (Opus 4.6): Prompt 2 - SVG/brand asset structure (gets reused everywhere downstream)
interface WordmarkProps {
	className?: string;
	width?: number | string;
	height?: number | string;
}

export const Wordmark: React.FC<WordmarkProps> = ({
	className = '',
	width = 300,
	height = 80,
}) => {
	return (
		<svg
			viewBox="0 0 300 80"
			width={width}
			height={height}
			className={`inline-block ${className}`}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			{/* Wordmark background badge lockup placeholder */}
			<text
				x="150"
				y="28"
				textAnchor="middle"
				fill="#0B3D2E"
				fontSize="24"
				fontWeight="900"
				fontFamily="serif"
				letterSpacing="3"
			>
				HACKER
			</text>

			{/* Devanagari Goa Pill Badge */}
			<rect x="110" y="34" width="80" height="22" rx="11" fill="#F0176D" />
			<text
				x="150"
				y="49"
				textAnchor="middle"
				fill="#FFFFFF"
				fontSize="13"
				fontWeight="bold"
				fontFamily="sans-serif"
			>
				गोवा
			</text>

			<text
				x="150"
				y="72"
				textAnchor="middle"
				fill="#0B3D2E"
				fontSize="24"
				fontWeight="900"
				fontFamily="serif"
				letterSpacing="3"
			>
				HOUSE
			</text>
		</svg>
	);
};
