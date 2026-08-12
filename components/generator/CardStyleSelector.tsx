"use client";

import React from "react";
import { CreditCard, QrCode, RefreshCw } from "lucide-react";
import type { CardStyle } from "@/types/builder";

interface CardSideOption {
  value: CardStyle;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
}

const CARD_SIDES: CardSideOption[] = [
  {
    value: "dark-id-front",
    label: "Front Face",
    sublabel: "Photo, Name, Title & Stack",
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    value: "dark-id-back",
    label: "Back Face",
    sublabel: "QR Code & Verified Serial",
    icon: <QrCode className="w-5 h-5" />,
  },
];

interface CardStyleSelectorProps {
  selected: CardStyle;
  onChange: (style: CardStyle) => void;
}

/**
 * 2-Sided Credential Face Switcher.
 * Allows user to inspect and toggle between Front and Back faces of their 1 Builder ID.
 */
export const CardStyleSelector: React.FC<CardStyleSelectorProps> = ({
  selected,
  onChange,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFD400] flex items-center gap-1.5">
          <RefreshCw className="w-3.5 h-3.5 text-[#F0176D]" />
          2-Sided Card Inspector
        </label>
        <span className="text-[10px] font-semibold text-[#F5F0E1]/60 uppercase">
          1 Unified Credential
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {CARD_SIDES.map((side) => {
          const isActive = selected === side.value;
          return (
            <button
              key={side.value}
              type="button"
              onClick={() => onChange(side.value)}
              className={`
								relative flex items-center gap-3 p-3.5 rounded-xl
								border-2 transition-all duration-200 cursor-pointer text-left
								min-h-[76px] touch-manipulation
								${
                  isActive
                    ? "border-[#F0176D] bg-[#07261D] text-[#F5F0E1] shadow-[0_0_20px_rgba(240,23,109,0.3)] scale-[1.02]"
                    : "border-[#155340] bg-[#07261D]/60 text-[#F5F0E1]/70 hover:border-[#FFD400]/40 hover:bg-[#07261D]"
                }
							`}
            >
              {/* Active check icon badge */}
              {isActive && (
                <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#F0176D] text-white text-[9px] font-extrabold uppercase tracking-wider">
                  VIEWING
                </div>
              )}

              {/* Icon avatar */}
              <div
                className={`
									w-10 h-10 rounded-lg shrink-0
									flex items-center justify-center transition-colors
									${
                    isActive
                      ? "bg-[#F0176D]/20 text-[#F0176D]"
                      : "bg-[#0B3D2E] text-[#FFD400]"
                  }
								`}
              >
                {side.icon}
              </div>

              {/* Label & Description */}
              <div className="leading-tight flex-1 pr-3">
                <span
                  className={`block text-xs font-extrabold tracking-wide ${isActive ? "text-[#FFD400]" : "text-[#F5F0E1]"}`}
                >
                  {side.label}
                </span>
                <span
                  className={`block text-[10px] font-semibold mt-0.5 ${isActive ? "text-[#F5F0E1]/90" : "text-[#F5F0E1]/50"}`}
                >
                  {side.sublabel}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
