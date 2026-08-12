"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Download,
  Share2,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Edit3,
  Layers,
  ShieldCheck,
} from "lucide-react";
import { renderDarkIdFront, renderDarkIdBack } from "@/lib/dark-compositor";
import { renderTeamPosterCanvas } from "@/lib/canvasCompositor";
import { downloadPoster } from "@/lib/downloadPoster";
import { ShareButton } from "./ShareButton";
import type { GeneratorMode, SinglePosterData, TeamPosterData } from "@/types/builder";

interface CreatedShowcaseProps {
  mode: GeneratorMode;
  singleData: SinglePosterData;
  teamData: TeamPosterData;
  builderId: string;
  frontBlobUrl?: string | null;
  backBlobUrl?: string | null;
  onEditAgain: () => void;
}

export const CreatedShowcase: React.FC<CreatedShowcaseProps> = ({
  mode,
  singleData,
  teamData,
  builderId,
  frontBlobUrl,
  backBlobUrl,
  onEditAgain,
}) => {
  const frontCanvasRef = useRef<HTMLCanvasElement>(null);
  const backCanvasRef = useRef<HTMLCanvasElement>(null);
  const teamCanvasRef = useRef<HTMLCanvasElement>(null);

  const [isRendering, setIsRendering] = useState(true);
  const [pendingDownload, setPendingDownload] = useState<{
    type: "front" | "back" | "team" | "both";
    label: string;
  } | null>(null);

  // Render high-res final cards on mount
  useEffect(() => {
    let active = true;
    const renderCards = async () => {
      setIsRendering(true);
      try {
        if (mode === "single") {
          if (frontCanvasRef.current) {
            await renderDarkIdFront(singleData, frontCanvasRef.current, {
              mode: "final",
              builderId,
            });
          }
          if (backCanvasRef.current) {
            await renderDarkIdBack(singleData, backCanvasRef.current, {
              mode: "final",
              builderId,
            });
          }
        } else {
          if (teamCanvasRef.current) {
            await renderTeamPosterCanvas(teamData, teamCanvasRef.current);
          }
        }
      } catch (err) {
        console.error("Render created showcase cards error:", err);
      } finally {
        if (active) setIsRendering(false);
      }
    };

    renderCards();
    return () => {
      active = false;
    };
  }, [mode, singleData, teamData, builderId]);

  const executeDownload = async () => {
    if (!pendingDownload) return;

    try {
      if (pendingDownload.type === "front" && frontCanvasRef.current) {
        await downloadPoster(frontCanvasRef.current, singleData.name || "builder", "front");
      } else if (pendingDownload.type === "back" && backCanvasRef.current) {
        await downloadPoster(backCanvasRef.current, singleData.name || "builder", "back");
      } else if (pendingDownload.type === "team" && teamCanvasRef.current) {
        await downloadPoster(teamCanvasRef.current, singleData.name || "squad", "squad");
      } else if (pendingDownload.type === "both" && frontCanvasRef.current && backCanvasRef.current) {
        await downloadPoster(frontCanvasRef.current, singleData.name || "builder", "front");
        setTimeout(async () => {
          if (backCanvasRef.current) {
            await downloadPoster(backCanvasRef.current, singleData.name || "builder", "back");
          }
        }, 300);
      }
    } catch (err) {
      console.error("Confirmed download error:", err);
    } finally {
      setPendingDownload(null);
    }
  };

  const verifyUrl = `/verify/${builderId.replace("#", "")}`;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-6 py-2 animate-in fade-in zoom-in-95 duration-300">
      {/* Success Verification Banner */}
      <div className="w-full bg-[#07261D] border-2 border-[#FFD400] rounded-2xl p-4 sm:p-5 text-center shadow-[0_0_30px_rgba(255,212,0,0.2)] flex flex-col items-center gap-2.5">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FFD400] text-[#0B3D2E] text-xs font-black uppercase tracking-wider shadow-md">
          <ShieldCheck className="w-4 h-4 text-[#F0176D]" />
          <span>Credential Verified & Ready</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-serif font-black text-[#FFD400] uppercase tracking-wide">
          Builder ID: #{builderId.replace("#", "")}
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <Link
            href="/"
            className="text-xs font-black uppercase tracking-wider text-[#0B3D2E] bg-[#FFD400] hover:bg-[#FFD400]/90 flex items-center gap-1.5 min-h-[38px] px-4 py-1.5 rounded-lg shadow-md transition-transform hover:scale-105"
          >
            <span>Return to Home</span>
          </Link>
          <Link
            href={verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-[#FFD400] hover:text-[#F0176D] underline flex items-center gap-1 min-h-[38px] px-3"
          >
            <span>View Verification Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={onEditAgain}
            className="text-xs font-extrabold text-[#F5F0E1]/70 hover:text-white flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 rounded-lg bg-[#0B3D2E] border border-[#155340] cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#FFD400]" />
            <span>Edit Details</span>
          </button>
        </div>
      </div>

      {/* Cards Preview Section */}
      {mode === "single" ? (
        /* SOLO MODE: Front and Back side by side */
        <div className="w-full flex flex-col gap-3">
          <div className="text-center">
            <span className="text-xs font-serif font-extrabold text-[#FFD400] uppercase tracking-widest">
              Physical Credential — Front & Back Faces
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start w-full">
            {/* Front Card */}
            <div className="flex flex-col items-center gap-3 bg-[#07261D]/90 p-4 rounded-2xl border border-[#155340] shadow-xl">
              <span className="text-xs font-black text-[#FFD400] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F0176D]" /> Front Face (Badge)
              </span>
              <div className="w-full aspect-[1024/1536] max-h-[520px] rounded-xl overflow-hidden shadow-credential border-4 border-[#155340] bg-[#07261D]">
                <canvas ref={frontCanvasRef} className="w-full h-full object-contain" />
              </div>
              <button
                type="button"
                onClick={() => setPendingDownload({ type: "front", label: "Front Face PNG" })}
                className="w-full min-h-[44px] px-4 py-2 rounded-xl bg-[#0B3D2E] border border-[#FFD400]/40 text-[#FFD400] text-xs font-black uppercase tracking-wider hover:bg-[#07261D] transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4 text-[#F0176D]" />
                <span>Download Front PNG</span>
              </button>
            </div>

            {/* Back Card */}
            <div className="flex flex-col items-center gap-3 bg-[#07261D]/90 p-4 rounded-2xl border border-[#155340] shadow-xl">
              <span className="text-xs font-black text-[#FFD400] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F0176D]" /> Back Face (System & QR)
              </span>
              <div className="w-full aspect-[1024/1536] max-h-[520px] rounded-xl overflow-hidden shadow-credential border-4 border-[#155340] bg-[#07261D]">
                <canvas ref={backCanvasRef} className="w-full h-full object-contain" />
              </div>
              <button
                type="button"
                onClick={() => setPendingDownload({ type: "back", label: "Back Face PNG" })}
                className="w-full min-h-[44px] px-4 py-2 rounded-xl bg-[#0B3D2E] border border-[#FFD400]/40 text-[#FFD400] text-xs font-black uppercase tracking-wider hover:bg-[#07261D] transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4 text-[#F0176D]" />
                <span>Download Back PNG</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* TEAM MODE: Only Front Squad Card */
        <div className="w-full max-w-3xl flex flex-col items-center gap-3">
          <div className="text-center">
            <span className="text-xs font-serif font-extrabold text-[#FFD400] uppercase tracking-widest">
              Team Squad Card Showcase
            </span>
          </div>

          <div className="flex flex-col items-center gap-3 bg-[#07261D]/90 p-4 rounded-2xl border border-[#155340] shadow-xl w-full">
            <div className="w-full aspect-[1536/1024] max-h-[480px] rounded-xl overflow-hidden shadow-credential border-4 border-[#155340] bg-[#07261D]">
              <canvas ref={teamCanvasRef} className="w-full h-full object-contain" />
            </div>
            <button
              type="button"
              onClick={() => setPendingDownload({ type: "team", label: "Squad Card PNG" })}
              className="w-full max-w-md min-h-[48px] px-4 py-2.5 rounded-xl bg-[#0B3D2E] border border-[#FFD400]/40 text-[#FFD400] text-xs sm:text-sm font-black uppercase tracking-wider hover:bg-[#07261D] transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Download className="w-4 h-4 text-[#F0176D]" />
              <span>Download Squad Card (PNG)</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Action Bar: Download Both & Share to X */}
      <div className="w-full max-w-2xl bg-[#07261D] p-4 sm:p-5 rounded-2xl border border-[#FFD400]/40 shadow-2xl flex flex-col gap-4">
        <h3 className="text-center text-sm font-serif font-black text-[#FFD400] uppercase tracking-wider">
          Export & Share Options
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          {mode === "single" && (
            <button
              type="button"
              onClick={() => setPendingDownload({ type: "both", label: "Front + Back Cards (Both PNGs)" })}
              className="min-h-[48px] px-4 py-2.5 rounded-xl bg-[#F0176D] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#F0176D]/90 transition flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(240,23,109,0.35)] cursor-pointer"
            >
              <Layers className="w-4 h-4 text-[#FFD400]" />
              <span>Download Both Cards</span>
            </button>
          )}

          <ShareButton
            canvasRef={mode === "single" ? frontCanvasRef : teamCanvasRef}
            builderName={singleData.name || "builder"}
            builderId={builderId}
            className={mode === "single" ? "" : "sm:col-span-2"}
          />
        </div>
      </div>

      {/* Download Confirmation Pop-Up Modal */}
      {pendingDownload && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#07261D] border-2 border-[#FFD400] rounded-2xl max-w-md w-full p-6 text-center shadow-[0_0_40px_rgba(255,212,0,0.25)] flex flex-col items-center gap-4 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-[#FFD400]/10 border border-[#FFD400]/40 flex items-center justify-center text-[#FFD400]">
              <Download className="w-6 h-6 text-[#FFD400]" />
            </div>

            <div>
              <h3 className="text-lg font-serif font-black text-[#FFD400] uppercase tracking-wide">
                Confirm Download
              </h3>
              <p className="text-xs text-[#F5F0E1]/80 mt-1.5 leading-relaxed">
                Download <strong className="text-[#FFD400]">{pendingDownload.label}</strong> to your device?
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
              <button
                type="button"
                onClick={executeDownload}
                className="min-h-[44px] w-full px-4 py-2 rounded-xl bg-[#F0176D] text-white font-extrabold text-xs uppercase tracking-wider hover:bg-[#F0176D]/90 transition shadow-md cursor-pointer"
              >
                Confirm Download
              </button>
              <button
                type="button"
                onClick={() => setPendingDownload(null)}
                className="min-h-[44px] w-full px-4 py-2 rounded-xl bg-[#0B3D2E] border border-[#155340] text-[#F5F0E1]/70 hover:text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
