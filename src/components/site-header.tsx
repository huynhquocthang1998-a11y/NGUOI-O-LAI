import Link from "next/link";
import { StayModeToggle } from "@/components/stay-mode-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 w-full bg-dusk/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-candle/80">Người Ở Lại Media</p>
          <h1 className="text-2xl font-semibold text-white">Hồi Ức Của Ước Mơ</h1>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/timeline"
            className="rounded-full border border-white/30 px-4 py-2 text-center text-sm text-white transition hover:border-candle hover:text-candle"
          >
            Bản Đồ Hành Trình
          </Link>
          <StayModeToggle />
        </div>
      </div>
    </header>
  );
}
