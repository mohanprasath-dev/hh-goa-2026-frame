import Link from "next/link";

/**
 * Task intro block — eyebrow + headline + description + CTA.
 * Static server component.
 */
export function TaskIntro() {
  return (
    <section className="relative px-5 sm:px-8 py-16 sm:py-24 max-w-3xl mx-auto text-center">
      {/* Eyebrow */}
      <p className="text-hh-pink text-xs sm:text-sm font-bold tracking-[0.3em] uppercase mb-4">
        TASK 01
      </p>

      {/* Headline with poster-print shadow */}
      <div className="relative inline-block mb-8">
        {/* Shadow layer */}
        <h2
          className="absolute top-[2px] left-[2px] text-[clamp(1.8rem,5vw,3.2rem)] font-serif font-black italic leading-tight tracking-tight text-black/20"
          aria-hidden="true"
        >
          PROVE YOU CAN BUILD
        </h2>
        {/* Main text */}
        <h2 className="relative text-[clamp(1.8rem,5vw,3.2rem)] font-serif font-black italic leading-tight tracking-tight text-hh-yellow">
          PROVE YOU CAN BUILD
        </h2>
      </div>

      {/* Description lines */}
      <div className="space-y-3 mb-10">
        <p className="text-hh-cream/80 text-sm sm:text-base font-medium leading-relaxed max-w-lg mx-auto">
          Build your official Hacker House Goa 2026 builder frame. Upload your
          photo, pick a builder title, and generate your poster to share on X.
        </p>
        <p className="text-hh-cream/80 text-sm sm:text-base font-medium leading-relaxed max-w-lg mx-auto">
          Your frame is your first proof of work. Show the community you belong.
        </p>
        <p className="text-hh-pink text-xs sm:text-sm font-bold tracking-wider uppercase mt-4">
          Deadline: Aug 13, 2026 · 11:59 PM IST
        </p>
      </div>

      {/* Primary CTA */}
      <Link
        href="/generate"
        className="inline-flex items-center justify-center min-h-[56px] px-10 py-3.5 rounded-full bg-hh-yellow text-hh-green font-black text-sm sm:text-base tracking-wider uppercase shadow-[0_0_30px_rgba(255,212,0,0.35)] hover:shadow-[0_0_50px_rgba(255,212,0,0.55)] transition-all hover:scale-105 touch-manipulation"
      >
        GENERATE YOUR FRAME →
      </Link>

      {/* Decorative separator below */}
      <div className="mt-16 flex items-center justify-center gap-3">
        <div className="w-12 h-px bg-hh-yellow/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-hh-pink" />
        <div className="w-12 h-px bg-hh-yellow/20" />
      </div>
    </section>
  );
}
