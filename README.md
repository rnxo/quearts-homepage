# Quearts Official Site

ボカロP「Quearts」のオフィシャルサイト。Astro（静的出力）+ React（island）+ Tailwind CSS で構築し、Cloudflare Workers の静的アセットとしてデプロイする。

## Queartsさんへ（編集の仕方です）

1. https://github.com/rnxo/quearts-homepage の画面から「.」キーを押す
2. github workspace上でvscodeを開きます
3. `Ctrl` + `j`でターミナルを開く
4. ターミナルで`git pull`コマンドを実行
5. `pnpm dev`コマンドを実行する
6. ポートの3000のところに右にある青いリンクを押すとサイトを開ける
7. 編集してください
8. 編集が終わったら`Ctrl + C`でサイトのリンクを停止
9. `git add .`コマンドを実行して 編集内容をgitに覚えさせる
10. `git commit -m "<メッセージ>"` <メッセージ>の部分で編集内容を書く
11. `git push`コマンドを実行して編集内容をgithubに送信・反映させる

## 開発

```bash
pnpm install
pnpm dev
```

http://localhost:3000 で確認できます。

## 本番ビルド / デプロイ

```bash
pnpm build     # astro check（型チェック）→ astro build で dist/ に出力
pnpm preview   # wrangler dev で dist/ を本番と同じ形で配信して確認
pnpm deploy    # wrangler deploy を実行
```

## 実素材への差し替え方

このサイトはリリース前提で、実際の楽曲・記事・プロフィールが揃うまでは仮データで動くように作られています。差し替えが必要なのは以下のファイルだけです。

| ファイル              | 内容                                                           |
| --------------------- | -------------------------------------------------------------- |
| `src/data/site.ts`    | サイト名義・キャッチコピー・SNSリンク                          |
| `src/models/songs.ts` | 楽曲一覧（タイトル・リリース日・歌唱・担当・各サイトのリンク） |
| `src/models/news.ts`  | トップページのお知らせ                                         |
| `src/data/news.ts`    | お知らせ一覧ページ（`/news`）                                  |
| `src/data/profile.ts` | プロフィール本文・活動年表・使用機材                           |

Contact ページの料金・受付状況・依頼フォームの URL は `src/models/contact.ts` を編集してください。受付状況は `availability.bookedUntil` に予約が埋まっている最後の月（`YYYY-MM`）を書くと、月ごとの「予約済み / 受付可」表示に反映されます。月の並びは閲覧した日の月から始まります。

「依頼の流れ」の各ステップの詳細は `src/components/contact/flow-item-md/*.mdx` を Markdown で編集してください。

ジャケット画像は `public/assets/songs/` に `<slug>.png`（`songs.ts` の `slug` と同じ名前）で置いてください。

## ページ構成

ページは `src/pages/*.astro`、共通レイアウトは `src/layouts/BaseLayout.astro`。

- `/` — トップページ
- `/discography` — 楽曲一覧
- `/news` — お知らせ一覧
- `/profile` — プロフィール
- `/contact` — 制作依頼（受付状況・依頼できること・依頼の流れ・料金表・依頼フォーム）

## Linting & Formatting

```bash
pnpm lint
pnpm format
pnpm check
```
