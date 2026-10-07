import { Diagram } from "../components/Diagram";
import { Arrow } from "../components/Arrow";
const businesses = [
  {
    number: "01",
    name: "LINX",
    japaneseName: "株式会社リンクス",
    category: "不動産・資産形成",
    url: "https://linx-osaka.co.jp/",
    title: "不動産投資と資産形成を支える。",
    lead: "大阪ワンルームマンション投資を軸に、資産形成の入口から運用まで。一人ひとりの人生設計に寄り添い、長く続く価値をつくる。",
    points: ["不動産投資", "資産形成", "賃貸管理"],
  },
  {
    number: "02",
    name: "Meta Osaka",
    japaneseName: "株式会社Meta Osaka",
    category: "テクノロジー・街づくり",
    url: "https://www.meta-osaka.co.jp/",
    title: "デジタルとリアルで街をおもしろく。",
    lead: "メタバース、XR、AI、そしてリアルイベント。デジタルと現実をつなぎ、大阪から新しい体験と街の未来を生み出す。",
    points: ["メタバース・Roblox", "XR・AI", "リアルイベント"],
  },
];
export function BusinessPortfolio() {
  return (
    <section
      className="business-section section-space"
      id="business"
      tabIndex={-1}
      aria-labelledby="business-title"
    >
      <div className="page-width">
        <div className="section-heading">
          <p className="eyebrow">
            <span className="section-index">04</span> 事業
          </p>
          <span className="section-jp">経営する事業</span>
        </div>
        <div className="business-overview">
          <div className="business-overview-copy">
            <h2 id="business-title">
              大阪で取り組む、
              <br />
              ふたつの事業。
            </h2>
            <p>
              住まいや資産形成を支えるリンクス。
              <br />
              新しい体験をつくるMeta Osaka。
              <br />
              異なる事業から、大阪の価値を高めていきます。
            </p>
          </div>
          <Diagram
            className="business-graphic"
            src="/assets/generated/osaka-business.png"
            alt="リンクスの不動産事業とMeta Osakaのデジタル事業が、ともに大阪の価値を高める関係図"
            width={1536}
            height={1024}
            caption="2社の事業と、大阪との関わり。"
          />
        </div>
        <div className="business-grid">
          {businesses.map((business) => (
            <article className="business-item" key={business.name}>
              <div className="business-top mono">
                <span>
                  {business.number} / {business.category}
                </span>
                <span>大阪</span>
              </div>
              <h3>
                {business.name}
                <span>{business.japaneseName}</span>
              </h3>
              <h4>{business.title}</h4>
              <p>{business.lead}</p>
              <ul>
                {business.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <a
                className="business-link"
                href={business.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>公式サイトを見る</span>
                <span className="circle-arrow">
                  <Arrow diagonal />
                </span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
