type ArtWorkUrl = {
  youtube?: string;
  niconico?: string;
  piapro?: string;
}


export type Song = {
  slug: string;
  title: string;
  releasedAt: string; // YYYY-MM-DD
  singer: string;
  role: string;
  links?: ArtWorkUrl;
  description?: string;
}

//新曲追加の場合はこちらから編集してください
//  ーーー　記入例　ーーー
// {
//   slug: 'pipuru', -> URLで使うもの(ex: https://quearts-music.com/songs/pipuru)
//   title: 'リプル', -> サイトに載せる名前
//   releasedAt: '2026-09-24', -> リリース日
//   links: {
//     youtube: 'https://www.youtube.com/watch?v=8Btgmcf-ktY',
//     piapro: 'https://piapro.jp/t/gIzw',
//   },
// },
// ーーー　記入例おわり　ーーー
export const songs: Song[] = [
  {
    slug: 'ripuru',
    title: 'リプル',
    releasedAt: '2026-09-24',
    singer: '宮舞モカ',
    role: '音楽・一部映像',
    links: {
      youtube: 'https://www.youtube.com/watch?v=8Btgmcf-ktY',
      piapro: 'https://piapro.jp/t/gIzw',
    }    
  },
   {
    slug: 'ripuru',
    title: 'リプル',
    releasedAt: '2026-09-24',
    singer: '宮舞モカ',
    role: '音楽・一部映像',
    links: {
      youtube: 'https://www.youtube.com/watch?v=8Btgmcf-ktY',
      piapro: 'https://piapro.jp/t/gIzw',
    }    
  },
  {
    slug: 'sutari-yamai',
    title: '廃りの病',
    releasedAt: '2026-09-18',
    singer: '宮舞モカ',
    role: '音楽・映像',
    links: {
      youtube: 'https://www.youtube.com/watch?v=IEN00uTCRBg',
      niconico: 'https://www.nicovideo.jp/watch/sm46814719',
      piapro: 'https://piapro.jp/t/ecXC',
    },
  },
  {
    slug: 'tokeru',
    title: 'とける',
    releasedAt: '2026-08-20',
    singer: '2026-08-20',
    role: '初音ミク',
    links: {
      youtube: 'https://www.youtube.com/watch?v=9NVz1e3YT2w',
      niconico: 'https://www.nicovideo.jp/watch/sm46694343',
      piapro: 'https://piapro.jp/t/yWuV',
    },
  },
]
//編集可能範囲はここまで