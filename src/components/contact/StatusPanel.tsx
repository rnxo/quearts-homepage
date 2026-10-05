import { useEffect, useState } from 'react'
import { buildMonthStrip, getCurrentYm } from '#/lib/contact.function'
import type { MonthCell } from '#/lib/contact.function'
import { cn } from '#/lib/utils'

type StatusPanelProps = {
  bookedUntil: string
  /** Month at build time. The first render uses it so hydration matches the static HTML. */
  initialYm: string
  note: string
}

export default function StatusPanel({
  bookedUntil,
  initialYm,
  note,
}: StatusPanelProps) {
  const [currentYm, setCurrentYm] = useState(initialYm)

  // The page is prerendered, so shift the strip to the viewer's current month.
  useEffect(() => {
    setCurrentYm(getCurrentYm())
  }, [])

  const months = buildMonthStrip(bookedUntil, currentYm)

  return (
    <div>
      <MonthStrip months={months} />
      <p className="mt-6 mb-0 text-sm leading-7 text-(--ink-soft)">{note}</p>
    </div>
  )
}

function MonthStrip({ months }: { months: MonthCell[] }) {
  return (
    <ol className="m-0 grid list-none grid-cols-3 gap-x-2 gap-y-6 p-0 sm:grid-cols-6">
      {months.map((month) => (
        <li key={month.ym}>
          <span className="kicker block tracking-[0.14em]">{month.year}</span>
          <span className="mt-1 block text-lg font-bold">
            {month.monthLabel}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              'mt-2 block h-1.5 rounded-full',
              month.booked ? 'bg-(--ink)' : 'ring-1 ring-(--accent-open)',
            )}
          />
          <span
            className={cn(
              'mt-2 block text-xs',
              month.booked ? 'text-(--ink-soft)' : 'text-(--accent-open)',
            )}
          >
            {month.booked ? '予約済み' : '受付可'}
          </span>
        </li>
      ))}
    </ol>
  )
}
