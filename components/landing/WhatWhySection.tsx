import React from "react";
import { StampBadge } from "@/components/brand/StampBadge";
import { CircularSeal } from "@/components/brand/CircularSeal";
import { Code2, Flame, Compass, Cpu } from "lucide-react";

export function WhatWhySection() {
  return (
    <section className="relative px-5 sm:px-8 py-16 sm:py-24 max-w-5xl mx-auto">
      {/* Decorative Brand Motifs */}
      <div className="absolute -top-6 right-4 opacity-20 pointer-events-none hidden sm:block">
        <StampBadge width={80} height={80} />
      </div>

      <div className="bg-[#07261D]/80 backdrop-blur-md rounded-3xl p-6 sm:p-12 border border-[#155340] shadow-2xl relative overflow-hidden">


        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 relative z-10">
          <p className="text-hh-pink text-xs font-bold tracking-[0.3em] uppercase mb-3">
            PARADISE RESIDENCY · THE MISSION
          </p>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-serif font-black italic text-hh-yellow leading-tight tracking-tight">
            WHAT IS HACKER HOUSE GOA?
          </h2>
          <div className="w-16 h-1 bg-hh-pink mx-auto mt-4 rounded-full" />
        </div>

        {/* 2-4 lines overview narrative */}
        <div className="space-y-4 max-w-3xl mx-auto text-center relative z-10">
          <p className="text-hh-cream/90 text-base sm:text-lg font-medium leading-relaxed">
            Hacker House Goa is an intensive <span className="text-hh-yellow font-bold">4-day co-building residency</span> in North Goa, bringing together elite full-stack engineers, AI researchers, and Web3 builders to ship ambitious software under the palms.
          </p>
          <p className="text-hh-cream/80 text-sm sm:text-base leading-relaxed">
            Curated by <span className="text-hh-yellow font-bold">2:47 PM Studio</span>, this is not a traditional hackathon — it is a high-bandwidth residency for obsessives who build at night, ship before dawn, and claim their proof of work in paradise.
          </p>
        </div>

        {/* 3 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 relative z-10">
          <div className="bg-[#0B3D2E]/80 p-6 rounded-2xl border border-[#FFD400]/20 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-hh-pink/20 text-hh-pink flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-hh-yellow text-sm font-extrabold tracking-wider uppercase font-sans">
              High Velocity Build
            </h3>
            <p className="text-hh-cream/70 text-xs leading-relaxed">
              Zero fluff. 96 continuous hours of uninterrupted flow state with world-class peers.
            </p>
          </div>

          <div className="bg-[#0B3D2E]/80 p-6 rounded-2xl border border-[#FFD400]/20 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-hh-yellow/20 text-hh-yellow flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-hh-yellow text-sm font-extrabold tracking-wider uppercase font-sans">
              Paradise Setting
            </h3>
            <p className="text-hh-cream/70 text-xs leading-relaxed">
              Private beachfront villa, high-speed fiber internet, chef meals, and pool sessions.
            </p>
          </div>

          <div className="bg-[#0B3D2E]/80 p-6 rounded-2xl border border-[#FFD400]/20 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-hh-pink/20 text-hh-pink flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-hh-yellow text-sm font-extrabold tracking-wider uppercase font-sans">
              Proof of Work
            </h3>
            <p className="text-hh-cream/70 text-xs leading-relaxed">
              Live demo night in front of top founders, angel investors, and ecosystem leads.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
