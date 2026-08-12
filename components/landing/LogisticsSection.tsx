import React from "react";
import { Calendar, MapPin, Home } from "lucide-react";

const LOGISTICS_ITEMS = [
  {
    icon: Calendar,
    title: "DATES",
    value: "28–31 OCT 2026",
    subtext: "4-Day Intensive Residency Sprint",
  },
  {
    icon: MapPin,
    title: "LOCATION",
    value: "GOA, INDIA",
    subtext: "Private Beachfront Villa in North Goa",
  },
  {
    icon: Home,
    title: "FORMAT",
    value: "CO-LIVING & CO-BUILDING",
    subtext: "Stay, meals, fiber internet & perks 100% covered",
  },
];

export function LogisticsSection() {
  return (
    <section className="px-5 sm:px-8 py-16 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <p className="text-hh-pink text-xs font-bold tracking-[0.3em] uppercase mb-2">
          EVENT LOGISTICS & SPECS
        </p>
        <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-serif font-black italic text-hh-yellow tracking-tight">
          RESIDENCY DETAILS
        </h2>
      </div>

      {/* Logistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {LOGISTICS_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="bg-[#07261D] p-6 rounded-2xl border border-[#155340] hover:border-[#FFD400]/50 transition-all duration-300 flex flex-col justify-between shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-hh-yellow/10 border border-hh-yellow/30 text-hh-yellow flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-hh-yellow" />
                </div>
                <span className="text-[10px] font-bold tracking-[0.25em] text-hh-pink uppercase block mb-1">
                  {item.title}
                </span>
                <h3 className="text-hh-cream font-extrabold text-base sm:text-lg tracking-wide uppercase font-sans">
                  {item.value}
                </h3>
              </div>
              <p className="text-hh-cream/60 text-xs font-medium mt-3 pt-3 border-t border-[#155340]">
                {item.subtext}
              </p>
            </div>
          );
        })}
      </div>

    </section>
  );
}
