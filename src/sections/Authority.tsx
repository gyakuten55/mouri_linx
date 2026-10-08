import { Diagram } from "../components/Diagram";
import { achievementCards } from "../data/editorial";
import { Arrow } from "../components/Arrow";

export function Authority() {
  return (
    <section
      className="about-section section-space"
      id="authority"
      tabIndex={-1}
      aria-labelledby="about-title"
    >
      <div className="page-width">
        <div className="section-heading">
          <p className="eyebrow">
            <span className="section-index">02</span> プロフィール
          </p>
          <span className="section-jp">毛利 英昭</span>
        </div>
        <div className="about-intro">
          <div className="about-narrative">
            <h2 id="about-title">
              不動産から、
              <br />
              大阪の街づくりへ。
            </h2>
            <div className="about-copy">
              <p>
                2009年、10坪の事務所でリンクスを創業。
                <br />
                不動産を通じて、一人ひとりの資産形成に向き合ってきました。
              </p>
              <p>
                現在はMeta
                Osakaでも、テクノロジーやイベントを通じた街づくりに取り組んでいます。人の暮らしと街の魅力、その両方を育てていくことが、私の仕事です。
              </p>
              <div className="about-signature">
                <span>毛利 英昭</span>
                <small>
                  株式会社リンクス / 株式会社Meta Osaka
                  <br />
                  代表取締役社長
                </small>
              </div>
            </div>
          </div>
          <Diagram
            className="activity-graphic"
            src="/assets/generated/osaka-activity.png"
            alt="住まい、事業と体験、大阪の街の魅力が循環する関係を表現した図"
            width={1254}
            height={1254}
            caption="人と街の価値を、事業を通じて育てる。"
          />
        </div>
        <div className="milestones" aria-label="主な実績">
          <div>
            <span>リンクス創業</span>
            <p>
              2009<small>年</small>
            </p>
            <h3>株式会社リンクス設立</h3>
          </div>
          <div>
            <span>刊行した著書</span>
            <p>
              5<small>冊</small>
            </p>
            <h3>不動産から未来の街づくりまで</h3>
          </div>
          <div>
            <span>経営する会社</span>
            <p>
              2<small>社</small>
            </p>
            <h3>リアルとデジタル、ふたつの挑戦</h3>
          </div>
        </div>
        <div className="career-heading">
          <p className="eyebrow">経歴・主な活動</p>
          <p>詳しく見るには各項目を選択</p>
        </div>
        <div className="career-list">
          {achievementCards.map((item, index) => (
            <details className="career-item" key={item.label}>
              <summary>
                <span className="mono">0{index + 1}</span>
                <span className="career-label">{item.label}</span>
                <h3>{withMachiRuby(item.title)}</h3>
                <span className="expand-icon" aria-hidden="true" />
              </summary>
              <div className="career-detail">
                <p>{item.text}</p>
                <p>{item.detail}</p>
                {item.href ? (
                  <a
                    className="text-link"
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {item.label === "Books" ? "著書を見る" : "関連サイトを見る"}
                    <Arrow diagonal />
                  </a>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// 「都市」に「まち」のふりがなを付ける
function withMachiRuby(text: string) {
  return text.split("都市").flatMap((part, index) =>
    index === 0
      ? [part]
      : [
          <ruby key={index}>
            都市<rt>まち</rt>
          </ruby>,
          part,
        ],
  );
}
