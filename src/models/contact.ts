import type { MDXContent } from 'mdx/types'

export type Service = {
  id: string
  name: string
  nameEn: string
  description: string
}

export type RequestFlowItem = {
  id: string
  name: string
  simpleText?: string
  /** MDX 版で使う、ビルド時に変換済みのコンポーネント */
  DescriptionMdx?: MDXContent
}

export type PriceRow = {
  serviceId: string
  label: string
  amount: string
}

export type Availability = {
  status: 'open' | 'closed'
  bookedUntil: string // YYYY-MM
  note: string
}

export type RequestLink = {
  id: 'google-form' | 'feat'
  label: string
  title: string
  description: string
  href: string
}

// Contactページの掲載内容はこちらから編集してください
//  ーーー 記入例 ーーー
// 受付状況: availability.bookedUntil に「予約が埋まっている最後の月」を 'YYYY-MM' で記入
//   status: 'closed' にすると「現在受付停止中」の表示になります
// 料金: prices の amount に税込の金額を数値で記入（例: 50000）
// ーーー 記入例おわり ーーー
export const services: Service[] = [
  {
    id: 'composition',
    name: '作曲',
    nameEn: 'Composition',
    description: 'メロディ・コード進行の制作。ボカロ曲／歌モノ／BGMに対応',
  },
  {
    id: 'arrangement',
    name: '編曲',
    nameEn: 'Arrangement',
    description: '既存曲・デモからのアレンジ、トラックメイク',
  },
  {
    id: 'lyrics',
    name: '作詞',
    nameEn: 'Lyrics',
    description: '楽曲コンセプトに合わせた作詞。物語性のある歌詞が得意',
  },
  {
    id: 'vocal-tuning',
    name: '調声',
    nameEn: 'Vocal Tuning',
    description: '初音ミクなどボーカロイドの調声・歌唱データ制作',
  },
  {
    id: 'mix',
    name: 'MIX',
    nameEn: 'MIX',
    description: 'メロディ・コード進行の制作。ボカロ曲／歌モノ／BGMに対応',
  },
  {
    id: 'all-in-one',
    name: '一括制作',
    nameEn: 'All-in-one',
    description: '作詞・作曲・編曲・調声までまとめてお任せ',
  },
]

export const prices: PriceRow[] = [
  { serviceId: 'all-in-one', label: '一括制作', amount: '20000' },
  { serviceId: 'composition', label: '作曲', amount: '10000' },
  { serviceId: 'lyrics', label: '作詞', amount: '5000' },
  { serviceId: 'arrangement', label: '編曲', amount: '10000' },
  { serviceId: 'mix', label: 'MIX', amount: '5000' },
  { serviceId: 'streaming-bgm', label: '配信用BGM制作', amount: '5000' },
  { serviceId: 'retake-from-begening', label: 'リテイク（１からやり直しの場合）', amount: '合計金額 +30%' },
  { serviceId: 'retake-many-times', label: 'リテイク（あまりに回数が多い場合）', amount: '合計金額 +10%' },
  { serviceId: 'business-purpose', label: '商用利用', amount: '合計金額 +30%' },
  { serviceId: 'fast-making', label: 'お急ぎ納品（２週間以内の場合）', amount: '合計金額 +30%' },
  { serviceId: 'chaging-deadline', label: '納期変更', amount: '合計金額 +50%' },
  { serviceId: 'achivement-unpublished', label: '実績非公開', amount: '合計金額 +50%' },
]

export const priceNote =
  '※ 1曲（〜4分）あたりの目安です。尺・用途・納期・権利の範囲によりお見積りします。'

export const availability: Availability = {
  status: 'open',
  bookedUntil: '2026-12',
  note: '※ 現在、2026年12月までご予約をいただいています。2027年1月以降の着手でよろしければ承ります。お急ぎの場合はご相談ください。',
}

export const requestLinks: RequestLink[] = [
  {
    id: 'google-form',
    label: 'Google Form',
    title: 'フォームで依頼・相談',
    description: 'お見積りだけのご相談もOK。2〜3日以内にメールでご返信します。',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSedU9yHmZY87r4a35d93nXGH-r0CNTLkF02D92xO6GuR45nUw/viewform',
  },
  {
    id: 'feat',
    label: 'FEAT',
    title: 'FEATで依頼',
    description:
      '決済・納品までプラットフォーム上で完結。はじめての方も安心です。',
    href: 'https://feat.kurogo.studio/QueartsVocaloid', // TODO: 本番URLに差し替え
  },
]
// 編集可能範囲はここまで
