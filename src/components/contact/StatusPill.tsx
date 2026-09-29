import { cn } from '#/lib/utils'

type StatusPillProps = {
  label: string
  isOpen: boolean
}

export default function StatusPill({ label, isOpen }: StatusPillProps) {
  return (
    <p className="m-0 inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 text-xs font-medium ring-1 ring-(--rule)">
      <span
        aria-hidden="true"
        className={cn(
          'size-2 shrink-0 rounded-full',
          isOpen ? 'bg-(--accent-open)' : 'bg-(--ink-soft)',
        )}
      />
      {label}
    </p>
  )
}
