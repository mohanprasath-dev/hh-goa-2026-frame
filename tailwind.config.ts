import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				'hh-green': '#0B3D2E',
				'hh-yellow': '#FFD400',
				'hh-pink': '#F0176D',
				'hh-cream': '#F5F0E1',
				'hh-dark': '#07261D',
			},
			fontFamily: {
				sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
				serif: ['var(--font-serif)', 'Georgia', 'serif'],
				devanagari: ['var(--font-devanagari)', 'sans-serif'],
			},
		},
	},
	plugins: [],
};

export default config;
