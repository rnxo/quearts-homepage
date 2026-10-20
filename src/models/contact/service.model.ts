export type Service = {
  id: string
  name: string
  nameEn: string
  description: string
}

// === 依頼できることの編集はこちらからです ===
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
    id: 'working-bgm',
    name: '作業用BGM制作',
    nameEn: 'WORKING-BGM',
    description: '作業・配信用のバックグラウンドミュージックを制作します',
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
