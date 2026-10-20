# 静的コンポーネント .astro 化 実装手順書（Astro 7 / @lucide/astro）

## 背景
`client:*` を付けずに使っている `.tsx` はビルド時に React で SSR されるだけで、ブラウザには JS を送らない。それなら React を経由する理由はないため、`.astro` に書き換えて「React = island 専用」という境界をはっきりさせる。
採用しなかった案:
- `.tsx` のまま残す: 動作は同じだが、静的部品と island の区別がファイルから読み取れないため。
- `lucide-react` を `.astro` から使い続ける: 依存は増えないが、静的部品の描画に React の SSR が残るため。

前提と方針:
- island として残すもの（state / 副作用あり）: `Reveal.tsx`, `ThemeToggle.tsx`, `contact/AccordionItem.tsx`, `contact/StatusPanel.tsx`, `discography/HorizontalScrollContainer.tsx`。これらは静的 `.tsx` を import していないので、静的部品を `.astro` にしても影響はない（`.tsx` から `.astro` は import できないため、ここは前提条件として確認済み）。
- island の子として渡す静的部品（例: `AccordionItem` 内の `ServicesPanel`、`Reveal` 内の `SongCard`）は Astro がスロット HTML として渡すので、`.astro` にしてもそのまま動く。
- 書き方は既存の `src/components/news/NewsList.astro` と `src/components/contact/RequestFlow.astro` に合わせる。
  - Props はフロントマターで `type Props = {...}`、`const { ... } = Astro.props` で受け取る。
  - `className` → `class`。外から `class` を受け取る部品は `const { class: className } = Astro.props` で受け、`#/lib/utils` の `cn` で結合する（tailwind-merge による上書きを保つため）。条件付きのクラスは `class:list` を使う。
  - `ReactNode` の props は `<slot />` / 名前付き `<slot name="..." />` に置き換える。`key` は削除する。
  - SVG 属性はケバブケースにする（`strokeWidth` → `stroke-width` など）。
- import は拡張子付き（`#/components/contact/RequestPanel.astro`）・default import にする。named export だった `Accordion` / `DisplayCard` は呼び出し側を default import に直す。
- 依存の追加は `@lucide/astro` だけ。`@astrojs/react` と `lucide-react` は island で使い続けるため残す。
- 見た目と出力 HTML は変えない（純粋なリファクタリング）。変更範囲は `src/components/**`、それを使う `src/pages/{index,contact,discography}.astro`、`src/layouts/BaseLayout.astro`、`package.json`、`AGENTS.md` に限る。

### 対象一覧

| ファイル | 扱い | 使用箇所 |
|---|---|---|
| `contact/RequestPanel.tsx` | `.astro` 化 | `contact.astro` |
| `contact/ServicesPanel.tsx` | `.astro` 化 | `contact.astro`（AccordionItem の子） |
| `contact/PriceTable.tsx` | `.astro` 化 | `contact.astro`（AccordionItem の子） |
| `contact/DisplayCard.tsx` | `.astro` 化 | `contact.astro` |
| `contact/Accordion.tsx` | `.astro` 化 | `contact.astro` |
| `SongLinks.tsx` | `.astro` 化 | `SongCard`, `SquareSongCard` |
| `SongCard.tsx` | `.astro` 化 | `index.astro` |
| `discography/SquareSongCard.tsx` | `.astro` 化 | `discography.astro` |
| `SectionHeading.tsx` | `.astro` 化 | `index.astro` |
| `Footer.tsx` | `.astro` 化 | `BaseLayout.astro` |
| `contact/StatusPill.tsx`, `discography/GridSongCard.tsx`, `discography/VerticalSongCard.tsx`, `Artwork.tsx` | 削除（未使用） | なし（`Artwork` は `GridSongCard` からのみ） |
| `Reveal`, `ThemeToggle`, `AccordionItem`, `StatusPanel`, `HorizontalScrollContainer` | `.tsx` のまま | island |

---

## Phase A: 基盤整備と未使用コードの削除（PR #1）

- **[A-1]** `pnpm add @lucide/astro` を実行し、`package.json` の `dependencies` に追加する。
- **[A-2]** `src/components/contact/RequestFlow.astro` の `import { Minus, Plus } from 'lucide-react'` を `@lucide/astro` に置き換え、`className="group-open:hidden"` などを `class` に直す。
- **[A-3]** 未使用の `src/components/contact/StatusPill.tsx`, `src/components/discography/GridSongCard.tsx`, `src/components/discography/VerticalSongCard.tsx`, `src/components/Artwork.tsx` を削除する。削除前に `grep -rn "StatusPill\|GridSongCard\|VerticalSongCard\|Artwork" src` で参照がないことを確認する。
- **[A-4]** 変換前の出力を比較用に保存する: `pnpm build` 後の `dist/` をスクラッチ領域にコピーする（以降の Phase の HTML 差分確認に使う）。

## Phase B: Contact ページの静的部品を .astro 化（PR #2）

- **[B-1]** `src/components/contact/Accordion.astro` を作る。Props: `class?: string`。`<div class={cn('flex flex-col', className)}><slot /></div>` を返す。`Accordion.tsx` を削除する。
- **[B-2]** `src/components/contact/DisplayCard.astro` を作る。Props: `id: string`, `index?: string`, `title?: string`, `kicker?: string`, `summary?: string`。
  - `summary` は文字列 prop と名前付きスロットの両方を受けるため `<slot name="summary">{summary}</slot>` にする（`contact.astro` は受付状況で `slot="summary"`、依頼フォームで `summary="..."` の両方を使っている）。
  - 本文は `<slot />`。`DisplayCard.tsx` を削除する。
- **[B-3]** `src/components/contact/ServicesPanel.astro` を作る。Props: `services: Service[]`（`#/models/contact/service.model`）。`key` を外し、マークアップはそのまま移す。`ServicesPanel.tsx` を削除する。
- **[B-4]** `src/components/contact/PriceTable.astro` を作る。Props: `prices: PriceRow[]`（`#/models/contact/price.model`）。`PriceTable.tsx` を削除する。
  - 現在 `contact.astro` は `note={priceNote}` を渡しているが、PriceTable はこれを受け取っていない（`astro check` の ts(2322) の原因）。表示を変えないため、`contact.astro` 側で `note` を渡すのをやめ、`priceNote` の import も外す。
- **[B-5]** `src/components/contact/RequestPanel.astro` を作る。Props: `links: RequestLink[]`（`#/models/contact/request.model`）。
  - 内部の `RequestCard` は別ファイルにせず、`links.map` の中にインラインで展開する（使う場所が1つだけのため）。
  - `OPEN_LABELS` と `ready = link.href !== '#'` の判定はフロントマター／map 内にそのまま移す。`cn(...)` の条件クラスは `class:list` にする。
  - `ArrowUpRight` は `@lucide/astro` から import する。`RequestPanel.tsx` を削除する。
- **[B-6]** `src/pages/contact.astro` の import を `.astro` 版の default import に差し替える（`Accordion`, `DisplayCard`, `ServicesPanel`, `PriceTable`, `RequestPanel`）。`AccordionItem` / `StatusPanel` / `Reveal` は変更しない。

## Phase C: 共通部品と曲カードを .astro 化（PR #3）

- **[C-1]** `src/components/SongLinks.astro` を作る。Props: `youtube?: string`, `niconico?: string`, `piapro?: string`, `class?: string`。テキストリンクを出す現行版のマークアップを移す。
  - 使われていないアイコン関数（`YouTubeIcon` / `NiconicoIcon` / `PiaproIcon`、`astro check` の ts(6133) の原因）は `src/components/icons/{YouTubeIcon,NiconicoIcon,PiaproIcon}.astro` に切り出し、SVG 属性をケバブケースにする。コメントアウトされたアイコン版 SongLinks は、これらを参照する形に書き換えて残す。
  - `SongLinks.tsx` を削除する。
- **[C-2]** `src/components/SongCard.astro` を作る。Props: `song: Song`（`#/models/songs`）。`SongLinks.astro` を使う。`SongCard.tsx` を削除する。
- **[C-3]** `src/components/discography/SquareSongCard.astro` を作る。Props: `song: Song`, `class?: string`。ルート要素は `cn(..., className)` のまま。`SquareSongCard.tsx` を削除する。
  - `discography.astro` 内のコメントアウトされた `HorizontalScrollContainer` の例も `className="hscroll-track-item"` → `class=` に直す。
- **[C-4]** `src/components/SectionHeading.astro` を作る。Props: `kicker: string`, `title: string`。`action` prop は `<slot name="action" />` にする（`index.astro` はすでに `slot="action"` で渡している）。`SectionHeading.tsx` を削除する。
- **[C-5]** `src/components/Footer.astro` を作る。`site`（`#/data/site`）と `new Date().getFullYear()` はフロントマターに移す（ビルド時に評価されるのは今と同じ）。`Footer.tsx` を削除する。
- **[C-6]** `src/pages/index.astro`, `src/pages/discography.astro`, `src/layouts/BaseLayout.astro` の import を `.astro` 版に差し替える。

## Phase D: ドキュメント追記と仕上げ（PR #4）

- **[D-1]** `AGENTS.md` の「プロジェクト構成」に「静的な部品は `.astro` で書く。`.tsx` は state や副作用を持つ island だけにする。静的 `.astro` のアイコンは `@lucide/astro`、island のアイコンは `lucide-react` を使う」を追記する。
- **[D-2]** `grep -rln "from 'react'" src` と `find src/components -name "*.tsx"` で、残っている `.tsx` が island 5 ファイルだけであることを確認する。
- **[D-3]** `pnpm format` で整形する。

---

## 主な変更・新規ファイル
- 変更: `src/pages/{index,contact,discography}.astro`, `src/layouts/BaseLayout.astro`, `src/components/contact/RequestFlow.astro`, `package.json`, `AGENTS.md`
- 新規: `src/components/contact/{Accordion,DisplayCard,ServicesPanel,PriceTable,RequestPanel}.astro`
- 新規: `src/components/{SongLinks,SongCard,SectionHeading,Footer}.astro`, `src/components/discography/SquareSongCard.astro`
- 新規: `src/components/icons/{YouTubeIcon,NiconicoIcon,PiaproIcon}.astro`
- 削除: 上記の `.tsx` 版と `StatusPill.tsx`, `GridSongCard.tsx`, `VerticalSongCard.tsx`, `Artwork.tsx`

## 検証方法
1. `pnpm lint` と `pnpm build` が通ること。今ある `astro check` のエラー4件（SongLinks の ts(6133) ×3、contact.astro の ts(2322)）が 0 件になっていること。
2. [A-4] で保存した `dist/` と新しい `dist/` の `index.html` / `contact.html` / `discography.html` を `diff` し、差分が Astro の scoped 属性や空白などに限られ、要素・クラス・テキストが変わっていないこと。
3. `pnpm dev`（ポート 3000）で `/`, `/contact`, `/discography`, `/news` を目視する。`/contact` ではアコーディオンの開閉、`/contact#price` で料金表が開くこと、依頼フォームのボタンが別タブで開くこと、アイコンが表示されることを確認する。
4. ライト / ダーク切り替えと View Transitions でのページ遷移後もスタイルとテーマが崩れないこと。
5. `pnpm preview`（wrangler dev）で本番相当の配信を確認する。
