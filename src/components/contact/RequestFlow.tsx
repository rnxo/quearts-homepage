import { Fragment } from 'react'
import { ArrowRight } from 'lucide-react'
import type { MDXContent } from 'mdx/types'
// react-markdown 版（下のコメントアウトしたダイアログで使用）
// import ReactMarkdown from 'react-markdown'
// import remarkGfm from 'remark-gfm'
import HearingMdx from './flow-item-md/01_hearing.mdx'
import EstimateMdx from './flow-item-md/02_estimate.mdx'
import RoughMdx from './flow-item-md/03_rough.mdx'
import MainworkMdx from './flow-item-md/04_main_work.mdx'
import PayingMdx from './flow-item-md/05_paying.mdx'
import DeliveryMdx from './flow-item-md/06_delivery.mdx'
import { RequestFlowStep } from './RequestFlowStep'
import type { RequestFlowItem } from '#/models/contact'

export const requestFlowItems: RequestFlowItem[] = [
  {
    id: '1',
    name: 'ヒアリング',
    simpleText: 'メールにて連絡',
    DescriptionMdx: HearingMdx,
  },
  {
    id: '2',
    name: 'お見積り',
    simpleText: 'メールの内容をお見積りを提案',
    DescriptionMdx: EstimateMdx,
  },
  {
    id: '3',
    name: 'ラフ制作',
    simpleText: 'ざっくりした１コーラス分を制作',
    DescriptionMdx: RoughMdx,
  },
  {
    id: '4',
    name: '本制作',
    simpleText: '諸々確定後、本制作に移る',
    DescriptionMdx: MainworkMdx,
  },
  {
    id: '5',
    name: 'お支払い',
    simpleText: 'PayPal・銀行振込',
    DescriptionMdx: PayingMdx,
  },
  {
    id: '6',
    name: '微調整・納品',
    simpleText: 'ギガファイル便にて音声データを納品',
    DescriptionMdx: DeliveryMdx,
  },
]

export function RequestFlowContainer() {
  return (
    <>
      <ol className="m-0 flex list-none items-center gap-1 p-0 sm:gap-2 ">
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
      <div className="m-2 p-2 h-[20%] w-full flex justify-end ">
        <p className="text-[0.8rem] font-bold text-(--ink-soft)">
          各カードをクリックすると詳細がでます
        </p>
      </div>
    </>
  )
}
