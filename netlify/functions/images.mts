import type { Config, Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export default async (req: Request, context: Context) => {
  const key = new URL(req.url).pathname.replace(/^\/api\/images\//, "");
  const entry = await getStore("project-images").getWithMetadata(decodeURIComponent(key), { type: "stream" });
  if (!entry) return new Response("Not found", { status: 404 });
  return new Response(entry.data, {
    headers: {
      "Content-Type": String(entry.metadata?.contentType || "application/octet-stream"),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};

export const config: Config = {
  path: "/api/images/*",
};
