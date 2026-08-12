"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { StampBadge } from "@/components/brand/StampBadge";
import { PalmTrees } from "@/components/brand/PalmTrees";
import { CircularSeal } from "@/components/brand/CircularSeal";
import { PhotoUploader } from "@/components/generator/PhotoUploader";
import { PhotoCropper } from "@/components/generator/PhotoCropper";
import { BuilderForm } from "@/components/generator/BuilderForm";
import { TeamCombine } from "@/components/generator/TeamCombine";
import { PosterPreview } from "@/components/generator/PosterPreview";
import {
  Sparkles,
  Image as ImageIcon,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  User,
  Users,
  UserCheck,
  Download,
} from "lucide-react";
import type {
  SingleBuilder,
  Teammate,
  GeneratorMode,
  CardStyle,
  TeamPosterData,
} from "@/types/builder";

type WizardStep = 1 | 2 | 3;

export default function GeneratorPage() {
  const [step, setStep] = useState<WizardStep>(1);
  const [mode, setMode] = useState<GeneratorMode>("single");
  const [cardStyle, setCardStyle] = useState<CardStyle>("dark-id-front");

  // Primary Builder state
  const [builder, setBuilder] = useState<SingleBuilder>({
    name: "Satoshi Nakamoto",
    title: "Terminal Wizard",
    stack: "Next.js / Rust / Web3",
    photoUrl: null,
  });

  // Photo crop flow state
  const [rawPhotoUrl, setRawPhotoUrl] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  // Teammates state
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

  const handleNext = () => {
    if (step < 3) setStep((prev) => (prev + 1) as WizardStep);
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => (prev - 1) as WizardStep);
  };

  const isSolo = mode === "single";

  const STEPS = isSolo
    ? [
        { id: 1 as WizardStep, label: "01 PHOTO", title: "Builder Photo", icon: ImageIcon },
        { id: 2 as WizardStep, label: "02 DETAILS", title: "Builder Bio", icon: UserCheck },
        { id: 3 as WizardStep, label: "03 DOWNLOAD", title: "Share Credential", icon: Download },
      ]
    : [
        { id: 1 as WizardStep, label: "01 LEAD BUILDER", title: "Primary Builder", icon: User },
        { id: 2 as WizardStep, label: "02 SQUAD TEAMMATES", title: "Add Teammates", icon: Users },
        { id: 3 as WizardStep, label: "03 DOWNLOAD SQUAD", title: "Export Squad Card", icon: Download },
      ];

  return (
    <main className="min-h-screen text-[#F5F0E1] relative overflow-x-hidden pb-16 bg-[#0B3D2E]">
      {/* Background Decor */}
      <div className="absolute top-4 left-6 opacity-10 pointer-events-none hidden lg:block z-0">
        <PalmTrees width={140} height={160} />
      </div>
      <div className="absolute top-4 right-6 opacity-10 pointer-events-none hidden lg:block z-0">
        <StampBadge width={110} height={110} />
      </div>
      <div className="absolute bottom-10 left-10 opacity-05 pointer-events-none hidden lg:block z-0">
        <CircularSeal width={120} height={120} />
      </div>

      {/* Main Header Container */}
      <header className="pt-6 pb-4 px-4 text-center max-w-4xl mx-auto flex flex-col items-center gap-3 relative z-10">
        <div className="w-full flex items-center justify-between max-w-5xl mb-2">
          <Link
            href="/"
            className="text-xs font-extrabold uppercase tracking-widest text-[#FFD400] hover:text-[#F0176D] transition-colors flex items-center gap-1.5 min-h-[44px] px-3 py-1 rounded-lg bg-[#07261D]/80 border border-[#155340]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFD400]/80">
            Hacker House Goa 2026
          </div>
        </div>

        <Wordmark width={280} height={75} />
        <p className="text-xs sm:text-sm font-bold tracking-[0.25em] text-[#F0176D] uppercase">
          Builder ID Credential Generator 🌴
        </p>

        {/* Card Mode Selector: Solo Builder vs Team Squad */}
        <div className="flex items-center gap-2 mt-2 bg-[#07261D] p-1.5 rounded-2xl border border-[#155340] shadow-xl">
          <button
            type="button"
            onClick={() => {
              setMode("single");
              setStep(1);
            }}
            className={`min-h-[44px] px-5 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer touch-manipulation ${
              isSolo
                ? "bg-[#FFD400] text-[#0B3D2E] shadow-[0_0_15px_rgba(255,212,0,0.3)] scale-[1.02]"
                : "text-[#F5F0E1]/70 hover:text-[#F5F0E1]"
            }`}
          >
            <User className="w-4 h-4 text-[#F0176D]" />
            <span>Solo Builder Card</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode("team");
              setStep(1);
            }}
            className={`min-h-[44px] px-5 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer touch-manipulation ${
              !isSolo
                ? "bg-[#FFD400] text-[#0B3D2E] shadow-[0_0_15px_rgba(255,212,0,0.3)] scale-[1.02]"
                : "text-[#F5F0E1]/70 hover:text-[#F5F0E1]"
            }`}
          >
            <Users className="w-4 h-4 text-[#F0176D]" />
            <span>Team Squad Card</span>
          </button>
        </div>
      </header>

      {/* Wizard Progress Bar & Step Tracker */}
      <div className="max-w-4xl mx-auto px-4 mb-8 relative z-10">
        <div className="bg-[#07261D]/90 backdrop-blur-md border border-[#155340] rounded-2xl p-4 sm:p-5 shadow-xl">
          {/* Progress bar line */}
          <div className="w-full bg-[#0B3D2E] h-1.5 rounded-full overflow-hidden mb-4">
            <div
              className="bg-[#F0176D] h-full transition-all duration-300 shadow-[0_0_10px_rgba(240,23,109,0.5)]"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>

          {/* Step Indicator Buttons */}
          <div className="grid grid-cols-3 gap-2">
            {STEPS.map((s) => {
              const StepIcon = s.icon;
              const isActive = step === s.id;
              const isCompleted = step > s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStep(s.id)}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2 sm:px-4 rounded-xl border transition-all duration-200 cursor-pointer touch-manipulation text-center ${
                    isActive
                      ? "bg-[#F0176D] border-[#F0176D] text-white shadow-[0_0_15px_rgba(240,23,109,0.3)] scale-[1.02]"
                      : isCompleted
                        ? "bg-[#07261D] border-[#FFD400]/40 text-[#FFD400] hover:border-[#FFD400]"
                        : "bg-[#0B3D2E]/40 border-transparent text-[#F5F0E1]/40 hover:text-[#F5F0E1]/70"
                  }`}
                >
                  <StepIcon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : isCompleted ? "text-[#FFD400]" : "opacity-60"}`} />
                  <span className="text-[10px] sm:text-xs font-black tracking-wider uppercase whitespace-nowrap">
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Generator Main Content */}
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Left Column: Current Wizard Step (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6 w-full">
          {/* SOLO MODE STEPS */}
          {isSolo && (
            <>
              {/* STEP 1: PHOTO */}
              {step === 1 && (
                <div className="bg-[#07261D]/90 backdrop-blur-md p-6 sm:p-7 rounded-2xl border border-[#155340] shadow-xl flex flex-col gap-5">
                  <div className="border-b border-[#155340] pb-3 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#F0176D] tracking-[0.25em] uppercase block">
                        STEP 01 OF 03
                      </span>
                      <h2 className="text-xl font-serif font-black text-[#FFD400] tracking-wide mt-0.5">
                        Builder Profile Photo
                      </h2>
                    </div>
                    {builder.photoUrl && !isCropping && (
                      <button
                        type="button"
                        onClick={() =>
                          setBuilder((prev) => ({ ...prev, photoUrl: null }))
                        }
                        className="text-xs font-bold text-[#F0176D] hover:underline cursor-pointer"
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
                    <div className="flex items-center gap-4 p-4 bg-[#0B3D2E] rounded-xl border border-[#FFD400]/30 shadow-md">
                      <img
                        src={builder.photoUrl}
                        alt="Cropped profile preview"
                        className="w-16 h-16 rounded-full object-cover border-2 border-[#F0176D] shadow-md"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-[#FFD400] flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-[#F0176D]" /> Photo Ready & Composite
                        </p>
                        <p className="text-xs text-[#F5F0E1]/70 mt-1">
                          Circular format standard applied for Builder ID badge.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setBuilder((prev) => ({ ...prev, photoUrl: null }))
                        }
                        className="text-xs font-extrabold text-[#F0176D] hover:underline min-h-[44px] px-3 flex items-center cursor-pointer"
                      >
                        Change
                      </button>
                    </div>
                  ) : (
                    <PhotoUploader
                      label="Upload Builder Profile Photo"
                      onPhotoSelected={handlePhotoSelected}
                    />
                  )}
                </div>
              )}

              {/* STEP 2: DETAILS */}
              {step === 2 && (
                <div className="flex flex-col gap-5 w-full">
                  <div className="bg-[#07261D]/90 backdrop-blur-md p-6 sm:p-7 rounded-2xl border border-[#155340] shadow-xl">
                    <div className="border-b border-[#155340] pb-3 mb-5">
                      <span className="text-[10px] font-bold text-[#F0176D] tracking-[0.25em] uppercase block">
                        STEP 02 OF 03
                      </span>
                      <h2 className="text-xl font-serif font-black text-[#FFD400] tracking-wide mt-0.5">
                        Builder Info & Title
                      </h2>
                      <p className="text-xs text-[#F5F0E1]/70 mt-1">
                        Enter your handle/name, roll for a random builder title, and list your tech stack.
                      </p>
                    </div>

                    <BuilderForm builderData={builder} onChange={setBuilder} />
                  </div>
                </div>
              )}
            </>
          )}

          {/* TEAM MODE STEPS */}
          {!isSolo && (
            <>
              {/* STEP 1: PRIMARY BUILDER */}
              {step === 1 && (
                <div className="flex flex-col gap-5 w-full">
                  <div className="bg-[#07261D]/90 backdrop-blur-md p-6 sm:p-7 rounded-2xl border border-[#155340] shadow-xl flex flex-col gap-5">
                    <div className="border-b border-[#155340] pb-3">
                      <span className="text-[10px] font-bold text-[#F0176D] tracking-[0.25em] uppercase block">
                        TEAM STEP 01 OF 03
                      </span>
                      <h2 className="text-xl font-serif font-black text-[#FFD400] tracking-wide mt-0.5">
                        Lead Builder Details
                      </h2>
                      <p className="text-xs text-[#F5F0E1]/70 mt-1">
                        Enter details for the primary team lead builder (Builder 01).
                      </p>
                    </div>

                    {/* Lead builder photo */}
                    {isCropping && rawPhotoUrl ? (
                      <PhotoCropper
                        imageSrc={rawPhotoUrl}
                        onCropComplete={handleCropComplete}
                        onCancel={handleCropCancel}
                      />
                    ) : builder.photoUrl ? (
                      <div className="flex items-center gap-4 p-4 bg-[#0B3D2E] rounded-xl border border-[#FFD400]/30 shadow-md">
                        <img
                          src={builder.photoUrl}
                          alt="Lead builder"
                          className="w-16 h-16 rounded-full object-cover border-2 border-[#F0176D] shadow-md"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-bold text-[#FFD400] flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-[#F0176D]" /> Lead Builder Photo Uploaded
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setBuilder((prev) => ({ ...prev, photoUrl: null }))
                          }
                          className="text-xs font-extrabold text-[#F0176D] hover:underline min-h-[44px] px-3 flex items-center cursor-pointer"
                        >
                          Change
                        </button>
                      </div>
                    ) : (
                      <PhotoUploader
                        label="Upload Lead Builder (Builder 01) Photo"
                        onPhotoSelected={handlePhotoSelected}
                      />
                    )}

                    <BuilderForm builderData={builder} onChange={setBuilder} />
                  </div>
                </div>
              )}

              {/* STEP 2: SQUAD TEAMMATES */}
              {step === 2 && (
                <div className="flex flex-col gap-5 w-full">
                  <TeamCombine
                    teammates={teammates}
                    onUpdateTeammates={setTeammates}
                  />
                </div>
              )}
            </>
          )}

          {/* STEP 3: DOWNLOAD & SHARE (Common for both Solo & Team) */}
          {step === 3 && (
            <div className="bg-[#07261D]/90 backdrop-blur-md p-6 sm:p-7 rounded-2xl border border-[#155340] shadow-xl flex flex-col gap-5">
              <div className="border-b border-[#155340] pb-3">
                <span className="text-[10px] font-bold text-[#F0176D] tracking-[0.25em] uppercase block">
                  STEP 03 OF 03 · FINAL REVEAL
                </span>
                <h2 className="text-xl font-serif font-black text-[#FFD400] tracking-wide mt-0.5">
                  Export & Share Credential
                </h2>
                <p className="text-xs text-[#F5F0E1]/70 mt-1">
                  Your official Hacker House Goa 2026 {isSolo ? "Builder ID card" : "Team Squad card"} is generated. High-res download and share directly to X.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B3D2E]/80 border border-[#FFD400]/20 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-xs text-[#FFD400] font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#F0176D]" />
                  <span>{isSolo ? "Solo Credential Summary" : "Squad Team Summary"}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[#F5F0E1]/50 block text-[10px]">PRIMARY BUILDER:</span>
                    <span className="text-[#F5F0E1] font-bold">{builder.name || "Satoshi Nakamoto"}</span>
                  </div>
                  <div>
                    <span className="text-[#F5F0E1]/50 block text-[10px]">TITLE:</span>
                    <span className="text-[#FFD400] font-bold">{builder.title || "Terminal Wizard"}</span>
                  </div>
                  <div>
                    <span className="text-[#F5F0E1]/50 block text-[10px]">MODE:</span>
                    <span className="text-[#F0176D] font-bold uppercase">
                      {isSolo ? "Solo Builder Card" : "Team Squad Card"}
                    </span>
                  </div>
                  {!isSolo && (
                    <div>
                      <span className="text-[#F5F0E1]/50 block text-[10px]">SQUAD SIZE:</span>
                      <span className="text-[#F0176D] font-bold">{teammates.length + 1} Builders</span>
                    </div>
                  )}

                  {!isSolo && (
                    <div className="col-span-2 pt-2 border-t border-[#155340]">
                      <span className="text-[#FFD400] block text-[10px] font-black uppercase tracking-wider mb-2">
                        ALL SQUAD MEMBERS ({teammates.length + 1}):
                      </span>
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between bg-[#07261D] px-3 py-1.5 rounded-lg border border-[#FFD400]/30 text-xs">
                          <span className="font-extrabold text-[#FFD400]">BUILDER 01 (LEAD)</span>
                          <span className="font-bold text-[#F5F0E1]">{builder.name || "Satoshi Nakamoto"}</span>
                        </div>
                        {teammates.map((t, idx) => (
                          <div key={t.id} className="flex items-center justify-between bg-[#07261D] px-3 py-1.5 rounded-lg border border-[#F0176D]/40 text-xs">
                            <span className="font-extrabold text-[#F0176D]">BUILDER 0{idx + 2}</span>
                            <span className="font-bold text-[#FFD400]">{t.name || `Teammate ${idx + 2}`}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls Bar */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className="min-h-[48px] px-6 py-2.5 rounded-xl border border-[#155340] bg-[#07261D] text-[#F5F0E1] font-bold text-xs uppercase tracking-wider hover:border-[#FFD400] hover:text-[#FFD400] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="min-h-[48px] px-8 py-2.5 rounded-xl bg-[#F0176D] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#F0176D]/90 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(240,23,109,0.35)] hover:scale-[1.02] cursor-pointer"
              >
                <span>Continue to Step 0{step + 1}</span>
                <ArrowRight className="w-4 h-4 text-[#FFD400]" />
              </button>
            ) : (
              <Link
                href="/"
                className="min-h-[48px] px-6 py-2.5 rounded-xl border border-[#FFD400] bg-[#FFD400] text-[#0B3D2E] font-black text-xs uppercase tracking-wider hover:scale-105 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,212,0,0.4)]"
              >
                <span>Finish & Return Home</span>
                <CheckCircle2 className="w-4 h-4 text-[#F0176D]" />
              </Link>
            )}
          </div>
        </div>

        {/* Right Column: Physical Credential Canvas Centerpiece (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center gap-4 w-full sticky top-8">
          <div className="w-full text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD400] text-[#0B3D2E] text-xs font-black uppercase tracking-wider mb-1 shadow-[0_0_15px_rgba(255,212,0,0.3)]">
              <Sparkles className="w-3.5 h-3.5 text-[#F0176D]" />
              {isSolo ? "Solo Builder Credential" : "Team Squad Card Showcase"}
            </span>
            <p className="text-[11px] font-semibold text-[#F5F0E1]/60 mt-1">
              {isSolo
                ? "Click 'Flip Card' to switch between Front & Back faces"
                : "Real-time horizontal Squad Card preview"}
            </p>
          </div>

          <PosterPreview
            mode={mode}
            cardStyle={cardStyle}
            onCardStyleChange={setCardStyle}
            singleData={builder}
            teamData={teamPosterData}
          />
        </div>
      </div>

      {/* Footer Bar */}
      <footer className="mt-16 text-center text-xs font-bold text-[#F5F0E1]/50 relative z-10">
        <p>
          Hacker House Goa 2026 ·{" "}
          <a
            href="https://hhgoa.com"
            target="_blank"
            rel="noreferrer"
            className="text-[#FFD400] hover:text-[#F0176D] hover:underline transition-colors"
          >
            hhgoa.com
          </a>{" "}
          · #FrameInGoa
        </p>
      </footer>
    </main>
  );
}
