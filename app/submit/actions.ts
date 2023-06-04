"use server";

import { db } from "@/db/db";
import { proposed } from "@/db/schema";
import { createServerClient } from "@/lib/supabase-server";
import { zfd } from "zod-form-data";

// TODO: improve vaildation

const schema = zfd.formData({
  youtube: zfd.text(),
  tracker: zfd.text(),
  val_id: zfd.text(),
});

export async function submitClip(data: FormData) {
  const parsed = schema.safeParse(data);
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!parsed.success || !user) {
    return;
  }

  const youtube_url = new URL(parsed.data.youtube);
  const youtube_id = youtube_url.searchParams.get("v")!;

  await db.insert(proposed).values({
    youtubeId: youtube_id,
    trackerMatch: parsed.data.tracker.split("/").at(-1)!,
    userId: user.id,
    valorantId: parsed.data.val_id,
  });
}
