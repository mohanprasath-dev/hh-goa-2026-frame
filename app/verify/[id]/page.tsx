"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Wordmark } from "@/components/brand/Wordmark";
import { StampBadge } from "@/components/brand/StampBadge";
import { CircularSeal } from "@/components/brand/CircularSeal";
import { PalmTrees } from "@/components/brand/PalmTrees";
import {
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  Search,
  Copy,
  Check,
  ExternalLink,
  Calendar,
  MapPin,
  Award,
} from "lucide-react";

export default function VerifyIdPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = typeof params?.id === "string" ? params.id : "";
  const builderId = decodeURIComponent(rawId).toUpperCase();

  const [lookupInput, setLookupInput] = useState("");
  const [copied, setCopied] = useState(false);

  // Validate format (e.g. HH-GOA-XXXXX or HH-GOA-RXXXXX)
  const isValidFormat = /^HH-GOA-[A-Z0-9-]{3,12}$/i.test(builderId);
  const displayId = builderId.startsWith("#") ? builderId : `#${builderId}`;

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupInput.trim()) return;
    const clean = lookupInput.trim().toUpperCase().replace("#", "");
    router.push(`/verify/${encodeURIComponent(clean)}`);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-screen text-[#F5F0E1] relative overflow-x-hidden pb-16 bg-[#0B3D2E] flex flex-col items-center justify-between">
      {/* Ambient background graphics */}
      <div className="absolute top-6 left-8 opacity-10 pointer-events-none hidden lg:block">
        <PalmTrees width={140} height={160} />
      </div>
      <div className="absolute top-6 right-8 opacity-10 pointer-events-none hidden lg:block">
        <StampBadge width={110} height={110} />
      </div>
      <div className="absolute bottom-12 left-10 opacity-05 pointer-events-none hidden lg:block">
        <CircularSeal width={120} height={120} />
      </div>

      {/* Header */}
      <header className="pt-8 pb-4 px-4 text-center max-w-4xl w-full flex flex-col items-center gap-3 relative z-10">
        <div className="w-full flex items-center justify-between max-w-2xl mb-2">
          <Link
            href="/generate"
            className="text-xs font-extrabold uppercase tracking-widest text-[#FFD400] hover:text-[#F0176D] transition-colors flex items-center gap-1.5 min-h-[44px] px-3.5 py-1 rounded-xl bg-[#07261D]/80 border border-[#155340]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Generator</span>
          </Link>
          <Link
            href="/"
            className="text-xs font-extrabold uppercase tracking-widest text-[#F5F0E1]/70 hover:text-[#FFD400] transition-colors"
          >
            hhgoa.taskdrift.in
          </Link>
        </div>

        <Wordmark width={260} height={70} />
        <p className="text-xs font-black tracking-[0.25em] text-[#FFD400] uppercase">
          Official Credential Verification Portal 🛡️
        </p>
      </header>

      {/* Main Verification Card */}
      <section className="max-w-2xl w-full px-4 my-auto relative z-10">
        <div className="bg-[#07261D]/95 backdrop-blur-md border-2 border-[#155340] rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(7,38,29,0.8)] flex flex-col items-center text-center gap-6 relative overflow-hidden">
          {/* Status Banner */}
          {isValidFormat ? (
            <div className="w-full bg-[#0B3D2E] border border-[#FFD400]/40 rounded-2xl p-6 flex flex-col items-center gap-3 relative">
              {/* Pulsing Verified Shield Badge */}
              <div className="w-20 h-20 rounded-full bg-[#FFD400]/10 border-2 border-[#FFD400] flex items-center justify-center text-[#FFD400] shadow-[0_0_30px_rgba(255,212,0,0.3)] animate-pulse">
                <ShieldCheck className="w-10 h-10 text-[#FFD400]" />
              </div>

              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0176D] text-white text-[11px] font-black uppercase tracking-widest shadow-md">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>OFFICIAL VERIFIED CREDENTIAL</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-[#FFD400] tracking-wider font-mono">
                {displayId}
              </h1>

              <p className="text-xs text-[#F5F0E1]/80 max-w-md">
                This Builder ID credential was officially issued by Hacker House Goa 2026.
              </p>
            </div>
          ) : (
            <div className="w-full bg-[#0B3D2E] border border-[#F0176D]/40 rounded-2xl p-6 flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-[#F0176D]/10 border-2 border-[#F0176D] flex items-center justify-center text-[#F0176D]">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-[#F0176D]">
                UNVERIFIED / CUSTOM ID FORMAT
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-[#F5F0E1] tracking-wider font-mono">
                {displayId || "NO ID SPECIFIED"}
              </h1>
              <p className="text-xs text-[#F5F0E1]/70 max-w-md">
                Format scanned: <code className="bg-[#07261D] px-2 py-0.5 rounded border border-[#155340] text-[#FFD400]">{builderId}</code>
              </p>
            </div>
          )}

          {/* Credential Specification Table */}
          <div className="w-full bg-[#0B3D2E]/70 rounded-2xl border border-[#155340] p-4 text-left flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[#155340] pb-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#FFD400] flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#F0176D]" /> Credential Details
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#F0176D]">
                VERIFIED ID
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex flex-col">
                <span className="text-[#F5F0E1]/50 text-[10px] font-bold uppercase">EVENT</span>
                <span className="font-bold text-[#F5F0E1] flex items-center gap-1 mt-0.5">
                  Hacker House Goa 2026
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[#F5F0E1]/50 text-[10px] font-bold uppercase">DATES</span>
                <span className="font-bold text-[#FFD400] flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-[#F0176D]" /> Oct 28 – 31, 2026
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[#F5F0E1]/50 text-[10px] font-bold uppercase">LOCATION</span>
                <span className="font-bold text-[#F5F0E1] flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FFD400]" /> North Goa Beachfront Villa
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[#F5F0E1]/50 text-[10px] font-bold uppercase">STATUS</span>
                <span className="font-extrabold text-[#F0176D] flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD400]" /> CONFIRMED & ACTIVE
                </span>
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full pt-1">
            <Link
              href="/generate"
              className="flex-1 min-h-[48px] px-5 py-2.5 rounded-xl bg-[#F0176D] text-white font-extrabold text-xs uppercase tracking-wider hover:bg-[#F0176D]/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(240,23,109,0.35)] hover:scale-[1.02] touch-manipulation"
            >
              <Sparkles className="w-4 h-4 text-[#FFD400]" />
              <span>Generate Your Builder ID</span>
            </Link>

            <button
              type="button"
              onClick={handleCopyLink}
              className="min-h-[48px] px-4 py-2.5 rounded-xl bg-[#0B3D2E] border border-[#FFD400]/40 text-[#FFD400] font-bold text-xs uppercase tracking-wider hover:bg-[#0B3D2E]/80 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#F0176D]" />
                  <span>Link Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Share Verification Link</span>
                </>
              )}
            </button>
          </div>

          {/* Manual ID Lookup Search Input */}
          <form onSubmit={handleLookup} className="w-full pt-3 border-t border-[#155340]">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#FFD400] text-left mb-1.5">
              Verify Another Builder ID
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={lookupInput}
                onChange={(e) => setLookupInput(e.target.value)}
                placeholder="e.g. HH-GOA-78921"
                className="flex-1 min-h-[44px] px-3.5 py-2 rounded-xl border border-[#155340] bg-[#0B3D2E] text-[#F5F0E1] text-xs font-mono font-bold focus:outline-none focus:border-[#FFD400]"
              />
              <button
                type="submit"
                className="min-h-[44px] px-4 rounded-xl bg-[#FFD400] text-[#0B3D2E] font-black text-xs uppercase tracking-wider hover:scale-105 transition-all flex items-center gap-1 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Verify</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-8 pb-4 text-center text-xs font-bold text-[#F5F0E1]/50 relative z-10">
        <p>
          Hacker House Goa 2026 ·{" "}
          <Link
            href="/"
            className="text-[#FFD400] hover:text-[#F0176D] hover:underline transition-colors"
          >
            hhgoa.taskdrift.in
          </Link>{" "}
          · Verified Official Portal
        </p>
      </footer>
    </main>
  );
}
