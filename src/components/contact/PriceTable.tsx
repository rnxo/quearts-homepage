import { formatYen } from '#/lib/format'
import type { PriceRow } from '#/models/contact'

type PriceTableProps = {
  prices: PriceRow[]
  note: string
}

export default function PriceTable({ prices, note }: PriceTableProps) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-(--rule)">
              <th scope="col" className="kicker pb-3 text-left font-semibold">
                Service
              </th>
              <th scope="col" className="kicker pb-3 text-right font-semibold">
                商業 / Commercial
              </th>
              <th scope="col" className="kicker pb-3 text-right font-semibold">
                同人 / Doujin
              </th>
            </tr>
          </thead>
          <tbody>
            {prices.map((row) => (
              <tr
                key={row.serviceId}
                className="border-b border-(--rule)/60 last:border-b-0"
              >
                <th scope="row" className="py-4 text-left font-bold">
                  {row.label}
                </th>
                <td className="py-4 text-right text-base font-bold tabular-nums">
                  {formatYen(row.commercial)}〜
                </td>
                <td className="py-4 text-right text-base font-bold tabular-nums">
                  {formatYen(row.doujin)}〜
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6 mb-0 text-sm leading-7 text-(--ink-soft)">{note}</p>
    </div>
  )
}
