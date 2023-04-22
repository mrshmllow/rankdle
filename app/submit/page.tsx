"use client";

import { ErrorMessage, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { useSupabase } from "@/components/supabase-provider";
import { cx } from "cva";
import { useRouter } from "next/navigation";
import ClipRules from "./ClipRules";

const Schema = z.object({
  tracker: z.string(),
  youtube: z.string(),
  val_id: z.string(),
});

export default function Submit() {
  const { supabase, session } = useSupabase();
  const router = useRouter();

  return (
    <main className="grid gap-2 max-w-2xl mx-auto px-2 pb-5">
      <ClipRules />

      <hr className="h-px my-3 bg-ctp-surface0 border-0" />

      <p>
        Logged in as <strong>{session?.user.user_metadata.name}</strong>{" "}
        <em>({session?.user.user_metadata.sub})</em>
      </p>

      <button
        onClick={async () => {
          if (
            window.confirm(
              "Are you sure you want to delete your account? All data (including proposed or accepted clips and rank guesses) will be deleted."
            )
          ) {
            const a = await supabase.rpc("delete_user");

            if (a.error === null) await supabase.auth.signOut();
            else window.alert("Something went wrong deleting your account...");
          }
        }}
      >
        Delete Account
      </button>

      <hr className="h-px mt-3 bg-ctp-surface0 border-0" />

      <Formik
        validationSchema={toFormikValidationSchema(Schema)}
        initialValues={{
          tracker: "",
          val_id: "",
          youtube: "",
        }}
        onSubmit={async ({ val_id, tracker, youtube }, { setErrors }) => {
          const row = await supabase.from("proposed").insert({
            tracker_id: tracker.split("/").at(-1)!,
            youtube_id: youtube.split("/").at(-1)!,
            val_id,
            user_id: session!.user.id,
          });

          if (row.error) {
            setErrors({
              youtube: "Something went wrong...",
            });
          } else {
            router.push("/submit/complete");
          }
        }}
      >
        {(props) => (
          <>
            <form
              onSubmit={props.handleSubmit}
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
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.tracker}
                disabled={props.isSubmitting}
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
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.val_id}
                disabled={props.isSubmitting}
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
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.youtube}
                disabled={props.isSubmitting}
              />

              <p className="text-ctp-red">
                <ErrorMessage name="username" />
              </p>

              <button
                disabled={props.isSubmitting}
                type="submit"
                className={cx([
                  "rounded-md py-2 px-4 w-full transition-colors mt-3",
                  props.isSubmitting || !props.isValid
                    ? "bg-ctp-crust"
                    : "bg-ctp-blue text-ctp-base",
                  props.isSubmitting ? "animate-pulse" : null,
                ])}
              >
                {props.isSubmitting ? "Submitting Clip..." : "Submit Clip"}
              </button>
            </form>
          </>
        )}
      </Formik>
    </main>
  );
}
