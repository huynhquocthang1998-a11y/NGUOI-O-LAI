"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface StayModeContextValue {
  stayMode: boolean;
  toggleStayMode: () => void;
}

const StayModeContext = createContext<StayModeContextValue | undefined>(undefined);

export function StayModeProvider({ children }: { children: React.ReactNode }) {
  const [stayMode, setStayMode] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("stay-mode") : null;
    if (stored) {
      setStayMode(stored === "true");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.body.classList.toggle("stay-mode", stayMode);
    localStorage.setItem("stay-mode", String(stayMode));
  }, [stayMode]);

  const value = useMemo(
    () => ({
      stayMode,
      toggleStayMode: () => setStayMode((prev) => !prev)
    }),
    [stayMode]
  );

  return <StayModeContext.Provider value={value}>{children}</StayModeContext.Provider>;
}

export function useStayMode() {
  const ctx = useContext(StayModeContext);
  if (!ctx) throw new Error("useStayMode must be used within StayModeProvider");
  return ctx;
}
