import { Link } from '@tanstack/react-router'
import Artwork from '#/components/Artwork'
import { formatYear } from '#/lib/format'
import type { Song } from '#/data/songs'

export default function SongCard({ song }: { song: Song }) {
  return (
    <Link
      to="/discography/$slug"
      params={{ slug: song.slug }}
      className="group block no-underline"
    >
      <Artwork title={song.title} hue={song.hue} src={song.artworkUrl} />
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <span className="text-sm font-semibold text-[var(--ink)] underline decoration-transparent underline-offset-4 transition group-hover:decoration-[var(--ink)]">
          {song.title}
        </span>
        <span className="kicker">{formatYear(song.releasedAt)}</span>
      </div>
    </Link>
  )
}
