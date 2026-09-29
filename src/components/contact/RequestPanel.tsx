import { ArrowUpRight } from 'lucide-react'
import { cn } from '#/lib/utils'
import type { RequestLink } from '#/models/contact'

const OPEN_LABELS: Record<RequestLink['id'], string> = {
  'google-form': 'フォームを開く',
  feat: 'FEATを開く',
}

type RequestPanelProps = {
  links: RequestLink[]
}

export default function RequestPanel({ links }: RequestPanelProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {links.map((link) => (
        <RequestCard key={link.id} link={link} />
      ))}
    </div>
  )
}

function RequestCard({ link }: { link: RequestLink }) {
  const ready = link.href !== '#'

  return (
    <section
      className={cn(
        'rounded-lg p-6',
        'bg-(--paper) ring-1 ring-(--rule)',
      )}
    >
      <p
        className={cn(
          'kicker m-0',
          'text-(--paper) opacity-70',
        )}
      >
        {link.label}
      </p>
      <h4 className="mt-3 mb-0 text-xl font-bold tracking-[0.04em]">
        {link.title}
      </h4>
      <p
        className={cn(
          'mt-2 mb-0 text-sm leading-7',
          'text-(--ink-soft)',
        )}
      >
        {link.description}
      </p>
      <a
        href={ready ? link.href : undefined}
        target={ready ? '_blank' : undefined}
        rel={ready ? 'noreferrer' : undefined}
        aria-disabled={ready ? undefined : 'true'}
        className={cn(
          'mt-auto inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold no-underline transition-opacity',
          'bg-(--ink) text-(--paper)',
          ready ? 'hover:opacity-80' : 'cursor-not-allowed opacity-50',
        )}
      >
        { OPEN_LABELS[link.id] }
        <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    </section>
  )
}
