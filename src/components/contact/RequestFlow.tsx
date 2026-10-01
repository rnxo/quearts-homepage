import { Fragment, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import type { MDXComponents, MDXContent } from 'mdx/types'
// react-markdown 版（下のコメントアウトしたダイアログで使用）
// import ReactMarkdown from 'react-markdown'
// import remarkGfm from 'remark-gfm'
import HearingMdx from './flow-item-md/01_hearing.mdx'
import EstimateMdx from './flow-item-md/02_estimate.mdx'
import RoughMdx from './flow-item-md/03_rough.mdx'
import MainworkMdx from './flow-item-md/04_main_work.mdx'
import PayingMdx from './flow-item-md/05_paying.mdx'
import DeliveryMdx from './flow-item-md/06_delivery.mdx'

type RequestFlowItem = {
  id: string
  name: string
  simpleText?: string
  /** react-markdown 版で使う Markdown の文字列 */
  description?: string
  /** MDX 版で使う、ビルド時に変換済みのコンポーネント */
  DescriptionMdx?: MDXContent
}

const requestFlowItems: RequestFlowItem[] = [
  {
    id: '1',
    name: 'ヒアリング',
    simpleText: 'メールにて連絡',
    DescriptionMdx: HearingMdx,
    // Markdown はインデントに意味があるので、行頭を字下げせずに書く
    description: `
こちらの内容をX(旧 Twitter) のDM、メールにてご連絡ください。

X: @QueartsVocaloid

mail: quearts.vocaloid@gmail.com

メッセージのテンプレ
(あくまでもスムーズにやりとりをするための一例です。)

---

- ご活動名義 or 企業名
- ご依頼内容
- 作品の用途
- ご希望の納期
- ご予算
- その他ご要望

---
`,
  },
  {
    id: '2',
    name: 'お見積り',
    simpleText: 'メールの内容をお見積りを提案',
    DescriptionMdx: EstimateMdx,
    description: `
### お見積りの内訳

| 項目 | 内容 |
| --- | --- |
| 制作費 | 料金表をもとに算出 |
| 修正 | 2 回まで無料 |

> ご納得いただけた場合のみ、次の工程に進みます。
`,
  },
  { id: '3', name: 'ラフ制作', simpleText: 'ざっくりした１コーラス分を制作', DescriptionMdx: RoughMdx },
  { id: '4', name: '本制作', simpleText: '諸々確定後、本制作に移る', DescriptionMdx: MainworkMdx },
  { id: '5', name: 'お支払い', simpleText: 'PayPal・銀行振込', DescriptionMdx: PayingMdx },
  {
    id: '6',
    name: '微調整・納品',
    simpleText: 'ギガファイル便にて音声データを納品',
    DescriptionMdx: DeliveryMdx
  },
]

export function RequestFlowContainer() {
  return (
    <>
      <ol className="m-0 flex list-none items-center gap-1 p-0 sm:gap-2">
        {requestFlowItems.map((flowItem, index) => (
          <Fragment key={flowItem.id}>
            <li className="min-w-0 flex-1">
              <RequestFlowStep flowItem={flowItem} />
            </li>
            {index < requestFlowItems.length - 1 && (
              <li aria-hidden="true" className="shrink-0 text-(--ink-soft)">
                <ArrowRight className="size-3 sm:size-4" />
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </>
  )
}

/** カード 1 枚分。自分専用の ref と dialog を持つ。 */
function RequestFlowStep({ flowItem }: { flowItem: RequestFlowItem }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { DescriptionMdx } = flowItem

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

      {/* ===== react-markdown 版のダイアログ（比較用に残す） =====
      <dialog
        ref={dialogRef}
        className="m-auto w-[calc(100%-2rem)] max-w-lg flex-col items-center gap-4 rounded-lg bg-(--paper-sub) p-6 text-(--ink) ring-1 ring-(--rule) backdrop:bg-black/50 open:flex"
      >
        <h3 className="m-0 font-bold underline">{flowItem.name}</h3>
        // md記法ブロック: description がなければ simpleText を出す
        {flowItem.description ? (
          <Markdown className="w-full">{flowItem.description}</Markdown>
        ) : (
          <p className="m-0">{flowItem.simpleText}</p>
        )}
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          className="rounded border-2 border-gray-700 p-2">
          閉じる
        </button>
      </dialog>
      ===== react-markdown 版ここまで ===== */}

      {/* ===== MDX 版のダイアログ ===== */}
      <dialog
        ref={dialogRef}
        className="m-auto w-[calc(100%-2rem)] max-w-lg flex-col items-center gap-4 rounded-lg bg-(--paper-sub) p-6 text-(--ink) ring-1 ring-(--rule) backdrop:bg-black/50 open:flex"
      >
        <h3 className="m-0 font-bold underline">{flowItem.name}</h3>
        {/* MDX ブロック: DescriptionMdx がなければ simpleText を出す */}
        {DescriptionMdx ? (
          <div className={`w-full ${proseClass}`}>
            <DescriptionMdx components={mdxComponents} />
          </div>
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

/**
 * Markdown 部分の見た目。@tailwindcss/typography の prose を使い、
 * 色はサイトの CSS 変数に合わせる。react-markdown 版と MDX 版で共通。
 */
const proseClass =
  'prose prose-sm max-w-none text-left [--tw-prose-body:var(--ink)] [--tw-prose-bold:var(--ink)] [--tw-prose-bullets:var(--ink-soft)] [--tw-prose-counters:var(--ink-soft)] [--tw-prose-headings:var(--ink)] [--tw-prose-hr:var(--rule)] [--tw-prose-links:var(--ink)] [--tw-prose-quote-borders:var(--rule)] [--tw-prose-quotes:var(--ink-soft)] [--tw-prose-td-borders:var(--rule)] [--tw-prose-th-borders:var(--rule)]'

/**
 * MDX 内の HTML 要素を差し替える。
 * 外部リンクだけ新しいタブで開く。
 */
const mdxComponents: MDXComponents = {
  a: ({ href, children }) => {
    const external = href?.startsWith('http')
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
      >
        {children}
      </a>
    )
  },
}

// ===== react-markdown 版の Markdown コンポーネント（比較用に残す） =====
// /**
//  * Markdown の文字列を描画する。
//  * - react-markdown は React 要素に変換するので dangerouslySetInnerHTML を使わない
//  * - remark-gfm で表・チェックボックス・取り消し線などの GitHub 記法に対応
//  */
// function Markdown({
//   children,
//   className = '',
// }: {
//   children: string
//   className?: string
// }) {
//   return (
//     <div className={`${proseClass} ${className}`}>
//       <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdxComponents}>
//         {children}
//       </ReactMarkdown>
//     </div>
//   )
// }
// ===== react-markdown 版ここまで =====

function RequestFlowCard({ flowItem }: { flowItem: RequestFlowItem }) {
  return (
    <div className="flex flex-col aspect-square items-center justify-center rounded-md p-1 text-center ring-1 ring-(--rule) sm:p-2">
      <h4 className="m-0 text-sm">{flowItem.name}</h4>
      <span className="text-[12px] text-(--ink-soft)">
        {flowItem.simpleText}
      </span>
    </div>
  )
}
