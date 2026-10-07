type Profile = {
  company: string;
};

export function AboutBusiness({ profile }: { profile: Profile }) {
  return (
    <section className="section business" id="business">
      <div className="section__number">03</div>
      <div className="business__text reveal">
        <p className="eyebrow">LINX / Business</p>
        <h2>会社を語る前に、どんな姿勢で仕事をしているかを伝える。</h2>
        <p>
          会社説明を主役にしすぎず、経営者の判断基準や仕事への向き合い方から信頼感を作るセクションです。
        </p>
      </div>
    </section>
  );
}
