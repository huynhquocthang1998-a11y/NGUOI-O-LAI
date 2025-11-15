import { SiteHeader } from "@/components/site-header";
import { MainExperience } from "@/components/main-experience";
import { partsMeta } from "@/data/episodes";

export default function HomePage() {
  return (
    <main className="pb-16">
      <SiteHeader />
      <section className="mx-auto mt-10 max-w-6xl rounded-3xl border border-white/10 bg-white/5 px-6 py-10 text-white shadow-lullaby">
        <p className="text-sm uppercase tracking-[0.5em] text-candle/80">Hành trình 2020 – 2025</p>
        <h2 className="mt-3 text-4xl font-semibold leading-tight">Người Ở Lại – Hồi Ức Của Ước Mơ</h2>
        <p className="mt-4 text-lg text-white/80">
          Podcast và video song hành kể về hai giọng nội tâm – Người Ở Lại và Phần Yếu Mềm – giữa những phòng bệnh, căn bếp
          trống và ánh đèn vàng.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partsMeta.map((part) => (
            <div key={part.part} className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.4em] text-candle/70">Phần {part.part}</p>
              <h3 className="text-lg font-semibold">{part.title}</h3>
              <p className="text-sm text-white/70">{part.summary}</p>
              <p className="mt-2 text-xs text-soft-green">Biểu tượng: {part.symbols.join(", ")}</p>
            </div>
          ))}
        </div>
      </section>
      <MainExperience />
      <footer className="mx-auto mt-10 max-w-4xl rounded-3xl border border-white/10 bg-black/40 px-6 py-6 text-center text-sm text-white/70">
        Nếu nội dung chạm đến vùng ký ức nhạy cảm, hãy nghỉ một chút. Ở đây, bạn không phải vội.
      </footer>
    </main>
  );
}
