type PhilosophyItem = {
  title: string;
  text: string;
};

export function Philosophy({ items }: { items: PhilosophyItem[] }) {
  return (
    <section className="section philosophy" id="philosophy">
      <div className="section__number">01</div>
      <div className="section__intro reveal">
        <p className="eyebrow">Philosophy</p>
        <h2>考え方に、静かな筋が通っている。</h2>
      </div>
      <div className="philosophy__grid">
        {items.map((item) => (
          <article className="line-card reveal" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
