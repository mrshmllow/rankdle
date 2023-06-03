import { db } from "@/db/db";
import { guesses } from "@/db/schema";
import { sql, eq } from "drizzle-orm";
import { isNaN } from "lodash";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  {
    params: { rankdle },
  }: {
    params: { rankdle: string };
  }
) {
  if (isNaN(rankdle)) {
    return new NextResponse("Invalid clip ID", { status: 400 });
  }

  const counts = await db
    .select({
      rank: guesses.rank,
      count: sql<number>`count(*)`.mapWith(Number),
    })
    .from(guesses)
    .where(eq(guesses.clipId, Number(rankdle)))
    .groupBy(sql`${guesses.rank}`);

  if (counts.length === 0) {
    return new NextResponse("Not Found", { status: 404 });
  }

  let total = counts.reduce((sum, item) => sum + item.count, 0);

  let result = counts.reduce(
    (
      obj: {
        [key: string]: number;
      },
      item
    ) => {
      obj[item.rank] = (item.count / total) * 100;
      return obj;
    },
    {
      iron: 0,
      bronze: 0,
      silver: 0,
      gold: 0,
      platinum: 0,
      diamond: 0,
      ascendant: 0,
      immortal: 0,
      radiant: 0,
    }
  );

  console.log(result);

  return NextResponse.json(result);
}
