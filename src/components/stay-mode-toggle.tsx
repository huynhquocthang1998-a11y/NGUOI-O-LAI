"use client";

import { useStayMode } from "@/components/stay-mode-context";
import clsx from "clsx";

export function StayModeToggle() {
  const { stayMode, toggleStayMode } = useStayMode();

  return (
    <button
      onClick={toggleStayMode}
      className={clsx(
        "flex items-center gap-2 rounded-full px-4 py-2 text-sm transition focus-visible:outline focus-visible:outline-2",
        stayMode
          ? "bg-stay-accent/20 text-stay-text focus-visible:outline-stay-accent"
          : "bg-white/10 text-white focus-visible:outline-candle"
      )}
    >
      <span className="h-2 w-2 rounded-full bg-candle shadow-inner" aria-hidden />
      {stayMode ? "Thoát Stay Mode" : "Bật Stay Mode"}
    </button>
  );
}
