"use client";

import { cache, use, useState } from "react";
import { TypedSupabaseClient } from "../layout";
import { useSupabase } from "@/components/supabase-provider";

const getProposed = cache(async (supabase: TypedSupabaseClient) => {
  const rankdles = await supabase
    .from("proposed")
    .select("*", { count: "exact" })
    .order("created_at");

  return {
    count: rankdles.count,
    data: rankdles.data,
  };
});

export default function Approve() {
  const { supabase } = useSupabase();
  const proposed = use(getProposed(supabase));
  const [current, setCurrent] = useState(0);

  if (proposed.data === null) return <p>Something went wrong, check browser</p>;

  if (proposed.data.length === 0)
    return <p>There are no more clips for today</p>;

  if (current === proposed.data.length)
    return <p>Reached end of proposed queue</p>;

  return (
    <main className="grid gap-2 max-w-2xl mx-auto px-2 pb-4">
      <p>
        {current + 1}/{proposed.data.length}
      </p>

      <p>
        proposed by <strong>{proposed.data[current].user_id}</strong>
      </p>

      <iframe
        className="border-0 mx-auto w-full aspect-video rounded-md bg-ctp-crust shadow-ctp-crust shadow-md"
        src={`https://www.youtube-nocookie.com/embed/${proposed.data[current].youtube_id}?loop=1&modestbranding=1`}
        title={`Rankdle DAY Step ${current + 1}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      />

      <table className="w-full">
        <tr>
          <th>val_id</th>
          <th>tracker</th>
          <th>youtube_id</th>
        </tr>

        <tr>
          <th>{proposed.data[current].val_id}</th>
          <th>
            <a
              href={`https://tracker.gg/valorant/match/${proposed.data[current].tracker_id}`}
            >
              link
            </a>
          </th>
          <th>{proposed.data[current].youtube_id}</th>
        </tr>
      </table>

      <div className="grid grid-flow-col gap-2">
        <button
          onClick={async () => {
            const curr = proposed.data![current];

            Promise.all([
              supabase
                .from("proposed")
                .delete()
                .eq("id", proposed.data![current].id),

              supabase.from("rankdles").insert({
                youtube_id: curr.youtube_id,
                tracker_match: curr.tracker_id,
                val_id: curr.val_id,
                // @ts-ignore
                rank: prompt("rank", "ascendant"),
              }),
            ]);

            setCurrent((current) => current + 1);
          }}
          className="rounded-md py-2 px-4 w-full transition-colors bg-ctp-blue text-ctp-base"
        >
          Accept
        </button>
        <button
          onClick={async () => {
            if (window.confirm("Delete?")) {
              await supabase
                .from("proposed")
                .delete()
                .eq("id", proposed.data![current].id);
              setCurrent((current) => current + 1);
            }
          }}
          className="rounded-md py-2 px-4 w-full transition-colors bg-ctp-red text-ctp-base"
        >
          Delete
        </button>
        <button
          onClick={() => setCurrent((current) => current + 1)}
          className="rounded-md py-2 px-4 w-full transition-colors bg-ctp-crust"
        >
          Skip
        </button>
      </div>
    </main>
  );
}
