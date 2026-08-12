'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Download, Loader2, Sparkles } from 'lucide-react';
import {
	renderBuilderCard,
	renderTeamPosterCanvas,
	fetchBuilderId,
} from '@/lib/compositor';
import {
	renderDarkIdFront,
	renderDarkIdBack,
	renderPfpFrame,
} from '@/lib/dark-compositor';
import { downloadPoster } from '@/lib/downloadPoster';
import { ShareButton } from './ShareButton';
import type {
	CardStyle,
	GeneratorMode,
	SinglePosterData,
	TeamPosterData,
} from '@/types/builder';

interface PosterPreviewProps {
	mode: GeneratorMode;
	cardStyle: CardStyle;
	singleData: SinglePosterData;
	teamData: TeamPosterData;
}

/** Returns the CSS aspect ratio class for each card type */
function getAspectClass(cardStyle: CardStyle): string {
	if (cardStyle === 'pfp') return 'aspect-square';
	return 'aspect-[1024/1536]';
}

/** Returns the download filename suffix for each card type */
function getStyleSuffix(cardStyle: CardStyle): string | undefined {
	switch (cardStyle) {
		case 'dark-id-front': return 'dark-front';
		case 'dark-id-back': return 'dark-back';
		case 'pfp': return 'pfp';
		default: return undefined;
	}
}

export const PosterPreview: React.FC<PosterPreviewProps> = ({
	mode,
	cardStyle,
	singleData,
	teamData,
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [isRendering, setIsRendering] = useState(false);
	const [showLoader, setShowLoader] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);
	const [builderId, setBuilderId] = useState<string | null>(null);

	// Live preview render — preview mode (no QR/barcode/API)
	useEffect(() => {
		let isCancelled = false;
		// Subtle loader ONLY if generation exceeds 500ms
		const loaderTimer = setTimeout(() => {
			if (!isCancelled) setShowLoader(true);
		}, 500);

		const render = async () => {
			setIsRendering(true);
			if (canvasRef.current) {
				try {
					await renderCardByStyle(
						cardStyle,
						mode,
						singleData,
						teamData,
						canvasRef.current,
						{ mode: 'preview' }
					);
				} catch (err) {
					console.error('Canvas render error:', err);
				}
			}
			if (!isCancelled) {
				clearTimeout(loaderTimer);
				setShowLoader(false);
				setIsRendering(false);
			}
		};

		// Debounce canvas update
		const debounceTimer = setTimeout(render, 150);

		return () => {
			isCancelled = true;
			clearTimeout(loaderTimer);
			clearTimeout(debounceTimer);
		};
	}, [mode, cardStyle, singleData, teamData]);

	// Final render for download — fetches builder ID, generates QR/barcode
	const handleDownload = async () => {
		if (!canvasRef.current) return;
		setIsDownloading(true);
		try {
			// Fetch builder ID once (cached for subsequent calls)
			let id = builderId;
			if (!id) {
				const result = await fetchBuilderId();
				id = result.builderId;
				setBuilderId(id);
			}

			// Final render with all elements
			await renderCardByStyle(
				cardStyle,
				mode,
				singleData,
				teamData,
				canvasRef.current,
				{ mode: 'final', builderId: id }
			);

			const name =
				mode === 'single'
					? singleData.name || 'builder'
					: singleData.name || 'squad';
			await downloadPoster(canvasRef.current, name, getStyleSuffix(cardStyle));
		} catch (err) {
			console.error('Download failed:', err);
		} finally {
			setIsDownloading(false);
		}
	};

	const aspectClass = getAspectClass(cardStyle);

	return (
		<div className="flex flex-col items-center gap-5 w-full">
			{/* Live Poster Canvas Container */}
			<div className={`relative w-full max-w-[420px] ${aspectClass} rounded-2xl overflow-hidden shadow-2xl border-4 border-[#0B3D2E]/20 bg-[#F5F0E1] flex items-center justify-center transition-all duration-300`}>
				<canvas
					ref={canvasRef}
					className="w-full h-full object-contain transition-opacity duration-200"
				/>

				{/* Subtle Loader (Only visible if >500ms rendering) */}
				{showLoader && isRendering && (
					<div className="absolute inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center gap-2 text-white font-bold text-sm">
						<Loader2 className="w-6 h-6 animate-spin text-[#FFD400]" />
						Updating Poster...
					</div>
				)}
			</div>

			{/* Builder ID badge (shown after first export) */}
			{builderId && (
				<div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B3D2E] text-[#FFD400] text-xs font-bold">
					<Sparkles className="w-3 h-3" />
					{builderId}
				</div>
			)}

			{/* Action Toolbar */}
			<div className="flex items-center gap-3 w-full max-w-[420px]">
				<button
					type="button"
					onClick={handleDownload}
					disabled={isDownloading}
					className="flex-1 min-h-[48px] px-5 py-2.5 rounded-xl bg-[#F0176D] text-white font-bold text-sm hover:bg-[#F0176D]/90 transition-colors flex items-center justify-center gap-2 shadow-md touch-manipulation disabled:opacity-50 cursor-pointer"
				>
					{isDownloading ? (
						<Loader2 className="w-4 h-4 animate-spin" />
					) : (
						<Download className="w-4 h-4 text-[#FFD400]" />
					)}
					<span>Download Poster</span>
				</button>

				<ShareButton
					canvasRef={canvasRef}
					builderName={
						mode === 'single'
							? singleData.name || 'builder'
							: singleData.name || 'squad'
					}
				/>
			</div>
		</div>
	);
};

/* ────────────────────────────────────────────────────────────
 * Routing helper — dispatches to the correct compositor
 * ──────────────────────────────────────────────────────────── */

interface RenderOptions {
	mode: 'preview' | 'final';
	builderId?: string;
}

async function renderCardByStyle(
	cardStyle: CardStyle,
	generatorMode: GeneratorMode,
	singleData: SinglePosterData,
	teamData: TeamPosterData,
	canvas: HTMLCanvasElement,
	options: RenderOptions
): Promise<void> {
	switch (cardStyle) {
		case 'tropical':
			if (generatorMode === 'single') {
				await renderBuilderCard(singleData, canvas, options);
			} else {
				await renderTeamPosterCanvas(teamData, canvas);
			}
			break;

		case 'dark-id-front':
			await renderDarkIdFront(singleData, canvas, options);
			break;

		case 'dark-id-back':
			await renderDarkIdBack(singleData, canvas, options);
			break;

		case 'pfp':
			await renderPfpFrame(singleData, canvas);
			break;
	}
}
