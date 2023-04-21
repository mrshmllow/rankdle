"use client";

import { cache, createRef, use, useEffect, useState } from "react";
import PostGuessDialog from "./PostGuessDialog";
import { Rank } from "@/lib/types";
import { calculateStars } from "@/lib/stars";
import { useSupabase } from "@/components/supabase-provider";
import { TypedSupabaseClient } from "./layout";
import RankButtons from "./RankButton";
import NextButton from "./NextButton";
import { usePersistentState } from "@/lib/usePersistentState";
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

const getRankdles = cache(async (supabase: TypedSupabaseClient) => {
  const rankdles = await supabase.rpc("get_daily_rankdles");

  return rankdles.data;
});

export default function Home() {
  const { supabase, session } = useSupabase();
  const rankdles = use(getRankdles(supabase));

  const [current, setCurrent] = usePersistentState("current", 0, true);
  const [selectedRank, setSelectedRank] = usePersistentState<Rank | null>(
    "selected",
    null,
    true
  );
  const [postStatus, setPostStatus] = usePersistentState<
    "hidden" | "visible" | "seen"
  >("postStatus", "hidden", true);
  const [gameEnd, setGameEnd] = usePersistentState("end", false, true);

  const [stars, setStars] = usePersistentState("stars", 0, true);
  const [streak, setStreak] = usePersistentState("streak", 0, false);
  const player = createRef<HTMLIFrameElement>();
  const [loading, setLoading] = useState(false);

  const [playedToday, setPlayedToday] = useState(false);
  const [showWelcome, setShowWelcome] = useState(streak === 0);

  useUTCMidnightCallback(() => {
    location.reload();
  });

  useEffect(() => {
    if (stars >= 3) {
      setStreak((streak) => streak + 1);
    }
  }, [stars]);

  useEffect(() => {
    if (stars <= 3 && gameEnd && playedToday) {
      setStreak(0);
    }
  }, [stars, gameEnd]);

  if (rankdles === null) {
    return <p>Something went wrong...</p>;
  }

  const handleNextClick = async () => {
    setPlayedToday(true);
    setLoading(true);

    await supabase.from("guesses").insert({
      clip_id: rankdles[current].id,
      // @ts-ignore
      rank: Rank[selectedRank],
      user_id: session?.user.id,
    });

    setLoading(false);

    setStars(
      (stars) =>
        stars + calculateStars(selectedRank!, Rank[rankdles[current].rank])
    );

    setPostStatus("visible");
  };

  const handlePostClose = () => {
    setPlayedToday(true);
    setSelectedRank(null);
    setPostStatus("seen");

    if (current === 2) {
      setGameEnd(true);
    } else {
      setCurrent((current) => current + 1);
    }
  };

  return (
    <main className="grid gap-2 max-w-2xl mx-auto px-2 pb-4">
      {gameEnd && postStatus === "seen" ? (
        <GameEndScreen stars={stars} streak={streak} />
      ) : (
        <>
          {selectedRank !== null && (
            <PostGuessDialog
              isOpen={postStatus === "visible"}
              onClose={handlePostClose}
              guess={selectedRank}
              answer={Rank[rankdles[current].rank]}
              clip_id={rankdles[current].id}
              tracker_id={rankdles[current].tracker_match}
            />
          )}

          <WelcomeDialog
            isOpen={showWelcome}
            onClose={() => setShowWelcome(false)}
          />

          <h1 className="text-xl font-semibold">Clip {current + 1} of 3</h1>

          <p className="sr-only">
            {stars} {pluralize("star", stars)} / 6
          </p>

          <div className="grid grid-flow-col">
            {[...Array(6)].map((_, i) =>
              stars >= i + 1 ? (
                i !== 3 - 1 ? (
                  <StarIconSolid className="w-8 h-8 text-ctp-yellow mx-auto" />
                ) : (
                  <FireIconSolid className="w-8 h-8 text-ctp-red mx-auto animate-streak" />
                )
              ) : i !== 3 - 1 ? (
                <StarIconOutline className="w-8 h-8 mx-auto" />
              ) : (
                <FireIconOutline className="w-8 h-8 mx-auto" />
              )
            )}
          </div>

          <iframe
            className="border-0 mx-auto w-full h-full aspect-video rounded-md bg-ctp-crust shadow-ctp-crust shadow-md"
            src={`https://www.youtube-nocookie.com/embed/${rankdles[current].youtube_id}?fs
=0&loop=1&modestbranding=1`}
            title={`Rankdle DAY Step ${current + 1}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen={false}
            ref={player}
          />

          <RankButtons
            selectedRank={selectedRank}
            onRankSelect={(rank) => setSelectedRank(rank)}
          />

          <NextButton
            selectedRank={selectedRank}
            showPost={postStatus === "visible"}
            onClick={handleNextClick}
            loading={loading}
          />

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
