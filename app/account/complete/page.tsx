"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getCookie } from "tiny-cookie";

export default function Complete() {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      const token = getCookie("supabase-auth-token");

      if (token) {
        router.push("/submit");
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="grid gap-2 max-w-2xl mx-auto px-2">
      <h1 className="text-xl font-semibold">Log In</h1>

      <button
        className="rounded-md py-2 px-4 w-full transition-colors bg-ctp-crust animate-pulse"
        disabled
      >
        Logging In...
      </button>
    </main>
  );
}
