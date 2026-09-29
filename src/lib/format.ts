/** Formats an ISO date string (YYYY-MM-DD) as `YYYY.MM.DD`. */
export function formatDate(isoDate: string): string {
  return isoDate.replaceAll('-', '.')
}

/** Extracts the year from an ISO date string (YYYY-MM-DD). */
export function formatYear(isoDate: string): string {
  return isoDate.slice(0, 4)
}

// `style: 'currency'` renders a full-width ￥ in ja-JP, so the half-width ¥ is prefixed manually.
const yenFormatter = new Intl.NumberFormat('ja-JP')

/** Formats an amount in yen as `¥50,000`. Negative numbers and `NaN` become `—`. */
export function formatYen(amount: number): string {
  if (Number.isNaN(amount) || amount < 0) return '—'
  return `¥${yenFormatter.format(amount)}`
}
