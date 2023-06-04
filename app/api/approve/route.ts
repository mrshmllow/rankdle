import { userIsApprover } from "@/app/approve/authorize";
import { db } from "@/db/db";
import { proposed } from "@/db/schema";
import { asc } from "drizzle-orm";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!userIsApprover()) return;

  const result = await db.query.proposed.findMany({
    orderBy: [asc(proposed.createdAt)],
  });

  return NextResponse.json(result);
}
