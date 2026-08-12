'use client';

import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { ZoomIn, ZoomOut, Check, X } from 'lucide-react';
import type { CroppedAreaPixels } from '@/types/builder';

interface PhotoCropperProps {
	imageSrc: string;
	onCropComplete: (croppedDataUrl: string) => void;
	onCancel: () => void;
}

export const PhotoCropper: React.FC<PhotoCropperProps> = ({
	imageSrc,
	onCropComplete,
	onCancel,
}) => {
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] =
		useState<CroppedAreaPixels | null>(null);
	const [isProcessing, setIsProcessing] = useState(false);

	const onCropChange = (newCrop: { x: number; y: number }) => {
		setCrop(newCrop);
	};

	const onZoomChange = (newZoom: number) => {
		setZoom(newZoom);
	};

	const onCropCompleteHandler = useCallback(
		(_croppedArea: any, pixels: CroppedAreaPixels) => {
			setCroppedAreaPixels(pixels);
		},
		[]
	);

	const createCroppedImage = async () => {
		if (!croppedAreaPixels || !imageSrc) return;
		setIsProcessing(true);

		try {
			const image = new Image();
			image.crossOrigin = 'anonymous';
			image.src = imageSrc;
			await new Promise((resolve) => {
				image.onload = resolve;
			});

			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			if (!ctx) return;

			// Set canvas resolution to square crop
			const size = Math.max(
				croppedAreaPixels.width,
				croppedAreaPixels.height
			);
			canvas.width = size;
			canvas.height = size;

			ctx.drawImage(
				image,
				croppedAreaPixels.x,
				croppedAreaPixels.y,
				croppedAreaPixels.width,
				croppedAreaPixels.height,
				0,
				0,
				size,
				size
			);

			const croppedDataUrl = canvas.toDataURL('image/png');
			onCropComplete(croppedDataUrl);
		} catch (e) {
			console.error('Failed to generate cropped image:', e);
		} finally {
			setIsProcessing(false);
		}
	};

	return (
		<div className="flex flex-col items-center gap-4 w-full bg-[#07261D] p-5 rounded-2xl border border-[#155340] text-[#F5F0E1]">
			<div className="relative w-full h-[280px] sm:h-[340px] rounded-xl overflow-hidden bg-black/40">
				<Cropper
					image={imageSrc}
					crop={crop}
					zoom={zoom}
					aspect={1}
					cropShape="round"
					showGrid={false}
					onCropChange={onCropChange}
					onZoomChange={onZoomChange}
					onCropComplete={onCropCompleteHandler}
				/>
			</div>

			{/* Zoom Controls */}
			<div className="flex items-center gap-3 w-full max-w-xs px-2">
				<ZoomOut className="w-5 h-5 text-[#FFD400]" />
				<input
					type="range"
					min={1}
					max={3}
					step={0.1}
					value={zoom}
					onChange={(e) => setZoom(Number(e.target.value))}
					className="w-full h-2 bg-[#F5F0E1]/30 rounded-lg appearance-none cursor-pointer accent-[#FFD400] touch-manipulation"
				/>
				<ZoomIn className="w-5 h-5 text-[#FFD400]" />
			</div>

			{/* Action Buttons with 44px+ touch target */}
			<div className="flex items-center justify-between w-full pt-2 gap-3">
				<button
					type="button"
					onClick={onCancel}
					className="flex-1 min-h-[44px] py-2.5 px-4 rounded-xl border border-[#F5F0E1]/30 font-semibold text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2 touch-manipulation"
				>
					<X className="w-4 h-4" /> Cancel
				</button>

				<button
					type="button"
					onClick={createCroppedImage}
					disabled={isProcessing}
					className="flex-1 min-h-[44px] py-2.5 px-4 rounded-xl bg-[#F0176D] text-white font-bold text-sm hover:bg-[#F0176D]/90 transition-colors flex items-center justify-center gap-2 shadow-lg touch-manipulation disabled:opacity-50"
				>
					{isProcessing ? (
						'Cropping...'
					) : (
						<>
							<Check className="w-4 h-4" /> Apply Crop
						</>
					)}
				</button>
			</div>
		</div>
	);
};
