import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '#/lib/utils'

type HorizontalScrollContainerProps = {
  children: ReactNode
  className?: string
  /** aria-label for the scrollable region. */
  label?: string
}

/**
 * Lays children out in a horizontally scrollable, snap-aligned track.
 * - Vertical mouse-wheel input is converted to horizontal scrolling.
 * - Prev/Next buttons scroll one item at a time (hidden when at the edge).
 * - Item sizing and the "rise into view" animation live in styles.css
 *   under `.hscroll-track` (CSS scroll-driven animations, with graceful fallback).
 */
export default function HorizontalScrollContainer({
  children,
  className,
  label = 'Horizontal list',
}: HorizontalScrollContainerProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const updateEdges = () => {
      const max = track.scrollWidth - track.clientWidth
      setAtStart(track.scrollLeft <= 1)
      setAtEnd(track.scrollLeft >= max - 1)
    }

    const onWheel = (e: WheelEvent) => {
      // Trackpads already produce deltaX; only translate pure vertical wheels.
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      const max = track.scrollWidth - track.clientWidth
      if (max <= 0) return
      const goingForward = e.deltaY > 0
      const canScroll = goingForward
        ? track.scrollLeft < max - 1
        : track.scrollLeft > 1
      // Let the page keep scrolling vertically once the track hits its edge.
      if (!canScroll) return
      e.preventDefault()
      track.scrollBy({ left: e.deltaY, behavior: 'auto' })
    }

    updateEdges()
    track.addEventListener('scroll', updateEdges, { passive: true })
    track.addEventListener('wheel', onWheel, { passive: false })
    const ro = new ResizeObserver(updateEdges)
    ro.observe(track)

    return () => {
      track.removeEventListener('scroll', updateEdges)
      track.removeEventListener('wheel', onWheel)
      ro.disconnect()
    }
  }, [])

  const scrollByItem = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const first = track.querySelector<HTMLElement>('.hscroll-track-item')
    const step = first?.offsetWidth ?? track.clientWidth * 0.8
    track.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  return (
    <section
      aria-label={label}
      className={cn('hscroll relative', className)}
    >
      <div ref={trackRef} className="hscroll-track" tabIndex={0}>
        {children}
      </div>

      <button
        type="button"
        aria-label="前へ"
        onClick={() => scrollByItem(-1)}
        className={cn('hscroll-nav left-2 sm:left-4', atStart && 'is-hidden')}
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="次へ"
        onClick={() => scrollByItem(1)}
        className={cn('hscroll-nav right-2 sm:right-4', atEnd && 'is-hidden')}
      >
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>
    </section>
  )
}
