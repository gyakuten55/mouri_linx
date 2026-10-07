type PersonalItem = {
  title: string;
  text: string;
};

export function Personal({ items }: { items: PersonalItem[] }) {
  return (
    <section className="section personal" id="personal">
      <div className="section__number">08</div>
      <div className="personal__content reveal">
        <p className="eyebrow">Personal</p>
        <h2>仕事の外側にある、人間味を少しだけ。</h2>
        <div className="tag-list">
          {items.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
