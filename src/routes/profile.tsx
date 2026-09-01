import { createFileRoute } from '@tanstack/react-router'
import Reveal from '#/components/Reveal'
import { site } from '#/data/site'
import { profile } from '#/data/profile'

export const Route = createFileRoute('/profile')({ component: Profile })

function Profile() {
  return (
    <main className="page-wrap px-4 py-16 sm:px-6 sm:py-20">
      <Reveal>
        <p className="kicker mb-4">Profile</p>
        <h1 className="display text-3xl sm:text-5xl">{site.name}</h1>
        <hr className="rule-line mt-8" />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-14 sm:grid-cols-[2fr_1fr]">
        <Reveal>
          <div className="space-y-5">
            {profile.bio.map((paragraph, index) => (
              <p
                key={index}
                className="max-w-2xl text-sm leading-8 text-[var(--ink-soft)]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12">
            <p className="kicker mb-5">Timeline</p>
            <ul className="m-0 list-none space-y-4 p-0">
              {profile.timeline.map((entry, index) => (
                <li
                  key={index}
                  className="flex gap-6 border-b border-[var(--rule)] pb-4 text-sm"
                >
                  <span className="w-14 shrink-0 text-[var(--ink-soft)]">
                    {entry.year}
                  </span>
                  <span>{entry.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal>
          <div>
            <p className="kicker mb-5">Gear</p>
            <ul className="m-0 list-none space-y-2 p-0 text-sm text-[var(--ink-soft)]">
              {profile.gear.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-12">
            <p className="kicker mb-5">Social</p>
            <ul className="m-0 list-none space-y-2 p-0">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="nav-link text-sm"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </main>
  )
}
