import type { Config, Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { projects } from "../../db/schema.js";
import { requireAdmin } from "../../lib/admin.js";

const slugify = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/gi, "d")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);

const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const list = (v: unknown) => (Array.isArray(v) ? v.map(text).slice(0, 4) : []);
const imageUrl = (v: unknown) => (typeof v === "string" && v.startsWith("/api/images/") ? v : "");
const imageKey = (url: string) => url.replace(/^\/api\/images\//, "");

export default async (req: Request, context: Context) => {
  if (req.method === "GET") {
    const rows = await db.select().from(projects).orderBy(projects.createdAt);
    return Response.json(rows);
  }

  const denied = await requireAdmin();
  if (denied) return denied;

  if (req.method === "POST") {
    const b = await req.json().catch(() => null);
    if (!b) return Response.json({ error: "Invalid JSON" }, { status: 400 });
    const name = text(b.name);
    if (!name) return Response.json({ error: "Project name is required" }, { status: 400 });
    const slug = slugify(text(b.slug) || name);
    if (!slug) return Response.json({ error: "Invalid slug" }, { status: 400 });
    const heroImage = imageUrl(b.heroImage);
    if (!heroImage) return Response.json({ error: "A cover image is required" }, { status: 400 });

    const existing = await db.select({ id: projects.id }).from(projects).where(eq(projects.slug, slug));
    if (existing.length) return Response.json({ error: `Slug "${slug}" already exists` }, { status: 409 });

    const color = /^#[0-9a-f]{6}$/i.test(text(b.color)) ? text(b.color) : "#F5D000";
    const [row] = await db.insert(projects).values({
      slug, name, color, heroImage,
      pages: Array.isArray(b.pages) ? b.pages.map(imageUrl).filter(Boolean) : [],
      kickerEn: text(b.kickerEn), kickerVi: text(b.kickerVi) || text(b.kickerEn),
      tagEn: text(b.tagEn), tagVi: text(b.tagVi) || text(b.tagEn),
      metaEn: list(b.metaEn), metaVi: list(b.metaVi),
    }).returning();
    return Response.json(row, { status: 201 });
  }

  if (req.method === "DELETE") {
    const id = Number(context.params.id);
    if (!id) return new Response("Missing id", { status: 400 });
    const [row] = await db.delete(projects).where(eq(projects.id, id)).returning();
    if (!row) return new Response("Not found", { status: 404 });
    const store = getStore("project-images");
    await Promise.all([row.heroImage, ...row.pages].map((u) => store.delete(imageKey(u))));
    return new Response(null, { status: 204 });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: ["/api/projects", "/api/projects/:id"],
};
