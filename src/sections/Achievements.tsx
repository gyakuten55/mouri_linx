type Achievement = {
  label: string;
  value: string;
  note: string;
};

export function Achievements({ items }: { items: Achievement[] }) {
  return (
    <section className="section achievements" id="achievements">
      <div className="section__number">04</div>
      <div className="section__intro reveal">
        <p className="eyebrow">Achievements</p>
        <h2>実績は、人物像を補強するために置く。</h2>
      </div>
      <div className="stats">
        {items.map((item) => (
          <article className="stat reveal" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
            <small>{item.note}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
