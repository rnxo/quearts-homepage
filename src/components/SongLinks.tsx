type SongLinksProps = {
  youtube?: string
  niconico?: string
  piapro?: string
  className?: string
}

const iconClass = 'h-6 w-6'

function YouTubeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={iconClass}
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function NiconicoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={iconClass}
      aria-hidden="true"
    >
      <path d="M7 3l5 5 5-5" />
      <rect x="2" y="8" width="20" height="12" rx="2" />
      <path d="M7 20l1.5 2M17 20l-1.5 2" />
      <circle cx="9" cy="14" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="14" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function PiaproIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={iconClass}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
    </svg>
  )
}

const linkClass =
  'nav-link inline-flex items-center justify-center rounded-md p-2 ring-1 ring-(--rule) transition-colors hover:bg-(--paper)'

export default function SongLinks({
  youtube = '',
  niconico = '',
  piapro = '',
  className = '',
}: SongLinksProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {youtube && (
        <a
          href={youtube}
          target="_blank"
          rel="noreferrer"
          aria-label="YouTube"
          title="YouTube"
          className={linkClass}
        >
          <YouTubeIcon />
        </a>
      )}
      {niconico && (
        <a
          href={niconico}
          target="_blank"
          rel="noreferrer"
          aria-label="niconico"
          title="niconico"
          className={linkClass}
        >
          <NiconicoIcon />
        </a>
      )}
      {piapro && (
        <a
          href={piapro}
          target="_blank"
          rel="noreferrer"
          aria-label="piapro"
          title="piapro(inst)"
          className={linkClass}
        >
          <PiaproIcon />
        </a>
      )}
    </div>
  )
}
