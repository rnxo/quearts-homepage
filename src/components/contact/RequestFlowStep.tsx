import { useRef } from 'react'
import type { ReactNode } from 'react'
import type { RequestFlowItem } from '#/models/contact'
import { RequestFlowCard } from './RequestFlowCard'

const proseClass =
  'prose prose-sm max-w-none text-left [--tw-prose-body:var(--ink)] [--tw-prose-bold:var(--ink)] [--tw-prose-bullets:var(--ink-soft)] [--tw-prose-counters:var(--ink-soft)] [--tw-prose-headings:var(--ink)] [--tw-prose-hr:var(--rule)] [--tw-prose-links:var(--ink)] [--tw-prose-quote-borders:var(--rule)] [--tw-prose-quotes:var(--ink-soft)] [--tw-prose-td-borders:var(--rule)] [--tw-prose-th-borders:var(--rule)]'

type RequestFlowStepProps = {
  flowItem: RequestFlowItem
  /** RequestFlow.astro で描画済みの MDX。無ければ simpleText を出す */
  children?: ReactNode
}

/** カード 1 枚分。自分専用の ref と dialog を持つ。 */
export function RequestFlowStep({ flowItem, children }: RequestFlowStepProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="block w-full cursor-pointer"
      >
        <RequestFlowCard flowItem={flowItem} />
      </button>

      {/* ホバー時フローアイテム詳細カード */}
      {/* <div
        role="tooltip"
        className="fixed top-1/2 left-1/2 z-50 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center group-hover:flex group-focus-within:flex border-2"
      >
        <h4 className="m-0 font-bold">{flowItem.name}</h4>
        <p className="m-0">{flowItem.simpleText}</p>
      </div> */}

      <dialog
        ref={dialogRef}
        className="m-auto w-[calc(100%-2rem)] max-w-lg flex-col items-center gap-4 rounded-lg bg-(--paper-sub) p-6 text-(--ink) ring-1 ring-(--rule) backdrop:bg-black/50 open:flex"
      >
        <h3 className="m-0 font-bold underline">{flowItem.name}</h3>
        {children ? (
          <div className={`w-full ${proseClass}`}>{children}</div>
        ) : (
          <p className="m-0">{flowItem.simpleText}</p>
        )}
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          className="rounded border-2 border-gray-700 p-2"
        >
          閉じる
        </button>
      </dialog>
    </div>
  )
}
