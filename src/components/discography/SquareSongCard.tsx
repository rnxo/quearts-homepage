import type { Song } from '#/models/songs'
import SongLinks from '#/components/SongLinks'
import { cn } from '#/lib/utils'

type SongCardProps = {
  song: Song
  className?: string
}

export default function SquareSongCard({ song, className }: SongCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-lg bg-(--paper-sub) shadow-[0_8px_24px_rgba(0,0,0,0.08)] ring-1 ring-(--rule)',
        className,
      )}
    >
      {/* 音楽画像: 左右と上に 16px の余白 */}
      <div className="px-4 pt-4">
        <img
          src={`/assets/songs/${song.slug}.png`}
          alt={song.title}
          className="aspect-video w-full rounded-md object-cover"
        />
      </div>
      {/* タイトル: 画像の左端に揃える */}
      <h2 className="display m-0 px-4 pt-4 text-2xl underline underline-offset-8 sm:text-3xl">
        {song.title}
      </h2>
      {/* リンク: SongLinks 自体が p-4 を持つので左右が画像と揃う。mt-auto で下端に寄せる */}
      <SongLinks
        className="mt-auto"
        youtube={song.links?.youtube}
        niconico={song.links?.niconico}
        piapro={song.links?.piapro}
      />
    </div>
  )
}

// <dl className="grid w-full grid-cols-[auto_1fr] gap-x-6 gap-y-3 rounded-md bg-(--paper) p-5 text-sm ring-1 ring-(--rule)">
//   <dt className="kicker self-center">Singer</dt>
//   <dd className="m-0">{song.singer}</dd>
//   <dt className="kicker self-center">Release</dt>
//   <dd className="m-0">{song.releasedAt}</dd>
//   <dt className="kicker self-center">Role</dt>
//   <dd className="m-0">{song.role}</dd>
// </dl>
