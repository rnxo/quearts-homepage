/** Formats an ISO date string (YYYY-MM-DD) as `YYYY.MM.DD`. */
export function formatDate(isoDate: string): string {
  return isoDate.replaceAll('-', '.')
}

/** Extracts the year from an ISO date string (YYYY-MM-DD). */
export function formatYear(isoDate: string): string {
  return isoDate.slice(0, 4)
}
