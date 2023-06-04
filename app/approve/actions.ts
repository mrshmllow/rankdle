"use server";

import { db } from "@/db/db";
import { proposed, rankdles } from "@/db/schema";
import { Rank } from "@/lib/types";
import { eq } from "drizzle-orm";
import { userIsApprover } from "./authorize";

export async function deleteProposed(proposedId: number) {
  if (!(await userIsApprover())) return;

  await db.delete(proposed).where(eq(proposed.id, proposedId));
}

export async function acceptProposed(proposedId: number, rank: Rank) {
  if (!(await userIsApprover())) return;

  const clip = await db.query.proposed.findFirst({
    where: eq(proposed.id, proposedId),
  });

  if (!clip) {
    return "not-found";
  }

  const result = await Promise.all([
    db.insert(rankdles).values({
      trackerMatch: clip.trackerMatch,
      valorantId: clip.valorantId,
      rank,
      youtubeId: clip.youtubeId,
    }),
    db.delete(proposed).where(eq(proposed.id, proposedId)),
  ]);

  return result;
}
