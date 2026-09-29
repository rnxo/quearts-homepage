import {
  createFileRoute,
  useHydrated,
  useLocation,
} from '@tanstack/react-router'
import Reveal from '#/components/Reveal'
import { Accordion, AccordionItem } from '#/components/contact/Accordion'
import CategoryPanel from '#/components/contact/CategoryPanel'
import PriceTable from '#/components/contact/PriceTable'
import RequestPanel from '#/components/contact/RequestPanel'
import ServicesPanel from '#/components/contact/ServicesPanel'
import StatusPanel from '#/components/contact/StatusPanel'
import StatusPill from '#/components/contact/StatusPill'
import {
  buildMonthStrip,
  getMinPrice,
  summarizeAvailability,
} from '#/lib/contact'
import { formatYen } from '#/lib/format'
import {
  availability,
  categories,
  priceNote,
  prices,
  requestLinks,
  services,
} from '#/models/contact'
import { DisplayCard } from '#/components/contact/DisplayCard'

export const Route = createFileRoute('/contact/')({
  head: () => ({
    meta: [
      { title: 'Contact — Quearts' },
      {
        name: 'description',
        content:
          '楽曲制作（作曲・編曲・作詞・調声）のご依頼について。受付状況・料金表・依頼フォームをご案内しています。',
      },
    ],
  }),
  // Resolved once so SSR and hydration render the same month strip.
  loader: () => ({ currentYm: new Date().toISOString().slice(0, 7) }),
  component: ContactPage,
})

function ContactPage() {
  const { currentYm } = Route.useLoaderData()
  const hash = useLocation({ select: (location) => location.hash })
  // The hash never reaches the server, so it is only applied after hydration.
  const openId = useHydrated() ? hash : ''

  const status = summarizeAvailability(availability)
  const minPrice = getMinPrice(prices)
  const priceSummary = Number.isNaN(minPrice) ? '—' : `${formatYen(minPrice)}〜`

  return (
    <main className="page-wrap px-4 py-16 sm:px-6 sm:py-20">
      <Reveal>
        <p className="kicker mb-4">Contact</p>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="display text-3xl sm:text-5xl">Request</h1>
            <p className="mt-6 mb-0 max-w-2xl text-sm leading-7 text-(--ink-soft)">
              楽曲制作のご依頼を受け付けています。気になる項目をタップすると詳細が開きます。
            </p>
          </div>
        </div>
        <hr className="rule-line mt-8" />
      </Reveal>

      <Reveal className="mt-12">
        <DisplayCard
          id="status"
          index="01"
          title="受付状況"
          kicker="STATUS"
          summary={
            <span
              className={
                status.isOpen ? 'text-(--accent-open)' : 'text-(--ink-soft)'
              }
            >
              {status.isOpen ? `● ${status.short}` : status.short}
            </span>
          }
        >
          {status.isOpen ? (
            <StatusPanel
              months={buildMonthStrip(availability.bookedUntil, currentYm)}
              note={availability.note}
            />
          ) : (
            <div className="flex flex-col justify-center items-center">
              <span className="text-center text-2xl font-bold">
                ----- 現在受付停止中 -----
              </span>
            </div>
          )}
        </DisplayCard>
        <Accordion>
          <AccordionItem
            id="services"
            index="02"
            title="依頼できること"
            kicker="Services"
            summary="作曲・編曲・作詞・調声・MIX・一括"
            defaultOpen={openId === 'services'}
          >
            <ServicesPanel services={services} />
          </AccordionItem>
          <AccordionItem
            id="category"
            index="03"
            title="企業依頼・個人依頼"
            kicker="Category"
            summary="企業・個人どちらも可"
            defaultOpen={openId === 'category'}
          >
            <CategoryPanel categories={categories} />
          </AccordionItem>
          <AccordionItem
            id="price"
            index="04"
            title="料金表"
            kicker="Price"
            summary={priceSummary}
            defaultOpen={openId === 'price'}
          >
            <PriceTable prices={prices} note={priceNote} />
          </AccordionItem>
          {/* 依頼フォームAccordionItem版 */}
          {/* <AccordionItem
            id="request"
            index="05"
            title="依頼フォーム"
            kicker="Request"
            summary="Google Form / FEAT"
            defaultOpen={openId === 'request'}
          >
            <RequestPanel links={requestLinks} />
          </AccordionItem> */}
          <DisplayCard
            id="request"
            index="05"
            title="依頼フォーム"
            kicker="Request"
            summary="Google Form / FEAT"
          >
            <RequestPanel links={requestLinks} />
          </DisplayCard>
        </Accordion>
      </Reveal>
    </main>
  )
}
