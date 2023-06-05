"use client";

import { cx } from "cva";
import ClipRules from "./ClipRules";
import { submitClip } from "./actions";
import { useSession, signOut } from "next-auth/react";

export default function Submit() {
  const session = useSession();

  return (
    <main className="grid gap-2 max-w-2xl mx-auto px-2 pb-5">
      <ClipRules />

      <hr className="h-px my-3 bg-ctp-surface0 border-0" />

      <p>
        Logged in as <strong>{session.data?.user.id}</strong>
        <em>({session.data?.user.id})</em>
      </p>

      <button
        disabled
        onClick={async () => {
          if (
            window.confirm(
              "Are you sure you want to delete your account? All data (including proposed or accepted clips and rank guesses) will be deleted."
            )
          ) {
            await signOut();

            // window.alert("Something went wrong deleting your account...");
          }
        }}
      >
        Delete Account
      </button>

      <hr className="h-px mt-3 bg-ctp-surface0 border-0" />

      <form
        action={submitClip}
        className="[&>label]:pt-2 grid"
        autoComplete="off"
      >
        <label htmlFor="tracker">Match URL:</label>

        <input
          type="url"
          id="tracker"
          name="tracker"
          className="w-full rounded-lg bg-ctp-mantle focus-visible:bg-ctp-base p-2 border-ctp-crust border-2 focus-visible:border-ctp-blue outline-none transition-colors invalid:border-ctp-red"
          placeholder="https://tracker.gg/valorant/match/ID"
          pattern="^https:\/\/tracker\.gg\/valorant\/match\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
          title="URL must match https://tracker.gg/valorant/match/UUID"
          required
        />

        <label htmlFor="tracker">Your Valorant ID (username#tag):</label>

        <input
          type="text"
          id="val_id"
          name="val_id"
          className="w-full rounded-lg bg-ctp-mantle focus-visible:bg-ctp-base p-2 border-ctp-crust border-2 focus-visible:border-ctp-blue outline-none transition-colors invalid:border-ctp-red"
          placeholder="username#tag"
          pattern="^[\w\s]+#\w+$"
          title="Ids must match the format USERNAME#TAG (e.g., JohnDoe#1234)"
          required
        />

        <label htmlFor="youtube">YouTube URL:</label>

        <input
          type="url"
          id="youtube"
          name="youtube"
          className="w-full rounded-lg bg-ctp-mantle focus-visible:bg-ctp-base p-2 border-ctp-crust border-2 focus-visible:border-ctp-blue outline-none transition-colors invalid:border-ctp-red"
          placeholder="https://www.youtube.com/watch?v=ID"
          pattern="^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)[A-Za-z0-9_\-]{11}$"
          title="URL must be a youtube video"
          required
        />

        <button
          type="submit"
          className={cx(["rounded-md py-2 px-4 w-full transition-colors mt-3"])}
        >
          Submit Clip
        </button>
      </form>
    </main>
  );
}
