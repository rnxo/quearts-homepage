export type Availability = {
  status: 'open' | 'closed'
  bookedUntil: string // YYYY-MM
  note: string
}

// === 受付状況の編集はこちらからです ===
export const availability: Availability = {
  status: 'open', // 受付中 -> open、受付停止 -> closed
  bookedUntil: '2026-12',
  note: '※ 現在、2026年12月までご予約をいただいています。2027年1月以降の着手でよろしければ承ります。お急ぎの場合はご相談ください。',
}
