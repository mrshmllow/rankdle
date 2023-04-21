"use client";

import { cache, createRef, use, useState } from "react";
import PostGuessDialog from "./PostGuessDialog";
import { Rank } from "@/lib/types";
import GameEndDialog from "./GameEndDialog";
import { calculateStars } from "@/lib/stars";
import { useSupabase } from "@/components/supabase-provider";
import { TypedSupabaseClient } from "./layout";
import RankButtons from "./RankButton";
import NextButton from "./NextButton";
import { usePersistentState } from "@/lib/usePersistentState";
import { useUTCMidnightCallback } from "@/lib/time";

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

  const [stars, setStars] = useState(0);
  const player = createRef<HTMLIFrameElement>();
  const [loading, setLoading] = useState(false);

  useUTCMidnightCallback(() => {
    location.reload();
  });

  if (rankdles === null) {
    return <p>Something went wrong...</p>;
  }

  const handleNextClick = async () => {
    setLoading(true);
    setPostStatus("seen");

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

    if (current === 2) {
      setGameEnd(true);
    } else {
      setCurrent((current) => current + 1);
    }
  };

  const handlePostClose = () => {
    setSelectedRank(null);
    setPostStatus("seen");
  };

  return (
    <main className="grid gap-2 max-w-2xl mx-auto px-2">
      {gameEnd && postStatus === "seen" ? (
        <GameEndDialog stars={stars} />
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

          <h1 className="text-xl font-semibold">Clip {current + 1} of 3</h1>

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
        </>
      )}
    </main>
  );
}
