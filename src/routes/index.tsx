import { createFileRoute, Link } from '@tanstack/react-router'
import Reveal from '#/components/Reveal'
import SectionHeading from '#/components/SectionHeading'
import SongCard from '#/components/SongCard'
import SongLinks from '#/components/SongLinks'
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
        <div className="mt-8 flex flex-col gap-8">
          {/* ソングカード */}
          <div className="flex gap-5 rounded-lg bg-(--paper-sub) shadow-[0_8px_24px_rgba(0,0,0,0.08)] ring-1 ring-(--rule)">
            {/* 音楽画像 */}
            <img
              src="/assets/songs/ripuru-jacket.png"
              alt="ripuru jacket"
              className="w-full sm:w-[55%] aspect-video object-cover p-5 rounded-4xl"
            />
            {/* ソングカード右部分 */}
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-5 p-6">
              <h2 className="display text-3xl">リプル</h2>
              {/* 詳細カード */}
              <dl className="grid w-full grid-cols-[auto_1fr] gap-x-6 gap-y-3 rounded-md bg-(--paper) p-5 text-sm ring-1 ring-(--rule)">
                <dt className="kicker self-center">Singer</dt>
                <dd className="m-0">宮舞モカ</dd>
                <dt className="kicker self-center">Release</dt>
                <dd className="m-0">2026.09.24</dd>
                <dt className="kicker self-center">Role</dt>
                <dd className="m-0">音楽・一部映像</dd>
              </dl>
              {/* youtube, niconico, piapuroのリンク */}
              <SongLinks  
                youtube="https://youtu.be/8Btgmcf-ktY"    
                piapro="https://piapro.jp/t/gIzw" 
                className="flex justify-end items-center"/>
            </div>
          </div>
          {/* ソングカード: sutari-yamai */}
          <div className="flex gap-5 rounded-lg bg-(--paper-sub) shadow-[0_8px_24px_rgba(0,0,0,0.08)] ring-1 ring-(--rule)">
            <img
              src="/assets/songs/sutari-yamai.png"
              alt="sutari-yamai jacket"
              className="w-full sm:w-[55%] aspect-video object-cover p-5 rounded-4xl"
            />
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-5 p-6">
              <h2 className="display text-3xl">廃りの病</h2>
              <dl className="grid w-full grid-cols-[auto_1fr] gap-x-6 gap-y-3 rounded-md bg-(--paper) p-5 text-sm ring-1 ring-(--rule)">
                <dt className="kicker self-center">Singer</dt>
                <dd className="m-0">宮舞モカ</dd>
                <dt className="kicker self-center">Release</dt>
                <dd className="m-0">2026.09.18</dd>
                <dt className="kicker self-center">Role</dt>
                <dd className="m-0">音楽・映像</dd>
              </dl>
              <SongLinks
                youtube="https://youtu.be/IEN00uTCRBg"
                niconico="https://www.nicovideo.jp/watch/sm46814719"
                piapro="https://piapro.jp/t/ecXC"
                className="flex justify-end items-center"
              />
            </div>
          </div>
          {/* ソングカード: tokeru */}
          <div className="flex gap-5 rounded-lg bg-(--paper-sub) shadow-[0_8px_24px_rgba(0,0,0,0.08)] ring-1 ring-(--rule)">
            <img
              src="/assets/songs/tokeru.jpg"
              alt="tokeru jacket"
              className="w-full sm:w-[55%] aspect-video object-cover p-5 rounded-4xl"
            />
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-5 p-6">
              <h2 className="display text-3xl">とける</h2>
              <dl className="grid w-full grid-cols-[auto_1fr] gap-x-6 gap-y-3 rounded-md bg-(--paper) p-5 text-sm ring-1 ring-(--rule)">
                <dt className="kicker self-center">Singer</dt>
                <dd className="m-0">初音ミク</dd>
                <dt className="kicker self-center">Release</dt>
                <dd className="m-0">2026.08.20</dd>
                <dt className="kicker self-center">Role</dt>
                <dd className="m-0">音楽・映像</dd>
              </dl>
              <SongLinks
                youtube="https://www.youtube.com/watch?v=9NVz1e3YT2w"
                niconico="https://www.nicovideo.jp/watch/sm46694343"
                piapro="https://piapro.jp/t/yWuV"
                className="flex justify-end items-center"
              />
            </div>
          </div>
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
