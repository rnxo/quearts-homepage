import type { Song } from '#/models/songs'
import SongLinks from './SongLinks'

type SongCardProps = {
  song: Song
}


export default function SongCard( { song} : SongCardProps ) {  
  return (
    <div className="flex gap-5 rounded-lg bg-(--paper-sub) shadow-[0_8px_24px_rgba(0,0,0,0.08)] ring-1 ring-(--rule)">
      {/* 音楽画像 */}
      <img
        src={`/assets/songs/${song.slug}.png`}
        alt={song.slug}
        className="w-full sm:w-[55%] aspect-video object-cover p-5 rounded-4xl"
      />
      {/* ソングカード右部分 */}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-5 p-6">
        <h2 className="display text-3xl">{song.title}</h2>
        {/* 詳細カード */}
        <dl className="grid w-full grid-cols-[auto_1fr] gap-x-6 gap-y-3 rounded-md bg-(--paper) p-5 text-sm ring-1 ring-(--rule)">
          <dt className="kicker self-center">Singer</dt>
          <dd className="m-0">{song.singer}</dd>
          <dt className="kicker self-center">Release</dt>
          <dd className="m-0">{song.releasedAt}</dd>
          <dt className="kicker self-center">Role</dt>
          <dd className="m-0">{song.role}</dd>
        </dl>
        {/* youtube, niconico, piapuroのリンク */}
        <SongLinks
          youtube={song.links?.youtube}
          niconico={song.links?.niconico}
          piapro={song.links?.piapro}
          className="flex justify-end items-center"
        />
      </div>
    </div>
  )
}
