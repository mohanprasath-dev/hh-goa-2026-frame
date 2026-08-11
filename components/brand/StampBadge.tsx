import React from 'react';

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
			role="img"
			aria-label="GOA INDIA postage stamp badge"
		>
			{/* Scalloped / perforated outer border — simulated with circles clipping a rect */}
			<rect
				x="5"
				y="5"
				width="90"
				height="90"
				rx="3"
				fill="#F5F0E1"
				stroke="#F0176D"
				strokeWidth="2.5"
			/>
			{/* Perforated edge dots — top */}
			{[15, 25, 35, 45, 55, 65, 75, 85].map((cx) => (
				<circle key={`t-${cx}`} cx={cx} cy="5" r="2" fill="#F5F0E1" stroke="#F0176D" strokeWidth="0.8" />
			))}
			{/* Perforated edge dots — bottom */}
			{[15, 25, 35, 45, 55, 65, 75, 85].map((cx) => (
				<circle key={`b-${cx}`} cx={cx} cy="95" r="2" fill="#F5F0E1" stroke="#F0176D" strokeWidth="0.8" />
			))}
			{/* Perforated edge dots — left */}
			{[15, 25, 35, 45, 55, 65, 75, 85].map((cy) => (
				<circle key={`l-${cy}`} cx="5" cy={cy} r="2" fill="#F5F0E1" stroke="#F0176D" strokeWidth="0.8" />
			))}
			{/* Perforated edge dots — right */}
			{[15, 25, 35, 45, 55, 65, 75, 85].map((cy) => (
				<circle key={`r-${cy}`} cx="95" cy={cy} r="2" fill="#F5F0E1" stroke="#F0176D" strokeWidth="0.8" />
			))}

			{/* Inner border frame */}
			<rect
				x="12"
				y="12"
				width="76"
				height="76"
				rx="2"
				fill="none"
				stroke="#0B3D2E"
				strokeWidth="1"
				strokeDasharray="3 2"
			/>

			{/* "GOA" header text */}
			<text
				x="50"
				y="32"
				textAnchor="middle"
				fill="#0B3D2E"
				fontSize="14"
				fontWeight="900"
				fontFamily="Georgia, serif"
				letterSpacing="3"
			>
				GOA
			</text>

			{/* Sun icon with rays */}
			<circle cx="50" cy="52" r="7" fill="#FFD400" />
			{/* Sun rays */}
			{[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
				const rad = (angle * Math.PI) / 180;
				const x1 = 50 + Math.cos(rad) * 9;
				const y1 = 52 + Math.sin(rad) * 9;
				const x2 = 50 + Math.cos(rad) * 13;
				const y2 = 52 + Math.sin(rad) * 13;
				return (
					<line
						key={`ray-${angle}`}
						x1={x1}
						y1={y1}
						x2={x2}
						y2={y2}
						stroke="#FFD400"
						strokeWidth="1.5"
						strokeLinecap="round"
					/>
				);
			})}

			{/* Wave motif below sun */}
			<path
				d="M30 68 Q 35 63, 40 68 Q 45 73, 50 68 Q 55 63, 60 68 Q 65 73, 70 68"
				stroke="#0B3D2E"
				strokeWidth="1.8"
				fill="none"
				strokeLinecap="round"
			/>

			{/* "INDIA" footer text */}
			<text
				x="50"
				y="82"
				textAnchor="middle"
				fill="#0B3D2E"
				fontSize="11"
				fontWeight="700"
				fontFamily="Georgia, serif"
				letterSpacing="4"
			>
				INDIA
			</text>
		</svg>
	);
};
