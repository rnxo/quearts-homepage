import { createFileRoute, Link } from '@tanstack/react-router'
import Reveal from '#/components/Reveal'
import SectionHeading from '#/components/SectionHeading'
import SongCard from '#/components/SongCard'
import { site } from '#/data/site'
import { getSongsSortedByDate } from '#/data/songs'
import { getNewsSortedByDate } from '#/data/news'
import { profile } from '#/data/profile'
import { formatDate } from '#/lib/format'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const latestSongs = getSongsSortedByDate().slice(0, 3)
  const latestNews = getNewsSortedByDate().slice(0, 3)

  return (
    <main className="page-wrap px-4 pb-24 sm:px-6">
      <section className="flex min-h-[64vh] flex-col justify-center py-16 sm:py-24">
        <p className="kicker mb-6">{site.role}</p>
        <h1 className="display text-[clamp(2.5rem,9vw,6rem)]">{site.name}</h1>
        <p className="mt-6 max-w-lg text-base leading-8 text-[var(--ink-soft)]">
          {site.tagline}
        </p>
      </section>

      <Reveal>
        <SectionHeading
          kicker="Discography"
          title="Latest Releases"
          action={
            <Link to="/discography" className="nav-link text-sm">
              View all →
            </Link>
          }
        />
      </Reveal>
      <Reveal>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {latestSongs.map((song) => (
            <SongCard key={song.slug} song={song} />
          ))}
        </div>
      </Reveal>

      <div className="mt-20">
        <Reveal>
          <SectionHeading
            kicker="News"
            title="Recent Updates"
            action={
              <Link to="/news" className="nav-link text-sm">
                View all →
              </Link>
            }
          />
        </Reveal>
        <Reveal>
          <ul className="m-0 list-none p-0">
            {latestNews.map((item) => (
              <li
                key={item.date + item.title}
                className="flex flex-col gap-1 border-b border-[var(--rule)] py-5 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <span className="kicker shrink-0">{formatDate(item.date)}</span>
                <span className="text-sm">{item.title}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="mt-20">
        <Reveal>
          <SectionHeading kicker="Profile" title="About Quearts" />
        </Reveal>
        <Reveal>
          <p className="mt-8 max-w-2xl text-sm leading-8 text-[var(--ink-soft)]">
            {profile.bio[0]}
          </p>
          <Link to="/profile" className="nav-link mt-4 inline-block text-sm">
            Read more →
          </Link>
        </Reveal>
      </div>
    </main>
  )
}
