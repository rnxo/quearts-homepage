# Astro 移行 実装手順書（TanStack Start → Astro / 静的出力 + React islands + View Transitions / Cloudflare Workers）

## 背景
サイトの中身はほぼ静的（楽曲・ニュース・プロフィール・料金表）で、JS が必要なのはテーマ切替・フェードイン・アコーディオン・依頼フローのダイアログ・月ストリップだけである。TanStack Start は全ページを SSR してから React で hydrate するため、静的な部分にも JS とランタイムが乗る。Astro に移して「全ページ静的 HTML + 必要な箇所だけ React island」にし、配信の単純化と JS 量の削減を行う。
採用しなかった案:
- `/contact` だけ SSR（`prerender = false` + `@astrojs/cloudflare`）: 「今月」を取得するためだけに Worker を通すのは過剰であるため。月ストリップはクライアントで補正する。
- インタラクティブ部品を `.astro` + 素の `<script>` に書き直す: 既存の React 実装を流用する方針（ユーザー決定）のため。ただし Header のスクロール罫線だけは例外とする（後述）。
- songs / news の Content Collections 化: 移行中の挙動差分を増やすため今回は対象外とし、移行後の別タスクにする。

前提と方針:
- 現在はフレームワークが TanStack Start（`@tanstack/react-start`）、ルーティングが `src/routes/` のファイルベース（`src/routeTree.gen.ts` に自動生成）。`vite.config.ts` で `@cloudflare/vite-plugin`、`@mdx-js/rollup`、`@tailwindcss/vite` を使い、`wrangler.jsonc` の `main` に `@tanstack/react-start/server-entry` を指定して Workers にデプロイしている。
- 移行先は Astro（`output: 'static'`）。React は `@astrojs/react`、MDX は `@astrojs/mdx`（GFM 標準対応のため `remark-gfm` は不要）、Tailwind v4 は従来どおり `@tailwindcss/vite` を `vite.plugins` に入れる。
- 配信は Cloudflare Workers の**静的アセット**だけで行い、アダプタ（`@astrojs/cloudflare`）は入れない。`wrangler.jsonc` から `main` を外し、`assets.directory: "./dist"` を指定する。
- **既存の `.tsx` コンポーネントは原則そのまま使う。** Astro では `client:*` を付けない React コンポーネントはビルド時に静的 HTML になり、JS は送られない。書き換えるのは `@tanstack/react-router` に依存する箇所（`Link`、`useLocation`、`useHydrated`、`createFileRoute`）と、MDX を内包する箇所だけにする。
  - `ReactNode` を受け取る props（`SectionHeading.action`、`AccordionItem.summary`、`DisplayCard.summary`）には、`.astro` から名前付きスロット（`<a slot="action">`）で渡す。Astro が名前付きスロットを同名の prop に変換する。
- island にする部品と hydrate 指定:
  | 部品 | 指定 | 理由 |
  |---|---|---|
  | `ThemeToggle` | `client:load` + `transition:persist` | 画面遷移後も state（Light/Dark/Auto の表示）を保持するため |
  | `Reveal` | `client:visible` | 画面に入ったときに hydrate すれば十分なため |
  | `AccordionItem` | `client:visible` | 開閉の state と URL ハッシュを扱うため |
  | `RequestFlowStep` | `client:visible` | `<dialog>` を開閉するため |
  | `StatusPanel` | `client:load` | ページ上部にあり、月を早めに補正したいため |
- Header のスクロール罫線は、`Header.astro` 内の `<script>`（約 10 行）で実装する。Header 全体を React island にすると、ナビのアクティブ表示を遷移ごとに更新する処理と、`ThemeToggle` の `transition:persist` がぶつかるため。
- 既存パターンへの合わせ方:
  - import エイリアス `#/*` は `package.json` の `imports` と `tsconfig.json` の `paths` を維持する。
  - ページ見出しは今と同じ `kicker` → `display` → `rule-line` の並びにする。クラス名とマークアップは `.tsx` から一字一句移す。
  - データは `src/models/*.ts` / `src/data/*.ts` をそのまま使う（編集手順を変えないため）。
- 新規コードの置き場所:
  - レイアウト: `src/layouts/BaseLayout.astro`
  - ページ: `src/pages/`（`src/routes/` は最後の Phase で削除する）
  - Astro 専用の部品: `src/components/*.astro`、`src/components/contact/*.astro`
  - 純関数: `src/lib/nav.ts`（新規）、`src/lib/contact.function.ts`（追記）
- 作業は移行ブランチ `feat/astro-migration` で進め、各 Phase の PR はこのブランチ向けに出す。Phase F が終わってから `main` にマージして切り替える。Phase E までは TanStack のファイルと依存を残し、Phase F でまとめて削除する。

### URL とルーティングの対応

| 現在（`src/routes/`） | 移行後（`src/pages/`） | 出力 |
|---|---|---|
| `__root.tsx` | `src/layouts/BaseLayout.astro` | — |
| `__root.tsx` の `NotFound` | `404.astro` | `dist/404.html` |
| `index.tsx` | `index.astro` | `dist/index.html` |
| `news.tsx` | `news.astro` | `dist/news.html` |
| `profile.tsx` | `profile.astro` | `dist/profile.html` |
| `discography/index.tsx` | `discography.astro` | `dist/discography.html` |
| `contact/index.tsx` | `contact.astro` | `dist/contact.html` |

- `astro.config.mjs` に `build.format: 'file'` と `trailingSlash: 'never'` を指定し、URL を今と同じ `/news`、`/contact` にする。
- Workers 側は `assets.html_handling: "auto-trailing-slash"` で `/news` → `news.html` を返し、`assets.not_found_handling: "404-page"` で 404 を返す。
- TanStack の `defaultPreload: 'intent'` は、Astro の `prefetch: { prefetchAll: true, defaultStrategy: 'hover' }` に置き換える。`scrollRestoration` は `<ClientRouter />` が受け持つ。

### View Transitions とテーマの扱い

```
初回読み込み:  <head> の is:inline スクリプト → applyStoredTheme() → <html> に .dark などを付与 → 描画
画面遷移:      ClientRouter が新しい <html> の属性に入れ替え（.dark が消える）
               → astro:after-swap → applyStoredTheme() を再実行 → 描画（ちらつきなし）
ThemeToggle:   transition:persist で island ごと引き継ぐ → 表示中のモードを保持
```

- `THEME_INIT_SCRIPT` は即時実行の関数式から `window.__applyStoredTheme` という名前付き関数に変え、読み込み時に 1 回呼び、`astro:after-swap` でも呼ぶ。
- head 内の `is:inline` スクリプトは遷移時に再実行されないため、リスナーの登録は 1 回だけになる。

### 月ストリップのクライアント補正

```
ビルド時:   contact.astro が getCurrentYm() でビルド時点の YYYY-MM を求め、StatusPanel の initialYm に渡す
            → HTML にはビルド時点の月で 6 か月分が描画される
hydrate 時: StatusPanel の useEffect で getCurrentYm() を呼び、閲覧時点の月と異なれば state を更新して再描画する
```

- 初回描画を `initialYm` に揃えるので hydration mismatch は起きない。
- 現在の `loader` は `toISOString()`（UTC）で月を求めており、JST の毎月 1 日 0:00〜8:59 に前の月になってしまう。`getCurrentYm` はローカル時刻で求めるように直す。
- `Footer` の年（`new Date().getFullYear()`）はビルド時点の値で固定される。年をまたいだ後の次のデプロイで更新されるので、許容する。

---

## Phase A: Astro 基盤の導入（PR #1）

- **[A-1]** 依存を追加する: `pnpm add astro @astrojs/react @astrojs/mdx` と `pnpm add -D @astrojs/check prettier-plugin-astro eslint-plugin-astro`。
- **[A-2]** `astro.config.mjs` を作成する。
  - `output: 'static'`、`build: { format: 'file' }`、`trailingSlash: 'never'`
  - `integrations: [react(), mdx()]`
  - `vite: { plugins: [tailwindcss()] }`
  - `prefetch: { prefetchAll: true, defaultStrategy: 'hover' }`
  - `server: { port: 3000 }`（README の編集手順が 3000 番ポートを前提にしているため）
- **[A-3]** `tsconfig.json` を Astro 用に変更する。
  - `"extends": "astro/tsconfigs/strict"` を追加し、`include` を `[".astro/types.d.ts", "**/*"]`、`exclude` を `["dist"]` にする。
  - `jsx: "react-jsx"`、`jsxImportSource: "react"`、`paths`（`#/*`、`@/*`）、`noUnused*` 系のチェックは残す。
  - `types` から `vite/client` と `mdx` を外す（Astro が `astro/client` を提供するため）。
- **[A-4]** `package.json` の `scripts` を変更する。
  - `dev: "astro dev"`、`build: "astro check && astro build"`、`preview: "wrangler dev"`、`deploy: "pnpm run build && wrangler deploy"`
  - `generate-routes` は Phase F で削除する。
- **[A-5]** `wrangler.jsonc` を静的アセット配信用に書き換える。
  - `main` と `compatibility_flags` を削除する。
  - `"assets": { "directory": "./dist", "html_handling": "auto-trailing-slash", "not_found_handling": "404-page" }` を追加する。
- **[A-6]** `.gitignore` に `.astro` を追加する。
- **[A-7]** `src/pages/index.astro` に、`<h1>Quearts</h1>` だけの仮ページを置く。`pnpm dev` と `pnpm build` が通り、`dist/index.html` が出力されることを確認する。

## Phase B: レイアウトとテーマ（PR #2）

- **[B-1]** `src/layouts/BaseLayout.astro` を作成する。
  - props: `{ title?: string; description?: string }`。省略時は `title = 'Quearts — Official Site'`、`description = site.description` にする。
  - `<html lang="ja">` の `<head>` に、`charset`、`viewport`、`title`、`description`、`og:title`（`${site.name} — Official Site`）、`og:description`、`og:type=website`、favicon（`/favicon.ico?v=2`）を `__root.tsx` の `head()` と同じ内容で出力する。
  - `import '#/styles.css'` で CSS を読み込む（`?url` と `<link>` は使わない）。
  - `<body>` のクラスは `__root.tsx` の `RootDocument` から一字一句移す。中身は `<Header />` → `<slot />` → `<Footer />` の順にする。
- **[B-2]** `BaseLayout.astro` の `<head>` 先頭に、`<script is:inline>` でテーマ初期化処理を置く。
  - `THEME_INIT_SCRIPT` の処理を `window.__applyStoredTheme = function () { ... }` として定義し、直後に 1 回呼ぶ。
  - 同じスクリプト内で `document.addEventListener('astro:after-swap', window.__applyStoredTheme)` を登録する。
  - localStorage に値が無いときの初期値 `'dark'` は変えない。
- **[B-3]** `BaseLayout.astro` の `<head>` に `import { ClientRouter } from 'astro:transitions'` の `<ClientRouter />` を追加する。
- **[B-4]** `src/lib/nav.ts` に `isActivePath(pathname: string, href: string): boolean` を作成する。
  - `href === '/'` のときは `pathname === '/'` の場合だけ `true` を返す。
  - それ以外は `pathname === href` または `pathname.startsWith(href + '/')` のとき `true` を返す。
  - `pathname` の末尾スラッシュと `.html` は比較前に取り除く。
- **[B-5]** `src/components/Header.astro` を作成し、`Header.tsx` のマークアップを移す。
  - `Link` は `<a href>` にし、`isActivePath(Astro.url.pathname, href)` が `true` のときだけ `class="nav-link is-active"` と `aria-current="page"` を付ける。
  - ナビ項目は `[{ href: '/news', label: 'News' }, ...]` の配列から生成する。
  - `<ThemeToggle client:load transition:persist="theme-toggle" />` を置く。
- **[B-6]** `Header.astro` の `<script>` でスクロール罫線を実装する。
  - `<header data-site-header>` にし、`window` の `scroll`（`passive: true`）で `scrollY > 4` のとき `data-scrolled` 属性を付ける。
  - 罫線の色は `style` ではなく `[&[data-scrolled]]:border-(--rule)` で切り替える（初期は `border-transparent`）。
  - `astro:page-load` でも 1 回判定し、遷移直後の状態を合わせる。
- **[B-7]** `Footer.tsx` は変更せず、`BaseLayout.astro` から `client:*` なしで使う。
- **[B-8]** `src/pages/404.astro` を作成し、`__root.tsx` の `NotFound` を移す（`Link` は `<a href="/">` にする）。`title` は `'404 — Quearts'` にする。

## Phase C: 静的ページの移植（PR #3）

- **[C-1]** `src/pages/index.astro` を `src/routes/index.tsx` の `Home` から移す。
  - `Reveal` は `<Reveal client:visible>` にする。
  - `SectionHeading` の `action` は `<a slot="action" href="/news" class="nav-link text-sm">一覧を見る →</a>` で渡す。
  - `SongCard` は `client:*` なしで使う。現在 `key` が無い `songs.map` は、`.astro` では `key` が不要なのでそのまま移す。
  - 使われていない import（`formatDate`、`profile`、`getNewsSortedByDate`）は移さない。データの参照元（`#/models/news` と `#/models/songs`）は今と同じにする。
- **[C-2]** `src/pages/news.astro` を `src/routes/news.tsx` から移す。`title: 'News — Quearts'` を `BaseLayout` に渡す。
- **[C-3]** `src/pages/profile.astro` を `src/routes/profile.tsx` から移す。`title: 'Profile — Quearts'` を渡す。
- **[C-4]** `src/pages/discography.astro` を作成する。現在は仮ページなので、`<main class="page-wrap ...">` に `kicker` "Discography" と `songs` の `SongCard` 一覧だけを置く。`title: 'Discography — Quearts'` を渡す。
- **[C-5]** `Reveal.tsx` は変更しない。`client:visible` で hydrate したとき、その時点で画面内にあれば `IntersectionObserver` がすぐ発火し、`.is-visible` が付くことを確認する。

## Phase D: Contact ページの移植（PR #4）

- **[D-1]** `src/lib/contact.function.ts` に `getCurrentYm(date: Date = new Date()): string` を追記する。
  - ローカル時刻の `getFullYear()` と `getMonth() + 1` から `YYYY-MM` を返す（`toISOString()` は使わない）。
- **[D-2]** `src/components/contact/StatusPanel.tsx` の props を `{ bookedUntil: string; initialYm: string; note: string }` に変える。
  - `const [currentYm, setCurrentYm] = useState(initialYm)` と、`useEffect(() => setCurrentYm(getCurrentYm()), [])` を追加する。
  - `months` は `buildMonthStrip(bookedUntil, currentYm)` でコンポーネント内で計算する。`MonthStrip` は変更しない。
- **[D-3]** `src/components/contact/AccordionItem.tsx` の hash 対応を、TanStack 非依存に書き換える。
  - `Accordion.tsx` から `AccordionItem` を同名の別ファイルに分ける（island は 1 ファイル 1 export の方が扱いやすいため）。`Accordion` は静的なラッパーとして残す。
  - `defaultOpen` prop を削除し、`useEffect` で `window.location.hash.slice(1) === id` のとき `setOpen(true)` にする。
  - 同じ `useEffect` で `hashchange` を購読し、ハッシュが自分の `id` に変わったら開く（ページ内リンク対応）。
- **[D-4]** `src/components/contact/DisplayCard.tsx` の未定義変数 `open` の参照（`aria-expanded={open}`、`inert={!open}`）を削除する。
  - 開閉しないカードなので `aria-expanded`、`aria-controls`、`inert` を外し、トリガーの `<div>` の `id` 重複（外側と同じ `id`）を `buttonId` に直す。
- **[D-5]** `src/components/contact/RequestFlow.astro` を作成し、`RequestFlow.tsx` の `RequestFlowContainer` を置き換える。
  - 6 つの `.mdx` を import し、`requestFlowItems` を `{ id, name, simpleText, Content }[]` として frontmatter に定義する。
  - 各ステップは `<RequestFlowStep client:visible flowItem={{ id, name, simpleText }}><Content components={{ a: ExternalLink }} /></RequestFlowStep>` で描画する。
  - 矢印の `<li>` と「各カードをクリックすると詳細がでます」の注記は、`RequestFlow.tsx` のマークアップをそのまま移す。`ArrowRight` は `lucide-react` を `client:*` なしで使う。
- **[D-6]** `src/components/contact/ExternalLink.astro` を作成する。`href` が `http` で始まるときだけ `target="_blank" rel="noreferrer"` を付ける（`RequestFlowStep.tsx` の `mdxComponents.a` と同じ挙動）。
- **[D-7]** `src/components/contact/RequestFlowStep.tsx` の props を `{ flowItem: Pick<RequestFlowItem, 'id' | 'name' | 'simpleText'>; children?: ReactNode }` に変える。
  - ダイアログ内では `children` があれば `proseClass` の `<div>` で囲んで表示し、無ければ `simpleText` を表示する。
  - `mdxComponents`、`MDXComponents` の import、コメントアウト済みの react-markdown 版ダイアログを削除する。
- **[D-8]** `src/models/contact.ts` の `RequestFlowItem` から `DescriptionMdx` と `MDXContent` の import を削除する。
- **[D-9]** `src/pages/contact.astro` を `src/routes/contact/index.tsx` から移す。
  - `title: 'Contact — Quearts'` と、`head()` と同じ `description` を `BaseLayout` に渡す。
  - `status`、`priceSummary`、`initialYm = getCurrentYm()` を frontmatter で計算する。
  - `summary` は `<span slot="summary">` で渡す。
  - `<StatusPanel client:load bookedUntil={availability.bookedUntil} initialYm={initialYm} note={availability.note} />`
  - `AccordionItem` は 3 つとも `client:visible` にする。`ServicesPanel`、`PriceTable`、`RequestPanel`、`DisplayCard` は `client:*` なしで使う。
  - `useLocation`、`useHydrated`、`loader` は使わない。

## Phase E: View Transitions と island の挙動調整（PR #5）

- **[E-1]** `ThemeToggle` が遷移後もモード表示を保持し、`<html>` のクラスと一致していることを確認する。ずれる場合は `ThemeToggle.tsx` の `useEffect` で `astro:after-swap` を購読し、`getInitialMode()` で state を同期する。
- **[E-2]** `Reveal` が遷移後のページでも動くことを確認する。遷移先で `.reveal` が透明のまま残る場合は、`BaseLayout.astro` の `<main>` に `transition:animate="fade"` を付け、`client:visible` の再 hydrate を確認する。
- **[E-3]** 別ページから `/contact#price` に遷移したとき、[D-3] の `useEffect` で料金表が開き、`scroll-mt-24` の位置までスクロールすることを確認する。スクロールしない場合は、開いた直後に `document.getElementById(id)?.scrollIntoView()` を呼ぶ。
- **[E-4]** `@media (prefers-reduced-motion: reduce)` のとき、View Transitions のアニメーションが無効になることを確認する（ClientRouter の標準挙動）。

## Phase F: TanStack の撤去とドキュメント更新（PR #6）

- **[F-1]** 次のファイルとディレクトリを削除する: `src/routes/`、`src/router.tsx`、`src/routeTree.gen.ts`、`tsr.config.json`、`vite.config.ts`、`.cta.json`、`.tanstack/`、`src/components/Header.tsx`、`src/components/contact/RequestFlow.tsx`。
- **[F-2]** 依存を削除する: `@tanstack/react-start`、`@tanstack/react-router`、`@tanstack/react-router-devtools`、`@tanstack/react-devtools`、`@tanstack/devtools-vite`、`@tanstack/router-cli`、`@cloudflare/vite-plugin`、`@mdx-js/rollup`、`@types/mdx`、`@vitejs/plugin-react`、`vite`、`react-markdown`、`remark-gfm`。
  - `@tanstack/eslint-config` は lint ルールとしてだけ使っているので残す。
  - `package-lock.json` を削除して `pnpm-lock.yaml` に一本化する（`pnpm` を使うため）。
- **[F-3]** `package.json` から `generate-routes` を削除する。
- **[F-4]** `eslint.config.js` に `eslint-plugin-astro` の `configs['flat/recommended']` を追加する。`prettier.config.js` の `plugins` に `prettier-plugin-astro` を追加し、`*.astro` に `parser: 'astro'` を指定する。
- **[F-5]** `README.md` を更新する。
  - 冒頭の構成説明を「Astro + React + Tailwind CSS、Cloudflare Workers（静的アセット）」に変える。
  - 「Queartsさんへ」の手順は、`pnpm dev` とポート 3000 が変わらないので、そのまま残す。
  - 実素材の差し替え表に、`src/models/contact.ts`（料金・受付状況）と `src/components/contact/flow-item-md/*.mdx`（依頼の流れ）を追記する。
- **[F-6]** `AGENTS.md` の `@tanstack/intent` によるスキル読み込み手順を削除または Astro 向けに改め、`.cursorrules` に TanStack 前提の記述があれば同様に直す。
- **[F-7]** `feat/astro-migration` を `main` にマージし、`pnpm deploy` で本番に反映する。

---

## 主な変更・新規ファイル
- 変更: `package.json`, `tsconfig.json`, `wrangler.jsonc`, `.gitignore`, `eslint.config.js`, `prettier.config.js`, `README.md`, `AGENTS.md`
- 変更: `src/lib/contact.function.ts`, `src/models/contact.ts`
- 変更: `src/components/contact/{StatusPanel,Accordion,DisplayCard,RequestFlowStep}.tsx`
- 新規: `astro.config.mjs`
- 新規: `src/layouts/BaseLayout.astro`
- 新規: `src/pages/{index,news,profile,discography,contact,404}.astro`
- 新規: `src/components/Header.astro`, `src/components/contact/{RequestFlow,ExternalLink}.astro`, `src/components/contact/AccordionItem.tsx`
- 新規: `src/lib/nav.ts`
- 削除: `src/routes/`, `src/router.tsx`, `src/routeTree.gen.ts`, `tsr.config.json`, `vite.config.ts`, `.cta.json`, `src/components/Header.tsx`, `src/components/contact/RequestFlow.tsx`, `package-lock.json`

## 検証方法
1. `pnpm lint` と `pnpm build`（`astro check && astro build`）が通ること。`dist/` に `index.html`、`news.html`、`profile.html`、`discography.html`、`contact.html`、`404.html` が出力され、`_worker.js` が無いこと。
2. `pnpm dev` で `http://localhost:3000` を開き、移行前の本番サイトと見比べて次を確認する。
   - 全ページで見た目（余白・フォント・色）が移行前と一致すること。ライト・ダーク・Auto の 3 モードで確認する。
   - DevTools の Network（JS フィルタ）で `/news` と `/profile` を開いたとき、読み込まれる JS が `ThemeToggle` と `Reveal` の island、React ランタイム、ClientRouter だけであること。
   - ヘッダーのリンクで遷移したとき、ページ全体が再読み込みされず（Network の Doc が増えない）、テーマのちらつきが無く、`ThemeToggle` の表示が維持されること。
   - 遷移先のナビで `is-active` と `aria-current="page"` が付いていること。
   - スクロールするとヘッダー下に罫線が出て、先頭に戻すと消えること。
   - `/contact` でアコーディオンの開閉、依頼フローのカードのクリックでダイアログが開くこと、ダイアログ内の外部リンクが新しいタブで開くことを確認する。
3. 異常系と境界値を確認する。
   - DevTools の Application → Local Storage で `theme` を削除して読み込むと、ダークモードで表示されること。
   - `/contact#price` を直接開いたとき、および `/` から `/contact#price` へ遷移したときに、料金表が開いていること。
   - `contact.astro` の `initialYm` を一時的に `'2000-01'` に変えると、ビルド後の HTML は 2000 年 1 月始まりで、hydrate 後に今月始まりへ切り替わること（確認後に戻す）。
   - `availability.bookedUntil` を `'invalid'` にすると、全月が「受付可」になること。`status: 'closed'` にすると、「現在受付停止中」が表示されること。
   - 存在しない URL（`/foo`）で 404 ページが表示されること。`pnpm preview`（`wrangler dev`）ではステータスコードが 404 であること。
   - DevTools の Rendering で `prefers-reduced-motion: reduce` をエミュレートしたとき、アコーディオンと画面遷移のアニメーションが無効になること。
4. `pnpm preview`（`wrangler dev`）で `/news` と `/news/` の両方が表示されることを確認する。`pnpm deploy` 後の本番 URL を、実機の iOS Safari と Android Chrome で開き、2〜3 の項目を確認する。
