import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import worker from "./scripts/sites-worker.js";

function youtubeApi(server) {
  server.middlewares.use("/api/youtube/latest", async (_request, response) => {
    try {
      const result = await worker.fetch(
        new Request("http://localhost/api/youtube/latest"),
      );
      response.statusCode = result.status;
      result.headers.forEach((value, name) => response.setHeader(name, value));
      response.end(await result.text());
    } catch {
      response.statusCode = 503;
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify({ fallback: true, videos: [] }));
    }
  });
}
export default defineConfig({
  plugins: [
    react(),
    {
      name: "local-youtube-api",
      configureServer: youtubeApi,
      configurePreviewServer: youtubeApi,
    },
  ],
});
