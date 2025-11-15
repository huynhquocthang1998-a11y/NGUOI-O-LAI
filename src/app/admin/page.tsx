"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { podcastEpisodes, videoItems } from "@/data/episodes";
import { generateCovers, generateDescription, generateTags, GeminiCover } from "@/lib/mock-gemini";
import { resolveMediaLink, ResolverOutput, listAdapters } from "@/lib/link-resolver";

const emptyForm = {
  id: "",
  title: "",
  description: "",
  part_index: "I",
  chapter_index: 1,
  tags: "",
  source_provider: "",
  source_type: "stream",
  source_url_input: "",
  resolved_stream_url: "",
  cover_url: "",
  status: "draft"
};

type FormState = typeof emptyForm;

type Collection = "podcast" | "video";

export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [authError, setAuthError] = useState("\u00a0");
  const [podcasts, setPodcasts] = useState(podcastEpisodes);
  const [videos, setVideos] = useState(videoItems);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [collection, setCollection] = useState<Collection>("podcast");
  const [resolverPreview, setResolverPreview] = useState<ResolverOutput | null>(null);
  const [covers, setCovers] = useState<GeminiCover[]>([]);
  const [aiBusy, setAiBusy] = useState(false);

  const data = collection === "podcast" ? podcasts : videos;

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    if (email === "admin@nguoiolai.vn" && password === "nguoiolai") {
      setIsAuthed(true);
      setAuthError("\u00a0");
    } else {
      setAuthError("Sai thông tin đăng nhập");
    }
  };

  const handleChange = (field: keyof FormState, value: string | number) => {
    const next = { ...form, [field]: value };
    setForm(next);
    if (field === "source_url_input" && value) {
      const resolved = resolveMediaLink(String(value));
      setResolverPreview(resolved);
      setForm((prev) => ({ ...prev, resolved_stream_url: resolved.resolved_stream_url, source_provider: resolved.source_provider }));
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setResolverPreview(null);
    setCovers([]);
  };

  const upsertItem = (event: FormEvent) => {
    event.preventDefault();
    const payload = {
      ...form,
      id: form.id || crypto.randomUUID(),
      tags: form.tags ? form.tags.split(",").map((tag) => tag.trim()) : []
    };

    if (collection === "podcast") {
      setPodcasts((prev) => {
        const exists = prev.some((item) => item.id === payload.id);
        if (exists) {
          return prev.map((item) => (item.id === payload.id ? (payload as any) : item));
        }
        return [...prev, payload as any];
      });
    } else {
      setVideos((prev) => {
        const exists = prev.some((item) => item.id === payload.id);
        if (exists) {
          return prev.map((item) => (item.id === payload.id ? (payload as any) : item));
        }
        return [...prev, payload as any];
      });
    }
    resetForm();
  };

  const handleEdit = (id: string) => {
    const found = data.find((item) => item.id === id);
    if (!found) return;
    setForm({
      ...emptyForm,
      ...found,
      tags: (found as any).tags?.join?.(", ") ?? ""
    });
    setResolverPreview(
      resolveMediaLink((found as any).resolvedStreamUrl ?? (found as any).resolved_stream_url ?? "")
    );
  };

  const handleDelete = (id: string) => {
    if (collection === "podcast") {
      setPodcasts((prev) => prev.filter((item) => item.id !== id));
    } else {
      setVideos((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleAiDescription = async () => {
    setAiBusy(true);
    const description = await generateDescription(form.title || "Người Ở Lại");
    setForm((prev) => ({ ...prev, description }));
    setAiBusy(false);
  };

  const handleAiTags = async () => {
    setAiBusy(true);
    const tags = await generateTags(form.title);
    setForm((prev) => ({ ...prev, tags: tags.join(", ") }));
    setAiBusy(false);
  };

  const handleAiCover = async () => {
    setAiBusy(true);
    const nextCovers = await generateCovers(form.title || "NguoiOLai");
    setCovers(nextCovers);
    setAiBusy(false);
  };

  const adaptersList = useMemo(() => listAdapters().join(", "), []);

  if (!isAuthed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-dusk">
        <form onSubmit={handleLogin} className="w-full max-w-md rounded-3xl border border-white/10 bg-black/40 p-8 text-white">
          <h1 className="text-2xl font-semibold">Admin Panel</h1>
          <p className="text-sm text-white/70">Đăng nhập để quản lý podcast và video.</p>
          <label className="mt-6 block text-sm">Email
            <input name="email" type="email" className="mt-1 w-full rounded-2xl border border-white/10 bg-black/40 p-3" required />
          </label>
          <label className="mt-4 block text-sm">Mật khẩu
            <input name="password" type="password" className="mt-1 w-full rounded-2xl border border-white/10 bg-black/40 p-3" required />
          </label>
          <p className="mt-3 text-sm text-red-400">{authError}</p>
          <button type="submit" className="mt-6 w-full rounded-2xl bg-candle px-4 py-3 text-black font-semibold">Đăng nhập</button>
          <Link href="/" className="mt-4 block text-center text-sm text-white/70">← Về trang công khai</Link>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-dusk px-4 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <p className="text-sm text-white/70">Quản lý tập Podcast &amp; Video với công cụ AI Gemini giả lập.</p>
          </div>
          <Link href="/" className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80">← Trang công khai</Link>
        </div>
        <div className="mt-8 rounded-3xl border border-white/10 bg-black/30 p-6">
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-sm uppercase tracking-[0.4em] text-candle/70">Bộ sưu tập</p>
            <div className="flex gap-2">
              {(["podcast", "video"] as Collection[]).map((col) => (
                <button
                  key={col}
                  onClick={() => setCollection(col)}
                  className={col === collection ? "rounded-full bg-candle px-4 py-2 text-black" : "rounded-full border border-white/20 px-4 py-2 text-white/70"}
                >
                  {col === "podcast" ? "Podcast Manager" : "Video Manager"}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-xs uppercase text-white/50">
                <tr>
                  <th className="px-2 py-2">Title</th>
                  <th className="px-2 py-2">Description</th>
                  <th className="px-2 py-2">Part</th>
                  <th className="px-2 py-2">Chapter</th>
                  <th className="px-2 py-2">Source Provider</th>
                  <th className="px-2 py-2">Source Type</th>
                  <th className="px-2 py-2">Source URL</th>
                  <th className="px-2 py-2">Resolved URL</th>
                  <th className="px-2 py-2">Tags</th>
                  <th className="px-2 py-2">Cover</th>
                  <th className="px-2 py-2">Status</th>
                  <th className="px-2 py-2">Edit</th>
                  <th className="px-2 py-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} className="border-t border-white/5">
                    <td className="px-2 py-3 font-semibold">{item.title}</td>
                    <td className="px-2 py-3 text-white/70">{(item as any).description}</td>
                    <td className="px-2 py-3">{(item as any).part || (item as any).part_index}</td>
                    <td className="px-2 py-3">{(item as any).chapterIndex || (item as any).chapter_index || "-"}</td>
                    <td className="px-2 py-3">{(item as any).sourceProvider || (item as any).source_provider}</td>
                    <td className="px-2 py-3">{(item as any).source_type ?? "stream"}</td>
                    <td className="px-2 py-3 text-candle/80">
                      <span className="line-clamp-1">{(item as any).sourceUrlInput || (item as any).source_url_input || "—"}</span>
                    </td>
                    <td className="px-2 py-3 text-candle/80">
                      <span className="line-clamp-1">{(item as any).resolvedStreamUrl || (item as any).resolved_stream_url}</span>
                    </td>
                    <td className="px-2 py-3 text-xs">{((item as any).tags ?? []).join?.(", ")}</td>
                    <td className="px-2 py-3 text-xs">{(item as any).coverUrl || (item as any).cover_url}</td>
                    <td className="px-2 py-3 text-xs capitalize">{(item as any).status ?? "public"}</td>
                    <td className="px-2 py-3">
                      <button className="text-candle" onClick={() => handleEdit(item.id)}>Sửa</button>
                    </td>
                    <td className="px-2 py-3">
                      <button className="text-red-300" onClick={() => handleDelete(item.id)}>Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <form onSubmit={upsertItem} className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <h2 className="text-2xl font-semibold">Thêm / Chỉnh sửa</h2>
            <label className="mt-4 block text-sm">Title
              <input value={form.title} onChange={(event) => handleChange("title", event.target.value)} className="mt-1 w-full rounded-2xl border border-white/10 bg-black/40 p-3" required />
            </label>
            <label className="mt-4 block text-sm">Description
              <textarea value={form.description} onChange={(event) => handleChange("description", event.target.value)} className="mt-1 w-full rounded-2xl border border-white/10 bg-black/40 p-3" rows={3} />
            </label>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <label className="block text-sm">Phần
                <select value={form.part_index} onChange={(event) => handleChange("part_index", event.target.value)} className="mt-1 w-full rounded-2xl border border-white/10 bg-black/40 p-3">
                  {["I", "II", "III", "IV", "V"].map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">Chương
                <input type="number" value={form.chapter_index} onChange={(event) => handleChange("chapter_index", Number(event.target.value))} className="mt-1 w-full rounded-2xl border border-white/10 bg-black/40 p-3" />
              </label>
              <label className="block text-sm">Status
                <select value={form.status} onChange={(event) => handleChange("status", event.target.value)} className="mt-1 w-full rounded-2xl border border-white/10 bg-black/40 p-3">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </label>
            </div>
            <label className="mt-4 block text-sm">Tags (cách nhau bởi dấu phẩy)
              <input value={form.tags} onChange={(event) => handleChange("tags", event.target.value)} className="mt-1 w-full rounded-2xl border border-white/10 bg-black/40 p-3" />
            </label>
            <label className="mt-4 block text-sm">Nguồn (URL)
              <input value={form.source_url_input} onChange={(event) => handleChange("source_url_input", event.target.value)} className="mt-1 w-full rounded-2xl border border-white/10 bg-black/40 p-3" placeholder="Dán link Google Drive, Dropbox, Vimeo..." />
            </label>
            <label className="mt-4 block text-sm">Resolved stream URL
              <input value={form.resolved_stream_url} onChange={(event) => handleChange("resolved_stream_url", event.target.value)} className="mt-1 w-full rounded-2xl border border-white/10 bg-black/40 p-3" />
            </label>
            <label className="mt-4 block text-sm">Cover URL
              <input value={form.cover_url} onChange={(event) => handleChange("cover_url", event.target.value)} className="mt-1 w-full rounded-2xl border border-white/10 bg-black/40 p-3" />
            </label>
            {resolverPreview && (
              <div className="mt-4 rounded-2xl border border-candle/30 bg-candle/5 p-4 text-sm text-white/80">
                <p className="text-xs uppercase tracking-[0.4em] text-candle/80">Link Resolver Preview</p>
                <p>Provider: {resolverPreview.source_provider}</p>
                <p>Embed: {resolverPreview.embed_type}</p>
                <p>MIME: {resolverPreview.mime_type}</p>
                <p>Duration: {resolverPreview.duration_estimate}</p>
                <p className="text-xs text-white/60">Note: {resolverPreview.note ?? "—"}</p>
              </div>
            )}
            <button type="submit" className="mt-6 w-full rounded-2xl bg-candle px-4 py-3 text-black font-semibold">Lưu nội dung</button>
          </form>
          <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <h2 className="text-2xl font-semibold">AI Tools (Gemini)</h2>
            <div className="mt-4 space-y-4 text-sm">
              <button onClick={handleAiDescription} className="w-full rounded-2xl border border-white/10 px-4 py-3 text-left hover:border-candle" disabled={aiBusy}>
                ✨ Tạo mô tả 2–3 câu
              </button>
              <button onClick={handleAiTags} className="w-full rounded-2xl border border-white/10 px-4 py-3 text-left hover:border-candle" disabled={aiBusy}>
                🏷️ Gợi ý thẻ ưu tiên sang chấn / phân ly / gia đình
              </button>
              <button onClick={handleAiCover} className="w-full rounded-2xl border border-white/10 px-4 py-3 text-left hover:border-candle" disabled={aiBusy}>
                🖼️ Sinh 3 cover theo motif (cửa khép, nồi cơm, Mi Đô, giấc mơ tro, ngọn nến)
              </button>
            </div>
            {covers.length > 0 && (
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {covers.map((cover) => (
                  <button
                    key={cover.id}
                    onClick={() => setForm((prev) => ({ ...prev, cover_url: cover.url }))}
                    className="rounded-2xl border border-white/10 bg-black/40 p-3 text-left text-xs text-white/70"
                  >
                    <img src={cover.url} alt={cover.title} className="h-32 w-full rounded-xl object-cover" />
                    {cover.title}
                  </button>
                ))}
              </div>
            )}
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white/70">
              <p className="text-xs uppercase tracking-[0.4em] text-candle/80">Adapters khả dụng</p>
              <p>{adaptersList}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
