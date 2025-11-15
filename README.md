# Người Ở Lại Media – Hồi Ức Của Ước Mơ

Prototype Next.js app cho dự án tự truyện đa phương tiện "Người Ở Lại – Hồi Ức Của Ước Mơ".

## Tính năng nổi bật

- Hai tab công khai Podcast / Video với Stay Mode, Linear Journey Mode, lưu tiến độ localStorage.
- Trang Timeline tóm tắt 5 Phần, hai giọng nội tâm và cột mốc 2020–2025.
- Stay Mode: theme tối dịu, thông điệp chữa lành.
- Admin Panel (mock) gồm đăng nhập, CRUD, bảng quản trị, Link Resolver đa nhà cung cấp, AI Gemini giả lập cho cover/mô tả/tag.
- Bộ adapter xử lý Google Drive, Dropbox, OneDrive, YouTube, Vimeo, SoundCloud, liên kết trực tiếp và S3/R2.

## Cấu trúc

```
src/
  app/
    page.tsx         # Trang công khai chính
    timeline/        # Bản đồ hành trình
    admin/           # Dashboard + AI tools
  components/        # Header, tabs, Stay Mode context...
  data/episodes.ts   # Mock DB theo Phần/Chương
  lib/               # mock Gemini & Link Resolver
```

## Chạy dự án

> Repo không kèm `node_modules`. Bạn cần cài đặt thủ công.

```bash
npm install
npm run dev
```

Ứng dụng chạy tại `http://localhost:3000`.
