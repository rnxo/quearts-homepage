import type { ReactNode } from 'react'
import { cn } from '#/lib/utils'

type AccordionProps = {
  children: ReactNode
  className?: string
}

/** Vertical list of AccordionItems separated by rules. */
export function Accordion({ children, className }: AccordionProps) {
  return <div className={cn('flex flex-col', className)}>{children}</div>
}
