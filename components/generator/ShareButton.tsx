'use client';

import React, { useState } from 'react';
import { Share2, Loader2, AlertCircle } from 'lucide-react';

interface ShareButtonProps {
	canvasRef: React.RefObject<HTMLCanvasElement | null>;
	builderName: string;
	className?: string;
}

const SHARE_TEXT = "I'm building at Hacker House Goa 2026 🌴 #FrameInGoa";

/**
 * Converts canvas to PNG Blob.
 */
function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
	return new Promise((resolve, reject) => {
		canvas.toBlob(
			(blob) => {
				if (blob) {
					resolve(blob);
				} else {
					reject(new Error('Failed to export canvas as PNG.'));
				}
			},
			'image/png',
			1.0
		);
	});
}

/**
 * Sanitises builder name into a safe filename.
 */
function sanitizeName(name: string): string {
	return name
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '') || 'poster';
}

export const ShareButton: React.FC<ShareButtonProps> = ({
	canvasRef,
	builderName,
	className = '',
}) => {
	const [isSharing, setIsSharing] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleShare = async () => {
		if (!canvasRef.current) return;

		setIsSharing(true);
		setError(null);

		try {
			const blob = await canvasToBlob(canvasRef.current);
			const fileName = `hh-goa-2026-${sanitizeName(builderName)}.png`;
			const file = new File([blob], fileName, { type: 'image/png' });

			// Mobile path: Web Share API with file attachment
			if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [file] })) {
				await navigator.share({
					text: SHARE_TEXT,
					files: [file],
				});
				return;
			}

			// Desktop fallback: Upload to Vercel Blob → open X intent
			const formData = new FormData();
			formData.append('poster', file);

			const response = await fetch('/api/share', {
				method: 'POST',
				body: formData,
			});

			if (!response.ok) {
				const data = await response.json().catch(() => ({ error: 'Upload failed.' }));
				throw new Error(data.error || `Upload failed (${response.status}).`);
			}

			const { url } = await response.json();

			// Open X/Twitter intent with pre-filled text and image URL
			const tweetText = encodeURIComponent(SHARE_TEXT);
			const imageUrl = encodeURIComponent(url);
			const intentUrl = `https://x.com/intent/post?text=${tweetText}%20${imageUrl}`;
			window.open(intentUrl, '_blank', 'noopener,noreferrer');
		} catch (err) {
			// User cancellation from Web Share API is not an error
			if (err instanceof DOMException && err.name === 'AbortError') {
				return;
			}
			const message = err instanceof Error ? err.message : 'Sharing failed.';
			setError(message);
			console.error('Share error:', err);
		} finally {
			setIsSharing(false);
		}
	};

	return (
		<div className="flex flex-col items-stretch gap-1.5">
			<button
				type="button"
				onClick={handleShare}
				disabled={isSharing}
				className={`min-h-[48px] px-5 py-2.5 rounded-xl bg-[#0B3D2E] text-white font-bold text-sm hover:bg-[#07261D] transition-colors flex items-center justify-center gap-2 shadow-md touch-manipulation cursor-pointer disabled:opacity-50 ${className}`}
			>
				{isSharing ? (
					<Loader2 className="w-4 h-4 animate-spin text-[#FFD400]" />
				) : (
					<Share2 className="w-4 h-4 text-[#FFD400]" />
				)}
				<span>{isSharing ? 'Sharing...' : 'Share to X'}</span>
			</button>

			{error && (
				<p className="text-[11px] text-[#F0176D] font-semibold flex items-center gap-1 px-1">
					<AlertCircle className="w-3 h-3 shrink-0" />
					{error}
				</p>
			)}
		</div>
	);
};
