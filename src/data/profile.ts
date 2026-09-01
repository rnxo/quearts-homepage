export type TimelineEntry = {
  year: string
  label: string
}

// Drafted from what's publicly confirmed (note.com/quearts_vocaloid bio +
// the "描く足跡" video description) — please review/expand with Quearts directly.
export const profile = {
  bio: [
    'Quearts（クアーツ）は、初音ミクなどのボーカロイドを使って楽曲を投稿しているクリエイター。',
    '曲の制作過程で書いた短編小説がそのまま一曲になることもあり、楽曲ごとに物語を添えて発表するスタイルが特徴。',
  ],
  timeline: [
    { year: '2025', label: '「描く足跡 / 初音ミク」を公開' },
  ] satisfies TimelineEntry[],
  // TODO: confirm actual DAW / voicebanks used.
  gear: ['初音ミク'],
} as const
