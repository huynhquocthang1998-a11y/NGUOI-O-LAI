export type Episode = {
  id: string;
  title: string;
  description: string;
  duration: string;
  part: "I" | "II" | "III" | "IV" | "V";
  chapterIndex: number;
  coverUrl: string;
  tags: string[];
  sourceProvider: string;
  resolvedStreamUrl: string;
  moodPrompt: string;
};

export type VideoItem = {
  id: string;
  title: string;
  type: "Full" | "Clip";
  part: "I" | "II" | "III" | "IV" | "V";
  description: string;
  coverUrl: string;
  sourceProvider: string;
  resolvedStreamUrl: string;
};

export const podcastEpisodes: Episode[] = [
  {
    id: "p1",
    title: "Phòng chờ – Cửa khép",
    description: "Người Ở Lại thức trắng cạnh cửa phòng mổ, nghe tiếng đèn trắng reo lên trong đầu.",
    duration: "14:23",
    part: "I",
    chapterIndex: 1,
    coverUrl: "https://placehold.co/300x300/1f1c24/f6c28b?text=Phan+I",
    tags: ["bệnh viện", "đèn trắng", "phòng chờ"],
    sourceProvider: "mock",
    resolvedStreamUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_example1.mp3",
    moodPrompt: "Đặt tay lên ngực, thở cùng ánh đèn trắng."
  },
  {
    id: "p2",
    title: "Mi Đô và nồi cơm trống",
    description: "Âm thanh của chiếc nồi cơm gõ nhịp cùng ký ức về Mi Đô trong bếp tối.",
    duration: "18:09",
    part: "II",
    chapterIndex: 2,
    coverUrl: "https://placehold.co/300x300/1f1c24/f6c28b?text=Phan+II",
    tags: ["gia đình", "Mi Đô", "nồi cơm"],
    sourceProvider: "mock",
    resolvedStreamUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_example2.mp3",
    moodPrompt: "Nhắm mắt và tưởng tượng hơi ấm căn bếp."
  },
  {
    id: "p3",
    title: "Hai ca mổ, hai lời thì thầm",
    description: "Giữa tiếng máy monitor, hai giọng nội tâm trò chuyện về việc ở lại.",
    duration: "22:47",
    part: "III",
    chapterIndex: 3,
    coverUrl: "https://placehold.co/300x300/1f1c24/f6c28b?text=Phan+III",
    tags: ["phẫu thuật", "ở lại", "song thoại"],
    sourceProvider: "mock",
    resolvedStreamUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_example3.mp3",
    moodPrompt: "Ghi xuống một điều bạn muốn thì thầm với chính mình."
  },
  {
    id: "p4",
    title: "Lá thư 25/7/2024",
    description: "Một lá thư chưa gửi nói về người đã đi và người ở lại.",
    duration: "16:58",
    part: "IV",
    chapterIndex: 4,
    coverUrl: "https://placehold.co/300x300/1f1c24/f6c28b?text=Phan+IV",
    tags: ["lá thư", "ký ức", "chữa lành"],
    sourceProvider: "mock",
    resolvedStreamUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_example4.mp3",
    moodPrompt: "Viết một dòng thư cho chính bạn trong tương lai."
  },
  {
    id: "p5",
    title: "Hồi ức của ước mơ",
    description: "Kết lại hành trình 2020–2025 bằng giấc mơ màu tro và lời chào bình minh.",
    duration: "20:05",
    part: "V",
    chapterIndex: 5,
    coverUrl: "https://placehold.co/300x300/1f1c24/f6c28b?text=Phan+V",
    tags: ["giấc mơ", "hy vọng", "bình minh"],
    sourceProvider: "mock",
    resolvedStreamUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_example5.mp3",
    moodPrompt: "Đặt chuông nhắc nghỉ ngơi trước khi bước tiếp."
  }
];

export const videoItems: VideoItem[] = [
  {
    id: "v1",
    title: "Phần I – Người Ở Lại",
    type: "Full",
    part: "I",
    description: "Video hành trình mở đầu trong phòng bệnh với ánh nến vàng.",
    coverUrl: "https://placehold.co/600x400/1f1c24/f6c28b?text=Video+I",
    sourceProvider: "YouTube",
    resolvedStreamUrl: "https://www.youtube.com/embed/ysz5S6PUM-U"
  },
  {
    id: "v2",
    title: "Mi Đô nhớ bà",
    type: "Clip",
    part: "II",
    description: "Đoạn cắt ghi lại câu chuyện Mi Đô và nồi cơm trống.",
    coverUrl: "https://placehold.co/600x400/1f1c24/f6c28b?text=Video+II",
    sourceProvider: "Vimeo",
    resolvedStreamUrl: "https://player.vimeo.com/video/76979871?h=bf4d16c0b7"
  },
  {
    id: "v3",
    title: "Linh cảm trước ca mổ",
    type: "Clip",
    part: "III",
    description: "Short form về hai giọng nội tâm trước phòng mổ.",
    coverUrl: "https://placehold.co/600x400/1f1c24/f6c28b?text=Video+III",
    sourceProvider: "YouTube",
    resolvedStreamUrl: "https://www.youtube.com/embed/21X5lGlDOfg"
  }
];

export const partsMeta = [
  {
    part: "I",
    title: "Ngọn nến trong phòng chờ",
    summary: "2020 – Đối diện khoảng tối đầu tiên tại bệnh viện.",
    symbols: ["ngọn nến", "ánh đèn trắng"],
    voices: ["Người Ở Lại"]
  },
  {
    part: "II",
    title: "Bếp trống, Mi Đô",
    summary: "2021 – Gia đình, căn bếp, nồi cơm và cảm giác mất mát.",
    symbols: ["nồi cơm", "Mi Đô"],
    voices: ["Người Ở Lại", "Phần Yếu Mềm"]
  },
  {
    part: "III",
    title: "Hai ca mổ",
    summary: "2022 – Hai lần nhập viện, hai cuộc đối thoại nội tâm.",
    symbols: ["dao mổ", "monitor"],
    voices: ["Người Ở Lại", "Phần Yếu Mềm"]
  },
  {
    part: "IV",
    title: "Lá thư chưa gửi",
    summary: "2023–2024 – Những lời chưa kịp nói, bức thư 25/7/2024.",
    symbols: ["lá thư", "bàn tay"],
    voices: ["Người Ở Lại"]
  },
  {
    part: "V",
    title: "Hồi ức của ước mơ",
    summary: "2025 – Hành trình chạm tới ánh sáng và chọn ở lại.",
    symbols: ["bình minh", "màu tro"],
    voices: ["Người Ở Lại", "Phần Yếu Mềm"]
  }
] as const;

export const timelineEvents = [
  { year: 2020, title: "Ngọn nến", detail: "Đêm đầu tiên túc trực bên giường bệnh." },
  { year: 2021, title: "Nồi cơm trống", detail: "Căn bếp thiếu một hơi ấm." },
  { year: 2022, title: "Hai ca mổ", detail: "Hai lần ký cam kết và đối thoại với nội tâm." },
  { year: 2023, title: "Mi Đô", detail: "Chú mèo trở lại với vết sẹo ngang tai." },
  { year: 2024, title: "Lá thư 25/7/2024", detail: "Bức thư gửi chính mình không gửi đi." },
  { year: 2025, title: "Ở lại", detail: "Bình minh trong phòng tối, lựa chọn tiếp tục." }
];
