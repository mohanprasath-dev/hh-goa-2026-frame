import React from 'react';

interface WordmarkProps {
	className?: string;
	width?: number | string;
	height?: number | string;
}

export const Wordmark: React.FC<WordmarkProps> = ({
	className = '',
	width = 300,
	height = 120,
}) => {
	return (
		<svg
			viewBox="0 0 300 120"
			width={width}
			height={height}
			className={`inline-block ${className}`}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label="Hacker House Goa 2026 Wordmark"
		>
			{/* "HACKER" — bold serif deep green */}
			<text
				x="150"
				y="30"
				textAnchor="middle"
				fill="#0B3D2E"
				fontSize="28"
				fontWeight="900"
				fontFamily="Georgia, 'Times New Roman', serif"
				letterSpacing="6"
			>
				HACKER
			</text>

			{/* Devanagari गोवा pill badge — pink rounded rect with white text */}
			<rect x="100" y="40" width="100" height="30" rx="15" fill="#F0176D" />
			<text
				x="150"
				y="61"
				textAnchor="middle"
				fill="#FFFFFF"
				fontSize="17"
				fontWeight="700"
				fontFamily="'Noto Sans Devanagari', sans-serif"
			>
				गोवा
			</text>

			{/* Decorative dots flanking the pill */}
			<circle cx="90" cy="55" r="3" fill="#FFD400" />
			<circle cx="210" cy="55" r="3" fill="#FFD400" />

			{/* "HOUSE" — bold serif deep green */}
			<text
				x="150"
				y="100"
				textAnchor="middle"
				fill="#0B3D2E"
				fontSize="28"
				fontWeight="900"
				fontFamily="Georgia, 'Times New Roman', serif"
				letterSpacing="6"
			>
				HOUSE
			</text>

			{/* Thin decorative lines above and below */}
			<line x1="60" y1="8" x2="240" y2="8" stroke="#FFD400" strokeWidth="2" />
			<line x1="60" y1="112" x2="240" y2="112" stroke="#FFD400" strokeWidth="2" />
		</svg>
	);
};
