import React from "react";

interface SecondaryWordmarkProps {
  className?: string;
  width?: number | string;
}

/** Compact stacked Hacker House Goa wordmark for small brand placements. */
export const SecondaryWordmark: React.FC<SecondaryWordmarkProps> = ({ className = "", width = 84 }) => (
  <img
    src="/brand/hacker-house-goa-secondary-wordmark.png"
    alt="Hacker House Goa"
    width={width}
    className={`inline-block h-auto max-w-full mix-blend-screen ${className}`}
  />
);
