"use client";

import { Rankdle } from "@/db/schema";
import { useRef } from "react";
import { useRankdles } from "./store";

export function StoreInitalizer({ rankdles }: { rankdles: Rankdle[] }) {
  const initalized = useRef(false);

  if (!initalized.current) {
    useRankdles.getState().setRankdles(rankdles);

    if (useRankdles.getState()._expires < Date.now()) {
      useRankdles.getState()._onNewDay();
    }

    initalized.current = true;
  }

  return null;
}
