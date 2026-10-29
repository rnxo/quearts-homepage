import type { ArtWorkUrl } from "./songs"
import { linksOf } from "#/lib/linksOf"

export type News = {
  slug: string // URL で使う（/news/ripuru）
  category: 'music' | 'info'
  title: string
  releasedAt: string
  links?: ArtWorkUrl
}

const news: News[] = [
  {
    slug: 'ripuru',
    category: 'music',
    title: '「リプル」を公開しました',
    releasedAt: '2026-09-24',
    links: linksOf('ripuru')
  },
  {
    slug: 'sutari-yamai',
    category: 'music',
    title: '「廃りの病」を公開しました',
    releasedAt: '2026-09-18',
    links: linksOf('sutari-yamai')
  },
  {
    slug: 'tokeru',
    category: 'music',
    title: '「とける」を公開しました',
    releasedAt: '2026-08-20',
    links: linksOf('tokeru')
  },
]

// 新しい順に並べる
export const sortedNews = news.sort((a, b) =>
  b.releasedAt.localeCompare(a.releasedAt),
)

