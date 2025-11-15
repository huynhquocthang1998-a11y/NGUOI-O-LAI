import type { Metadata } from "next";
import "./globals.css";
import { Be_Vietnam_Pro } from "next/font/google";
import { StayModeProvider } from "@/components/stay-mode-context";

const beVietnam = Be_Vietnam_Pro({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Người Ở Lại Media",
  description: "Hồi ức của ước mơ – hành trình chữa lành bằng âm thanh, hình ảnh và AI."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={beVietnam.className}>
        <StayModeProvider>{children}</StayModeProvider>
      </body>
    </html>
  );
}
