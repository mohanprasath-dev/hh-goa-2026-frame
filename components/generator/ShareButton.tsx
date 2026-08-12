"use client";

import React, { useState } from "react";
import { Share2, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { downloadBlob } from "@/lib/downloadPoster";

interface ShareButtonProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  builderName: string;
  builderId?: string | null;
  className?: string;
}

/**
 * Builds custom pre-written template for sharing to X with Vercel Blob image URL.
 */
function buildShareText(name: string, builderId?: string | null, blobUrl?: string | null): string {
  const displayName = name.trim() || "Builder";
  const idFormatted = builderId
    ? builderId.startsWith("#")
      ? builderId
      : `#${builderId}`
    : "#HH-GOA-2026";

  const imageOrSiteUrl = blobUrl || "https://hhgoa.taskdrift.in";

  return `🌴 Just generated my Builder Card for #HHGoa2026

👤 ${displayName}
🪪 #${idFormatted}

Building, shipping, connecting with amazing builders in Goa 🚀

Get yours → ${imageOrSiteUrl}

#FrameInGoa #HHGoa2026 #BuildInGoa`;
}

/**
 * Converts canvas to PNG Blob.
 */
function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to export canvas as PNG."));
        }
      },
      "image/png",
      1.0,
    );
  });
}

/**
 * Sanitises builder name into a safe filename.
 */
function sanitizeName(name: string): string {
  return (
    name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "poster"
  );
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  canvasRef,
  builderName,
  builderId,
  className = "",
}) => {
  const [isSharing, setIsSharing] = useState(false);
  const [notice, setNotice] = useState<{
    message: string;
    isError?: boolean;
  } | null>(null);

  const handleShare = async () => {
    if (!canvasRef.current) return;

    setIsSharing(true);
    setNotice(null);

    // Synchronously open window on click to prevent browser popup blockers
    const shareWin =
      typeof window !== "undefined"
        ? window.open("about:blank", "_blank")
        : null;

    try {
      const blob = await canvasToBlob(canvasRef.current);
      const fileName = `hh-goa-2026-${sanitizeName(builderName)}.png`;
      const file = new File([blob], fileName, { type: "image/png" });

      // 1. Download poster PNG locally to user's device
      downloadBlob(blob, fileName);

      // 2. Upload created card PNG to Vercel Blob storage via /api/share endpoint
      let vercelBlobUrl: string | null = null;
      try {
        const formData = new FormData();
        formData.append("poster", file);

        const response = await fetch("/api/share", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          vercelBlobUrl = data.url || null;
        }
      } catch (uploadErr) {
        console.warn("Vercel Blob upload unavailable, using direct fallback:", uploadErr);
      }

      // 3. Construct X intent URL with Vercel Blob URL (if available) or site URL fallback
      const shareText = buildShareText(builderName, builderId, vercelBlobUrl);
      const tweetUrl = `https://x.com/intent/post?text=${encodeURIComponent(shareText)}`;

      if (shareWin && !shareWin.closed) {
        shareWin.location.href = tweetUrl;
      } else {
        window.open(tweetUrl, "_blank", "noopener,noreferrer");
      }

      setNotice({
        message: vercelBlobUrl
          ? "Uploaded to Vercel Blob & redirected to X!"
          : "Poster downloaded & redirected to X!",
      });
    } catch (err) {
      if (shareWin && !shareWin.closed) {
        shareWin.close();
      }
      const message = err instanceof Error ? err.message : "Sharing failed.";
      setNotice({ message, isError: true });
      console.error("Share error:", err);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="flex flex-col items-stretch gap-1.5">
      <button
        type="button"
        onClick={handleShare}
        disabled={isSharing}
        className={`min-h-[48px] px-5 py-2.5 rounded-xl bg-[#07261D] border border-[#FFD400]/40 text-[#FFD400] font-extrabold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#0B3D2E] hover:border-[#FFD400] transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,212,0,0.15)] hover:scale-[1.02] touch-manipulation cursor-pointer disabled:opacity-50 ${className}`}
      >
        {isSharing ? (
          <Loader2 className="w-4 h-4 animate-spin text-[#FFD400]" />
        ) : (
          <Share2 className="w-4 h-4 text-[#F0176D]" />
        )}
        <span>{isSharing ? "Uploading to Vercel Blob..." : "Share to X"}</span>
      </button>

      {notice && (
        <p
          className={`text-[11px] font-semibold flex items-center gap-1 px-1 ${
            notice.isError ? "text-[#F0176D]" : "text-[#FFD400]"
          }`}
        >
          {notice.isError ? (
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          ) : (
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#FFD400]" />
          )}
          <span>{notice.message}</span>
        </p>
      )}
    </div>
  );
};


