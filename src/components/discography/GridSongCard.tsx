import type { Song } from '#/models/songs'
import SongLinks from '#/components/SongLinks'
import { cn } from '#/lib/utils'

type GridSongCardProps = {
  song: Song
  /** Renders the card as the large "featured" tile of the asymmetric grid. */
  featured?: boolean
  className?: string
}

/**
 * Song card for the asymmetric discography grid (Figma 案C).
 * Artwork sits on a dark, rounded well; title and service links share one row.
 */
export default function GridSongCard({
  song,
  featured = false,
  className,
}: GridSongCardProps) {
  return (
    <article
      className={cn(
        'flex flex-col gap-4 rounded-md bg-(--paper-sub) p-4 ring-1 ring-(--rule)',
        className,
      )}
    >
      {/* アートワーク */}
      <div className="flex aspect-video w-full items-center justify-center overflow-hidden rounded-[3px] bg-(--paper)">
        <img
          src={`/assets/songs/${song.slug}.png`}
          alt={song.title}
          loading={featured ? 'eager' : 'lazy'}
          className="h-full w-full object-contain"
        />
      </div>

      {featured && <p className="kicker">Featured work</p>}

      {/* タイトル + サービスリンク */}
      <div
        className={cn(
          'flex min-h-9 items-center justify-between gap-4',
          featured && 'mt-auto',
        )}
      >
        <h2
          className={cn(
            'font-medium leading-tight text-(--ink)',
            featured ? 'text-2xl sm:text-[28px]' : 'text-lg sm:text-[19px]',
          )}
        >
          {song.title}
        </h2>
        <SongLinks
          youtube={song.links?.youtube}
          niconico={song.links?.niconico}
          piapro={song.links?.piapro}
          className="shrink-0 gap-1.5 [&_a]:p-1 [&_svg]:size-4.5"
        />
      </div>
    </article>
  )
}
