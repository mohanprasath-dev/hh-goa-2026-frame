'use client';

import React, { useState } from 'react';
import { UserPlus, Trash2, Users } from 'lucide-react';
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
		<div className="flex flex-col gap-4 w-full bg-[#07261D]/90 backdrop-blur-md p-6 rounded-2xl border border-[#155340] shadow-xl">
			<div className="flex items-center justify-between pb-3 border-b border-[#155340]">
				<div className="flex items-center gap-2">
					<Users className="w-5 h-5 text-[#FFD400]" />
					<h3 className="text-sm font-extrabold text-[#FFD400] uppercase tracking-wider">
						Squad Teammates ({teammates.length}/2)
					</h3>
				</div>
				{teammates.length < 2 && (
					<button
						type="button"
						onClick={handleAddTeammate}
						className="min-h-[38px] px-3.5 py-1.5 bg-[#FFD400] hover:bg-[#FFD400]/90 text-[#0B3D2E] font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(255,212,0,0.3)] touch-manipulation cursor-pointer"
					>
						<UserPlus className="w-4 h-4 text-[#F0176D]" /> Add Teammate
					</button>
				)}
			</div>

			{teammates.length === 0 ? (
				<div className="text-center py-8 px-4 bg-[#0B3D2E]/60 rounded-xl border border-dashed border-[#FFD400]/30 flex flex-col items-center gap-3">
					<p className="text-xs font-semibold text-[#F5F0E1]/80 max-w-md">
						Add up to 2 teammates to build your 3-builder Squad Card.
					</p>
					<button
						type="button"
						onClick={handleAddTeammate}
						className="min-h-[44px] px-5 py-2 bg-[#F0176D] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-md cursor-pointer hover:bg-[#F0176D]/90 transition-all"
					>
						<UserPlus className="w-4 h-4 text-[#FFD400]" /> Add Builder 02
					</button>
				</div>
			) : (
				<div className="flex flex-col gap-4">
					{teammates.map((teammate, idx) => (
						<div
							key={teammate.id}
							className="p-4 bg-[#0B3D2E]/80 rounded-xl border border-[#155340] flex flex-col gap-3"
						>
							<div className="flex items-center justify-between">
								<span className="text-xs font-black text-[#F0176D] uppercase tracking-wider">
									BUILDER 0{idx + 2}
								</span>
								<button
									type="button"
									onClick={() => handleRemoveTeammate(teammate.id)}
									className="text-[#F5F0E1]/50 hover:text-[#F0176D] p-1 transition-colors min-h-[32px] min-w-[32px] flex items-center justify-center cursor-pointer"
								>
									<Trash2 className="w-4 h-4" />
								</button>
							</div>

							<div>
								<label className="block text-xs font-bold uppercase tracking-wider text-[#FFD400] mb-1.5">
									Teammate Name
								</label>
								<input
									type="text"
									value={teammate.name}
									onChange={(e) =>
										handleNameChange(teammate.id, e.target.value)
									}
									placeholder={`e.g. Alex`}
									className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-[#FFD400]/20 bg-[#07261D] text-[#F5F0E1] text-sm font-medium focus:outline-none focus:border-[#FFD400]"
								/>
							</div>

							<div>
								<label className="block text-xs font-bold uppercase tracking-wider text-[#FFD400] mb-1.5">
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
									<div className="flex items-center gap-3 bg-[#07261D] p-3 rounded-xl border border-[#155340]">
										<img
											src={teammate.photoUrl}
											alt={teammate.name}
											className="w-12 h-12 rounded-full object-cover border-2 border-[#F0176D]"
										/>
										<span className="text-xs text-[#F5F0E1] font-bold flex-1">
											Photo Uploaded
										</span>
										<button
											type="button"
											onClick={() => {
												const updated = [...teammates];
												updated[idx].photoUrl = null;
												onUpdateTeammates(updated);
											}}
											className="text-xs font-bold text-[#F0176D] hover:underline min-h-[36px] px-2 flex items-center cursor-pointer"
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
