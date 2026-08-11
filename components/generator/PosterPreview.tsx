'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Download, Loader2, RefreshCw } from 'lucide-react';
import {
	renderSinglePosterCanvas,
	renderTeamPosterCanvas,
} from '@/lib/canvasCompositor';
import { downloadPoster } from '@/lib/downloadPoster';
import { ShareButton } from './ShareButton';
import type {
	GeneratorMode,
	SinglePosterData,
	TeamPosterData,
} from '@/types/builder';

interface PosterPreviewProps {
	mode: GeneratorMode;
	singleData: SinglePosterData;
	teamData: TeamPosterData;
}

export const PosterPreview: React.FC<PosterPreviewProps> = ({
	mode,
	singleData,
	teamData,
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [isRendering, setIsRendering] = useState(false);
	const [showLoader, setShowLoader] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);

	useEffect(() => {
		let isCancelled = false;
		// Prompt 9 UX rule: Subtle loader ONLY if generation exceeds 500ms
		const loaderTimer = setTimeout(() => {
			if (!isCancelled) setShowLoader(true);
		}, 500);

		const render = async () => {
			setIsRendering(true);
			if (canvasRef.current) {
				try {
					if (mode === 'single') {
						await renderSinglePosterCanvas(singleData, canvasRef.current);
					} else {
						await renderTeamPosterCanvas(teamData, canvasRef.current);
					}
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
	}, [mode, singleData, teamData]);

	const handleDownload = async () => {
		if (!canvasRef.current) return;
		setIsDownloading(true);
		try {
			const name =
				mode === 'single'
					? singleData.name || 'builder'
					: singleData.name || 'squad';
			await downloadPoster(canvasRef.current, name);
		} catch (err) {
			console.error('Download failed:', err);
		} finally {
			setIsDownloading(false);
		}
	};

	return (
		<div className="flex flex-col items-center gap-5 w-full">
			{/* Live Poster Canvas Container */}
			<div className="relative w-full max-w-[420px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#0B3D2E]/20 bg-[#F5F0E1] flex items-center justify-center">
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
