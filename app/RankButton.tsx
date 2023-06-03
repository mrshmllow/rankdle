import React from "react";
import Image from "next/image";
import { cx } from "cva";
import { Rank } from "@/lib/types";
import { getImageData } from "@/lib/icons";
import { useRankdles } from "./store";

export default function RankButtons() {
  const { selectedRank, setSelectedRank } = useRankdles();

  return (
    <div className="flex justify-center gap-1 flex-wrap">
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
          <button
            key={rank}
            className={cx([
              selectedRank === rank ? "bg-ctp-surface0 rounded-md" : null,
              "p-1",
            ])}
            onClick={() => setSelectedRank(rank)}
          >
            <Image
              src={getImageData(rank)}
              alt={`Valorant ${rank} icon`}
              placeholder="blur"
              width={60}
              height={60}
            />
          </button>
        ))}
    </div>
  );
}
