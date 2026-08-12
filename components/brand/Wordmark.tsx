import React from "react";

interface WordmarkProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

/** Supplied Hacker House Goa wordmark artwork. */
export const Wordmark: React.FC<WordmarkProps> = ({ className = "", width = 300, height }) => (
  <img src="/brand/hacker-house-goa-wordmark.png" alt="Hacker House Goa" width={width} height={height} className={`inline-block h-auto max-w-full mix-blend-screen ${className}`} />
);
