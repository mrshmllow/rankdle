import "server-only";
import "./globals.css";
import SupabaseListener from "../components/supabase-listener";
import SupabaseProvider from "../components/supabase-provider";
import type { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/db_types";
import { createServerClient } from "@/lib/supabase-server";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { VideoCameraIcon } from "@heroicons/react/24/outline";

export type TypedSupabaseClient = SupabaseClient<Database>;

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

  return (
    <html lang="en" className="bg-ctp-base text-ctp-text">
      <Analytics />

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
