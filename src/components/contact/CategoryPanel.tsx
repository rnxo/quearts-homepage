import type { Category } from '#/models/contact'

type CategoryPanelProps = {
  categories: Category[]
}

export default function CategoryPanel({ categories }: CategoryPanelProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {categories.map((category) => (
        <section
          key={category.id}
          className="rounded-lg bg-(--paper) p-6 ring-1 ring-(--rule)"
        >
          <h4 className="display m-0 text-2xl">{category.name}</h4>
          <p className="kicker mt-3 mb-0">{category.nameEn}</p>
          <p className="mt-3 mb-0 text-sm leading-7 text-(--ink-soft)">
            {category.description}
          </p>
          <ul className="mt-4 mb-0 list-none space-y-1.5 p-0 text-sm">
            {category.terms.map((term) => (
              <li key={term}>— {term}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
