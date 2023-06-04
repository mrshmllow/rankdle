"use client";

import { cache, use, useState } from "react";
import { Proposed } from "@/db/schema";
import { acceptProposed, deleteProposed } from "./actions";

const getProposed = cache(async () =>
  fetch("/api/approve/")
    .then((data) => {
      console.log(data);
      return data.json();
    })
    .then((data) => data as Proposed[])
);

export default function Approve() {
  const proposed = use(getProposed());
  const [current, setCurrent] = useState(0);

  if (proposed.length === 0 || current === proposed.length)
    return <p>Reached end of proposed queue</p>;

  return (
    <main className="grid gap-2 max-w-2xl mx-auto px-2 pb-4">
      <p>
        {current + 1}/{proposed.length}
      </p>

      <p>
        proposed by <strong>{proposed[current].userId}</strong>
      </p>

      <iframe
        className="border-0 mx-auto w-full aspect-video rounded-md bg-ctp-crust shadow-ctp-crust shadow-md"
        src={`https://www.youtube-nocookie.com/embed/${proposed[current].youtubeId}?loop=1&modestbranding=1`}
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
          <th>{proposed[current].valorantId}</th>
          <th>
            <a
              href={`https://tracker.gg/valorant/match/${proposed[current].trackerMatch}`}
            >
              link
            </a>
          </th>
          <th>{proposed[current].youtubeId}</th>
        </tr>
      </table>

      <div className="grid grid-flow-col gap-2">
        <button
          onClick={async () => {
            acceptProposed(proposed[current].id, "iron");

            setCurrent((current) => current + 1);
          }}
          className="rounded-md py-2 px-4 w-full transition-colors bg-ctp-blue text-ctp-base"
        >
          Accept
        </button>
        <button
          onClick={async () => {
            if (window.confirm("Delete?")) {
              await deleteProposed(proposed[current].id);

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
