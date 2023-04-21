import React from "react";
import Image from "next/image";
import { cx } from "cva";
import { Rank } from "@/lib/types";
import { getImageData } from "@/lib/icons";

export default function RankButtons({
  selectedRank,
  onRankSelect,
}: {
  selectedRank: Rank | null;
  onRankSelect: (rank: Rank) => void;
}) {
  return (
    <div className="flex justify-center gap-1 flex-wrap">
      {(Object.keys(Rank) as (keyof typeof Rank)[])
        .filter((rank) => isNaN(Number(rank)))
        .map((rank) => (
          <button
            key={rank}
            className={cx([
              selectedRank === Rank[rank] ? "bg-ctp-surface0 rounded-md" : null,
              "p-1",
            ])}
            onClick={() => onRankSelect(Rank[rank])}
          >
            <Image
              src={getImageData(Rank[rank])}
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
