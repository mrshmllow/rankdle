"use server";

import { db } from "@/db/db";
import { proposed } from "@/db/schema";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { zfd } from "zod-form-data";

// TODO: improve vaildation

const schema = zfd.formData({
  youtube: zfd.text(),
  tracker: zfd.text(),
  val_id: zfd.text(),
});

export async function submitClip(data: FormData) {
  const parsed = schema.safeParse(data);
  const session = await getServerSession(authOptions);

  if (!parsed.success || !session) {
    return;
  }

  const youtube_url = new URL(parsed.data.youtube);
  const youtube_id = youtube_url.searchParams.get("v")!;

  await db.insert(proposed).values({
    youtubeId: youtube_id,
    trackerMatch: parsed.data.tracker.split("/").at(-1)!,
    discordId: session.user.id,
    valorantId: parsed.data.val_id,
  });
}
