# Contact ページ 実装手順書（TanStack Start + Tailwind CSS v4 / アコーディオン UI）

## 背景
Figma の案D（ダークモード、アコーディオン型）をもとに `/contact` ページを実装する。「依頼できること」「商業・同人」「受付状況」「料金表」「依頼フォーム」の 5 項目のうち、最初はタイトルと要約だけを並べ、クリックすると詳細パネルが開く構成にする。あわせて、サイト全体のテーマの初期値を `auto` から `dark` に変更する。
採用しなかった案:
- shadcn/ui の Accordion（Radix）: 依存が 1 つ増えるうえ、今回必要なのは開閉だけなので過剰であるため。
- ネイティブの `<details>`: 開閉アニメーション（`::details-content`）の対応ブラウザに差があり、開いている行のカード背景とシェブロンの反転も state で扱う方が素直であるため。

デザイン: https://www.figma.com/design/seC8v8NTx42KNyHpvNizr4 （下段「D — Accordion / Dark」の 3 フレーム）

前提と方針:
- フレームワークは TanStack Start（`@tanstack/react-start`）と、ファイルベースルーティングの `@tanstack/react-router`。ルートツリーは `src/routeTree.gen.ts` に自動生成される。`/contact/` は `src/routes/contact/index.tsx` として登録済み（現在は仮の中身）。
- スタイルは Tailwind CSS v4 と、`src/styles.css` の CSS 変数（`--paper` / `--paper-sub` / `--ink` / `--ink-soft` / `--rule`）、共通クラス（`.page-wrap` / `.kicker` / `.display` / `.rule-line` / `.nav-link` / `.reveal`）を使う。新しい色は CSS 変数として追加し、Tailwind の任意値（`text-(--accent-open)`）で参照する。
- アイコンは導入済みの `lucide-react`（`ChevronDown`, `ArrowUpRight`）を使う。新しい npm 依存は追加しない。
- 既存のパターンに合わせる:
  - データは `src/models/songs.ts` / `src/models/news.ts` と同じく「型と配列 export、編集箇所を示す日本語コメント」の形にする。
  - ページ見出しは `src/routes/profile.tsx` / `src/routes/news.tsx` の `kicker` → `display` → `rule-line` の並びにする。
  - フェードインは `src/components/Reveal.tsx`、クラスの結合は `src/lib/utils.ts` の `cn` を使う。
- 新規コードの置き場所:
  - データ: `src/models/contact.ts`
  - 純関数: `src/lib/contact.ts`、`src/lib/format.ts` への追記
  - UI: `src/components/contact/` 配下
- 既存コードの変更範囲は次の 4 ファイルだけとする。
  - `src/styles.css`: 色トークンの追加
  - `src/routes/__root.tsx`: `THEME_INIT_SCRIPT` の初期値
  - `src/components/ThemeToggle.tsx`: `getInitialMode` の初期値
  - `src/routes/contact/index.tsx`: 中身の置き換え
- `src/routes/index.tsx` の「依頼メール」の仮セクションは今回触らない（別タスクで `/contact` への導線にする）。

### ファイル構造

```
src/
├── models/
│   └── contact.ts              # 新規: 型と掲載データ（サービス・区分・料金・受付・フォームURL）
├── lib/
│   ├── contact.ts              # 新規: 純関数（月ストリップ生成・最安値・受付サマリ）
│   └── format.ts               # 変更: formatYen を追記
├── components/
│   ├── ThemeToggle.tsx         # 変更: 初期値 'auto' → 'dark'
│   └── contact/                # 新規ディレクトリ
│       ├── Accordion.tsx       # Accordion / AccordionItem（開閉の基盤）
│       ├── StatusPill.tsx      # 「● 受付中 — 2026年12月まで予約あり」ピル
│       ├── ServicesPanel.tsx   # 01 依頼できること
│       ├── CategoryPanel.tsx   # 02 商業・同人
│       ├── StatusPanel.tsx     # 03 受付状況（MonthStrip を内包）
│       ├── PriceTable.tsx      # 04 料金表
│       └── RequestPanel.tsx    # 05 依頼フォーム（RequestCard ×2）
├── routes/
│   ├── __root.tsx              # 変更: THEME_INIT_SCRIPT の初期値を 'dark' に
│   └── contact/
│       └── index.tsx           # 変更: ContactPage に置き換え
└── styles.css                  # 変更: --accent-open トークン追加
```

### コンポーネント構造

```
ContactPage (routes/contact/index.tsx)
└── <main className="page-wrap">
    ├── Hero
    │   ├── p.kicker "Contact"
    │   ├── h1.display "Request"
    │   ├── p リード文
    │   ├── StatusPill                     ← summarizeAvailability() の結果
    │   └── hr.rule-line
    └── Accordion                          ← <div> 罫線区切りのリスト
        ├── AccordionItem id="services" index="01" title="依頼できること" kicker="Services"
        │   │   summary="作曲・編曲・作詞・調声・一括"
        │   └── ServicesPanel services={services}
        ├── AccordionItem id="category" index="02" title="商業・同人" kicker="Category"
        │   │   summary="企業・個人どちらも可"
        │   └── CategoryPanel categories={categories}
        ├── AccordionItem id="status" index="03" title="受付状況" kicker="Status"
        │   │   summary={<span className="text-(--accent-open)">● 受付中 — 12月まで予約あり</span>}
        │   └── StatusPanel months={buildMonthStrip(...)} note={availability.note}
        │       └── MonthStrip（StatusPanel 内のローカル関数コンポーネント）
        ├── AccordionItem id="price" index="04" title="料金表" kicker="Price"
        │   │   summary={`${formatYen(getMinPrice(prices))}〜`}
        │   └── PriceTable prices={prices} note={priceNote}
        └── AccordionItem id="request" index="05" title="依頼フォーム" kicker="Request"
            │   summary="Google Form / FEAT"
            └── RequestPanel links={requestLinks}
                └── RequestCard ×2（RequestPanel 内のローカル関数コンポーネント）
```

### AccordionItem の見た目と状態

```
closed ──(トリガー click / Enter / Space)──▶ open
open   ──(トリガー click / Enter / Space)──▶ closed
※ 各 AccordionItem が自分の開閉 state を持つ。複数を同時に開いてよい。初期状態はすべて closed。
```

| 状態 | 行の背景 | 角丸 | シェブロン | パネル |
|---|---|---|---|---|
| closed | なし（下罫線 `--rule`） | なし | 枠線のみ、`ChevronDown` | `grid-rows-[0fr]`、`inert` |
| open | `bg-(--paper-sub)` + `ring-1 ring-(--rule)` | `rounded-[10px]` | `bg-(--ink)`、アイコンは `text-(--paper)` で 180° 回転 | `grid-rows-[1fr]` |

- 開閉アニメーションは `grid-template-rows` の遷移（`transition-[grid-template-rows] duration-300`）で行う。`prefers-reduced-motion: reduce` の環境ではアニメーションを無効にする。
- ダークモードの配色は `.dark` の既存トークンをそのまま使う（`#0e0e0d` / `#171715` / `#f2f1ec` / `#9a998f`）。追加するのは受付可を示す緑（`--accent-open`）だけにする。

---

## Phase A: テーマ基盤（ダークを初期値に、色トークンの追加）（PR #1）

- **[A-1]** `src/styles.css` の `:root` に `--accent-open: #299a5c;` を、`.dark` に `--accent-open: #5cd68c;` を追加する。
- **[A-2]** `src/routes/__root.tsx` の `THEME_INIT_SCRIPT` で、localStorage に値が無い場合の `mode` の初期値を `'auto'` から `'dark'` に変更する。
  - 変更は `var mode=(...)?stored:'auto'` の末尾 `'auto'` → `'dark'` の 1 か所だけにする。
- **[A-3]** `src/components/ThemeToggle.tsx` の `getInitialMode()` の戻り値を、SSR 時と保存値が無い時の両方で `'dark'` にする。あわせて `useState<ThemeMode>('auto')` の初期値も `'dark'` にする。
- **[A-4]** 既に `theme` を保存しているユーザーの設定は上書きしない（保存値がある場合は従来どおりそれを使う）ことを確認する。

## Phase B: データモデルと純関数（PR #2）

- **[B-1]** `src/models/contact.ts` を作成し、次の型を export する。
  - `Service = { id: string; name: string; nameEn: string; description: string }`
  - `Category = { id: 'commercial' | 'doujin'; name: string; nameEn: string; description: string; terms: string[] }`
  - `PriceRow = { serviceId: string; label: string; commercial: number; doujin: number }`（金額は税込の数値、単位は円）
  - `Availability = { status: 'open' | 'closed'; bookedUntil: string /* YYYY-MM */; note: string }`
  - `RequestLink = { id: 'google-form' | 'feat'; label: string; title: string; description: string; href: string; primary: boolean }`
- **[B-2]** 同じファイルに `services` / `categories` / `prices` / `availability` / `priceNote` / `requestLinks` を export する。
  - 値は Figma 案Dの仮データをそのまま入れ、`songs.ts` と同じ形式の「編集可能範囲」コメントで囲む。
  - `requestLinks[].href` は確定するまで `'#'` とし、`// TODO: 本番URLに差し替え` を付ける。
- **[B-3]** `src/lib/format.ts` に `formatYen(amount: number): string` を追記する。
  - `Intl.NumberFormat('ja-JP')` で `¥50,000` の形式を返す。負数と `NaN` は `'—'` を返す。
- **[B-4]** `src/lib/contact.ts` に `buildMonthStrip(bookedUntil: string, fromYm: string, count = 6): MonthCell[]` を作成する。
  - `MonthCell = { ym: string; year: string; monthLabel: string /* '10月' */; booked: boolean }` を export する。
  - `fromYm`（`YYYY-MM`）から `count` か月分を並べ、`ym <= bookedUntil` なら `booked: true` にする。
  - `bookedUntil` の形式が不正な場合は、全月 `booked: false` を返す（例外は投げない）。
- **[B-5]** `src/lib/contact.ts` に `getMinPrice(prices: PriceRow[]): number` を作成する。`commercial` と `doujin` の全値の最小値を返し、空配列の場合は `NaN` を返す。
- **[B-6]** `src/lib/contact.ts` に `summarizeAvailability(a: Availability): { label: string; short: string; isOpen: boolean }` を作成する。
  - 例: `label: '受付中 — 2026年12月まで予約あり'`、`short: '受付中 — 12月まで予約あり'`
  - `status: 'closed'` の場合は `label: '現在受付停止中'`、`isOpen: false` にする。

## Phase C: アコーディオン基盤コンポーネント（PR #3）

- **[C-1]** `src/components/contact/Accordion.tsx` に `Accordion({ children, className? })` を作成する。
  - 子要素を縦に並べ、各項目の間に `border-t border-(--rule)` の罫線を引く `<div>` にする。
  - 開いている項目の前後は罫線ではなく `gap-2` 相当の余白にする。`AccordionItem` 側で `data-state="open"` を付け、`has-[...]` / `peer` で制御する。
- **[C-2]** 同ファイルに `AccordionItem` を export する。
  - props: `{ id: string; index: string; title: string; kicker: string; summary: ReactNode; defaultOpen?: boolean; children: ReactNode }`
  - `useState(defaultOpen ?? false)` で開閉を持つ。
- **[C-3]** トリガーを `<h3><button type="button" aria-expanded aria-controls={panelId} id={buttonId}>` で実装する。
  - `panelId` と `buttonId` は `useId()` と `id` から作る。
  - ボタン内は左から `index`（`kicker`）、`title`（`text-2xl font-bold`）+ `kicker`、右端に寄せた `summary`（`text-sm text-(--ink-soft)`）、シェブロン（40×40 の円に `ChevronDown`）の順に並べる。
- **[C-4]** パネルを `<div role="region" id={panelId} aria-labelledby={buttonId}>` で実装する。
  - `grid` と `grid-rows-[0fr]` / `grid-rows-[1fr]` で開閉し、内側の要素に `overflow-hidden` を付ける。
  - closed のときはパネルに `inert` を付け、フォーカスが入らないようにする。
- **[C-5]** 「AccordionItem の見た目と状態」の表どおりに、open 時の背景・角丸・シェブロン反転を `cn` と `data-state` で切り替える。
- **[C-6]** スマホ幅（`< sm`、640px 未満）では `summary` を title の下に 1 行で表示し、`truncate` で省略する。シェブロンは常に右端に置く。

## Phase D: 各パネルコンポーネント（PR #4）

- **[D-1]** `src/components/contact/StatusPill.tsx` に `StatusPill({ label, isOpen })` を作成する。
  - 丸いピル（`rounded-full ring-1 ring-(--rule) px-4 py-2.5`）の中に 8px のドットと `label` を並べる。
  - ドットの色は `isOpen` のとき `bg-(--accent-open)`、そうでないとき `bg-(--ink-soft)` にする。
- **[D-2]** `src/components/contact/ServicesPanel.tsx` に `ServicesPanel({ services })` を作成する。
  - 左列（幅 `220px`）に `name` と `nameEn`（`kicker`）、右列に `description` を並べた `<dl>` にする。
  - 行間には `border-(--rule)/60` 相当の罫線を引き、スマホでは 1 列にする。
- **[D-3]** `src/components/contact/CategoryPanel.tsx` に `CategoryPanel({ categories })` を作成する。
  - 2 列のグリッド（スマホは 1 列）に、`bg-(--paper) ring-1 ring-(--rule) rounded-lg p-6` のカードを並べる。
  - 各カードには `name`（`display text-2xl`）、`nameEn`、`description`、`terms` の `<ul>` を表示する。
- **[D-4]** `src/components/contact/StatusPanel.tsx` に `StatusPanel({ months, note })` を作成する。
  - ローカルの `MonthStrip` で `MonthCell[]` を 6 列に並べる（スマホは 3 列 × 2 行）。
  - 各セルは年、月、6px のバー、状態の文字で構成する。予約済みは `bg-(--ink)` と「予約済み」、受付可は `ring-1 ring-(--accent-open)` と「受付可」（`text-(--accent-open)`）にする。
  - バーの色だけに頼らず、状態は必ず文字でも示す。
- **[D-5]** `src/components/contact/PriceTable.tsx` に `PriceTable({ prices, note })` を作成する。
  - `<table>` で `Service` / `商業 / Commercial` / `同人 / Doujin` の 3 列を組み、金額は `formatYen(n) + '〜'` で右寄せにする。
  - 見出しセルは `<th scope="col">`、行見出しは `<th scope="row">` にする。
  - 表の下に `note` を `text-sm text-(--ink-soft)` で表示する。
- **[D-6]** `src/components/contact/RequestPanel.tsx` に `RequestPanel({ links })` を作成する。
  - ローカルの `RequestCard` を 2 列（スマホは 1 列）で並べる。
  - `primary: true` のカードは `bg-(--ink) text-(--paper)`、それ以外は `bg-(--paper) ring-1 ring-(--rule)` にする。
  - ボタンは `<a href target="_blank" rel="noreferrer">` と `ArrowUpRight` アイコンで作る。
  - `href === '#'` の場合は `aria-disabled="true"` を付け、「準備中」と表示する。

## Phase E: ページ統合（PR #5）

- **[E-1]** `src/routes/contact/index.tsx` の中身を `ContactPage` に置き換える。
  - `createFileRoute('/contact/')` の指定はそのまま維持する。
  - `head: () => ({ meta: [{ title: 'Contact — Quearts' }, { name: 'description', content: ... }] })` を追加する。
- **[E-2]** route に `loader: () => ({ currentYm: new Date().toISOString().slice(0, 7) })` を追加する。
  - SSR とクライアントで同じ `currentYm` を使い、月の境目での hydration mismatch を防ぐ。
- **[E-3]** Hero を `profile.tsx` と同じ構成で作る。
  - `kicker` "Contact"、`h1.display text-3xl sm:text-5xl` "Request"、リード文を置く。
  - その右（スマホでは下）に `StatusPill`、最後に `hr.rule-line mt-8` を置く。
- **[E-4]** 「コンポーネント構造」の図のとおりに、`Accordion` と 5 つの `AccordionItem` を並べる。
  - 各 `summary` は `src/lib/contact.ts` の純関数から作る。
  - 料金の要約は `getMinPrice` が `NaN` のときだけ `'—'` にし、それ以外は `formatYen(min) + '〜'` にする。
  - 全体を `Reveal` で包み、`mt-12` を空ける。
- **[E-5]** `/contact#status` のようにハッシュ付きで開いたとき、該当する `id` の項目を `defaultOpen` にする。
  - ハッシュは `useLocation().hash` から取得する。

## Phase F: 仕上げとドキュメント追記（PR #6）

- **[F-1]** `src/styles.css` に `@media (prefers-reduced-motion: reduce)` を追加し、アコーディオンの遷移（`[data-accordion-panel]`）を `transition: none` にする。
- **[F-2]** キーボード操作を確認する。Tab でトリガー間を移動でき、Enter / Space で開閉し、閉じたパネル内にはフォーカスが入らないこと。
- **[F-3]** ライトモードでも崩れないか確認する。open 時のカードと `--accent-open` のコントラストが 4.5:1 以上あること。
- **[F-4]** `src/models/contact.ts` の仮データ（料金・受付月・フォーム URL）を本番の値に差し替える。
- **[F-5]** `README.md` に「Contact ページの料金・受付状況は `src/models/contact.ts` を編集する」ことを追記する。

---

## 主な変更・新規ファイル
- 変更: `src/styles.css`, `src/routes/__root.tsx`, `src/components/ThemeToggle.tsx`, `src/routes/contact/index.tsx`, `src/lib/format.ts`, `README.md`
- 新規: `src/models/contact.ts`
- 新規: `src/lib/contact.ts`
- 新規: `src/components/contact/{Accordion,StatusPill,ServicesPanel,CategoryPanel,StatusPanel,PriceTable,RequestPanel}.tsx`

## 検証方法
1. `pnpm lint` と `pnpm build` が通ること。
2. `pnpm dev` で `http://localhost:3000/contact` を開き、次を確認する。
   - DevTools の Application → Local Storage で `theme` を削除した状態で読み込むと、ダークモードで表示されること。
   - 初期表示で 5 項目がすべて閉じていて、右側の要約が Figma の「D — Accordion / Dark（初期表示）」と一致すること。
   - 各項目をクリックすると開閉し、複数の項目を同時に開けること。
   - `aria-expanded` が開閉に応じて `true` / `false` に切り替わること（DevTools の Elements パネル）。
3. 異常系と境界値を確認する。
   - `availability.bookedUntil` を `'2026-09'`（過去の月）にすると全月が「受付可」になること。
   - `bookedUntil` を `'invalid'` にしても例外が出ずに全月が「受付可」になること。
   - `status: 'closed'` にするとピルと要約が「現在受付停止中」になること。
   - `prices` を空配列にすると、料金の要約が `—〜` ではなく `—` になること（[E-4] の分岐）。
   - `requestLinks[].href` が `'#'` のとき、ボタンが「準備中」になること。
   - `/contact#price` で開くと、料金表が最初から開いていること。
4. DevTools の Rendering で `prefers-reduced-motion: reduce` をエミュレートし、開閉がアニメーションなしで切り替わることを確認する。
5. DevTools のデバイスモード（375px 幅）と実機の iOS Safari / Android Chrome で、要約の省略表示、月ストリップの 3 列 × 2 行、フォームカードの 1 列表示を確認する。`pnpm deploy` 後の本番 URL でも同じ確認を行う。
