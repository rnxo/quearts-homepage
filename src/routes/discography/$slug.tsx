import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import Artwork from '#/components/Artwork'
import Reveal from '#/components/Reveal'
import { getSongBySlug } from '#/data/songs'
import { formatDate } from '#/lib/format'

export const Route = createFileRoute('/discography/$slug')({
  loader: ({ params }) => {
    const song = getSongBySlug(params.slug)
    if (!song) throw notFound()
    return { song }
  },
  component: SongDetail,
  notFoundComponent: SongNotFound,
})

function SongDetail() {
  const { song } = Route.useLoaderData()

  return (
    <main className="page-wrap px-4 py-16 sm:px-6 sm:py-20">
      <Reveal>
        <Link to="/discography" className="nav-link text-sm">
          ← Discography
        </Link>
      </Reveal>

      <Reveal>
        <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-16">
          {/* <Artwork title={song.title} hue={song.hue} src={song.artworkUrl} /> */}
          {song.youtubeId && (
            <div className="mt-8 aspect-video w-full overflow-hidden border border-[var(--rule)]">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${song.youtubeId}`}
                title={song.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
          <div>
            <p className="kicker mb-3">{formatDate(song.releasedAt)}</p>
            <h1 className="display text-3xl sm:text-4xl">{song.title}</h1>
            {song.titleReading && (
              <p className="mt-2 text-sm text-[var(--ink-soft)]">
                {song.titleReading}
              </p>
            )}

            <p className="mt-6 text-sm leading-8 text-[var(--ink-soft)]">
              {song.description}
            </p>

            <hr className="rule-line mt-8" />
            <dl className="mt-6 space-y-3">
              {song.credits.map((credit) => (
                <div key={credit.role} className="flex gap-6 text-sm">
                  <dt className="w-28 shrink-0 text-[var(--ink-soft)]">
                    {credit.role}
                  </dt>
                  <dd className="m-0">{credit.name}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Reveal>
    </main>
  )
}

function SongNotFound() {
  return (
    <main className="page-wrap px-4 py-24 text-center sm:px-6">
      <p className="kicker mb-4">404</p>
      <h1 className="display text-2xl sm:text-3xl">
        この楽曲は見つかりませんでした
      </h1>
      <Link to="/discography" className="nav-link mt-6 inline-block text-sm">
        ← Discography に戻る
      </Link>
    </main>
  )
}
