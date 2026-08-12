import Link from "next/link";

export function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-5 sm:px-8 py-4 flex items-center justify-between bg-hh-green/90 backdrop-blur-sm">
      {/* Left: Studio wordmark */}
      <div className="flex flex-col leading-none select-none">
        <span className="text-hh-yellow font-black text-sm sm:text-base tracking-wider font-serif italic">
          2:47
          <span className="text-[10px] sm:text-xs align-super ml-0.5 not-italic font-sans font-bold">
            PM
          </span>
        </span>
        <span className="text-hh-yellow font-black text-[10px] sm:text-xs tracking-[0.3em] uppercase font-sans">
          STUDIO
        </span>
      </div>

      {/* Right: Nav links + CTA */}
      <div className="flex items-center gap-4 sm:gap-6">
        <Link href="/verify" className="text-hh-cream text-xs font-bold tracking-[0.16em] uppercase hover:text-hh-yellow transition-colors min-h-[44px] flex items-center">
          Verify ID
        </Link>
        <Link
          href="/generate"
          className="inline-flex items-center justify-center min-h-[44px] px-5 py-2 rounded-full bg-hh-yellow text-hh-green font-black text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(255,212,0,0.3)] hover:shadow-[0_0_30px_rgba(255,212,0,0.5)] transition-all hover:scale-105 touch-manipulation"
        >
          Generate frame
        </Link>
      </div>
    </nav>
  );
}
