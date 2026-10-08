import { useEffect, useState } from "react";
import { Arrow } from "../components/Arrow";

const HALLOWEEN_PRESS_URL =
  "https://prtimes.jp/main/html/rd/p/000000102.000131350.html";

// 最初に旬の話題（ハロウィン）、一定時間ごとに通常の事業CTAへ切り替える
const slides = [
  {
    id: "halloween",
    image: {
      src: "/assets/halloween/namba-stairs-wide.jpg",
      alt: "目玉のアートでラッピングされた難波駅の大階段",
      width: 2048,
      height: 683,
    },
    tag: "2026.10.15–18 なんば広場",
    lines: ["まちが、仮装する。", "ハロウィン、始動。"],
    cta: {
      label: "CHIMNEY TOWN HALLOWEENを見る",
      href: HALLOWEEN_PRESS_URL,
      external: true,
    },
  },
  {
    id: "business",
    image: {
      src: "/assets/generated/osaka-panorama.png",
      alt: "大阪城と公園、ビル群を見渡す大阪の風景を表現した生成ビジュアル",
      width: 2172,
      height: 724,
    },
    tag: null,
    lines: ["大阪のこれからを、", "事業でつくる。"],
    cta: { label: "2社の取り組みを見る", href: "#business", external: false },
  },
];

const INTERVAL_MS = 7000;

export function CityBanner() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(
      () => setActive((current) => (current + 1) % slides.length),
      INTERVAL_MS,
    );
    return () => window.clearTimeout(timer);
  }, [active, paused]);

  return (
    <section
      className="city-banner"
      aria-label="大阪での取り組み"
      aria-roledescription="カルーセル"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((slide, index) => (
        <img
          key={slide.id}
          className={
            "city-slide-image" +
            (index > 0 ? " is-overlay" : "") +
            (index === active ? " is-active" : "")
          }
          src={slide.image.src}
          alt={index === active ? slide.image.alt : ""}
          width={slide.image.width}
          height={slide.image.height}
          loading={index === 0 ? "eager" : "lazy"}
        />
      ))}
      <div className="city-caption page-width">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={
              "city-slide-copy" + (index === active ? " is-active" : "")
            }
            aria-hidden={index !== active}
          >
            <div>
              {slide.tag ? <span className="city-tag">{slide.tag}</span> : null}
              <p>
                {slide.lines[0]}
                <br />
                {slide.lines[1]}
              </p>
            </div>
            <a
              className="city-cta"
              href={slide.cta.href}
              tabIndex={index === active ? undefined : -1}
              target={slide.cta.external ? "_blank" : undefined}
              rel={slide.cta.external ? "noopener noreferrer" : undefined}
            >
              {slide.cta.label}
              <Arrow diagonal={slide.cta.external} />
            </a>
          </div>
        ))}
      </div>
      <div className="city-dots page-width">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={index === active ? "is-active" : undefined}
            aria-label={`${index + 1}枚目を表示`}
            aria-current={index === active}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </section>
  );
}
