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
        'flex flex-col gap-5 rounded-lg bg-(--paper-sub) shadow-[0_8px_24px_rgba(0,0,0,0.08)] ring-1 ring-(--rule)',
        className,
      )}
    >
      {/* 音楽画像 */}
      <img
        src={`/assets/songs/${song.slug}.png`}
        alt={song.slug}
        className="w-full h-[80%] aspect-video object-cover p-5 rounded-4xl"
      />
      {/* ソングカード右部分 */}
      <div className="flex w-full justify-between">
        <h2 className="display my-2 text-center text-3xl underline">
          {song.title}
        </h2>
        <div className="flex w-[40%] items-center justify-center gap-5 p-2 mx-auto mb-4 border border-(--ink-soft) rounded-4xl shadow-2xl">
          <SongLinks
            youtube={song.links?.youtube}
            niconico={song.links?.niconico}
            piapro={song.links?.piapro}
            className="flex justify-center items-center"
          />
        </div>
      </div>
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
