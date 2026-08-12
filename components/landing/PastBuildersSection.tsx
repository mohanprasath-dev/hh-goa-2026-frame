import React from "react";
import { Quote, Sparkles, Terminal, Code, Cpu } from "lucide-react";

const BUILDERS = [
  {
    name: "Alex Rivera",
    handle: "@arivera_dev",
    role: "Full-Stack & Rust",
    tag: "ALPHA BUILDER",
    quote: "Shipped a multi-chain orderbook DEX in 72 hours under the palms. Best build energy and highest density of cracked devs in Asia.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Priya Sharma",
    handle: "@priyabuilds",
    role: "AI Systems Lead",
    tag: "AI ARCHITECT",
    quote: "Met my current co-founder at HH Goa. You come for the frame, but stay for the midnight architecture sessions and instant feedback loop.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Devon Chen",
    handle: "@devon_sol",
    role: "Protocol Engineer",
    tag: "TERMINAL WIZARD",
    quote: "The proof-of-work culture is real. Generating your Builder ID is just step 1 — shipping live at demo night changes your trajectory.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
];

export function PastBuildersSection() {
  return (
    <section className="px-5 sm:px-8 py-16 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <p className="text-hh-pink text-xs font-bold tracking-[0.3em] uppercase mb-2">
          BUILDER NETWORK & ALUMNI
        </p>
        <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-serif font-black italic text-hh-yellow tracking-tight">
          PAST BUILDERS SPEAK
        </h2>
      </div>

      {/* Builder Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BUILDERS.map((builder) => (
          <div
            key={builder.handle}
            className="bg-[#07261D] p-6 rounded-2xl border border-[#155340] hover:border-[#F0176D]/50 transition-all duration-300 flex flex-col justify-between shadow-xl relative"
          >
            <Quote className="w-8 h-8 text-hh-pink/20 absolute top-4 right-4" />

            <div>
              {/* Badge Tag */}
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-hh-pink/20 text-hh-pink border border-hh-pink/30 text-[10px] font-extrabold uppercase tracking-wider mb-4">
                <Sparkles className="w-3 h-3" /> {builder.tag}
              </span>

              {/* Quote text */}
              <p className="text-hh-cream/90 text-sm font-medium leading-relaxed italic mb-6">
                "{builder.quote}"
              </p>
            </div>

            {/* Author info */}
            <div className="flex items-center gap-3 pt-4 border-t border-[#155340]">
              <img
                src={builder.avatar}
                alt={builder.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-hh-yellow shadow-md"
              />
              <div className="leading-tight">
                <span className="block text-hh-yellow font-extrabold text-sm tracking-wide">
                  {builder.name}
                </span>
                <span className="block text-hh-cream/50 text-xs font-mono">
                  {builder.handle}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
