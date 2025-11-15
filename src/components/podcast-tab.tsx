"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { podcastEpisodes } from "@/data/episodes";
import { useStayMode } from "@/components/stay-mode-context";

interface ProgressMap {
  [episodeId: string]: number;
}

const parts = ["I", "II", "III", "IV", "V"] as const;

export function PodcastTab() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [selectedId, setSelectedId] = useState<string>(podcastEpisodes[0]?.id ?? "");
  const [progress, setProgress] = useState<ProgressMap>({});
  const [linearQueue, setLinearQueue] = useState<string[] | null>(null);
  const [currentLinearIndex, setCurrentLinearIndex] = useState(0);
  const { stayMode } = useStayMode();

  const grouped = useMemo(() => {
    return parts.map((part) => ({
      part,
      episodes: podcastEpisodes.filter((ep) => ep.part === part)
    }));
  }, []);

  useEffect(() => {
    const storedProgress = localStorage.getItem("podcast-progress");
    const storedSelected = localStorage.getItem("podcast-last");
    if (storedProgress) {
      setProgress(JSON.parse(storedProgress));
    }
    if (storedSelected) {
      setSelectedId(storedSelected);
    }
  }, []);

  const currentEpisode = podcastEpisodes.find((ep) => ep.id === selectedId) ?? podcastEpisodes[0];

  const handleTimeUpdate = () => {
    const player = audioRef.current;
    if (!player || !currentEpisode) return;
    const pct = player.currentTime / (player.duration || 1);
    const newProgress = { ...progress, [currentEpisode.id]: pct };
    setProgress(newProgress);
    localStorage.setItem("podcast-progress", JSON.stringify(newProgress));
  };

  const handleSelect = (episodeId: string) => {
    setSelectedId(episodeId);
    localStorage.setItem("podcast-last", episodeId);
  };

  const startLinearJourney = () => {
    const sorted = [...podcastEpisodes].sort((a, b) => a.chapterIndex - b.chapterIndex);
    setLinearQueue(sorted.map((ep) => ep.id));
    setCurrentLinearIndex(0);
    handleSelect(sorted[0].id);
  };

  const handleEnded = () => {
    if (!linearQueue) return;
    const nextIndex = currentLinearIndex + 1;
    if (nextIndex < linearQueue.length) {
      setCurrentLinearIndex(nextIndex);
      handleSelect(linearQueue[nextIndex]);
    } else {
      setLinearQueue(null);
    }
  };

  const percent = currentEpisode ? Math.round((progress[currentEpisode.id] || 0) * 100) : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
      <div className="space-y-4">
        <button
          onClick={startLinearJourney}
          className="w-full rounded-2xl border border-candle/40 bg-candle/10 px-4 py-3 text-left text-sm font-semibold text-candle transition hover:border-candle"
        >
          Nghe từ đầu (Linear Journey Mode)
          <p className="text-xs font-normal text-white/70">Tự động phát toàn bộ câu chuyện theo thứ tự chương.</p>
        </button>
        <div className="space-y-4">
          {grouped.map(({ part, episodes }) => (
            <details key={part} open className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <summary className="cursor-pointer text-lg font-semibold text-white">Phần {part}</summary>
              <div className="mt-3 space-y-3">
                {episodes.map((episode) => (
                  <button
                    key={episode.id}
                    onClick={() => handleSelect(episode.id)}
                    className={clsx(
                      "flex w-full items-center gap-4 rounded-2xl border px-3 py-3 text-left transition",
                      selectedId === episode.id
                        ? "border-candle bg-candle/10 text-white"
                        : "border-white/10 text-white/80 hover:border-white/30"
                    )}
                  >
                    <div className={clsx("h-16 w-16 flex-shrink-0 rounded-2xl bg-cover bg-center", stayMode ? "grayscale" : "")}
                      style={{ backgroundImage: `url(${episode.coverUrl})` }}
                    />
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-candle/70">Chương {episode.chapterIndex}</p>
                      <h3 className="text-base font-semibold text-white">{episode.title}</h3>
                      <p className="text-sm text-white/70">{episode.description}</p>
                      <p className="text-xs text-white/50">{episode.duration} – Đã nghe {Math.round((progress[episode.id] || 0) * 100)}%</p>
                    </div>
                  </button>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
      <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
        <div className="flex items-center gap-4">
          <div
            className={clsx("h-28 w-28 flex-shrink-0 rounded-3xl bg-cover bg-center", stayMode ? "grayscale" : "")}
            style={{ backgroundImage: `url(${currentEpisode?.coverUrl ?? ""})` }}
          />
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-candle/70">Đang phát</p>
            <h3 className="text-xl font-semibold text-white">{currentEpisode?.title}</h3>
            <p className="text-sm text-white/70">{currentEpisode?.description}</p>
            <p className="text-xs text-soft-green">Gợi ý chăm sóc: {currentEpisode?.moodPrompt}</p>
          </div>
        </div>
        <div className="mt-6 space-y-3">
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-candle" style={{ width: `${percent}%` }} />
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">{percent}% đã nghe</p>
          <audio
            key={currentEpisode?.id}
            ref={audioRef}
            controls
            className="w-full rounded-2xl bg-black/60 p-2"
            src={currentEpisode?.resolvedStreamUrl}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
          />
          {linearQueue && (
            <p className="text-xs text-white/70">
              Linear Journey Mode • Chương {currentLinearIndex + 1}/{linearQueue.length}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
