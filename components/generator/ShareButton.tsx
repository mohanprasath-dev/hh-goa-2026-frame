'use client';

import React from 'react';
import { Share2 } from 'lucide-react';

// TODO (Opus 4.6): Prompt 8 - Share to X & Vercel Blob Integration Bridge
interface ShareButtonProps {
	className?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
	className = '',
}) => {
	const handleShareClick = () => {
		alert(
			'🌴 Share to X & Vercel Blob integration bridge is reserved for Opus 4.6.'
		);
	};

	return (
		<button
			type="button"
			onClick={handleShareClick}
			className={`min-h-[48px] px-5 py-2.5 rounded-xl bg-[#0B3D2E] text-white font-bold text-sm hover:bg-[#07261D] transition-colors flex items-center justify-center gap-2 shadow-md touch-manipulation cursor-pointer ${className}`}
		>
			<Share2 className="w-4 h-4 text-[#FFD400]" />
			<span>Share to X</span>
		</button>
	);
};
