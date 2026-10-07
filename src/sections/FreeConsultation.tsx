import { FormEvent, useState } from "react";

const contactEmail = "hello@example.com";

export function FreeConsultation() {
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const prefecture = String(data.get("prefecture") ?? "");
    const email = String(data.get("email") ?? "");
    const topic = String(data.get("topic") ?? "");
    const message = String(data.get("message") ?? "");
    const body = [
      `お名前: ${name}`,
      `お住まいの都道府県: ${prefecture}`,
      `メールアドレス: ${email}`,
      `相談内容: ${topic}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(
      "無料相談の申し込み",
    )}&body=${encodeURIComponent(body)}`;
    setStatus("メール作成画面を開きます。");
  }

  return (
    <section className="section consultation" id="consultation">
      <span className="section__number" aria-hidden="true">
        01
      </span>
      <div className="consultation__grid">
        <div className="section__intro reveal">
          <p className="eyebrow">Free Consultation</p>
          <h2>まずは、無料相談から。</h2>
          <p>
            不動産投資、会社づくり、資料請求まで。最初の接点として、温度感を確かめるための相談フォームです。
          </p>
          <a className="section-link" href="/">
            トップへ戻る
          </a>
        </div>

        <form className="consultation-form reveal" onSubmit={handleSubmit}>
          <label>
            <span>お名前</span>
            <input name="name" type="text" autoComplete="name" required />
          </label>
          <label>
            <span>お住まいの都道府県</span>
            <input name="prefecture" type="text" autoComplete="address-level1" />
          </label>
          <label>
            <span>メールアドレス</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            <span>相談内容</span>
            <select name="topic" defaultValue="無料相談">
              <option>無料相談</option>
              <option>問い合わせ</option>
              <option>資料ダウンロード</option>
            </select>
          </label>
          <label className="consultation-form__wide">
            <span>メッセージ</span>
            <textarea name="message" rows={5} />
          </label>
          <button className="consultation-form__button" type="submit">
            無料相談を申し込む
          </button>
          <p className="consultation-form__note">資料請求もこちらから受け付けています。</p>
          {status ? (
            <p className="consultation-form__status" role="status">
              {status}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
