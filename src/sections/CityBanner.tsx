import { Arrow } from "../components/Arrow";

export function CityBanner() {
  return (
    <section className="city-banner" aria-label="大阪での取り組み">
      <img
        src="/assets/generated/osaka-panorama.png"
        alt="大阪城と公園、ビル群を見渡す大阪の風景を表現した生成ビジュアル"
        width="2172"
        height="724"
        loading="lazy"
      />
      <div className="city-caption page-width">
        <div>
          <p>
            大阪のこれからを、
            <br />
            事業でつくる。
          </p>
          <a className="city-cta" href="#business">
            2社の取り組みを見る
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
