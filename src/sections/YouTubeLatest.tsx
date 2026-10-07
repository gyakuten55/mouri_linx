import { useEffect, useState } from "react";
import { Arrow } from "../components/Arrow";

type Video = {
  id: string;
  title: string;
  publishedAt?: string;
  publishedText?: string;
  url: string;
  thumbnail: string;
};
const channelUrl = "https://www.youtube.com/@fudousan_channel/videos";
const selectedVideos: Video[] = [
  {
    id: "YTihVw2ci9U",
    title: "台湾が日本超え！？昔とは全く違う経済と不動産事情",
    url: "https://www.youtube.com/watch?v=YTihVw2ci9U",
    thumbnail: "https://i.ytimg.com/vi/YTihVw2ci9U/hqdefault.jpg",
  },
  {
    id: "rMToqQbry74",
    title:
      "【特別対談】今、地方のど田舎がめちゃ熱い！「リゾート民泊」がすごすぎた！",
    url: "https://www.youtube.com/watch?v=rMToqQbry74",
    thumbnail: "https://i.ytimg.com/vi/rMToqQbry74/hqdefault.jpg",
  },
  {
    id: "B4fCMu0d-H4",
    title: "2026年もやっぱり1R不動産投資が良い7つの理由",
    url: "https://www.youtube.com/watch?v=B4fCMu0d-H4",
    thumbnail: "https://i.ytimg.com/vi/B4fCMu0d-H4/hqdefault.jpg",
  },
  {
    id: "jv44rNTQGPs",
    title: "クボタの跡地にできる難波のアリーナ",
    url: "https://www.youtube.com/watch?v=jv44rNTQGPs",
    thumbnail: "https://i.ytimg.com/vi/jv44rNTQGPs/hqdefault.jpg",
  },
];
const dateFormatter = new Intl.DateTimeFormat("ja-JP", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
function videoDate(video: Video) {
  const date = video.publishedAt ? new Date(video.publishedAt) : null;
  return date && Number.isFinite(date.getTime())
    ? dateFormatter.format(date).replaceAll("/", ".")
    : video.publishedText || "YOUTUBE";
}
function isVideo(value: unknown): value is Video {
  if (!value || typeof value !== "object") return false;
  const video = value as Record<string, unknown>;
  return (
    typeof video.id === "string" &&
    /^[\w-]{11}$/.test(video.id) &&
    typeof video.title === "string"
  );
}
function Thumbnail({ video }: { video: Video }) {
  const [failed, setFailed] = useState(false);
  return (
    <img
      className={failed ? "image-fallback" : undefined}
      src={failed ? "/assets/osaka-castle-hero.png" : video.thumbnail}
      alt=""
      width="480"
      height="270"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
export function YouTubeLatest() {
  const [videos, setVideos] = useState(selectedVideos);
  const [isLatest, setIsLatest] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    async function load() {
      try {
        const response = await fetch("/api/youtube/latest", {
          signal: controller.signal,
        });
        if (
          !response.ok ||
          !response.headers.get("content-type")?.includes("application/json")
        )
          return;
        const data = (await response.json()) as {
          videos?: unknown[];
          fallback?: boolean;
        };
        if (
          controller.signal.aborted ||
          data.fallback ||
          !Array.isArray(data.videos)
        )
          return;
        const latest = data.videos
          .filter(isVideo)
          .slice(0, 4)
          .map((video) => ({
            ...video,
            url: `https://www.youtube.com/watch?v=${video.id}`,
            thumbnail: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
          }));
        if (latest.length) {
          setVideos(latest);
          setIsLatest(true);
        }
      } catch {
        /* Selected videos remain available when the feed is offline. */
      } finally {
        window.clearTimeout(timeout);
      }
    }
    void load();
    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, []);
  const [featured, ...others] = videos;
  return (
    <section
      className="journal-section section-space page-width"
      id="youtube-latest"
      tabIndex={-1}
      aria-labelledby="journal-title"
    >
      <div className="section-heading">
        <p className="eyebrow">
          <span className="section-index">01</span> 発信
        </p>
        <span className="section-jp">YouTube</span>
      </div>
      <div className="section-title-row">
        <h2 id="journal-title" className="journal-title">
          大阪と不動産の、いま。
        </h2>
        <div className="journal-intro">
          <p>
            不動産投資や大阪の変化について、
            <br />
            毛利自身の言葉でお伝えしています。
          </p>
          <a
            className="text-link"
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTubeを見る
            <Arrow diagonal />
          </a>
        </div>
      </div>
      <div className="journal-grid">
        <a
          className="video-feature"
          href={featured.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="video-image">
            <Thumbnail video={featured} key={featured.id} />
            <span className="play-icon" aria-hidden="true">
              ▶
            </span>
          </div>
          <div className="video-meta mono">
            <span>{isLatest ? "最新の動画" : "ピックアップ"}</span>
            <span>{videoDate(featured)}</span>
          </div>
          <h3>{featured.title}</h3>
        </a>
        <div className="video-list">
          {others.map((video, index) => (
            <a
              className="video-small"
              href={video.url}
              key={video.id}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="video-image">
                <Thumbnail video={video} />
              </div>
              <div>
                <span className="mono">
                  0{index + 2} / {videoDate(video)}
                </span>
                <h3>{video.title}</h3>
              </div>
              <Arrow diagonal />
            </a>
          ))}
          <a
            className="journal-channel"
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>毛利英昭の不動産投資チャンネル</span>
            <Arrow diagonal />
          </a>
        </div>
      </div>
      {!isLatest ? (
        <p className="journal-note">
          ピックアップ動画を掲載しています。最新の配信はYouTubeチャンネルをご覧ください。
        </p>
      ) : null}
    </section>
  );
}
