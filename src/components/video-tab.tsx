"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { videoItems } from "@/data/episodes";
import { useStayMode } from "@/components/stay-mode-context";

const iframeProviders = new Set(["YouTube", "Vimeo", "SoundCloud"]);

export function VideoTab() {
  const [selectedId, setSelectedId] = useState<string>(videoItems[0]?.id ?? "");
  const { stayMode } = useStayMode();

  useEffect(() => {
    const stored = localStorage.getItem("video-last");
    if (stored) {
      setSelectedId(stored);
    }
  }, []);

  const currentVideo = useMemo(() => videoItems.find((v) => v.id === selectedId) ?? videoItems[0], [selectedId]);

  const selectVideo = (id: string) => {
    setSelectedId(id);
    localStorage.setItem("video-last", id);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
      <div className="grid gap-4 sm:grid-cols-2">
        {videoItems.map((video) => (
          <button
            key={video.id}
            onClick={() => selectVideo(video.id)}
            className={clsx(
              "flex flex-col rounded-2xl border px-3 py-3 text-left transition",
              selectedId === video.id
                ? "border-candle bg-candle/10 text-white"
                : "border-white/10 text-white/80 hover:border-white/30"
            )}
          >
            <div
              className={clsx("h-40 w-full rounded-xl bg-cover bg-center", stayMode ? "grayscale" : "")}
              style={{ backgroundImage: `url(${video.coverUrl})` }}
            />
            <div className="mt-3">
              <span className="rounded-full border border-white/20 px-2 py-0.5 text-xs text-candle">{video.type}</span>
              <h3 className="mt-2 text-lg font-semibold text-white">{video.title}</h3>
              <p className="text-sm text-white/70">{video.description}</p>
            </div>
          </button>
        ))}
      </div>
      <div className="rounded-3xl border border-white/10 bg-black/30 p-4">
        <p className="text-xs uppercase tracking-[0.3em] text-candle/70">Đang xem</p>
        <h3 className="text-xl font-semibold text-white">{currentVideo?.title}</h3>
        <p className="text-sm text-white/70">{currentVideo?.description}</p>
        <div className="mt-4 overflow-hidden rounded-2xl bg-black">
          {currentVideo && iframeProviders.has(currentVideo.sourceProvider) ? (
            <iframe
              title={currentVideo.title}
              src={currentVideo.resolvedStreamUrl}
              className="h-64 w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video className="h-64 w-full" controls src={currentVideo?.resolvedStreamUrl} />
          )}
        </div>
      </div>
    </div>
  );
}
