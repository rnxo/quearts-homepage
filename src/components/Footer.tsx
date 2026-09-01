import { site } from '#/data/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t border-[var(--rule)] px-4 py-10 sm:px-6">
      <div className="page-wrap flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="m-0 text-xs tracking-[0.08em] text-[var(--ink-soft)]">
          &copy; {year} {site.name}
        </p>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
          {site.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="nav-link text-xs"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
