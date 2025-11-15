"use client";

import { useMemo, useState } from "react";
import { PodcastTab } from "@/components/podcast-tab";
import { VideoTab } from "@/components/video-tab";
import { useStayMode } from "@/components/stay-mode-context";
import clsx from "clsx";

const tabs = [
  { id: "podcast", label: "Podcast" },
  { id: "video", label: "Video" }
] as const;

export type TabId = (typeof tabs)[number]["id"];

export function MainExperience() {
  const [tab, setTab] = useState<TabId>("podcast");
  const { stayMode } = useStayMode();
  const TabComponent = useMemo(() => (tab === "podcast" ? PodcastTab : VideoTab), [tab]);

  return (
    <section className={clsx("mx-auto mt-6 max-w-6xl rounded-3xl border px-4 py-6 shadow-lullaby", stayMode ? "border-white/5 bg-[#111]" : "border-white/10 bg-white/5")}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-candle/70">Hành trình song song</p>
          <h2 className="text-2xl font-semibold text-white">Podcast &amp; Video</h2>
        </div>
        <div className="flex rounded-full bg-black/30 p-1 text-sm text-white">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={clsx(
                "flex-1 rounded-full px-4 py-2 transition",
                tab === t.id ? "bg-candle text-black" : "text-white/70"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <TabComponent />
      </div>
    </section>
  );
}
