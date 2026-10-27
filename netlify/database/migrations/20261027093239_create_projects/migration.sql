CREATE TABLE "projects" (
	"id" serial PRIMARY KEY,
	"slug" text NOT NULL UNIQUE,
	"name" text NOT NULL,
	"color" text DEFAULT '#F5D000' NOT NULL,
	"hero_image" text DEFAULT '' NOT NULL,
	"pages" jsonb DEFAULT '[]' NOT NULL,
	"kicker_en" text DEFAULT '' NOT NULL,
	"kicker_vi" text DEFAULT '' NOT NULL,
	"tag_en" text DEFAULT '' NOT NULL,
	"tag_vi" text DEFAULT '' NOT NULL,
	"meta_en" jsonb DEFAULT '[]' NOT NULL,
	"meta_vi" jsonb DEFAULT '[]' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
