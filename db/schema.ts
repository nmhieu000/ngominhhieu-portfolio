import { pgTable, serial, text, timestamp, jsonb } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial().primaryKey(),
  slug: text().notNull().unique(),
  name: text().notNull(),
  color: text().notNull().default("#F5D000"),
  heroImage: text("hero_image").notNull().default(""),
  pages: jsonb().$type<string[]>().notNull().default([]),
  kickerEn: text("kicker_en").notNull().default(""),
  kickerVi: text("kicker_vi").notNull().default(""),
  tagEn: text("tag_en").notNull().default(""),
  tagVi: text("tag_vi").notNull().default(""),
  metaEn: jsonb("meta_en").$type<string[]>().notNull().default([]),
  metaVi: jsonb("meta_vi").$type<string[]>().notNull().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
