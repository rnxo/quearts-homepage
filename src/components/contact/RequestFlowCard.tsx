import type { RequestFlowItem } from "#/models/contact";

export function RequestFlowCard({ flowItem }: { flowItem: RequestFlowItem }) {
  return (
    <div className="flex flex-col aspect-square items-center justify-center rounded-md p-1 text-center ring-1 ring-(--rule) sm:p-2">
      <h4 className="m-0 text-sm">{flowItem.name}</h4>
      <span className="text-[12px] text-(--ink-soft)">
        {flowItem.simpleText}
      </span>
    </div>
  )
}
