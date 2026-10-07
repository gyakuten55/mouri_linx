# 2026-09-29 採用画像と出典

## 生成画像

生成方法: ChatGPT の組み込み画像生成（image_gen）。図解は両社の事業を説明する概念図であり、実際の建築計画ではありません。

- `public/assets/generated/osaka-panorama.png` — 2172×724。トップ下の大阪城パノラマ。生成画像。
- `public/assets/generated/osaka-activity.png` — 1254×1254、透過PNG。プロフィールの活動概念図。
- `public/assets/generated/osaka-business.png` — 1536×1024、透過PNG。リンクスとMeta Osakaの事業概念図。

以前の activity-cycle.png と business-relationship.png はサイトでは未使用です。

## 人物写真・デザイン参照

人物写真は生成せず、リンクス公式サイトの代表者写真を使用しています。

- 掲載元: https://linx-osaka.co.jp/outline.html
- 画像元: https://linx-osaka.co.jp/_src/74802316/_dsc0550_r.jpg?v=1788190319988
- 保存先: `public/assets/official/mouri-linx.jpg`
- 参照: https://linx-osaka.co.jp/ 、https://www.meta-osaka.co.jp/ 、https://www.meta-osaka.co.jp/company

## 採用図解の生成プロンプト

### osaka_business_v4

Create an original transparent PNG infographic for Hideaki Mouri, who leads LINX real estate and Meta Osaka technology. Landscape 3:2. A sophisticated architectural model of ONE Osaka neighborhood divided into two connected complementary halves: left is tangible real estate, several finely detailed white apartment buildings on a thin navy architectural model base; right is the digital version of the SAME city, partially translucent pale blue architectural volumes with fine cyan network traces and just a tiny muted pink accent. In the center a thin broad translucent bridge joins them. Restrained realistic architectural maquette rendering, precise model detail, subtle material depth and ambient occlusion confined to objects, mature enterprise communication, NOT toy 3D, NOT clip art. Use mostly white, navy #173957, pale cool grey, restrained blue #5eabc4 and a tiny Meta Osaka pink #bd7099. Simple elegant Japanese typography outside the city model: below the left half exact text 'LINX' then smaller '不動産・資産形成'; below the right half exact text 'Meta Osaka' then smaller 'デジタル・街づくり'. A thin navy bracket connects both captions downward to centered exact text '大阪の価値を高める'. Plenty of breathing room. Text navy, clean Japanese sans serif, no serif fonts. No spheres, no circular nodes, no glass cards, no decorative infinity ribbons, no saturated gradients, no heavy dark outlines, no logos, no stock line icons. Actual transparent alpha background including all negative space, NO white rectangular backdrop, NO checkerboard, no floor or horizon. Entire illustration and every caption safely inside 7% margins. This should read as a refined diagram of real and digital Osaka, not a futuristic fantasy city. Ensure all Japanese characters are exact and large enough to read at 600px wide.

### osaka_activity_v4

Create an original square transparent PNG explanatory infographic for a Japanese business leader devoted to Osaka. Three interconnected scenes, designed as a refined architectural model diagram: TOP LEFT a small cluster of realistically proportioned white apartment buildings representing homes, TOP RIGHT a compact elegant public event venue with a few tiny abstract human silhouettes representing business activity and experiences, BOTTOM CENTER a carefully proportioned miniature Osaka Castle with a few small city buildings and park trees representing the city's appeal. Delicate curved muted blue arrow-paths connect the three scenes clockwise, thoughtfully routed through negative space. Three EXACT labels set as clean navy Japanese sans-serif typography near their own scene: '人の暮らし' at top left, '事業と体験' at top right, '街の魅力' at bottom center. Nothing else written. Scenes rest on exceptionally thin architectural model plates, not chunky pedestals. Mostly white and soft silver-grey models, navy #173957, restrained pale blue #a5cddb, one tiny dusty pink #bd7099 accent in the event venue. High-end urban planning maquette aesthetic, realistic detail, subtle dimensional richness, soft natural directional light, enough contrast for white models to stand out on a pale off-white webpage. No spheres, no bubble charts, no flat clip-art icons, no thick outline drawing, no dramatic glow, no glossy toys, no stock corporate handshake. ORIGINAL composition, not a generic three-circle cycle chart. Preserve large clear transparent negative space between scenes. True transparent PNG alpha background, no white rectangle, no checkerboard, no continuous background ground plane. All models, connecting paths and labels fully within 8% safe margins. Clear hierarchy and generous space so the graphic is easy to understand at 480px wide.


