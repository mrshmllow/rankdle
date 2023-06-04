import { cx } from "cva";
import { useMemo, useState } from "react";
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

  const [loading, setLoading] = useState(false);

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
      onClick={async () => {
        setLoading(true);
        await addGuess({
          clipId: rankdles[currentRankdle].id,
          rank: selectedRank!,
        });

        setLoading(false);
        increaseStars();
        incrementGameState();
      }}
    >
      Guess {capRank}
    </button>
  );
}
