"use client";

import React, { useState } from "react";
import { Sparkles, Dices, Edit3 } from "lucide-react";
import { generateTitle } from "@/lib/generateTitle";
import type { SingleBuilder } from "@/types/builder";

interface BuilderFormProps {
  builderData: SingleBuilder;
  onChange: (updatedData: SingleBuilder) => void;
}

export const BuilderForm: React.FC<BuilderFormProps> = ({
  builderData,
  onChange,
}) => {
  const [titleMode, setTitleMode] = useState<"random" | "custom">("random");

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
    <div className="flex flex-col gap-5 w-full bg-[#07261D]/90 backdrop-blur-md p-6 rounded-2xl border border-[#155340] shadow-xl">
      {/* Builder Name Input */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#FFD400] mb-2">
          Builder Name <span className="text-[#F0176D]">*</span>
        </label>
        <input
          type="text"
          value={builderData.name}
          onChange={handleNameChange}
          placeholder="e.g. Satoshi Nakamoto"
          className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-[#FFD400]/20 bg-[#0B3D2E]/80 text-[#F5F0E1] placeholder-[#F5F0E1]/30 font-medium focus:outline-none focus:border-[#FFD400] focus:ring-2 focus:ring-[#FFD400]/30 transition-all"
        />
      </div>

      {/* Builder Title Selector */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#FFD400]">
            Builder Title
          </label>
          <div className="flex items-center gap-1 bg-[#0B3D2E] p-1 rounded-lg border border-[#155340]">
            <button
              type="button"
              onClick={() => {
                setTitleMode("random");
                if (!builderData.title) handleRandomizeTitle();
              }}
              className={`text-[11px] font-bold px-2.5 py-1 rounded-md transition-all flex items-center gap-1 min-h-[32px] cursor-pointer ${
                titleMode === "random"
                  ? "bg-[#F0176D] text-white shadow-sm"
                  : "text-[#F5F0E1]/60 hover:text-[#F5F0E1]"
              }`}
            >
              <Dices className="w-3.5 h-3.5" /> Randomize
            </button>
            <button
              type="button"
              onClick={() => setTitleMode("custom")}
              className={`text-[11px] font-bold px-2.5 py-1 rounded-md transition-all flex items-center gap-1 min-h-[32px] cursor-pointer ${
                titleMode === "custom"
                  ? "bg-[#F0176D] text-white shadow-sm"
                  : "text-[#F5F0E1]/60 hover:text-[#F5F0E1]"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" /> Custom
            </button>
          </div>
        </div>

        {titleMode === "random" ? (
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={builderData.title}
              placeholder="Click randomize..."
              className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-[#FFD400]/40 bg-[#0B3D2E] text-[#FFD400] font-bold text-sm"
            />
            <button
              type="button"
              onClick={handleRandomizeTitle}
              className="min-h-[46px] px-5 py-2.5 bg-[#FFD400] hover:bg-[#FFD400]/90 text-[#0B3D2E] font-black rounded-xl flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(255,212,0,0.3)] shrink-0 touch-manipulation cursor-pointer"
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
            className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-[#FFD400]/20 bg-[#0B3D2E]/80 text-[#F5F0E1] placeholder-[#F5F0E1]/30 font-medium focus:outline-none focus:border-[#FFD400] focus:ring-2 focus:ring-[#FFD400]/30 transition-all"
          />
        )}
      </div>

      {/* Stack / Role Input */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#FFD400] mb-2">
          Stack / Role <span className="text-[#F5F0E1]/40">(Optional)</span>
        </label>
        <input
          type="text"
          value={builderData.stack}
          onChange={handleStackChange}
          placeholder="e.g. Rust / Solidity / Next.js"
          className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-[#FFD400]/20 bg-[#0B3D2E]/80 text-[#F5F0E1] placeholder-[#F5F0E1]/30 font-medium focus:outline-none focus:border-[#FFD400] focus:ring-2 focus:ring-[#FFD400]/30 transition-all"
        />
      </div>
    </div>
  );
};
