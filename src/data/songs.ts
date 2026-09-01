export type SongCredit = {
  role: string
  name: string
}

export type Song = {
  slug: string
  title: string
  titleReading?: string
  releasedAt: string // YYYY-MM-DD
  hue: number // 0-360, drives the placeholder artwork color when artworkUrl is unset
  youtubeId?: string
  artworkUrl?: string
  credits: SongCredit[]
  description: string
}

// Only one release could be confirmed from the public web (note.com/quearts_vocaloid
// + YouTube oEmbed for the video below). The channel's full video list requires
// JS rendering that isn't reachable from here — add the rest of the catalog here
// once you have the song titles / YouTube links from Quearts.
export const songs: Song[] = [
  {
    slug: 'egaku-ashiato',
    title: '描く足跡',
    titleReading: 'えがくあしあと',
    releasedAt: '2025-06-20',
    hue: 200,
    youtubeId: '43r25iJQ-qY',
    credits: [
      { role: '作詞・作曲・編曲', name: 'Quearts' },
      { role: '歌唱', name: '初音ミク' },
    ],
    description:
      '楽曲詳細',
  },
]

export function getSongBySlug(slug: string): Song | undefined {
  return songs.find((song) => song.slug === slug)
}

export function getSongsSortedByDate(): Song[] {
  return [...songs].sort((a, b) => b.releasedAt.localeCompare(a.releasedAt))
}
