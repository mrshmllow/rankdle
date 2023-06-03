import "server-only";
import { db } from "@/db/db";
import { rankdles } from "@/db/schema";
import { createServerClient } from "@/lib/supabase-server";
import { VideoCameraIcon } from "@heroicons/react/24/outline";
import { Analytics } from "@vercel/analytics/react";
import { asc, eq, isNull } from "drizzle-orm";
import Link from "next/link";
import SupabaseListener from "../components/supabase-listener";
import SupabaseProvider from "../components/supabase-provider";
import "./globals.css";
import { StoreInitalizer } from "./StoreInitalizer";
import { notFound } from "next/navigation";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

export type TypedSupabaseClient = SupabaseClient;

export const metadata = {
  title: "Rankdle",
  description: "Guess the valorant rank!",
  openGraph: {
    siteName: "Rankdle",
    url: "https://rankdle.vercel.app/",
    description: "Guess the valorant rank!",
    locale: "en-US",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const currentDate = new Date();
  currentDate.setUTCHours(0, 0, 0, 0);

  let todaysRankdles = await db.query.rankdles.findMany({
    limit: 3,
    where: eq(rankdles.shownDate, currentDate),
  });

  if (todaysRankdles.length === 0) {
    const oldestRankdles = await db.query.rankdles.findMany({
      limit: 3,
      orderBy: [asc(rankdles.createdAt)],
      where: isNull(rankdles.shownDate),
    });

    if (oldestRankdles.length === 0) {
      // TODO: No rankdles today
      return notFound();
    }

    todaysRankdles = await Promise.all(
      oldestRankdles.map((rankdle) =>
        db
          .update(rankdles)
          .set({
            shownDate: currentDate,
          })
          .where(eq(rankdles.id, rankdle.id))
          .returning()
      )
    ).then((rankdles) => rankdles.map((rankdle) => rankdle[0]));
  }

  return (
    <html lang="en" className="bg-ctp-base text-ctp-text">
      <Analytics />

      <StoreInitalizer rankdles={todaysRankdles} />

      <body>
        <SupabaseProvider session={session}>
          <SupabaseListener serverAccessToken={session?.access_token} />

          <nav className="flex py-2 px-2 items-center justify-between">
            <Link href="/" className="text-center text-2xl">
              <strong>Rankdle</strong>{" "}
              <span className="text-ctp-subtext0">Beta</span>
            </Link>

            <div className="space-x-4">
              <Link href="/meta">About</Link>

              <Link
                href="/submit"
                className="rounded-md bg-ctp-surface0 py-2 px-4 place-self-end inline-flex items-center gap-2"
              >
                Upload Clip
                <VideoCameraIcon className="h-5 w-5" />
              </Link>
            </div>
          </nav>

          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}
