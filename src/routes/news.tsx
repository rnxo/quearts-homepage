import { createFileRoute } from '@tanstack/react-router'
import Reveal from '#/components/Reveal'
import { getNewsSortedByDate } from '#/data/news'
import { formatDate, formatYear } from '#/lib/format'

export const Route = createFileRoute('/news')({ component: News })

function News() {
  const items = getNewsSortedByDate()
  const years = [...new Set(items.map((item) => formatYear(item.date)))]

  return (
    <main className="page-wrap px-4 py-16 sm:px-6 sm:py-20">
      <Reveal>
        <p className="kicker mb-4">News</p>
        <h1 className="display text-3xl sm:text-5xl">Announcements</h1>
        <hr className="rule-line mt-8" />
      </Reveal>

      {years.map((year) => (
        <div key={year} className="mt-14">
          <Reveal>
            <p className="kicker mb-4">{year}</p>
          </Reveal>
          <Reveal>
            <ul className="m-0 list-none p-0">
              {items
                .filter((item) => formatYear(item.date) === year)
                .map((item) => (
                  <li
                    key={item.date + item.title}
                    className="border-b border-[var(--rule)] py-6"
                  >
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                      <span className="kicker shrink-0">
                        {formatDate(item.date)}
                      </span>
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>
                    {item.body && (
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--ink-soft)] sm:ml-[calc(11ch+1.5rem)]">
                        {item.body}
                      </p>
                    )}
                  </li>
                ))}
            </ul>
          </Reveal>
        </div>
      ))}
    </main>
  )
}
