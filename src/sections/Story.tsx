type StoryItem = {
  title: string;
  text: string;
};

export function Story({ items }: { items: StoryItem[] }) {
  return (
    <section className="section story" id="story">
      <div className="section__number">02</div>
      <div className="story__content">
        <p className="eyebrow">Personal Story</p>
        <h2>人物の輪郭を、余白から立ち上げる。</h2>
        <div className="timeline">
          {items.map((item, index) => (
            <article className="timeline__item reveal" key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
