import React from 'react';

// TODO (Opus 4.6): Prompt 2 - SVG/brand asset structure
interface IconProps {
	className?: string;
	size?: number;
	color?: string;
}

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
	>
		<path
			d="M12 2C8 6 6 12 6 18C6 20 8 22 12 22C16 22 18 20 18 18C18 12 16 6 12 2Z"
			stroke={color}
			strokeWidth="2"
			strokeLinecap="round"
		/>
		<path d="M12 2V22" stroke="#F0176D" strokeWidth="1.5" />
	</svg>
);

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
	>
		<path d="M12 3V21" stroke={color} strokeWidth="2" />
		<path
			d="M5 6H17L19 8.5L17 11H5V6Z"
			fill="#FFD400"
			stroke={color}
			strokeWidth="1.5"
		/>
		<path
			d="M7 13H19L21 15.5L19 18H7V13Z"
			fill="#F0176D"
			stroke={color}
			strokeWidth="1.5"
		/>
	</svg>
);

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
	>
		<path d="M3 10L12 3L21 10" stroke={color} strokeWidth="2" fill="#FFD400" />
		<path d="M5 10V20H19V10" stroke={color} strokeWidth="2" />
		<rect x="9" y="14" width="6" height="6" fill="#F0176D" />
	</svg>
);
