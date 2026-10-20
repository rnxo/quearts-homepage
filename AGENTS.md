## プロジェクト構成

- フレームワークは Astro（`output: 'static'`）。ページは `src/pages/*.astro`、共通レイアウトは `src/layouts/BaseLayout.astro`。
- 静的な部品は `.astro` で書く。React コンポーネント（`.tsx`）は state や副作用を持つ island（`client:load` / `client:visible`）だけにする。`.tsx` から `.astro` は import できないので、island の中で使う部品は `.tsx` のままにする。
- アイコンは、静的な `.astro` では `@lucide/astro`、island では `lucide-react` を使う。
- ページ遷移は `<ClientRouter />`（View Transitions）。`<html>` の属性は遷移で入れ替わるため、テーマは `astro:after-swap` で再適用している（`BaseLayout.astro`）。
- デプロイは Cloudflare Workers の静的アセット配信（`wrangler.jsonc` の `assets`）。Worker スクリプトは持たない。

## 作業の前に

- `docs/*_PLAN.md` に実装手順書がある場合はそれに従う。
- 変更後は `pnpm lint` と `pnpm build`（`astro check` を含む）を通す。
