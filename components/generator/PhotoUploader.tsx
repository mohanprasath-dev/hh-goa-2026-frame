'use client';

import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react';

interface PhotoUploaderProps {
	onPhotoSelected: (dataUrl: string) => void;
	label?: string;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
	onPhotoSelected,
	label = 'Upload Photo',
}) => {
	const [isConverting, setIsConverting] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const processFile = async (file: File) => {
		setError(null);
		const fileName = file.name.toLowerCase();

		try {
			if (fileName.endsWith('.heic') || fileName.endsWith('.heif')) {
				setIsConverting(true);
				// Dynamic import for SSR safety
				const heic2anyModule = (await import('heic2any')).default;
				const convertedBlob = (await heic2anyModule({
					blob: file,
					toType: 'image/jpeg',
					quality: 0.9,
				})) as Blob | Blob[];

				const finalBlob = Array.isArray(convertedBlob)
					? convertedBlob[0]
					: convertedBlob;
				const reader = new FileReader();
				reader.onload = () => {
					onPhotoSelected(reader.result as string);
					setIsConverting(false);
				};
				reader.readAsDataURL(finalBlob);
			} else if (file.type.startsWith('image/')) {
				const reader = new FileReader();
				reader.onload = () => {
					onPhotoSelected(reader.result as string);
				};
				reader.readAsDataURL(file);
			} else {
				setError('Please upload a valid image (.jpg, .png, .heic)');
			}
		} catch (err) {
			console.error('HEIC conversion or image load failed:', err);
			setError('Failed to process image file. Please try another image.');
			setIsConverting(false);
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			processFile(e.target.files[0]);
		}
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			processFile(e.dataTransfer.files[0]);
		}
	};

	return (
		<div className="w-full">
			<div
				onClick={() => fileInputRef.current?.click()}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				className={`relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 min-h-[140px] touch-manipulation ${
					isDragging
						? 'border-[#F0176D] bg-[#F5F0E1]/80 scale-[1.01]'
						: 'border-[#0B3D2E]/30 bg-[#F5F0E1]/40 hover:border-[#0B3D2E] hover:bg-[#F5F0E1]'
				}`}
			>
				<input
					ref={fileInputRef}
					type="file"
					accept="image/jpeg,image/png,image/heic,image/heif"
					onChange={handleFileChange}
					className="hidden"
				/>

				{isConverting ? (
					<div className="flex flex-col items-center gap-2 text-[#0B3D2E]">
						<Loader2 className="w-8 h-8 animate-spin text-[#F0176D]" />
						<p className="text-sm font-semibold">
							Converting iPhone HEIC image...
						</p>
					</div>
				) : (
					<div className="flex flex-col items-center text-center gap-2">
						<div className="w-12 h-12 rounded-full bg-[#FFD400]/40 flex items-center justify-center text-[#0B3D2E]">
							<Upload className="w-6 h-6" />
						</div>
						<div>
							<p className="text-base font-bold text-[#0B3D2E]">{label}</p>
							<p className="text-xs text-[#0B3D2E]/70 mt-1">
								Drag & drop or tap to select JPG, PNG, or HEIC
							</p>
						</div>
					</div>
				)}
			</div>
			{error && (
				<p className="text-xs text-[#F0176D] font-medium mt-2 text-center">
					{error}
				</p>
			)}
		</div>
	);
};
