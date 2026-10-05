import type { PriceRow } from '#/models/contact'

type PriceTableProps = {
  prices: PriceRow[]
  note: string
}

export default function PriceTable({ prices, note }: PriceTableProps) {
  return (
    <div>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-(--rule)">
            <th
              scope="col"
              className="kicker pb-3 pr-4 text-left font-semibold"
            >
              Service
            </th>
            <th scope="col" className="kicker pb-3 text-left font-semibold">
              Amount
            </th>
            <th scope="col" className="kicker pb-3 text-left font-semibold">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {prices.map((row) => (
            <tr
              key={row.serviceId}
              className="border-b border-(--rule)/60 last:border-b-0"
            >
              <th scope="row" className="py-4 pr-4 text-left font-bold">
                {row.label}
              </th>
              <td className="py-4 text-left text-sm text-(--ink-soft) whitespace-nowrap tabular-nums">
                {row.description}
              </td>
              <td className="py-4 text-left text-base font-bold whitespace-nowrap tabular-nums">
                ￥{row.amount}〜
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-6 mb-0 text-sm leading-7 text-(--ink-soft)">{note}</p>
    </div>
  )
}
