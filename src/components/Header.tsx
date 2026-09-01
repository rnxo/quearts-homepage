import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'
import { site } from '#/data/site'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="sticky top-0 z-50 bg-[var(--paper)]/90 backdrop-blur-sm transition-[border-color]"
      style={{
        borderBottom: `1px solid ${scrolled ? 'var(--rule)' : 'transparent'}`,
      }}
    >
      <nav className="page-wrap flex flex-wrap items-center gap-x-6 gap-y-3 px-4 py-4 sm:px-6">
        <Link
          to="/"
          className="text-sm font-bold tracking-[0.32em] text-[var(--ink)] no-underline"
        >
          {site.name.toUpperCase()}
        </Link>

        <div className="order-3 flex w-full flex-wrap items-center gap-x-5 gap-y-1 text-sm font-medium sm:order-none sm:w-auto">
          <Link
            to="/news"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            News
          </Link>
          <Link
            to="/discography"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            Discography
          </Link>
          <Link
            to="/profile"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            Profile
          </Link>
        </div>

        <div className="ml-auto flex items-center">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
