import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { cn } from '#/lib/utils'

type RevealProps = {
  children: ReactNode
  className?: string
  delayMs?: number
}

/** Fades children in from below once they scroll into view. */
export default function Reveal({
  children,
  className,
  delayMs = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn('reveal', visible && 'is-visible', className)}
      style={{ transitionDelay: visible ? `${delayMs}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}
