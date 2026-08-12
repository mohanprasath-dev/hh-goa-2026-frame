import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'HH Goa 2026 Poster Generator | Build in Goa',
	description:
		'Create your customized Hacker House Goa 2026 builder poster and squad cards for social sharing.',
	openGraph: {
		title: 'HH Goa 2026 Poster Generator',
		description:
			'Create your customized Hacker House Goa 2026 builder poster and squad cards.',
		url: 'https://hhgoa.taskdrift.in',
		siteName: 'Hacker House Goa 2026',
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'HH Goa 2026 Poster Generator',
		description:
			'Create your customized Hacker House Goa 2026 builder poster and squad cards.',
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
