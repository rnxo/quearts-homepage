function normalizePath(pathname: string): string {
  const withoutHtml = pathname.replace(/\.html$/, '')
  const withoutSlash = withoutHtml.replace(/\/+$/, '')
  return withoutSlash === '' ? '/' : withoutSlash
}

/**
 * Whether `href` should be highlighted in the nav for the current `pathname`.
 * `/` only matches itself; other links also match their sub-paths.
 */
export function isActivePath(pathname: string, href: string): boolean {
  const current = normalizePath(pathname)
  const target = normalizePath(href)

  if (target === '/') return current === '/'
  return current === target || current.startsWith(`${target}/`)
}
