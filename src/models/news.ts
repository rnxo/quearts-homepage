import type { ArtWorkUrl } from "./songs"
import { linksOf } from "#/lib/linksOf"

export type News = {
  category: 'music' | 'info'
  title: string
  releasedAt: string
  links?: ArtWorkUrl
}

export const news: News[] = [
  {
    category: 'music',
    title: '「リプル」を公開しました',
    releasedAt: '2026-09-24',
    links: linksOf('ripuru')
  },
  {
    category: 'music',
    title: '「廃りの病」を公開しました',
    releasedAt: '2026-09-18',
    links: linksOf('sutari-yamai')
  },
  {
    category: 'music',
    title: '「とける」を公開しました',
    releasedAt: '2026-08-20',
    links: linksOf('tokeru')
  },
]
