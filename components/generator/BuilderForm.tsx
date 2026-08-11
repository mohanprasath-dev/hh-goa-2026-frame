'use client';

import React, { useState } from 'react';
import { Sparkles, Dices, Edit3 } from 'lucide-react';
import { generateTitle } from '@/lib/generateTitle';
import type { SingleBuilder } from '@/types/builder';

interface BuilderFormProps {
	builderData: SingleBuilder;
	onChange: (updatedData: SingleBuilder) => void;
}

export const BuilderForm: React.FC<BuilderFormProps> = ({
	builderData,
	onChange,
}) => {
	const [titleMode, setTitleMode] = useState<'random' | 'custom'>('random');

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange({ ...builderData, name: e.target.value });
	};

	const handleStackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange({ ...builderData, stack: e.target.value });
	};

	const handleCustomTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange({ ...builderData, title: e.target.value });
	};

	const handleRandomizeTitle = () => {
		const newTitle = generateTitle(builderData.title);
		onChange({ ...builderData, title: newTitle });
	};

	return (
		<div className="flex flex-col gap-4 w-full bg-white/70 backdrop-blur-sm p-5 rounded-2xl border border-[#0B3D2E]/10 shadow-sm">
			{/* Builder Name Input */}
			<div>
				<label className="block text-xs font-bold uppercase tracking-wider text-[#0B3D2E] mb-1.5">
					Builder Name <span className="text-[#F0176D]">*</span>
				</label>
				<input
					type="text"
					value={builderData.name}
					onChange={handleNameChange}
					placeholder="e.g. Satoshi Nakamoto"
					className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-[#0B3D2E]/20 bg-[#F5F0E1]/30 text-[#0B3D2E] placeholder-[#0B3D2E]/40 font-medium focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]"
				/>
			</div>

			{/* Builder Title Selector */}
			<div>
				<div className="flex items-center justify-between mb-1.5">
					<label className="block text-xs font-bold uppercase tracking-wider text-[#0B3D2E]">
						Builder Title
					</label>
					<div className="flex items-center gap-1 bg-[#0B3D2E]/10 p-0.5 rounded-lg">
						<button
							type="button"
							onClick={() => {
								setTitleMode('random');
								if (!builderData.title) handleRandomizeTitle();
							}}
							className={`text-[11px] font-bold px-2 py-1 rounded-md transition-colors flex items-center gap-1 min-h-[32px] ${
								titleMode === 'random'
									? 'bg-[#0B3D2E] text-white shadow-xs'
									: 'text-[#0B3D2E]/70 hover:text-[#0B3D2E]'
							}`}
						>
							<Dices className="w-3 h-3" /> Randomize
						</button>
						<button
							type="button"
							onClick={() => setTitleMode('custom')}
							className={`text-[11px] font-bold px-2 py-1 rounded-md transition-colors flex items-center gap-1 min-h-[32px] ${
								titleMode === 'custom'
									? 'bg-[#0B3D2E] text-white shadow-xs'
									: 'text-[#0B3D2E]/70 hover:text-[#0B3D2E]'
							}`}
						>
							<Edit3 className="w-3 h-3" /> Custom
						</button>
					</div>
				</div>

				{titleMode === 'random' ? (
					<div className="flex gap-2">
						<input
							type="text"
							readOnly
							value={builderData.title}
							placeholder="Click randomize..."
							className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-[#0B3D2E]/20 bg-[#FFD400]/20 text-[#0B3D2E] font-bold text-sm"
						/>
						<button
							type="button"
							onClick={handleRandomizeTitle}
							className="min-h-[44px] px-4 py-2 bg-[#FFD400] hover:bg-[#FFD400]/90 text-[#0B3D2E] font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs shrink-0 touch-manipulation"
						>
							<Sparkles className="w-4 h-4 text-[#F0176D]" /> Roll
						</button>
					</div>
				) : (
					<input
						type="text"
						value={builderData.title}
						onChange={handleCustomTitleChange}
						placeholder="e.g. Async Custodian"
						className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-[#0B3D2E]/20 bg-[#F5F0E1]/30 text-[#0B3D2E] placeholder-[#0B3D2E]/40 font-medium focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]"
					/>
				)}
			</div>

			{/* Stack / Role Input */}
			<div>
				<label className="block text-xs font-bold uppercase tracking-wider text-[#0B3D2E] mb-1.5">
					Stack / Role <span className="text-[#0B3D2E]/50">(Optional)</span>
				</label>
				<input
					type="text"
					value={builderData.stack}
					onChange={handleStackChange}
					placeholder="e.g. Rust / Solidity / Next.js"
					className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-[#0B3D2E]/20 bg-[#F5F0E1]/30 text-[#0B3D2E] placeholder-[#0B3D2E]/40 font-medium focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]"
				/>
			</div>
		</div>
	);
};
