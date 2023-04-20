import iron from "@/public/iron.png";
import bronze from "@/public/bronze.png";
import gold from "@/public/gold.png";
import silver from "@/public/silver.png";
import diamond from "@/public/diamond.png";
import radiant from "@/public/radiant.png";
import immortal from "@/public/immortal.png";
import ascendant from "@/public/ascendant.png";
import platinum from "@/public/platinum.png";
import { StaticImageData } from "next/image";
import { Rank } from "./types";

const iconRankMap = {
  [Rank.iron]: iron,
  [Rank.bronze]: bronze,
  [Rank.silver]: silver,
  [Rank.gold]: gold,
  [Rank.platinum]: platinum,
  [Rank.diamond]: diamond,
  [Rank.ascendant]: ascendant,
  [Rank.immortal]: immortal,
  [Rank.radiant]: radiant,
};

export function getImageData(rank: Rank): StaticImageData {
  return iconRankMap[rank];
}
