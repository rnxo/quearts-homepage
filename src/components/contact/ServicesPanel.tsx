import type { Service } from '#/models/contact'

type ServicesPanelProps = {
  services: Service[]
}

export default function ServicesPanel({ services }: ServicesPanelProps) {
  return (
    <dl className="m-0">
      {services.map((service) => (
        <div
          key={service.id}
          className="grid grid-cols-1 gap-2 border-b border-(--rule)/60 py-4 first:pt-0 last:border-b-0 last:pb-0 sm:grid-cols-[220px_1fr] sm:items-center sm:gap-6"
        >
          <dt>
            <span className="block text-sm font-bold">{service.name}</span>
            <span className="kicker mt-1 block text-[0.625rem]">
              {service.nameEn}
            </span>
          </dt>
          <dd className="m-0 text-sm leading-7 text-(--ink-soft)">
            {service.description}
          </dd>
        </div>
      ))}
    </dl>
  )
}
