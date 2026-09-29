import { Fragment, useRef } from 'react'
import { ArrowRight } from 'lucide-react'

type RequestFlowItem = {
  id: string
  name: string
  description?: string
}

const requestFlowItems: RequestFlowItem[] = [
  { id: '1', name: 'ヒアリング', description: 'メールにて連絡' },
  { id: '2', name: 'お見積り', description: 'メールの内容をお見積りを提案' },
  { id: '3', name: 'ラフ制作', description: 'ざっくりした１コーラス分を制作'},
  { id: '4', name: '本制作', description: '諸々確定後、本制作に移る' },
  { id: '5', name: 'お支払い', description: 'PayPal・銀行振込' },
  { id: '6', name: '微調整・納品', description: 'ギガファイル便にて音声データを納品' },
]

export function RequestFlowContainer() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  

  return (
    <>
      <ol className="m-0 flex list-none items-center gap-1 p-0 sm:gap-2">
        {requestFlowItems.map((flowItem, index) => (
          <Fragment key={flowItem.id}>
            <li className="min-w-0 flex-1">
              <RequestFlowCard flowItem={flowItem} />
            </li>
            {index < requestFlowItems.length - 1 && (
              <li aria-hidden="true" className="shrink-0 text-(--ink-soft)">
                <ArrowRight className="size-3 sm:size-4" />
              </li>
            )}
          </Fragment>
        ))}
      </ol>
      <div className="flex items-center justify-center">
        <button type="button" onClick={() => dialogRef.current?.showModal()}>
          ダイアログを開く
        </button>

        <dialog
          ref={dialogRef}
          className="m-auto flex-col items-center gap-4 rounded-lg bg-(--paper-sub) p-6 text-(--ink) ring-1 ring-(--rule) backdrop:bg-black/50 open:flex"
        >
          <p>このダイアログは、ref を使用して開きました。</p>
          <button type="button" onClick={() => dialogRef.current?.close()}>
            閉じる
          </button>
        </dialog>
      </div>
    </>
  )
}

function RequestFlowCard({ flowItem }: { flowItem: RequestFlowItem}) {
  return (
    <div className="flex flex-col aspect-square items-center justify-center rounded-md p-1 text-center ring-1 ring-(--rule) sm:p-2">
      <h4 className="m-0 text-sm">{flowItem.name}</h4>
      <span className="text-[12px] text-(--ink-soft)">{flowItem.description}</span>
    </div>
  )
}
