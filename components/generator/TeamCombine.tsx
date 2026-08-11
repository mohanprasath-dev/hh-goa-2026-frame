'use client';

import React, { useState } from 'react';
import { UserPlus, Trash2, Users, User, Image as ImageIcon } from 'lucide-react';
import { PhotoUploader } from './PhotoUploader';
import { PhotoCropper } from './PhotoCropper';
import type { Teammate } from '@/types/builder';

interface TeamCombineProps {
	teammates: Teammate[];
	onUpdateTeammates: (teammates: Teammate[]) => void;
}

export const TeamCombine: React.FC<TeamCombineProps> = ({
	teammates,
	onUpdateTeammates,
}) => {
	const [activeCropIndex, setActiveCropIndex] = useState<number | null>(null);
	const [tempPhotoUrl, setTempPhotoUrl] = useState<string | null>(null);

	const handleAddTeammate = () => {
		if (teammates.length >= 2) return;
		const newTeammate: Teammate = {
			id: Math.random().toString(36).substring(2, 9),
			name: `Teammate ${teammates.length + 2}`,
			photoUrl: null,
		};
		onUpdateTeammates([...teammates, newTeammate]);
	};

	const handleRemoveTeammate = (id: string) => {
		onUpdateTeammates(teammates.filter((t) => t.id !== id));
	};

	const handleNameChange = (id: string, name: string) => {
		onUpdateTeammates(
			teammates.map((t) => (t.id === id ? { ...t, name } : t))
		);
	};

	const handlePhotoSelected = (index: number, dataUrl: string) => {
		setActiveCropIndex(index);
		setTempPhotoUrl(dataUrl);
	};

	const handleCropComplete = (croppedUrl: string) => {
		if (activeCropIndex !== null) {
			const updated = [...teammates];
			updated[activeCropIndex].photoUrl = croppedUrl;
			onUpdateTeammates(updated);
		}
		setActiveCropIndex(null);
		setTempPhotoUrl(null);
	};

	return (
		<div className="flex flex-col gap-4 w-full bg-white/70 backdrop-blur-sm p-5 rounded-2xl border border-[#0B3D2E]/10 shadow-sm">
			<div className="flex items-center justify-between pb-2 border-b border-[#0B3D2E]/10">
				<div className="flex items-center gap-2">
					<Users className="w-5 h-5 text-[#0B3D2E]" />
					<h3 className="text-sm font-bold text-[#0B3D2E] uppercase tracking-wider">
						Squad Teammates ({teammates.length}/2)
					</h3>
				</div>
				{teammates.length < 2 && (
					<button
						type="button"
						onClick={handleAddTeammate}
						className="min-h-[36px] px-3 py-1.5 bg-[#FFD400] hover:bg-[#FFD400]/90 text-[#0B3D2E] font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-xs touch-manipulation"
					>
						<UserPlus className="w-3.5 h-3.5" /> Add Teammate
					</button>
				)}
			</div>

			{teammates.length === 0 ? (
				<div className="text-center py-6 px-4 bg-[#F5F0E1]/50 rounded-xl border border-dashed border-[#0B3D2E]/20">
					<p className="text-xs font-semibold text-[#0B3D2E]/70">
						Add up to 2 teammates to generate a horizontal Squad Team poster.
					</p>
				</div>
			) : (
				<div className="flex flex-col gap-4">
					{teammates.map((teammate, idx) => (
						<div
							key={teammate.id}
							className="p-4 bg-[#F5F0E1]/60 rounded-xl border border-[#0B3D2E]/15 flex flex-col gap-3"
						>
							<div className="flex items-center justify-between">
								<span className="text-xs font-bold text-[#F0176D] uppercase">
									Builder 0{idx + 2}
								</span>
								<button
									type="button"
									onClick={() => handleRemoveTeammate(teammate.id)}
									className="text-[#0B3D2E]/50 hover:text-[#F0176D] p-1 transition-colors min-h-[32px] min-w-[32px] flex items-center justify-center touch-manipulation"
								>
									<Trash2 className="w-4 h-4" />
								</button>
							</div>

							<div>
								<label className="block text-xs font-semibold text-[#0B3D2E] mb-1">
									Teammate Name
								</label>
								<input
									type="text"
									value={teammate.name}
									onChange={(e) =>
										handleNameChange(teammate.id, e.target.value)
									}
									placeholder={`e.g. Alex`}
									className="w-full min-h-[44px] px-3 py-2 rounded-xl border border-[#0B3D2E]/20 bg-white text-[#0B3D2E] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]"
								/>
							</div>

							<div>
								<label className="block text-xs font-semibold text-[#0B3D2E] mb-1">
									Teammate Photo
								</label>
								{activeCropIndex === idx && tempPhotoUrl ? (
									<PhotoCropper
										imageSrc={tempPhotoUrl}
										onCropComplete={handleCropComplete}
										onCancel={() => {
											setActiveCropIndex(null);
											setTempPhotoUrl(null);
										}}
									/>
								) : teammate.photoUrl ? (
									<div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-[#0B3D2E]/15">
										<img
											src={teammate.photoUrl}
											alt={teammate.name}
											className="w-12 h-12 rounded-full object-cover border-2 border-[#F0176D]"
										/>
										<span className="text-xs text-[#0B3D2E] font-medium flex-1">
											Photo uploaded
										</span>
										<button
											type="button"
											onClick={() => {
												const updated = [...teammates];
												updated[idx].photoUrl = null;
												onUpdateTeammates(updated);
											}}
											className="text-xs font-bold text-[#F0176D] hover:underline min-h-[36px] px-2 flex items-center touch-manipulation"
										>
											Change
										</button>
									</div>
								) : (
									<PhotoUploader
										label={`Upload Builder 0${idx + 2} Photo`}
										onPhotoSelected={(url) => handlePhotoSelected(idx, url)}
									/>
								)}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
