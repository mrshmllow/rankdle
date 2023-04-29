"use client";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cx } from "cva";
import { useState } from "react";

export default function Login() {
  const [loading, setLoading] = useState(false);

  return (
    <main className="grid gap-2 max-w-2xl mx-auto px-2">
      <h1 className="text-xl font-semibold">Log In</h1>

      <button
        onClick={async () => {
          setLoading(true);
          const supabase = createBrowserSupabaseClient();

          await supabase.auth.signInWithOAuth({
            provider: "discord",
            options: {
              redirectTo: "/account/complete",
            },
          });
        }}
        className={cx([
          "rounded-md py-2 px-4 w-full transition-colors",
          loading ? "bg-ctp-crust animate-pulse" : "bg-ctp-red text-ctp-base",
        ])}
      >
        {loading ? "Logging In..." : "Login with Discord"}
      </button>

      <p className="text-center text-ctp-subtext0">
        You need to log in with discord to submit clips to rankdle
      </p>
    </main>
  );
}
