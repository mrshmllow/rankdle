import { db } from "@/db/db";
import { users } from "@/db/schema";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

export async function userIsApprover() {
  const session = await getServerSession(authOptions);

  if (session === null) {
    return false;
  }

  const user = await db.query.users.findFirst({
    where: eq(users.discordId, session.user.id),
    columns: {
      isApprover: true,
    },
  });

  return user ? user.isApprover : false;
}
