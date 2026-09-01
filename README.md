# Quearts Official Site

ボカロP「Quearts」のオフィシャルサイト。TanStack Start + Tailwind CSS で構築し、Cloudflare Workers にデプロイする。

## 開発

```bash
pnpm install
pnpm dev
```

http://localhost:3000 で確認できます。

## 本番ビルド / デプロイ

```bash
pnpm build
pnpm deploy   # wrangler deploy を実行
```

## 実素材への差し替え方

このサイトはリリース前提で、実際の楽曲・記事・プロフィールが揃うまでは仮データで動くように作られています。差し替えが必要なのは以下のファイルだけです。

| ファイル              | 内容                                                                                                                                                                               |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/data/site.ts`    | サイト名義・キャッチコピー・SNSリンク                                                                                                                                              |
| `src/data/songs.ts`   | 楽曲一覧（タイトル・リリース日・クレジット・説明文）。`artworkUrl` にジャケット画像のパスを、`youtubeId` にYouTube動画IDを指定するとプレースホルダーから実素材表示に切り替わります |
| `src/data/news.ts`    | お知らせ一覧                                                                                                                                                                       |
| `src/data/profile.ts` | プロフィール本文・活動年表・使用機材                                                                                                                                               |

ジャケット画像は `public/artwork/` などに置き、`songs.ts` の `artworkUrl` からそのパス（例: `/artwork/suishou-no-yoru.jpg`）を指定してください。

## ページ構成

- `/` — トップページ
- `/discography` — 楽曲一覧
- `/discography/$slug` — 楽曲詳細
- `/news` — お知らせ一覧
- `/profile` — プロフィール

## Linting & Formatting

```bash
pnpm lint
pnpm format
pnpm check
```
