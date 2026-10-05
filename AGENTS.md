## プロジェクト構成

- フレームワークは Astro（`output: 'static'`）。ページは `src/pages/*.astro`、共通レイアウトは `src/layouts/BaseLayout.astro`。
- React コンポーネント（`.tsx`）は `client:*` を付けなければ静的 HTML として出力される。state や副作用を持つ部品だけ island（`client:load` / `client:visible`）にする。
- ページ遷移は `<ClientRouter />`（View Transitions）。`<html>` の属性は遷移で入れ替わるため、テーマは `astro:after-swap` で再適用している（`BaseLayout.astro`）。
- デプロイは Cloudflare Workers の静的アセット配信（`wrangler.jsonc` の `assets`）。Worker スクリプトは持たない。

## 作業の前に

- `docs/*_PLAN.md` に実装手順書がある場合はそれに従う。
- 変更後は `pnpm lint` と `pnpm build`（`astro check` を含む）を通す。
