import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid, FireIcon } from "@heroicons/react/24/solid";
import pluralize from "pluralize";
import { Fragment } from "react";
import CountDown from "./CountDown";
import { useRankdles } from "./store";

export default function GameEndScreen({
  stars,
  streak,
}: {
  stars: number;
  streak: number;
}) {
  const { rankdles } = useRankdles();
  return (
    <>
      <h1 className="text-2xl font-bold">Todays Stats</h1>

      <p className="sr-only">
        {stars} {pluralize("star", stars)} / 6
      </p>

      <div className="grid grid-flow-col">
        {[...Array(6)].map((_, i) =>
          stars >= i + 1 ? (
            <StarIconSolid
              key={i}
              className="w-7 h-7 text-ctp-yellow mx-auto"
            />
          ) : (
            <StarIconOutline key={i} className="w-7 h-7 mx-auto" />
          )
        )}
      </div>

      <p className="inline-flex font-bold gap-2">
        <FireIcon className="w-5 h-5" />
        {streak} day streak{streak > 0 ? "!" : null}
      </p>

      <p>Play tomorrow to increase your streak!</p>

      <CountDown />

      <hr className="h-px my-3 bg-ctp-surface0 border-0" />

      <h1 className="text-2xl font-bold">Todays Clips</h1>

      <div className="grid gap-2">
        {rankdles.map((rankdle, index) => (
          <Fragment key={index}>
            <h2>
              Clip {index + 1} -{" "}
              {rankdle.rank === null
                ? null
                : rankdle.rank.charAt(0).toUpperCase() +
                  rankdle.rank.toString().slice(1)}
            </h2>

            <iframe
              className="border-0 mx-auto w-full aspect-video rounded-md bg-ctp-crust"
              src={`https://www.youtube-nocookie.com/embed/${rankdle.youtubeId}?loop=1&modestbranding=1`}
              title={`A previous rankdle today, number ${index + 1}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;"
            />

            <a
              href={`https://tracker.gg/valorant/match/${rankdle.trackerMatch}`}
              target="_blank"
              className="rounded-md py-2 px-4 w-full transition-colors bg-ctp-surface0 text-ctp-text block text-center"
            >
              View Match on Tracker.gg
            </a>
          </Fragment>
        ))}
      </div>
    </>
  );
}
