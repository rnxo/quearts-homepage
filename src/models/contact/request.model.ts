export type RequestLink = {
  id: 'google-form' | 'feat'
  label: string
  title: string
  description: string
  href: string
}

// === 依頼フォームの編集はこちらからです ===
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
