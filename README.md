# HIDEAKI MOURI — Personal Website

毛利英昭氏（株式会社リンクス / 株式会社Meta Osaka 代表取締役社長）の一枚構成のパーソナルサイトです。React + TypeScript + Viteで構築しています。

## 開発

```bash
pnpm install
pnpm dev
```

http://127.0.0.1:5173/ で表示できます。

## ビルド

```bash
pnpm build
pnpm preview
```

型チェック、Viteのビルド、既存Sites向けサーバーの生成を行います。ビルドや開発サーバー起動によって公開・デプロイはされません。

## ページ構成

人物紹介 → 大阪の風景 → Journal（動画）→ About（経歴・活動）→ Books（著書）→ Business（2社の事業）→ Contact。

- 固定ナビゲーション、現在位置表示、スマートフォン用メニュー
- キーボード操作・Escapeで閉じられるメニュー、本文へのスキップリンク
- ネイティブdetailsによる経歴の開閉
- モーション低減設定への対応
- YouTube動画の取得と、取得できない場合のピックアップ表示
- 各社公式サイトの実際の問い合わせ窓口へのリンク
- 旧 `/consultation` は同一ページ内の `/#contact` に誘導

## 主な編集箇所

- 氏名・人物写真: `src/data/profile.ts`、`src/sections/Hero.tsx`
- 経歴・著書: `src/data/editorial.ts`
- 事業紹介: `src/sections/BusinessPortfolio.tsx`
- 問い合わせ窓口: `src/sections/Contact.tsx`
- 動画表示・ピックアップ: `src/sections/YouTubeLatest.tsx`
- 動画取得: `scripts/sites-worker.js`
- 全体のデザイン・レスポンシブ調整: `src/styles/global.css`

YouTube APIは開発・プレビュー時にもViteのミドルウェア経由で動作します。YouTubeの公開フィードを使い、取得結果を30分キャッシュします。外部取得が失敗した場合は最新と表示せず、選定済みの動画を掲載します。

写真・書影は元のプロジェクト素材を使用しています。日本語見出しはGoogle FontsのNoto Serif JPを使用し、利用できない場合は端末の明朝体へフォールバックします。

## 追加したビジュアル

トップ下の大阪のパノラマ、プロフィールの循環図、2社の事業関係図はChatGPTの画像生成で作成しています。図解は実際のアルファチャンネルを持つPNGです。クリック・タップで拡大でき、Escapeまたは「閉じる」で戻れます。

画像: `public/assets/generated/`。使用したプロンプトと採用画像の記録: `docs/image-prompts.md`。
