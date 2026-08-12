import React from "react";
import { Twitter, Github, Globe } from "lucide-react";

/**
 * Clean studio footer — focused on creator identity & social profiles.
 */
export function LandingFooter() {
  return (
    <footer className="px-5 sm:px-8 py-8 mt-12 border-t border-[#155340]/50 relative z-10">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-hh-cream/70">
        {/* Creator Info */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 font-medium">
          <span>Built by</span>
          <span className="font-extrabold text-[#FFD400]">Mohan Prasath P</span>
          <span>·</span>
          <span>Founder, <a href="https://taskdrift.in" target="_blank" rel="noreferrer" className="text-[#FFD400] font-bold hover:underline">Taskdrift</a></span>
        </div>

        {/* Creator Social Links */}
        <div className="flex flex-wrap items-center justify-center gap-5">
          <a
            href="https://x.com/mohanprasathdev"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#FFD400] transition-colors flex items-center gap-1.5 py-1"
            aria-label="X Twitter"
          >
            <Twitter className="w-4 h-4 text-[#F0176D]" />
            <span className="font-bold">@mohanprasathdev</span>
          </a>

          <a
            href="https://github.com/mohanprasath-dev"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#FFD400] transition-colors flex items-center gap-1.5 py-1"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4 text-[#FFD400]" />
            <span className="font-bold">@mohanprasath-dev</span>
          </a>

          <a
            href="https://mohanprasath.dev"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#FFD400] transition-colors flex items-center gap-1.5 py-1"
            aria-label="Website"
          >
            <Globe className="w-4 h-4 text-[#F0176D]" />
            <span className="font-bold">mohanprasath.dev</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

