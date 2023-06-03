"use server";

import { db } from "@/db/db";
import { guesses } from "@/db/schema";
import { Rank } from "@/lib/types";
import { revalidateTag } from "next/cache";

export async function addGuess(data: { clipId: number; rank: Rank }) {
  await db.insert(guesses).values(data);
  revalidateTag(`distribution-${data.clipId}`);
}
