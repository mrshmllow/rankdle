import { InferModel, relations } from "drizzle-orm";
import {
  pgTable,
  pgEnum,
  serial,
  text,
  uuid,
  integer,
  date,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const rankEnum = pgEnum("rank", [
  "iron",
  "bronze",
  "silver",
  "gold",
  "platinum",
  "diamond",
  "ascendant",
  "immortal",
  "radiant",
]);

export const guesses = pgTable("guesses", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow(),
  rank: rankEnum("rank").notNull(),
  clipId: integer("clip_id").references(() => rankdles.id),
});

export const guessesRelations = relations(guesses, ({ one }) => ({
  rankdle: one(rankdles, {
    fields: [guesses.clipId],
    references: [rankdles.id],
  }),
}));

export const rankdles = pgTable("rankdles", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow(),
  trackerMatch: uuid("tracker_match").notNull(),
  youtubeId: text("youtube_id").notNull(),
  rank: rankEnum("rank").notNull(),
  valorantId: text("val_id").notNull(),
  shownDate: date("shown_date", {
    mode: "date",
  }),
});

export const proposed = pgTable("proposed", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow(),
  trackerMatch: uuid("tracker_match").notNull(),
  youtubeId: text("youtube_id").notNull(),
  userId: uuid("user_id").notNull(),
  valorantId: text("youtube_id").notNull(),
});

export type Rankdle = InferModel<typeof rankdles>;
export type Proposed = InferModel<typeof proposed>;
