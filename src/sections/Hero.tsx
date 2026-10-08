import { Arrow } from "../components/Arrow";
import { profile } from "../data/profile";

export function Hero() {
  return (
    <section
      className="profile-cover page-width"
      id="top"
      tabIndex={-1}
      aria-labelledby="hero-title"
    >
      <div className="cover-layout">
        <div className="cover-copy">
          <p className="cover-role">
            株式会社リンクス / 株式会社Meta Osaka
            <br />
            <span>代表取締役社長</span>
          </p>
          <h1 id="hero-title">
            <span>大阪を、世界一</span>
            <span>
              おもろい<ruby>都市<rt>まち</rt></ruby>にする。
            </span>
          </h1>
          <p className="cover-description">
            不動産とテクノロジーを通じて、
            <br />
            人の暮らしと、大阪の未来に向き合う。
          </p>
          <div className="cover-signature">
            <p>毛利 英昭</p>
            <span>Hideaki Mouri</span>
          </div>
          <a className="cover-profile-link" href="#authority">
            プロフィールを見る
            <Arrow />
          </a>
        </div>
        <figure className="cover-photograph">
          <img
            src={profile.portraitSrc}
            alt="株式会社リンクス・株式会社Meta Osaka代表、毛利英昭"
            width="1440"
            height="2160"
            fetchPriority="high"
          />
        </figure>
      </div>
      <div className="cover-companies">
        <p>
          大阪を拠点に、
          <br />
          ふたつの事業を経営しています。
        </p>
        <a
          href="https://linx-osaka.co.jp/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>
            <strong>LINX</strong>
            <small>不動産・資産形成</small>
          </span>
          <Arrow diagonal />
        </a>
        <a
          href="https://www.meta-osaka.co.jp/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>
            <strong>Meta Osaka</strong>
            <small>テクノロジー・街づくり</small>
          </span>
          <Arrow diagonal />
        </a>
      </div>
    </section>
  );
}
