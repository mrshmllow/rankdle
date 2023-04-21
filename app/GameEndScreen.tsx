import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid, FireIcon } from "@heroicons/react/24/solid";
import pluralize from "pluralize";

export default function GameEndScreen({
  stars,
  streak,
}: {
  stars: number;
  streak: number;
}) {
  return (
    <>
      <h1 className="text-2xl font-bold">Todays Stats</h1>

      <p className="sr-only">
        {stars} {pluralize("star", stars)} / 6
      </p>

      <div className="grid grid-flow-col">
        {[...Array(6)].map((_, i) =>
          stars >= i + 1 ? (
            <StarIconSolid className="w-7 h-7 text-ctp-yellow mx-auto" />
          ) : (
            <StarIconOutline className="w-7 h-7 mx-auto" />
          )
        )}
      </div>

      <p className="inline-flex font-bold gap-2">
        <FireIcon className="w-5 h-5" />
        {streak} day streak{streak > 0 ? "!" : null}
      </p>

      <p>Play tomorrow to increase your streak!</p>
    </>
  );
}
