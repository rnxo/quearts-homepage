import type { Availability, PriceRow } from '#/models/contact'

export type MonthCell = {
  ym: string // YYYY-MM
  year: string
  monthLabel: string // '10月'
  booked: boolean
}

const YM_PATTERN = /^(\d{4})-(0[1-9]|1[0-2])$/

function parseYm(ym: string): { year: number; month: number } | null {
  const match = YM_PATTERN.exec(ym)
  if (!match) return null
  return { year: Number(match[1]), month: Number(match[2]) }
}

/**
 * Lists `count` months starting at `fromYm`, marking each month up to and
 * including `bookedUntil` as booked. An invalid `bookedUntil` marks all months
 * as available instead of throwing.
 */
export function buildMonthStrip(
  bookedUntil: string,
  fromYm: string,
  count = 6,
): MonthCell[] {
  const from = parseYm(fromYm)
  if (!from) return []

  const bookedValid = parseYm(bookedUntil) !== null

  return Array.from({ length: count }, (_, offset) => {
    const index = from.month - 1 + offset
    const year = from.year + Math.floor(index / 12)
    const month = (index % 12) + 1
    const ym = `${year}-${String(month).padStart(2, '0')}`

    return {
      ym,
      year: String(year),
      monthLabel: `${month}月`,
      // YYYY-MM strings compare correctly in lexical order.
      booked: bookedValid && ym <= bookedUntil,
    }
  })
}

/** Lowest price across all rows, or `NaN` when empty. */
export function getMinPrice(prices: PriceRow[]): number {
  if (prices.length === 0) return NaN
  return Math.min(...prices.map((row) => row.amount))
}

export function summarizeAvailability(a: Availability): {
  label: string
  short: string
  isOpen: boolean
} {
  if (a.status === 'closed') {
    return { label: '現在受付停止中', short: '現在受付停止中', isOpen: false }
  }

  const booked = parseYm(a.bookedUntil)
  if (!booked) {
    return { label: '受付中', short: '受付中', isOpen: true }
  }

  return {
    label: `受付中 — ${booked.year}年${booked.month}月まで予約あり`,
    short: `受付中 — ${booked.month}月まで予約あり`,
    isOpen: true,
  }
}
