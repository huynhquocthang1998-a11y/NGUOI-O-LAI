export type GeminiCover = {
  id: string;
  title: string;
  url: string;
};

const motifs = [
  "cửa khép – bệnh viện – ánh đèn trắng",
  "nồi cơm – căn bếp",
  "Mi Đô",
  "giấc mơ màu tro – phân ly",
  "ngọn nến – phòng tối"
];

export async function generateCovers(seed: string): Promise<GeminiCover[]> {
  return motifs.map((motive, index) => ({
    id: `${seed}-${index}`,
    title: `${seed} · ${motive}`,
    url: `https://placehold.co/400x400/0f0f0f/FFFFFF?text=${encodeURIComponent(motive)}`
  }));
}

export async function generateDescription(prompt: string): Promise<string> {
  return `AI mô tả: ${prompt} – hai câu chuyện đan xen giữa ký ức bệnh viện và căn bếp tối.`;
}

export async function generateTags(seed?: string): Promise<string[]> {
  const base = ["sang chấn", "phân ly", "PTSD phức hợp", "gia đình", "bệnh viện", "bà ngoại", "Mi Đô", "Tuấn", "healing", "LGBTQ+", "ở lại", "ký ức"];
  return seed ? base.filter((_, index) => index % 2 === 0) : base;
}
