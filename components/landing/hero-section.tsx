import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-28 pb-14 sm:pt-36 sm:pb-24">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
        <div className="relative z-10">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#FFD400]/30 bg-[#07261D] px-3 py-1.5 text-[11px] font-black tracking-[0.16em] text-[#FFD400] uppercase">
            <BadgeCheck className="h-4 w-4 text-[#F0176D]" /> Hacker House Goa 2026
          </p>
          <h1 className="max-w-3xl font-serif text-[clamp(3rem,9vw,6.4rem)] font-black italic leading-[.88] tracking-tight text-[#FFD400]">
            YOUR BUILDER ID, READY TO SHARE.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#F5F0E1]/80 sm:text-lg">
            Make an official Hacker House Goa frame with your name, builder title, and proof-of-work stack. Built for your X profile and your team.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/generate" className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-[#FFD400] px-7 text-sm font-black uppercase tracking-wider text-[#0B3D2E] shadow-[0_0_32px_rgba(255,212,0,.35)] transition hover:scale-[1.02]">
              Create your frame <ArrowRight className="h-4 w-4 text-[#F0176D]" />
            </Link>
            <span className="text-xs font-bold tracking-wide text-[#F5F0E1]/65">Solo builder or combine up to three teammates.</span>
          </div>
          <div className="mt-8 border-l-2 border-[#F0176D] pl-4 text-xs font-bold uppercase tracking-[0.16em] text-[#F5F0E1]/80">
            Frame generation closes 13 Aug 2026 · 11:59 PM IST
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[350px] lg:max-w-[400px]">
          <div className="absolute inset-4 translate-x-3 translate-y-3 rounded-[2rem] bg-[#F0176D]" />
          <div className="relative overflow-hidden rounded-[2rem] border-4 border-[#FFD400] bg-[#07261D] p-2 shadow-2xl">
            <img src="/brand/id-front.png" alt="Sample Hacker House Goa Builder ID frame" className="h-auto w-full rounded-[1.45rem]" />
          </div>
          <span className="absolute -bottom-3 -left-3 rounded-full bg-[#F5F0E1] px-4 py-2 text-[10px] font-black tracking-[.16em] text-[#0B3D2E] uppercase">Preview frame</span>
        </div>
      </div>
    </section>
  );
}
