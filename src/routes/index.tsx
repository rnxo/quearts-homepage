import { createFileRoute, Link } from '@tanstack/react-router'
import Reveal from '#/components/Reveal'
import SectionHeading from '#/components/SectionHeading'
import SongCard from '#/components/SongCard'
import SongLinks from '#/components/SongLinks'
import { site } from '#/data/site'
import { getNewsSortedByDate } from '#/data/news'
import { profile } from '#/data/profile'
import { formatDate } from '#/lib/format'
import { songs } from '#/models/songs'
import { news } from '#/models/news'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const latestNews = getNewsSortedByDate().slice(0, 3)

  return (
    <main className="page-wrap px-4 pb-24 sm:px-6">
      {/* 自己紹介カード */}
      <section className="flex min-h-[24vh] flex-col justify-center py-5 sm:py-24">
        <div className="flex justify-start items-center gap-10">
          <img
            src="/assets/quearts-icon.png"
            alt="quearts-icon"
            height={250}
            width={250}
          />
          <div className="flex flex-col">
            <span className="mt-6 max-w-lg text-base leading-8 text-[var(--ink-soft)]">
              VOCALOID PRODUCER
            </span>
            <h1 className="display text-[clamp(2.5rem,9vw,6rem)]">
              {site.name}
            </h1>
            <span className="mt-6 max-w-lg text-base leading-8 text-[var(--ink-soft)]">
              音楽が好き。
            </span>
          </div>
        </div>
      </section>
      {/* ニュースリスト */}
      <div className="my-20">
        <Reveal>
          <SectionHeading
            kicker="News"
            title="Recent Updates"
            action={
              <Link to="/news" className="nav-link text-sm">
                一覧を見る →
              </Link>
            }
          />
        </Reveal>
        <Reveal>
          <ul className="m-0 list-none p-0">
            {news.map((newsItem) => (
              <li
                key={newsItem.title}
                className="flex flex-col gap-1 border-b border-[var(--rule)] py-5 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <span className="kicker shrink-0">{newsItem.releasedAt}</span>
                <span className="text-sm">{newsItem.title}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
      <Reveal>
        <SectionHeading
          kicker="Discography"
          title="Latest Releases"
          action={
            <Link to="/discography" className="nav-link text-sm">
              一覧を見る →
            </Link>
          }
        />
      </Reveal>
      <Reveal>
        {/* ソングカード */}
        <div className="mt-8 flex flex-col gap-8">
          {songs.map((song) => (
            <SongCard song={song} />
          ))}
        </div>
      </Reveal>
      {/* 依頼メールセクション */}
      <section className="flex flex-col justify-center items-center my-20">
        <h1>依頼メール</h1>
      </section>
    </main>
  )
}
