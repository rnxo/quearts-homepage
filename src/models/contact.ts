export type Service = {
  id: string
  name: string
  nameEn: string
  description: string
}

export type Category = {
  id: 'company' | 'individual'
  name: string
  nameEn: string
  description: string
  terms: string[]
}

export type PriceRow = {
  serviceId: string
  label: string
  commercial: number // 税込・円
  doujin: number // 税込・円
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
  primary: boolean
}

// Contactページの掲載内容はこちらから編集してください
//  ーーー 記入例 ーーー
// 受付状況: availability.bookedUntil に「予約が埋まっている最後の月」を 'YYYY-MM' で記入
//   status: 'closed' にすると「現在受付停止中」の表示になります
// 料金: prices の commercial / doujin に税込の金額を数値で記入（例: 50000）
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

export const categories: Category[] = [
  {
    id: 'company',
    name: '企業',
    nameEn: '企業・法人',
    description: 'ゲーム・アニメ・広告・VTuber事務所など、企業からのご依頼。',
    terms: [
      '契約書・請求書に対応',
      '納品後 請求書払い',
      'クレジット表記はご相談',
    ],
  },
  {
    id: 'individual',
    name: '個人',
    nameEn: 'Creator・活動者',
    description: '同人作品・個人VTuber・オリジナル曲など、個人からのご依頼。',
    terms: [
      'フォーム内の規約に同意',
      '着手前 前払い（FEAT可）',
      '「Quearts」表記をお願いします',
    ],
  },
]

export const prices: PriceRow[] = [
  { serviceId: 'composition', label: '作曲', commercial: 50000, doujin: 30000 },
  { serviceId: 'arrangement', label: '編曲', commercial: 40000, doujin: 25000 },
  { serviceId: 'lyrics', label: '作詞', commercial: 20000, doujin: 10000 },
  { serviceId: 'vocal-tuning', label: '調声', commercial: 15000, doujin: 8000 },
  {
    serviceId: 'all-in-one',
    label: '一括制作',
    commercial: 100000,
    doujin: 60000,
  },
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
    href: '#', // TODO: 本番URLに差し替え
    primary: true,
  },
  {
    id: 'feat',
    label: 'FEAT',
    title: 'FEATで依頼',
    description:
      '決済・納品までプラットフォーム上で完結。はじめての方も安心です。',
    href: '#', // TODO: 本番URLに差し替え
    primary: false,
  },
]
// 編集可能範囲はここまで
