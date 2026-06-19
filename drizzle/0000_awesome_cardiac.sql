CREATE TABLE "training_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"title" text NOT NULL,
	"type" text NOT NULL,
	"priority" integer DEFAULT 2 NOT NULL,
	"description" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now()
);
