import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'HH Goa 2026 Poster Generator | Build in Goa',
	description:
		'Create your customized Hacker House Goa 2026 builder poster and squad cards for social sharing.',
	metadataBase: new URL('https://hhgoa.taskdrift.in'),
	icons: {
		icon: [
			{ url: '/icon.png', type: 'image/png' },
			{ url: '/favicon.ico' },
		],
		shortcut: '/favicon.ico',
		apple: '/apple-icon.png',
	},
	openGraph: {
		title: 'HH Goa 2026 Poster Generator | Build in Goa',
		description:
			'Create your customized Hacker House Goa 2026 builder poster and squad cards.',
		url: 'https://hhgoa.taskdrift.in',
		siteName: 'Hacker House Goa 2026',
		images: [
			{
				url: '/og-image.png',
				width: 1200,
				height: 630,
				alt: 'Hacker House Goa 2026',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'HH Goa 2026 Poster Generator | Build in Goa',
		description:
			'Create your customized Hacker House Goa 2026 builder poster and squad cards.',
		images: ['/og-image.png'],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="antialiased selection:bg-[#FFD400] selection:text-[#0B3D2E]">
				{children}
			</body>
		</html>
	);
}
