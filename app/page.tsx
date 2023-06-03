"use client";

import { useState } from "react";
import PostGuessDialog from "./PostGuessDialog";
import RankButtons from "./RankButton";
import GuessButton from "./NextButton";
import { useUTCMidnightCallback } from "@/lib/time";
import pluralize from "pluralize";
import {
  StarIcon as StarIconOutline,
  FireIcon as FireIconOutline,
} from "@heroicons/react/24/outline";
import {
  StarIcon as StarIconSolid,
  FireIcon as FireIconSolid,
} from "@heroicons/react/24/solid";
import GameEndScreen from "./GameEndScreen";
import WelcomeDialog from "./WelcomeDialog";
import { useRankdles } from "./store";

export default function Home() {
  const {
    rankdles,
    stars,
    playedToday,
    currentRankdle,
    incrementCurrentRankdle,
    selectedRank,
    setSelectedRank,
    streak,
    gameState,
    incrementGameState,
  } = useRankdles();

  const [showWelcome, setShowWelcome] = useState(streak === 0 && !playedToday);

  useUTCMidnightCallback(() => {
    location.reload();
  });

  if (rankdles.length === 0) {
    return (
      <>
        <p>There are no clips today :( your streak is maintained</p>

        {streak > 0 && (
          <p className="inline-flex text-ctp-subtext0 justify-center gap-2">
            <FireIconOutline className="w-5 h-5" />
            {streak} day streak
          </p>
        )}
      </>
    );
  }

  const handlePostClose = () => {
    setSelectedRank(null);
    incrementGameState();

    incrementCurrentRankdle();
  };

  return (
    <main className="grid gap-2 max-w-2xl mx-auto px-2 pb-4">
      {gameState === "game-over" ? (
        <GameEndScreen stars={stars} streak={streak} />
      ) : (
        <>
          {selectedRank !== null && (
            <PostGuessDialog
              isOpen={gameState === "post-guess"}
              onClose={handlePostClose}
            />
          )}

          <WelcomeDialog
            isOpen={showWelcome}
            onClose={() => setShowWelcome(false)}
          />

          <h1 className="text-xl font-semibold">
            Clip {currentRankdle + 1} of {rankdles.length}
          </h1>

          <p className="sr-only">
            {stars} {pluralize("star", stars)} / 6
          </p>

          <div className="grid grid-flow-col">
            {[...Array(6)].map((_, i) =>
              stars >= i + 1 ? (
                i !== 3 - 1 ? (
                  <StarIconSolid
                    key={i}
                    className="w-7 h-7 text-ctp-yellow mx-auto"
                  />
                ) : (
                  <FireIconSolid
                    key={i}
                    className="w-7 h-7 text-ctp-red mx-auto animate-streak -z-10"
                  />
                )
              ) : i !== 3 - 1 ? (
                <StarIconOutline key={i} className="w-7 h-7 mx-auto" />
              ) : (
                <FireIconOutline key={i} className="w-7 h-7 mx-auto" />
              )
            )}
          </div>

          <iframe
            className="border-0 mx-auto w-full h-full aspect-video rounded-md bg-ctp-crust shadow-ctp-crust shadow-md"
            src={`https://www.youtube-nocookie.com/embed/${rankdles[currentRankdle].youtubeId}?loop=1&modestbranding=1`}
            title={`Rankdle DAY Step ${currentRankdle + 1}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;"
          />

          <RankButtons />

          <GuessButton />

          <p className="text-center text-ctp-subtext0">
            All clips are less than 30 days old.
          </p>

          {streak > 0 && (
            <p className="inline-flex text-ctp-subtext0 justify-center gap-2">
              <FireIconOutline className="w-5 h-5" />
              {streak} day streak
            </p>
          )}
        </>
      )}
    </main>
  );
}
