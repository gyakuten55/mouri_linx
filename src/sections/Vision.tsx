type VisionData = {
  heading: string;
  text: string;
};

export function Vision({ vision }: { vision: VisionData }) {
  return (
    <section className="section vision" id="vision">
      <div className="section__number">09</div>
      <div className="vision__inner reveal">
        <p className="eyebrow">Vision</p>
        <h2>{vision.heading}</h2>
        <p>{vision.text}</p>
      </div>
    </section>
  );
}
