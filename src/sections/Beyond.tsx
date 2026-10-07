type BeyondItem = {
  title: string;
  text: string;
};

export function Beyond({ items }: { items: BeyondItem[] }) {
  return (
    <section className="section beyond" id="beyond">
      <div className="section__number">05</div>
      <p className="eyebrow reveal">Beyond Real Estate</p>
      <div className="beyond__list">
        {items.map((item) => (
          <article className="wide-row reveal" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
