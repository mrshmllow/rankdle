import { cache, use } from "react";
import Image from "next/image";
import { TypedSupabaseClient } from "./layout";
import { useSupabase } from "@/components/supabase-provider";
import { Rank } from "@/lib/types";
import { getImageData } from "@/lib/icons";
import { cx } from "cva";

const getRankDistribution = cache(
  async (supabase: TypedSupabaseClient, clip_id: number) => {
    const distribution = await supabase.rpc("get_rank_distribution", {
      p_clip_id: clip_id,
    });

    return distribution.data?.reduce(
      (
        acc: Record<string, number>,
        {
          rank_rankdle,
          percentage,
        }: { rank_rankdle: string; percentage: number }
      ) => {
        acc[rank_rankdle] = percentage;
        return acc;
      },
      {}
    );
  }
);

const rankColours = {
  iron: "bg-ctp-surface2",
  bronze: "bg-ctp-peach",
  silver: "bg-ctp-text",
  gold: "bg-ctp-peach",
  platinum: "bg-ctp-sapphire",
  diamond: "bg-ctp-pink",
  ascendant: "bg-ctp-green",
  immortal: "bg-ctp-red",
  radiant: "bg-ctp-yellow",
};

export default function GuessDistribution({ clip_id }: { clip_id: number }) {
  const { supabase } = useSupabase();
  const distribution = use(getRankDistribution(supabase, clip_id));

  if (distribution === undefined) {
    return <p>Something went wrong...</p>;
  }

  return (
    <div className="flex h-40 gap-1">
      {(Object.keys(Rank) as (keyof typeof Rank)[])
        .filter((rank) => isNaN(Number(rank)))
        .map((rank) => (
          <div
            key={rank}
            className="flex-grow inline-flex flex-col justify-end gap-1"
          >
            <div
              className={cx(["w-full rounded-sm", rankColours[rank]])}
              style={{
                height: `calc(${
                  distribution[rank] ? distribution[rank] : 5
                }% - 30px)`,
              }}
            >
              {distribution[rank] && (
                <p
                  className={cx([
                    "text-center",
                    rank === "iron" ? "text-ctp-text" : "text-ctp-base",
                  ])}
                >
                  {Math.round(distribution[rank])}%
                </p>
              )}
            </div>

            <Image
              src={getImageData(Rank[rank])}
              alt={`Valorant ${rank} icon`}
              className="mx-auto w-[30px] h-[30px]"
              width={30}
              height={30}
            />
          </div>
        ))}
    </div>
  );
}
