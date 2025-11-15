import Link from "next/link";
import { partsMeta, timelineEvents } from "@/data/episodes";

const voices = [
  {
    name: "Người Ở Lại",
    description: "Giọng mạnh mẽ, trấn tĩnh, luôn giữ ánh đèn cháy trong phòng bệnh."
  },
  {
    name: "Phần Yếu Mềm",
    description: "Giọng thì thầm, đại diện cho sang chấn, giấc mơ màu tro và những cơn phân ly."
  }
];

export default function TimelinePage() {
  return (
    <main className="min-h-screen bg-dusk pb-16 text-white">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <Link href="/" className="text-sm text-candle">
          ← Trở về trang chính
        </Link>
        <h1 className="mt-4 text-4xl font-semibold">Bản Đồ Hành Trình</h1>
        <p className="mt-3 text-white/80">
          Khám phá 5 Phần của dự án, hai giọng nội tâm và chuỗi sự kiện từ 2020 đến 2025.
        </p>
        <section className="mt-10 grid gap-6 md:grid-cols-2">
          {partsMeta.map((part) => (
            <div key={part.part} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.4em] text-candle/70">Phần {part.part}</p>
              <h2 className="text-2xl font-semibold">{part.title}</h2>
              <p className="text-sm text-white/70">{part.summary}</p>
              <p className="mt-2 text-xs text-soft-green">Biểu tượng: {part.symbols.join(", ")}</p>
              <p className="text-xs text-soft-green">Giọng góp mặt: {part.voices.join(", ")}</p>
            </div>
          ))}
        </section>
        <section className="mt-12 rounded-3xl border border-white/10 bg-black/30 p-6">
          <h2 className="text-2xl font-semibold">Hai giọng nội tâm</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {voices.map((voice) => (
              <div key={voice.name} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <h3 className="text-xl font-semibold text-candle">{voice.name}</h3>
                <p className="text-sm text-white/70">{voice.description}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Timeline 2020 – 2025</h2>
          <ol className="mt-6 space-y-5 border-l border-white/20 pl-6">
            {timelineEvents.map((event) => (
              <li key={event.year} className="relative">
                <div className="absolute -left-3 top-1 h-4 w-4 rounded-full border border-candle bg-dusk" />
                <p className="text-sm uppercase tracking-[0.3em] text-candle/70">{event.year}</p>
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <p className="text-white/70">{event.detail}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
