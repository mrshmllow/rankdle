"use client";

import { Rankdle } from "@/db/schema";
import { useRef } from "react";
import { useRankdles } from "./store";
import { useSsr } from "usehooks-ts";

export function StoreInitalizer({ rankdles }: { rankdles: Rankdle[] }) {
  const initalized = useRef(false);
  const { isBrowser } = useSsr();

  if (!initalized.current) {
    useRankdles.getState().setRankdles(rankdles);

    if (isBrowser) {
      useRankdles.persist.rehydrate();

      if (useRankdles.getState()._internal.expires < Date.now()) {
        useRankdles.getState()._onNewDay();
      }
    }

    initalized.current = true;
  }

  return null;
}
