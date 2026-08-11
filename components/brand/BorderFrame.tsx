import React from 'react';

interface BorderFrameProps {
	className?: string;
	width?: number | string;
	height?: number | string;
}

export const BorderFrame: React.FC<BorderFrameProps> = ({
	className = '',
	width = '100%',
	height = '100%',
}) => {
	return (
		<svg
			viewBox="0 0 400 500"
			width={width}
			height={height}
			className={`absolute inset-0 pointer-events-none ${className}`}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label="Decorative border frame"
		>
			{/* Outer solid pink border */}
			<rect
				x="8"
				y="8"
				width="384"
				height="484"
				rx="14"
				stroke="#F0176D"
				strokeWidth="4"
				fill="none"
			/>

			{/* Inner dashed yellow border */}
			<rect
				x="18"
				y="18"
				width="364"
				height="464"
				rx="10"
				stroke="#FFD400"
				strokeWidth="2"
				strokeDasharray="10 5"
				fill="none"
			/>

			{/* Corner accent — top-left floral dot cluster */}
			<circle cx="28" cy="28" r="5" fill="#FFD400" opacity="0.8" />
			<circle cx="22" cy="22" r="2.5" fill="#F0176D" />
			<circle cx="34" cy="22" r="2" fill="#F0176D" opacity="0.6" />
			<circle cx="22" cy="34" r="2" fill="#F0176D" opacity="0.6" />

			{/* Corner accent — top-right floral dot cluster */}
			<circle cx="372" cy="28" r="5" fill="#FFD400" opacity="0.8" />
			<circle cx="378" cy="22" r="2.5" fill="#F0176D" />
			<circle cx="366" cy="22" r="2" fill="#F0176D" opacity="0.6" />
			<circle cx="378" cy="34" r="2" fill="#F0176D" opacity="0.6" />

			{/* Corner accent — bottom-left floral dot cluster */}
			<circle cx="28" cy="472" r="5" fill="#FFD400" opacity="0.8" />
			<circle cx="22" cy="478" r="2.5" fill="#F0176D" />
			<circle cx="34" cy="478" r="2" fill="#F0176D" opacity="0.6" />
			<circle cx="22" cy="466" r="2" fill="#F0176D" opacity="0.6" />

			{/* Corner accent — bottom-right floral dot cluster */}
			<circle cx="372" cy="472" r="5" fill="#FFD400" opacity="0.8" />
			<circle cx="378" cy="478" r="2.5" fill="#F0176D" />
			<circle cx="366" cy="478" r="2" fill="#F0176D" opacity="0.6" />
			<circle cx="378" cy="466" r="2" fill="#F0176D" opacity="0.6" />

			{/* Midpoint decorative marks on each side */}
			{/* Top centre */}
			<line x1="185" y1="8" x2="185" y2="18" stroke="#FFD400" strokeWidth="2" />
			<line x1="200" y1="6" x2="200" y2="20" stroke="#F0176D" strokeWidth="2.5" />
			<line x1="215" y1="8" x2="215" y2="18" stroke="#FFD400" strokeWidth="2" />

			{/* Bottom centre */}
			<line x1="185" y1="482" x2="185" y2="492" stroke="#FFD400" strokeWidth="2" />
			<line x1="200" y1="480" x2="200" y2="494" stroke="#F0176D" strokeWidth="2.5" />
			<line x1="215" y1="482" x2="215" y2="492" stroke="#FFD400" strokeWidth="2" />

			{/* Left centre */}
			<line x1="8" y1="235" x2="18" y2="235" stroke="#FFD400" strokeWidth="2" />
			<line x1="6" y1="250" x2="20" y2="250" stroke="#F0176D" strokeWidth="2.5" />
			<line x1="8" y1="265" x2="18" y2="265" stroke="#FFD400" strokeWidth="2" />

			{/* Right centre */}
			<line x1="382" y1="235" x2="392" y2="235" stroke="#FFD400" strokeWidth="2" />
			<line x1="380" y1="250" x2="394" y2="250" stroke="#F0176D" strokeWidth="2.5" />
			<line x1="382" y1="265" x2="392" y2="265" stroke="#FFD400" strokeWidth="2" />
		</svg>
	);
};
