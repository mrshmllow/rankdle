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
  iron,
  bronze,
  silver,
  gold,
  platinum,
  diamond,
  ascendant,
  immortal,
  radiant,
};

export function getImageData(rank: Rank): StaticImageData {
  return iconRankMap[rank];
}
