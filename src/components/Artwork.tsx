import { cn } from '#/lib/utils'

type ArtworkProps = {
  title: string
  hue: number
  src?: string
  className?: string
}

/**
 * Song artwork. Renders the real image when `src` is supplied; otherwise
 * generates a placeholder square from `hue` + the song title so the layout
 * never depends on assets being ready.
 */
export default function Artwork({ title, hue, src, className }: ArtworkProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={title}
        className={cn(
          'aspect-square w-full border border-[var(--rule)] object-cover',
          className,
        )}
      />
    )
  }

  const initial = title.trim().charAt(0) || '?'

  return (
    <div
      role="img"
      aria-label={title}
      className={cn(
        'flex aspect-square w-full items-center justify-center overflow-hidden border border-[var(--rule)]',
        className,
      )}
      style={{
        background: `linear-gradient(155deg, hsl(${hue} 28% 92%), hsl(${hue} 20% 82%))`,
      }}
    >
      <span
        className="font-serif text-[3.5rem] leading-none font-semibold"
        style={{ color: `hsl(${hue} 30% 28%)` }}
      >
        {initial}
      </span>
    </div>
  )
}
