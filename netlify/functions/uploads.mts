import type { Config } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import { requireAdmin } from "../../lib/admin.js";

const MAX_BYTES = 4 * 1024 * 1024;
const EXT: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif", "image/avif": "avif" };

export default async (req: Request) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const denied = await requireAdmin();
  if (denied) return denied;

  const type = req.headers.get("content-type") || "";
  if (!EXT[type]) return Response.json({ error: "Only JPG, PNG, WebP, GIF or AVIF images are allowed" }, { status: 400 });
  const body = await req.arrayBuffer();
  if (!body.byteLength) return Response.json({ error: "Empty file" }, { status: 400 });
  if (body.byteLength > MAX_BYTES) return Response.json({ error: "Each image must be 4 MB or smaller" }, { status: 413 });

  const key = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${EXT[type]}`;
  await getStore("project-images").set(key, body, { metadata: { contentType: type } });
  return Response.json({ url: `/api/images/${key}` }, { status: 201 });
};

export const config: Config = {
  path: "/api/uploads",
};
