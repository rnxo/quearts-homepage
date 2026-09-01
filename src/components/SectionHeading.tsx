import type { ReactNode } from 'react'

type SectionHeadingProps = {
  kicker: string
  title: string
  action?: ReactNode
}

export default function SectionHeading({
  kicker,
  title,
  action,
}: SectionHeadingProps) {
  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="kicker mb-2">{kicker}</p>
          <h2 className="display text-2xl sm:text-3xl">{title}</h2>
        </div>
        {action}
      </div>
      <hr className="rule-line mt-5" />
    </div>
  )
}
