'use client';

import React, { useState } from 'react';
import { Share2, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { downloadBlob } from '@/lib/downloadPoster';

interface ShareButtonProps {
	canvasRef: React.RefObject<HTMLCanvasElement | null>;
	builderName: string;
	builderId?: string | null;
	className?: string;
}

/**
 * Builds custom pre-written template for sharing to X.
 */
function buildShareText(name: string, builderId?: string | null): string {
	const displayName = name.trim() || 'Builder';
	const idFormatted = builderId
		? builderId.startsWith('#')
			? builderId
			: `#${builderId}`
		: '#HH-GOA-2026';

	return `🌴 Built my Hacker House Goa Builder Card!

👤 ${displayName}
🪪 Builder ID: ${idFormatted}

Excited to build, ship, and connect with amazing builders in Goa. 🚀

Create your own Builder Card:
https://hhgoa.taskdrift.in

#FrameInGoa #HHGoa2026`;
}

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
	builderId,
	className = '',
}) => {
	const [isSharing, setIsSharing] = useState(false);
	const [notice, setNotice] = useState<{ message: string; isError?: boolean } | null>(null);

	const handleShare = async () => {
		if (!canvasRef.current) return;

		setIsSharing(true);
		setNotice(null);

		try {
			const blob = await canvasToBlob(canvasRef.current);
			const fileName = `hh-goa-2026-${sanitizeName(builderName)}.png`;
			const file = new File([blob], fileName, { type: 'image/png' });
			const shareText = buildShareText(builderName, builderId);

			// Mobile path: Web Share API with file attachment
			if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [file] })) {
				await navigator.share({
					text: shareText,
					files: [file],
				});
				return;
			}

			// Desktop flow: Try Vercel Blob upload to get a public URL for direct link intent on x.com
			let imageUrl: string | null = null;
			try {
				const formData = new FormData();
				formData.append('poster', file);

				const response = await fetch('/api/share', {
					method: 'POST',
					body: formData,
				});

				if (response.ok) {
					const data = await response.json();
					imageUrl = data.url || null;
				}
			} catch (err) {
				console.warn('Vercel Blob share upload unavailable, using direct download fallback:', err);
			}

			const tweetText = encodeURIComponent(shareText);

			if (imageUrl) {
				const intentUrl = `https://x.com/intent/post?text=${tweetText}%20${encodeURIComponent(imageUrl)}`;
				window.open(intentUrl, '_blank', 'noopener,noreferrer');
			} else {
				// Fallback when Vercel Blob storage is unconfigured or upload fails:
				// 1. Download image to user's device
				// 2. Open X intent for posting
				// 3. Notify user to attach downloaded image
				downloadBlob(blob, fileName);
				const intentUrl = `https://x.com/intent/post?text=${tweetText}`;
				window.open(intentUrl, '_blank', 'noopener,noreferrer');
				setNotice({
					message: 'Poster downloaded! Attach it to your post on X.',
				});
			}
		} catch (err) {
			// User cancellation from Web Share API is not an error
			if (err instanceof DOMException && err.name === 'AbortError') {
				return;
			}
			const message = err instanceof Error ? err.message : 'Sharing failed.';
			setNotice({ message, isError: true });
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
				className={`min-h-[48px] px-5 py-2.5 rounded-xl bg-[#07261D] border border-[#FFD400]/40 text-[#FFD400] font-extrabold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#0B3D2E] hover:border-[#FFD400] transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,212,0,0.15)] hover:scale-[1.02] touch-manipulation cursor-pointer disabled:opacity-50 ${className}`}
			>
				{isSharing ? (
					<Loader2 className="w-4 h-4 animate-spin text-[#FFD400]" />
				) : (
					<Share2 className="w-4 h-4 text-[#F0176D]" />
				)}
				<span>{isSharing ? 'Sharing...' : 'Share to X'}</span>
			</button>

			{notice && (
				<p
					className={`text-[11px] font-semibold flex items-center gap-1 px-1 ${
						notice.isError ? 'text-[#F0176D]' : 'text-[#FFD400]'
					}`}
				>
					{notice.isError ? (
						<AlertCircle className="w-3.5 h-3.5 shrink-0" />
					) : (
						<CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#FFD400]" />
					)}
					<span>{notice.message}</span>
				</p>
			)}
		</div>
	);
};


