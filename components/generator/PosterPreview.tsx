"use client";

import React, { useEffect, useRef, useState } from "react";
import { Download, Loader2, Sparkles, RefreshCw, CreditCard, QrCode, Users, Layers } from "lucide-react";
import { fetchBuilderId } from "@/lib/compositor";
import { renderDarkIdFront, renderDarkIdBack } from "@/lib/dark-compositor";
import { downloadBlob, downloadPoster, sanitizeFilename } from "@/lib/downloadPoster";
import { ShareButton } from "./ShareButton";
import { StampBadge } from "@/components/brand/StampBadge";
import type {
  CardStyle,
  GeneratorMode,
  SinglePosterData,
  TeamPosterData,
} from "@/types/builder";

interface PosterPreviewProps {
  mode: GeneratorMode;
  cardStyle: CardStyle;
  onCardStyleChange?: (style: CardStyle) => void;
  singleData: SinglePosterData;
  teamData: TeamPosterData;
}

/** Returns the CSS aspect ratio class for each card type */
function getAspectClass(mode: GeneratorMode): string {
  if (mode === "team") {
    return "aspect-[1536/1024]";
  }
  return "aspect-[1024/1536]";
}

/** Returns the download filename suffix for each card type */
function getStyleSuffix(mode: GeneratorMode, cardStyle: CardStyle): string | undefined {
  if (mode === "team") return "squad";
  switch (cardStyle) {
    case "dark-id-front":
      return "front";
    case "dark-id-back":
      return "back";
    default:
      return undefined;
  }
}

export const PosterPreview: React.FC<PosterPreviewProps> = ({
  mode,
  cardStyle,
  onCardStyleChange,
  singleData,
  teamData,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloadingBoth, setIsDownloadingBoth] = useState(false);
  const [builderId, setBuilderId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; error?: boolean } | null>(null);

  // Live preview render
  useEffect(() => {
    let isCancelled = false;
    const loaderTimer = setTimeout(() => {
      if (!isCancelled) setShowLoader(true);
    }, 400);

    const render = async () => {
      setIsRendering(true);
      if (canvasRef.current) {
        try {
          await renderCardByStyle(
            cardStyle,
            mode,
            singleData,
            teamData,
            canvasRef.current,
            { mode: "preview" },
          );
        } catch (err) {
          console.error("Canvas render error:", err);
        }
      }
      if (!isCancelled) {
        clearTimeout(loaderTimer);
        setShowLoader(false);
        setIsRendering(false);
      }
    };

    const debounceTimer = setTimeout(render, 120);

    return () => {
      isCancelled = true;
      clearTimeout(loaderTimer);
      clearTimeout(debounceTimer);
    };
  }, [mode, cardStyle, singleData, teamData, teamData.teammates, JSON.stringify(teamData)]);

  // Download active card
  const handleDownloadActive = async () => {
    if (!canvasRef.current) return;
    setIsDownloading(true);
    try {
      let id = builderId;
      if (!id) {
        const result = await fetchBuilderId();
        id = result.builderId;
        setBuilderId(id);
      }

      await renderCardByStyle(
        cardStyle,
        mode,
        singleData,
        teamData,
        canvasRef.current,
        { mode: "final", builderId: id },
      );

      const name =
        mode === "single"
          ? singleData.name || "builder"
          : singleData.name || "squad";
      await downloadPoster(canvasRef.current, name, getStyleSuffix(mode, cardStyle));
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadBoth = async () => {
    if (!canvasRef.current || mode !== "single") return;
    setIsDownloadingBoth(true);
    setToast(null);
    try {
      let id = builderId;
      if (!id) {
        const result = await fetchBuilderId();
        id = result.builderId;
        setBuilderId(id);
      }
      await renderDarkIdFront(singleData, canvasRef.current, { mode: "final", builderId: id });
      const front = await canvasToPng(canvasRef.current);
      await renderDarkIdBack(singleData, canvasRef.current, { mode: "final", builderId: id });
      const back = await canvasToPng(canvasRef.current);

      const formData = new FormData();
      formData.append("builderId", id);
      formData.append("name", singleData.name || "Builder");
      formData.append("title", singleData.title || "Builder");
      formData.append("front", new File([front], "front.png", { type: "image/png" }));
      formData.append("back", new File([back], "back.png", { type: "image/png" }));
      const stored = await fetch("/api/credential", { method: "POST", body: formData });
      if (!stored.ok) {
        const data = await stored.json().catch(() => ({ error: "Credential storage failed." }));
        throw new Error(data.error);
      }

      downloadBlob(front, sanitizeFilename(singleData.name || "builder", "front"));
      window.setTimeout(() => downloadBlob(back, sanitizeFilename(singleData.name || "builder", "back")), 300);
      await renderCardByStyle(cardStyle, mode, singleData, teamData, canvasRef.current, { mode: "preview" });
      setToast({ message: "Front and back downloaded. Your credential is saved and verified." });
    } catch (error) {
      setToast({ message: error instanceof Error ? error.message : "Could not create your credential.", error: true });
      await renderCardByStyle(cardStyle, mode, singleData, teamData, canvasRef.current, { mode: "preview" });
    } finally {
      setIsDownloadingBoth(false);
    }
  };

  // Toggle Front ↔ Back
  const toggleSide = () => {
    if (onCardStyleChange) {
      onCardStyleChange(
        cardStyle === "dark-id-front" ? "dark-id-back" : "dark-id-front"
      );
    }
  };

  const aspectClass = getAspectClass(mode);
  const isFront = cardStyle === "dark-id-front";

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Front / Back Switcher (Solo mode only) */}
      {mode === "single" ? (
        <div className="flex items-center justify-between w-full max-w-[420px] bg-[#07261D] p-1.5 rounded-xl border border-[#155340] shadow-md">
          <button
            type="button"
            onClick={() => onCardStyleChange?.("dark-id-front")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer touch-manipulation ${
              isFront
                ? "bg-[#F0176D] text-white shadow-sm"
                : "text-[#F5F0E1]/60 hover:text-[#F5F0E1]"
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Front Face</span>
          </button>
          <button
            type="button"
            onClick={() => onCardStyleChange?.("dark-id-back")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer touch-manipulation ${
              !isFront
                ? "bg-[#F0176D] text-white shadow-sm"
                : "text-[#F5F0E1]/60 hover:text-[#F5F0E1]"
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Back Face</span>
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 w-full max-w-[480px] bg-[#07261D] p-2 rounded-xl border border-[#155340] text-xs font-black uppercase text-[#FFD400]">
          <Users className="w-4 h-4 text-[#F0176D]" />
          <span>Squad Team Card (Landscape 16:9)</span>
        </div>
      )}

      {/* Physical Credential Showcase Container */}
      <div className={`relative w-full ${mode === "team" ? "max-w-[480px]" : "max-w-[420px]"} transition-all duration-300 transform sm:-rotate-1 hover:rotate-0 group`}>
        {/* Quick Flip Floating Button (Solo mode only) */}
        {mode === "single" && (
          <button
            type="button"
            onClick={toggleSide}
            className="absolute top-2 right-2 z-30 bg-[#07261D]/90 border border-[#FFD400]/60 text-[#FFD400] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-lg hover:bg-[#F0176D] hover:text-white hover:border-[#F0176D] transition-all cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Flip Card</span>
          </button>
        )}

        {/* Floating Stamp Motif Accent */}
        <div
          className="absolute -top-5 -left-5 z-30 pointer-events-none drop-shadow-xl hidden sm:block opacity-80"
          aria-hidden="true"
        >
          <StampBadge width={64} height={64} />
        </div>

        {/* Lanyard Top Connector Slot (Solo mode only) */}
        {mode === "single" && (
          <div className="w-full flex justify-center -mb-3 relative z-20">
            <div className="w-16 h-5 rounded-full bg-[#07261D] border-2 border-[#FFD400]/70 flex items-center justify-center shadow-md">
              <div className="w-9 h-2 rounded-full bg-[#0B3D2E] border border-[#FFD400]/30 shadow-inner" />
            </div>
          </div>
        )}

        {/* Credential Frame */}
        <div
          className={`relative w-full ${aspectClass} rounded-2xl overflow-hidden shadow-credential border-4 border-[#155340] bg-[#07261D] flex items-center justify-center p-1 sm:p-2`}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain rounded-xl transition-opacity duration-200"
          />

          {/* Subtle Loader */}
          {showLoader && isRendering && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center gap-2 text-white font-bold text-sm z-30">
              <Loader2 className="w-6 h-6 animate-spin text-[#FFD400]" />
              Rendering Card...
            </div>
          )}
        </div>
      </div>

      {/* Builder ID badge */}
      {builderId && (
        <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#07261D] border border-[#FFD400]/40 text-[#FFD400] text-xs font-bold shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-[#F0176D]" />
          <span>VERIFIED ID: {builderId}</span>
        </div>
      )}

      {/* Action Toolbar */}
      <div className={`flex flex-col sm:flex-row items-stretch gap-3 w-full ${mode === "team" ? "max-w-[480px]" : "max-w-[420px]"} pt-1`}>
        <button
          type="button"
          onClick={handleDownloadActive}
          disabled={isDownloading}
          className="flex-1 min-h-[48px] px-4 py-2.5 rounded-xl bg-[#F0176D] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#F0176D]/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(240,23,109,0.35)] hover:scale-[1.02] touch-manipulation disabled:opacity-50 cursor-pointer"
        >
          {isDownloading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4 text-[#FFD400]" />
          )}
          <span>
            {mode === "team"
              ? "Download Squad Card"
              : isFront
                ? "Download Front Face"
                : "Download Back Face"}
          </span>
        </button>

        <ShareButton
          className="sm:shrink-0"
          canvasRef={canvasRef}
          builderName={
            mode === "single"
              ? singleData.name || "builder"
              : singleData.name || "squad"
          }
        />
      </div>

      {mode === "single" && (
        <button type="button" onClick={handleDownloadBoth} disabled={isDownloadingBoth} className="min-h-[48px] w-full max-w-[420px] rounded-xl border border-[#FFD400]/50 bg-[#0B3D2E] px-4 text-xs font-black uppercase tracking-wide text-[#FFD400] transition hover:border-[#FFD400] hover:bg-[#07261D] disabled:opacity-50">
          {isDownloadingBoth ? <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Preparing both sides…</span> : <span className="inline-flex items-center gap-2"><Layers className="h-4 w-4 text-[#F0176D]" /> Download front + back</span>}
        </button>
      )}
      {toast && <div role="status" className={`w-full max-w-[420px] rounded-xl border px-4 py-3 text-center text-xs font-bold ${toast.error ? "border-[#F0176D]/60 bg-[#F0176D]/10 text-[#F5F0E1]" : "border-[#FFD400]/50 bg-[#FFD400]/10 text-[#FFD400]"}`}>{toast.message}</div>}
    </div>
  );
};

function canvasToPng(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Could not render the credential image.")), "image/png", 1));
}

/* ────────────────────────────────────────────────────────────
 * Routing helper — dispatches to the correct compositor
 * ──────────────────────────────────────────────────────────── */

interface RenderOptions {
  mode: "preview" | "final";
  builderId?: string;
}

async function renderCardByStyle(
  cardStyle: CardStyle,
  generatorMode: GeneratorMode,
  singleData: SinglePosterData,
  teamData: TeamPosterData,
  canvas: HTMLCanvasElement,
  options: RenderOptions,
): Promise<void> {
  if (generatorMode === "team") {
    const { renderTeamPosterCanvas } = await import("@/lib/canvasCompositor");
    await renderTeamPosterCanvas(teamData, canvas);
    return;
  }

  switch (cardStyle) {
    case "dark-id-front":
      await renderDarkIdFront(singleData, canvas, options);
      break;

    case "dark-id-back":
      await renderDarkIdBack(singleData, canvas, options);
      break;
  }
}
