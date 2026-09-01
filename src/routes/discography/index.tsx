import { createFileRoute } from '@tanstack/react-router'
import Reveal from '#/components/Reveal'
import SongCard from '#/components/SongCard'
import { getSongsSortedByDate } from '#/data/songs'
import { formatYear } from '#/lib/format'

export const Route = createFileRoute('/discography/')({
  component: Discography,
})

function Discography() {
  const songs = getSongsSortedByDate()
  const years = [...new Set(songs.map((song) => formatYear(song.releasedAt)))]

  return (
    <main className="page-wrap px-4 py-16 sm:px-6 sm:py-20">
      <Reveal>
        <p className="kicker mb-4">Discography</p>
        <h1 className="display text-3xl sm:text-5xl">All Releases</h1>
        <hr className="rule-line mt-8" />
      </Reveal>

      {years.map((year) => (
        <div key={year} className="mt-14">
          <Reveal>
            <p className="kicker mb-6">{year}</p>
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {songs
                .filter((song) => formatYear(song.releasedAt) === year)
                .map((song) => (
                  <SongCard key={song.slug} song={song} />
                ))}
            </div>
          </Reveal>
        </div>
      ))}
    </main>
  )
}
