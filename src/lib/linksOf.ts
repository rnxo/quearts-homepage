import type { ArtWorkUrl } from '#/models/songs'
import { songs } from '#/models/songs'

export const linksOf = (slug: string): ArtWorkUrl | undefined => {
  const song = songs.find((s) => s.slug === slug)
  if (!song) throw new Error(`${slug} NOT FOUND: there is no song such a ${slug}`)
  return song.links
}
