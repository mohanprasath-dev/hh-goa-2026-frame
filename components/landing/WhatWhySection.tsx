import { BadgeCheck, Users, Wand2 } from "lucide-react";

export function WhatWhySection() {
  return (
    <section className="px-5 sm:px-8 py-12 sm:py-18 max-w-5xl mx-auto">
      <div className="bg-[#07261D] rounded-3xl p-6 sm:p-10 border border-[#155340] shadow-2xl">
        <p className="text-hh-pink text-xs font-bold tracking-[0.3em] uppercase mb-3">The residency</p>
        <h2 className="max-w-2xl text-[clamp(1.9rem,4vw,3.2rem)] font-serif font-black italic text-hh-yellow leading-tight">A 4-DAY CO-BUILDING RESIDENCY IN GOA.</h2>
        <p className="mt-5 max-w-3xl text-hh-cream/80 text-base leading-relaxed">Hacker House Goa brings together builders to spend four focused days making and shipping. The Builder ID is a simple, shareable front door to the community.</p>
        <div className="grid gap-4 mt-8 sm:grid-cols-3">
          <Feature icon={Wand2} title="Make it yours" text="Set your photo, name, stack, and a builder title." />
          <Feature icon={Users} title="Build together" text="Create a solo ID or combine a team frame." />
          <Feature icon={BadgeCheck} title="Keep the reference" text="Your frame includes a unique Builder ID and verification link." />
        </div>
      </div>
    </section>
  );
}

function Feature({ icon: Icon, title, text }: { icon: typeof Wand2; title: string; text: string }) {
  return <div className="rounded-2xl border border-[#155340] bg-[#0B3D2E] p-5"><Icon className="w-5 h-5 text-[#F0176D]" /><h3 className="mt-4 text-sm font-extrabold uppercase tracking-wide text-[#FFD400]">{title}</h3><p className="mt-2 text-xs leading-relaxed text-[#F5F0E1]/70">{text}</p></div>;
}
