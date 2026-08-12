"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Wordmark } from "@/components/brand/Wordmark";
import { StampBadge } from "@/components/brand/StampBadge";
import { CircularSeal } from "@/components/brand/CircularSeal";
import { PalmTrees } from "@/components/brand/PalmTrees";
import { ShieldCheck, Search, ArrowLeft, Sparkles } from "lucide-react";

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryId = searchParams.get("id") || "";

  const [inputVal, setInputVal] = useState(queryId);

  useEffect(() => {
    if (queryId) {
      const clean = queryId.trim().toUpperCase().replace("#", "");
      router.replace(`/verify/${encodeURIComponent(clean)}`);
    }
  }, [queryId, router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const clean = inputVal.trim().toUpperCase().replace("#", "");
    router.push(`/verify/${encodeURIComponent(clean)}`);
  };

  return (
    <div className="max-w-xl w-full px-4 my-auto relative z-10">
      <div className="bg-[#07261D]/95 backdrop-blur-md border-2 border-[#155340] rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center text-center gap-6">
        <div className="w-16 h-16 rounded-full bg-[#FFD400]/10 border-2 border-[#FFD400] flex items-center justify-center text-[#FFD400] shadow-[0_0_20px_rgba(255,212,0,0.2)]">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#FFD400] tracking-wide uppercase">
            Builder ID Verification
          </h1>
          <p className="text-xs text-[#F5F0E1]/70 mt-1">
            Enter a Hacker House Goa 2026 Builder ID below to check authenticity and status.
          </p>
        </div>

        <form onSubmit={handleSearch} className="w-full flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="e.g. HH-GOA-78921"
              className="flex-1 min-h-[48px] px-4 py-2.5 rounded-xl border border-[#155340] bg-[#0B3D2E] text-[#F5F0E1] text-sm font-mono font-bold focus:outline-none focus:border-[#FFD400]"
            />
            <button
              type="submit"
              className="min-h-[48px] px-5 rounded-xl bg-[#F0176D] text-white font-extrabold text-xs uppercase tracking-wider hover:bg-[#F0176D]/90 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Search className="w-4 h-4 text-[#FFD400]" />
              <span>Verify</span>
            </button>
          </div>
        </form>

        <div className="pt-4 border-t border-[#155340] w-full flex items-center justify-between text-xs text-[#F5F0E1]/60">
          <span>Don't have a Builder ID yet?</span>
          <Link
            href="/generate"
            className="text-[#FFD400] font-bold hover:text-[#F0176D] flex items-center gap-1 hover:underline"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerifyIndexPage() {
  return (
    <main className="min-h-screen text-[#F5F0E1] relative overflow-x-hidden pb-16 bg-[#0B3D2E] flex flex-col items-center justify-between">
      <div className="absolute top-6 left-8 opacity-10 pointer-events-none hidden lg:block">
        <PalmTrees width={140} height={160} />
      </div>
      <div className="absolute top-6 right-8 opacity-10 pointer-events-none hidden lg:block">
        <StampBadge width={110} height={110} />
      </div>
      <div className="absolute bottom-12 left-10 opacity-05 pointer-events-none hidden lg:block">
        <CircularSeal width={120} height={120} />
      </div>

      <header className="pt-8 pb-4 px-4 text-center max-w-4xl w-full flex flex-col items-center gap-3 relative z-10">
        <div className="w-full flex items-center justify-between max-w-xl mb-2">
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

      <Suspense fallback={<div className="text-center text-xs text-[#FFD400]">Loading verification portal...</div>}>
        <VerifyContent />
      </Suspense>

      <footer className="mt-16 text-center text-xs font-bold text-[#F5F0E1]/70 relative z-10 py-6 border-t border-[#155340]/40">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-4">
          <span>Built by <strong className="text-[#FFD400]">Mohan Prasath P</strong> · Founder, <a href="https://taskdrift.in" target="_blank" rel="noreferrer" className="text-[#FFD400] hover:underline">Taskdrift</a></span>
          <span>·</span>
          <a href="https://x.com/mohanprasathdev" target="_blank" rel="noreferrer" className="text-[#FFD400] hover:text-[#F0176D] hover:underline transition-colors">@mohanprasathdev</a>
          <span>·</span>
          <a href="https://github.com/mohanprasath-dev" target="_blank" rel="noreferrer" className="text-[#FFD400] hover:text-[#F0176D] hover:underline transition-colors">@mohanprasath-dev</a>
          <span>·</span>
          <a href="https://mohanprasath.dev" target="_blank" rel="noreferrer" className="text-[#FFD400] hover:text-[#F0176D] hover:underline transition-colors">mohanprasath.dev</a>
        </div>
      </footer>
    </main>
  );
}
