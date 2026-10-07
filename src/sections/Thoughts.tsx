type Thought = {
  category: string;
  title: string;
  excerpt: string;
};

export function Thoughts({ items }: { items: Thought[] }) {
  return (
    <section className="section thoughts" id="thoughts">
      <div className="section__number">06</div>
      <div className="section__intro reveal">
        <p className="eyebrow">Thoughts</p>
        <h2>考えを蓄積し、信頼の奥行きにする。</h2>
      </div>
      <div className="article-grid">
        {items.map((item) => (
          <article className="article-card reveal" key={item.category}>
            <span>{item.category}</span>
            <h3>{item.title}</h3>
            <p>{item.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
