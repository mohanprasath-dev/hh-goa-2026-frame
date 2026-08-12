import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { StampBadge } from "@/components/brand/StampBadge";

export function ClosingCtaSection() {
  return (
    <section className="px-5 sm:px-8 py-20 max-w-4xl mx-auto text-center relative overflow-hidden">
      {/* Dark Hero Card */}
      <div className="bg-[#07261D] rounded-3xl p-8 sm:p-14 border border-[#155340] shadow-2xl relative overflow-hidden">


        {/* Floating Stamp Motif */}
        <div className="absolute top-4 right-6 opacity-20 pointer-events-none hidden sm:block">
          <StampBadge width={90} height={90} />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-6">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-hh-pink/20 text-hh-pink border border-hh-pink/40 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> SELECTION IS OPEN
          </span>

          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-serif font-black italic leading-tight text-hh-yellow tracking-tight">
            READY TO SHIP FROM PARADISE?
          </h2>

          <p className="text-hh-cream/80 text-sm sm:text-base font-medium leading-relaxed max-w-lg">
            Generate your official Builder ID frame, submit your proof of work, and join the residency in Goa from Oct 28–31, 2026.
          </p>

          <div className="pt-4">
            <Link
              href="/generate"
              className="inline-flex items-center justify-center min-h-[56px] px-10 py-3.5 rounded-full bg-hh-yellow text-hh-green font-black text-sm sm:text-base tracking-wider uppercase shadow-[0_0_35px_rgba(255,212,0,0.4)] hover:shadow-[0_0_55px_rgba(255,212,0,0.6)] transition-all hover:scale-105 touch-manipulation gap-2"
            >
              <span>GENERATE YOUR FRAME NOW</span>
              <ArrowRight className="w-5 h-5 text-hh-pink" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
