import { Arrow } from "../components/Arrow";
export function Contact() {
  return (
    <>
      <section
        className="contact-section section-space page-width"
        id="contact"
        tabIndex={-1}
        aria-labelledby="contact-title"
      >
        <div>
          <p className="eyebrow">
            <span className="section-index">05</span> お問い合わせ
          </p>
          <h2 id="contact-title">まずは、お話ししませんか。</h2>
          <p>
            不動産のご相談から、事業連携、取材のご依頼まで。
            <br />
            ご用件に合わせて、各社の窓口へお問い合わせください。
          </p>
        </div>
        <div className="contact-options">
          <a
            href="https://linx-osaka.co.jp/property/soudan/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              <small>株式会社リンクス</small>
              <strong>不動産投資・資産形成のご相談</strong>
            </span>
            <Arrow diagonal />
          </a>
          <a
            href="https://www.meta-osaka.co.jp/contact"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              <small>株式会社Meta Osaka</small>
              <strong>事業連携・取材・その他のお問い合わせ</strong>
            </span>
            <Arrow diagonal />
          </a>
          <p>各社公式サイトのお問い合わせ窓口へ移動します。</p>
        </div>
      </section>
      <footer className="site-footer page-width">
        <div className="footer-top">
          <a className="personal-wordmark" href="#top">
            <span>毛利 英昭</span>
            <small>HIDEAKI MOURI</small>
          </a>
          <p>
            大阪を、世界一おもろい<ruby>都市<rt>まち</rt></ruby>にする。
          </p>
          <a href="#top" className="back-top mono">
            ページの先頭へ <span>↑</span>
          </a>
        </div>
        <div className="footer-bottom mono">
          <span>© {new Date().getFullYear()} HIDEAKI MOURI</span>

          <a
            href="https://linx-osaka.co.jp/privacypolicy.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            プライバシーポリシー ↗
          </a>
        </div>
      </footer>
    </>
  );
}
