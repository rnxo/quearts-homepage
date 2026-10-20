export type PriceRow = {
  serviceId: string
  label: string
  description: string
  amount: string
}

// === 料金表の編集はこちらからです ===
// amount に税込の金額を数値で記入（例: '50000'）。追加料金は '合計金額 +30%' のように記入
export const prices: PriceRow[] = [
  {
    serviceId: 'all-in-one',
    label: '一括制作',
    description: '作曲・編曲・作詞・MIXすべてを一気通貫で担当します',
    amount: '20000',
  },
  {
    serviceId: 'composition',
    label: '作曲',
    description:
      'メロディ・コード進行の制作。ボカロ曲／歌モノ／BGMに対応します',
    amount: '10000',
  },
  {
    serviceId: 'lyrics',
    label: '作詞',
    description: '楽曲コンセプトに合わせた作詞。物語性のある歌詞が得意です',
    amount: '5000',
  },
  {
    serviceId: 'arrangement',
    label: '編曲',
    description: '既存曲・デモからのアレンジ、トラックメイクを担当します',
    amount: '10000',
  },
  {
    serviceId: 'mix',
    label: 'MIX',
    description: 'ボーカル・各トラックの音量バランス調整と仕上げを行います',
    amount: '5000',
  },
  {
    serviceId: 'streaming-bgm',
    label: '配信用BGM制作',
    description: '配信や動画で使えるループ可能な BGM を制作します',
    amount: '5000',
  },
  {
    serviceId: 'retake-from-begening',
    label: 'リテイク（１からやり直しの場合）',
    description: '方向性の変更などで最初から作り直す場合の追加料金です',
    amount: '合計金額 +30%',
  },
  {
    serviceId: 'retake-many-times',
    label: 'リテイク（あまりに回数が多い場合）',
    description: '修正回数が目安を大きく超えた場合の追加料金です',
    amount: '合計金額 +10%',
  },
  {
    serviceId: 'business-purpose',
    label: '商用利用',
    description: '企業案件や販売目的など、商用で利用する場合の追加料金です',
    amount: '合計金額 +30%',
  },
  {
    serviceId: 'fast-making',
    label: 'お急ぎ納品（２週間以内の場合）',
    description: '通常より短い納期で制作する場合の追加料金です',
    amount: '合計金額 +30%',
  },
  {
    serviceId: 'chaging-deadline',
    label: '納期変更',
    description: '着手後にご依頼側の都合で納期を前倒しする場合の追加料金です',
    amount: '合計金額 +50%',
  },
  {
    serviceId: 'achivement-unpublished',
    label: '実績非公開',
    description: '制作実績としてサイトや SNS で公開しない場合の追加料金です',
    amount: '合計金額 +50%',
  },
]
