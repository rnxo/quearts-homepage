export type NewsItem = {
  date: string // YYYY-MM-DD
  title: string
  body?: string
  href?: string
}

// Only one confirmed release could be verified from the public web (see
// songs.ts). Add further announcements here as they're confirmed.
export const news: NewsItem[] = [
  {
    date: '2025-06-20',
    title: '「描く足跡 / 初音ミク」を公開しました',
    body: '作曲の合間に書いていた短編小説がもとになった一曲です。',
    href: 'https://youtu.be/43r25iJQ-qY',
  },
]

export function getNewsSortedByDate(): NewsItem[] {
  return [...news].sort((a, b) => b.date.localeCompare(a.date))
}
