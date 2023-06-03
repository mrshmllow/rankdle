import { cache, use } from "react";
import Image from "next/image";
import { getImageData } from "@/lib/icons";
import { cx } from "cva";
import { Rank } from "@/lib/types";
import { useRankdles } from "./store";

const getRankDistribution = cache(async (rankdle: number) =>
  fetch(`/api/distribution/${rankdle}`, {
    next: {
      tags: [`distribution-${rankdle}`],
    },
  }).then((res) => res.json())
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

export default function GuessDistribution() {
  const { currentRankdle, rankdles } = useRankdles();
  const distribution = use(getRankDistribution(rankdles[currentRankdle].id));

  if (distribution === undefined) {
    return <p>Something went wrong...</p>;
  }

  return (
    <div className="flex h-60 gap-1">
      {(
        [
          "iron",
          "bronze",
          "silver",
          "gold",
          "platinum",
          "diamond",
          "ascendant",
          "immortal",
          "radiant",
        ] as Rank[]
      )
        .filter((rank) => isNaN(Number(rank)))
        .map((rank) => (
          <div
            key={rank}
            className="flex-grow inline-flex flex-col justify-end gap-1"
          >
            <div
              className={cx(["w-full rounded-sm", rankColours[rank]])}
              style={{
                height: `${distribution[rank]}%`,
              }}
            ></div>

            <Image
              src={getImageData(rank)}
              alt={`Valorant ${rank} icon`}
              className="mx-auto w-[30px] h-[30px]"
              width={30}
              height={30}
            />

            <p className="text-center">
              {distribution[rank] ? Math.round(distribution[rank]) : 0}%
            </p>
          </div>
        ))}
    </div>
  );
}
