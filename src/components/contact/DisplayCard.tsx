import { useId } from 'react'
import type { ReactNode } from 'react'
import { cn } from '#/lib/utils'

type DisplayCardProps = {
  id: string
  index?: string
  title?: string
  kicker?: string
  summary?: ReactNode
  children?: ReactNode
}

export function DisplayCard({
  id,
  index,
  title,
  kicker,
  summary,
  children,
}: DisplayCardProps) {
  const reactId = useId()
  const buttonId = `${id}-trigger-${reactId}`
  const panelId = `${id}-panel-${reactId}`

  // Opens the item when defaultOpen turns true after mount (e.g. a URL hash
  // that only becomes known after hydration).

  return (
    <div
      id={id}
      className={cn(
        'scroll-mt-24 border-t border-(--rule) transition-colors duration-300 last:border-b',
        // An open item floats as a card, so the rule after it is replaced by space.
        '[[data-state=open]+&]:border-t-transparent',
        'my-2 rounded-[10px] border-transparent bg-(--paper-sub) ring-1 ring-(--rule) last:border-b-transparent',
      )}
    >
      <h3 className="m-0">
        <div
          id={id}
          aria-expanded={open}
          aria-controls={panelId}
          className="grid w-full cursor-pointer grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 px-4 py-6 text-left sm:grid-cols-[2rem_minmax(0,1fr)_auto_auto] sm:px-6"
        >
          <span className="kicker col-start-1 row-start-1 tracking-[0.14em]">
            {index}
          </span>
          <span className="col-start-2 row-start-1 flex min-w-0 items-baseline gap-3">
            <span className="text-xl font-bold tracking-[0.04em] text-(--ink) sm:text-2xl">
              {title}
            </span>
            <span className="kicker hidden sm:inline">{kicker}</span>
          </span>
          <span className="col-start-2 row-start-2 min-w-0 truncate text-sm text-(--ink-soft) sm:col-start-3 sm:row-start-1 sm:max-w-80">
            {summary}
          </span>
        </div>
      </h3>
      <div
        role="region"
        id={panelId}
        aria-labelledby={buttonId}
        data-accordion-panel
        inert={!open}
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-out',
          'grid-rows-[1fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="mx-4 border-t border-(--rule) pt-6 pb-8 sm:mr-6 sm:ml-18">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
