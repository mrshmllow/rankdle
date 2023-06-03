import { cx } from "cva";
import { useMemo, useTransition } from "react";
import { useRankdles } from "./store";
import { addGuess } from "./actions";

export default function GuessButton() {
  const {
    selectedRank,
    rankdles,
    currentRankdle,
    increaseStars,
    incrementGameState,
    gameState,
  } = useRankdles();

  const capRank = useMemo(
    () =>
      selectedRank === null
        ? null
        : selectedRank.toString().charAt(0).toUpperCase() +
          selectedRank?.toString().slice(1),
    [selectedRank]
  );

  const [loading, startTransition] = useTransition();

  return (
    <button
      className={cx([
        "rounded-md py-2 px-4 w-full transition-colors",
        selectedRank === null || loading
          ? "bg-ctp-crust"
          : "bg-ctp-red text-ctp-base",
        loading ? "animate-pulse" : null,
      ])}
      disabled={selectedRank === null || gameState === "post-guess"}
      onClick={() => {
        startTransition(() => {
          addGuess({
            clipId: rankdles[currentRankdle].id,
            rank: selectedRank!,
          });
        });

        increaseStars();
        incrementGameState();
      }}
    >
      Guess {capRank}
    </button>
  );
}
