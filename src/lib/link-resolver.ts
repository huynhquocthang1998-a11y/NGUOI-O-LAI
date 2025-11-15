export type ResolverOutput = {
  source_provider: string;
  resolved_stream_url: string;
  embed_type: "html5" | "iframe" | "hls";
  mime_type: string;
  duration_estimate: string;
  note?: string;
};

export interface LinkAdapter {
  id: string;
  match: (url: string) => boolean;
  resolve: (url: string) => ResolverOutput;
}

const toResult = (provider: string, url: string, extra?: Partial<ResolverOutput>): ResolverOutput => ({
  source_provider: provider,
  resolved_stream_url: url,
  embed_type: extra?.embed_type ?? "html5",
  mime_type: extra?.mime_type ?? "audio/mpeg",
  duration_estimate: extra?.duration_estimate ?? "~18:00",
  note: extra?.note
});

const adapters: LinkAdapter[] = [
  {
    id: "google-drive",
    match: (url) => /drive\.google/.test(url),
    resolve: (url) => toResult("Google Drive", url.replace("view?usp=sharing", "preview"), { embed_type: "iframe", mime_type: "video/mp4" })
  },
  {
    id: "dropbox",
    match: (url) => /dropbox\.com/.test(url),
    resolve: (url) => toResult("Dropbox", url.replace("dl=0", "raw=1"))
  },
  {
    id: "onedrive",
    match: (url) => /1drv\.ms|sharepoint/.test(url),
    resolve: (url) => toResult("OneDrive", url, { embed_type: "iframe", mime_type: "video/mp4", note: "Sử dụng viewer của Microsoft" })
  },
  {
    id: "youtube",
    match: (url) => /youtube|youtu\.be/.test(url),
    resolve: (url) => {
      const videoId = url.split("v=")[1] ?? url.split("/").pop();
      return toResult("YouTube", `https://www.youtube.com/embed/${videoId}`, { embed_type: "iframe", mime_type: "text/html", duration_estimate: "theo metadata" });
    }
  },
  {
    id: "vimeo",
    match: (url) => /vimeo\.com/.test(url),
    resolve: (url) => toResult("Vimeo", url.replace("vimeo.com", "player.vimeo.com/video"), { embed_type: "iframe", mime_type: "text/html" })
  },
  {
    id: "soundcloud",
    match: (url) => /soundcloud\.com/.test(url),
    resolve: (url) => toResult("SoundCloud", url, { embed_type: "iframe", mime_type: "text/html" })
  },
  {
    id: "direct",
    match: (url) => /\.(mp3|mp4|m3u8)($|\?)/.test(url),
    resolve: (url) => {
      const ext = url.split(".").pop()?.split("?")[0];
      const mime = ext === "mp4" ? "video/mp4" : ext === "m3u8" ? "application/x-mpegURL" : "audio/mpeg";
      return toResult("Direct", url, { mime_type: mime, embed_type: ext === "m3u8" ? "hls" : "html5" });
    }
  },
  {
    id: "s3",
    match: (url) => /amazonaws\.com|r2\.cloudflarestorage\.com/.test(url),
    resolve: (url) => toResult("S3 / R2", url, { note: "URL ký tên tạm thời" })
  }
];

export function resolveMediaLink(url: string): ResolverOutput {
  const adapter = adapters.find((ad) => ad.match(url));
  if (adapter) {
    return adapter.resolve(url);
  }
  return toResult("Không xác định", url, { note: "Không tìm thấy adapter phù hợp" });
}

export function listAdapters() {
  return adapters.map((adapter) => adapter.id);
}
