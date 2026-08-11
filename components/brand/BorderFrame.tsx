import React from 'react';

// TODO (Opus 4.6): Prompt 2 - SVG/brand asset structure
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
		>
			{/* Decorative dashed & scalloped border frame */}
			<rect
				x="10"
				y="10"
				width="380"
				height="480"
				rx="16"
				stroke="#F0176D"
				strokeWidth="4"
				fill="none"
			/>
			<rect
				x="18"
				y="18"
				width="364"
				height="464"
				rx="12"
				stroke="#FFD400"
				strokeWidth="2"
				strokeDasharray="8 4"
				fill="none"
			/>
		</svg>
	);
};
