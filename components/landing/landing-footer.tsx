import React from "react";
import Link from "next/link";
import { Twitter, Github, Disc as Discord, Send, Mail } from "lucide-react";

/**
 * Themed landing page footer — matching brand system tokens.
 * Features hashtag, social intent links, studio credits, and navigation.
 */
export function LandingFooter() {
  return (
    <footer className="px-5 sm:px-8 py-10 mt-12 border-t border-[#155340]/50 relative z-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Main Footer Banner */}
        <div className="bg-[#07261D] rounded-2xl border border-[#155340] px-6 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="text-hh-yellow text-sm sm:text-base font-extrabold tracking-widest uppercase">
              #FrameInGoa
            </span>
            <span className="w-px h-4 bg-[#155340]" aria-hidden="true" />
            <span className="text-hh-pink text-xs font-bold tracking-wider uppercase">
              Build in Goa · Ship from Paradise
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://hhgoa.taskdrift.in"
              target="_blank"
              rel="noreferrer"
              className="text-hh-cream text-xs sm:text-sm font-bold tracking-wider hover:text-hh-yellow transition-colors"
            >
              hhgoa.taskdrift.in
            </a>
            <Link
              href="/generate"
              className="px-4 py-1.5 rounded-full bg-hh-yellow text-hh-green font-extrabold text-xs uppercase tracking-wider hover:scale-105 transition-all shadow-sm"
            >
              Generate Frame
            </Link>
          </div>
        </div>

        {/* Social Links & Info Grid */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-hh-cream/60">
          {/* Studio Credit & Copyright */}
          <div className="flex items-center gap-2">
            <span>Built by Mohan Prasath P · Founder, <a href="https://taskdrift.in" target="_blank" rel="noreferrer" className="text-[#FFD400] hover:underline">Taskdrift</a> · <a href="https://x.com/mohanprasathdev" target="_blank" rel="noreferrer" className="text-[#FFD400] hover:underline">@mohanprasathdev</a> · <a href="https://mohanprasath.dev" target="_blank" rel="noreferrer" className="text-[#FFD400] hover:underline">mohanprasath.dev</a></span>
            <span>·</span>
            <span>© 2026 Hacker House Goa. All rights reserved.</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-hh-cream/70">
            <a
              href="https://x.com/hhgoa"
              target="_blank"
              rel="noreferrer"
              className="hover:text-hh-yellow transition-colors flex items-center gap-1 min-h-[44px] px-2"
              aria-label="X Twitter"
            >
              <Twitter className="w-4 h-4 text-hh-pink" />
              <span>@hhgoa</span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-hh-yellow transition-colors flex items-center gap-1 min-h-[44px] px-2"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              className="hover:text-hh-yellow transition-colors flex items-center gap-1 min-h-[44px] px-2"
              aria-label="Telegram"
            >
              <Send className="w-4 h-4 text-hh-yellow" />
              <span>Telegram</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
