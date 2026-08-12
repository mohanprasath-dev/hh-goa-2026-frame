'use client';

import React, { useState } from 'react';
import { Wordmark } from '@/components/brand/Wordmark';
import { StampBadge } from '@/components/brand/StampBadge';
import { PalmTrees } from '@/components/brand/PalmTrees';
import { CircularSeal } from '@/components/brand/CircularSeal';
import { PhotoUploader } from '@/components/generator/PhotoUploader';
import { PhotoCropper } from '@/components/generator/PhotoCropper';
import { BuilderForm } from '@/components/generator/BuilderForm';
import { TeamCombine } from '@/components/generator/TeamCombine';
import { PosterPreview } from '@/components/generator/PosterPreview';
import { CardStyleSelector } from '@/components/generator/CardStyleSelector';
import { User, Users, Sparkles, Image as ImageIcon } from 'lucide-react';
import type {
	SingleBuilder,
	Teammate,
	GeneratorMode,
	CardStyle,
	TeamPosterData,
} from '@/types/builder';

export default function GeneratorPage() {
	const [mode, setMode] = useState<GeneratorMode>('single');
	const [cardStyle, setCardStyle] = useState<CardStyle>('tropical');

	// Primary Builder state
	const [builder, setBuilder] = useState<SingleBuilder>({
		name: 'Satoshi Nakamoto',
		title: 'Terminal Wizard',
		stack: 'Next.js / Rust / Web3',
		photoUrl: null,
	});

	// Photo crop flow state for primary builder
	const [rawPhotoUrl, setRawPhotoUrl] = useState<string | null>(null);
	const [isCropping, setIsCropping] = useState(false);

	// Team mates state
	const [teammates, setTeammates] = useState<Teammate[]>([]);

	const handlePhotoSelected = (dataUrl: string) => {
		setRawPhotoUrl(dataUrl);
		setIsCropping(true);
	};

	const handleCropComplete = (croppedDataUrl: string) => {
		setBuilder((prev) => ({ ...prev, photoUrl: croppedDataUrl }));
		setIsCropping(false);
		setRawPhotoUrl(null);
	};

	const handleCropCancel = () => {
		setIsCropping(false);
		setRawPhotoUrl(null);
	};

	const teamPosterData: TeamPosterData = {
		primaryBuilder: builder,
		teammates: teammates,
	};

	/** Whether the current card style needs the text form fields */
	const needsForm = cardStyle === 'tropical' || cardStyle === 'dark-id-front';
	/** Whether to show team combine mode (only tropical supports it) */
	const showTeamMode = cardStyle === 'tropical';

	return (
		<main className="min-h-screen bg-[#F5F0E1] text-[#0B3D2E] relative overflow-x-hidden pb-16">
			{/* Tropical Background Accent Decor */}
			<div className="absolute top-4 left-4 opacity-15 pointer-events-none hidden lg:block">
				<PalmTrees width={140} height={160} />
			</div>
			<div className="absolute top-4 right-4 opacity-15 pointer-events-none hidden lg:block">
				<StampBadge width={110} height={110} />
			</div>

			{/* Main Header Container */}
			<header className="pt-8 pb-6 px-4 text-center max-w-4xl mx-auto flex flex-col items-center gap-3">
				<div className="flex items-center gap-3">
					<Wordmark width={280} height={75} />
				</div>
				<p className="text-xs sm:text-sm font-bold tracking-widest text-[#F0176D] uppercase">
					Build in Goa · Ship from Paradise 🌴
				</p>
			</header>

			{/* Mode Switcher Tabs — only shown for Tropical */}
			{showTeamMode && (
				<div className="max-w-md mx-auto px-4 mb-4">
					<div className="bg-[#0B3D2E]/10 p-1.5 rounded-2xl flex items-center gap-2">
						<button
							type="button"
							onClick={() => setMode('single')}
							className={`flex-1 min-h-[44px] py-2 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
								mode === 'single'
									? 'bg-[#0B3D2E] text-[#FFD400] shadow-md'
									: 'text-[#0B3D2E]/70 hover:text-[#0B3D2E]'
							}`}
						>
							<User className="w-4 h-4" /> Single Builder
						</button>

						<button
							type="button"
							onClick={() => setMode('team')}
							className={`flex-1 min-h-[44px] py-2 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
								mode === 'team'
									? 'bg-[#0B3D2E] text-[#FFD400] shadow-md'
									: 'text-[#0B3D2E]/70 hover:text-[#0B3D2E]'
							}`}
						>
							<Users className="w-4 h-4" /> Team Combine
						</button>
					</div>
				</div>
			)}

			{/* Generator Layout Grid */}
			<div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
				{/* Left Column: Form & Photo Inputs (7 cols) */}
				<div className="lg:col-span-7 flex flex-col gap-6 w-full">
					{/* Card Style Selector */}
					<div className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl border border-[#0B3D2E]/10 shadow-sm">
						<CardStyleSelector
							selected={cardStyle}
							onChange={(style) => {
								setCardStyle(style);
								// Reset to single mode for non-tropical styles
								if (style !== 'tropical') setMode('single');
							}}
						/>
					</div>

					{/* Photo Upload & Crop Card */}
					<div className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl border border-[#0B3D2E]/10 shadow-sm flex flex-col gap-4">
						<div className="flex items-center justify-between pb-2 border-b border-[#0B3D2E]/10">
							<h2 className="text-sm font-bold text-[#0B3D2E] uppercase tracking-wider flex items-center gap-2">
								<ImageIcon className="w-4 h-4 text-[#F0176D]" /> Builder
								Photo
							</h2>
							{builder.photoUrl && !isCropping && (
								<button
									type="button"
									onClick={() =>
										setBuilder((prev) => ({ ...prev, photoUrl: null }))
									}
									className="text-xs font-bold text-[#F0176D] hover:underline"
								>
									Remove Photo
								</button>
							)}
						</div>

						{isCropping && rawPhotoUrl ? (
							<PhotoCropper
								imageSrc={rawPhotoUrl}
								onCropComplete={handleCropComplete}
								onCancel={handleCropCancel}
							/>
						) : builder.photoUrl ? (
							<div className="flex items-center gap-4 p-3 bg-[#F5F0E1]/60 rounded-xl border border-[#0B3D2E]/15">
								<img
									src={builder.photoUrl}
									alt="Cropped profile preview"
									className="w-16 h-16 rounded-full object-cover border-2 border-[#F0176D] shadow-xs"
								/>
								<div className="flex-1">
									<p className="text-xs font-bold text-[#0B3D2E]">
										Photo Cropped & Ready
									</p>
									<p className="text-[11px] text-[#0B3D2E]/70 mt-0.5">
										Circular 1:1 format prepared for poster compositing.
									</p>
								</div>
								<button
									type="button"
									onClick={() => setBuilder((prev) => ({ ...prev, photoUrl: null }))}
									className="text-xs font-bold text-[#F0176D] underline min-h-[44px] px-2 flex items-center"
								>
									Re-upload
								</button>
							</div>
						) : (
							<PhotoUploader
								label="Upload Builder Profile Photo"
								onPhotoSelected={handlePhotoSelected}
							/>
						)}
					</div>

					{/* Builder Form Inputs — shown for tropical and dark-id-front */}
					{needsForm && (
						<BuilderForm builderData={builder} onChange={setBuilder} />
					)}

					{/* Team Combine Mode Additional Inputs — tropical only */}
					{showTeamMode && mode === 'team' && (
						<TeamCombine
							teammates={teammates}
							onUpdateTeammates={setTeammates}
						/>
					)}
				</div>

				{/* Right Column: Live Poster Canvas Preview (5 cols) */}
				<div className="lg:col-span-5 flex flex-col items-center gap-4 w-full sticky top-8">
					<div className="w-full text-center">
						<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD400] text-[#0B3D2E] text-xs font-bold uppercase tracking-wider mb-2">
							<Sparkles className="w-3.5 h-3.5 text-[#F0176D]" /> Live Canvas
							Preview
						</span>
					</div>

					<PosterPreview
						mode={mode}
						cardStyle={cardStyle}
						singleData={builder}
						teamData={teamPosterData}
					/>
				</div>
			</div>

			{/* Footer Bar */}
			<footer className="mt-16 text-center text-xs font-bold text-[#0B3D2E]/60">
				<p>
					Hacker House Goa 2026 ·{' '}
					<a
						href="https://hhgoa.com"
						target="_blank"
						rel="noreferrer"
						className="text-[#F0176D] hover:underline"
					>
						hhgoa.com
					</a>{' '}
					· #FrameInGoa
				</p>
			</footer>
		</main>
	);
}
