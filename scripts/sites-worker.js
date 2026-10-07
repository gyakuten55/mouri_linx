const CHANNEL_URL = "https://www.youtube.com/@fudousan_channel/videos";
const CACHE_TTL_MS = 30 * 60 * 1000;
const EMBEDDED_ASSETS = {};
const FALLBACK_VIDEOS = [
  {
    id: "B4fCMu0d-H4",
    title: "2026年もやっぱり1R不動産投資が良い7つの理由",
    publishedAt: "2026-08-01T00:00:00.000Z",
    url: "https://www.youtube.com/watch?v=B4fCMu0d-H4",
    thumbnail: "https://i.ytimg.com/vi/B4fCMu0d-H4/hq720.jpg",
  },
  {
    id: "jv44rNTQGPs",
    title: "クボタの跡地にできる難波のアリーナ",
    publishedAt: "2026-07-01T00:00:00.000Z",
    url: "https://www.youtube.com/watch?v=jv44rNTQGPs",
    thumbnail: "https://i.ytimg.com/vi/jv44rNTQGPs/hq720.jpg",
  },
  {
    id: "VukD2G6y2hU",
    title: "難波の南、Zeppの隣｜クボタ本社跡地に新アリーナ、ミナミの街はどう変わる？",
    publishedAt: "2026-07-01T00:00:00.000Z",
    url: "https://www.youtube.com/watch?v=VukD2G6y2hU",
    thumbnail: "https://i.ytimg.com/vi/VukD2G6y2hU/hq720.jpg",
  },
  {
    id: "rrSAFVB9tH0",
    title: "大阪のインバウンド問題の是非を問う。不動産投資への影響は？",
    publishedAt: "2026-06-01T00:00:00.000Z",
    url: "https://www.youtube.com/watch?v=rrSAFVB9tH0",
    thumbnail: "https://i.ytimg.com/vi/rrSAFVB9tH0/hq720.jpg",
  },
];

let latestVideosCache = {
  expiresAt: 0,
  payload: null,
};

function decodeXml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function extractValue(xml, pattern) {
  const match = xml.match(pattern);
  return match ? decodeXml(match[1].trim()) : "";
}

function decodeJsonValue(value) {
  try {
    return JSON.parse(`"${value.replace(/"/g, '\\"')}"`);
  } catch {
    return decodeXml(value.replace(/\\u0026/g, "&"));
  }
}

function resolveChannelId(html) {
  const feedMatch = html.match(/feeds\/videos\.xml\?channel_id=([A-Za-z0-9_-]+)/);
  if (feedMatch) {
    return feedMatch[1];
  }

  const channelMatch = html.match(/"channelId"\s*:\s*"([A-Za-z0-9_-]+)"/);
  if (channelMatch) {
    return channelMatch[1];
  }

  throw new Error("YouTube channel ID could not be resolved.");
}

function parseVideos(feedXml) {
  const entries = feedXml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];

  return entries
    .map((entry) => {
      const id = extractValue(entry, /<yt:videoId>([\s\S]*?)<\/yt:videoId>/);
      const title = extractValue(entry, /<title>([\s\S]*?)<\/title>/);
      const publishedAt = extractValue(entry, /<published>([\s\S]*?)<\/published>/);
      const thumbnail = extractValue(entry, /<media:thumbnail\s+url="([^"]+)"/);

      return {
        id,
        title,
        publishedAt,
        url: `https://www.youtube.com/watch?v=${id}`,
        thumbnail,
      };
    })
    .filter((video) => video.id && video.title && video.publishedAt && video.thumbnail)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 4);
}

function parseVideosFromChannelPage(html) {
  const seen = new Set();
  const videos = [];
  const videoPattern = /"videoId":"([A-Za-z0-9_-]{11})"/g;
  let match;

  while ((match = videoPattern.exec(html)) && videos.length < 4) {
    const id = match[1];
    if (seen.has(id)) {
      continue;
    }

    const block = html.slice(match.index, match.index + 7000);
    const titleMatch = block.match(/"title":\{"content":"((?:\\.|[^"\\])+)"/);
    const metadataMatch = block.match(/"metadataParts":\[\{"text":\{"content":"((?:\\.|[^"\\])+)"\}\},\{"text":\{"content":"((?:\\.|[^"\\])+)"/);

    if (!titleMatch) {
      continue;
    }

    seen.add(id);
    videos.push({
      id,
      title: decodeJsonValue(titleMatch[1]),
      publishedAt: "",
      publishedText: metadataMatch ? decodeJsonValue(metadataMatch[2]) : "",
      url: `https://www.youtube.com/watch?v=${id}`,
      thumbnail: `https://i.ytimg.com/vi/${id}/hq720.jpg`,
    });
  }

  return videos;
}

async function fetchLatestVideos() {
  const now = Date.now();
  if (latestVideosCache.payload && latestVideosCache.expiresAt > now) {
    return latestVideosCache.payload;
  }

  const channelResponse = await fetch(CHANNEL_URL, {
    signal: AbortSignal.timeout(5000),
    headers: {
      "user-agent": "Mozilla/5.0",
    },
  });

  if (!channelResponse.ok) {
    throw new Error("YouTube channel page request failed.");
  }

  const channelHtml = await channelResponse.text();
  const channelId = resolveChannelId(channelHtml);
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const feedResponse = await fetch(feedUrl, {
    signal: AbortSignal.timeout(5000),
    headers: {
      "user-agent": "Mozilla/5.0",
    },
  });

  const videos = feedResponse.ok ? parseVideos(await feedResponse.text()) : parseVideosFromChannelPage(channelHtml);

  const payload = {
    channelUrl: CHANNEL_URL,
    feedUrl,
    fetchedAt: new Date().toISOString(),
    videos,
  };

  latestVideosCache = {
    expiresAt: now + CACHE_TTL_MS,
    payload,
  };

  return payload;
}

function json(payload, init = {}) {
  return new Response(JSON.stringify(payload), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=300",
      ...(init.headers ?? {}),
    },
  });
}

function assetResponse(pathname) {
  const asset = EMBEDDED_ASSETS[pathname] ?? (pathname === "/" ? EMBEDDED_ASSETS["/index.html"] : null);

  if (!asset) {
    return null;
  }

  const body = asset.encoding === "base64" ? Uint8Array.from(atob(asset.body), (char) => char.charCodeAt(0)) : asset.body;

  return new Response(body, {
    headers: {
      "content-type": asset.contentType,
      "cache-control": pathname === "/" || pathname === "/index.html"
        ? "public, max-age=60"
        : "public, max-age=31536000, immutable",
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/youtube/latest") {
      try {
        return json(await fetchLatestVideos());
      } catch (error) {
        return json(
          {
            channelUrl: CHANNEL_URL,
            fetchedAt: new Date().toISOString(),
            message: "Using fallback YouTube videos.",
            fallback: true,
            videos: FALLBACK_VIDEOS,
          },
          { status: 200 },
        );
      }
    }

    const embeddedAsset = assetResponse(url.pathname);
    if (embeddedAsset) {
      return embeddedAsset;
    }

    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) {
      return response;
    }

    url.pathname = "/index.html";
    return env.ASSETS.fetch(new Request(url, request));
  },
};
