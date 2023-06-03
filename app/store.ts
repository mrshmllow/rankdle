import { Rankdle } from "@/db/schema";
import { calculateStars } from "@/lib/stars";
import { Rank } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

function getExpiration() {
  const now = new Date();
  now.setUTCDate(now.getUTCDate() + 1);
  now.setUTCHours(0, 0, 0, 0);
  return now.getTime();
}

export const useRankdles = create<{
  rankdles: Rankdle[];
  setRankdles: (rankdles: Rankdle[]) => void;
  currentRankdle: number;
  incrementCurrentRankdle: () => void;
  selectedRank: Rank | null;
  setSelectedRank: (rank: Rank | null) => void;
  stars: number;
  increaseStars: () => void;
  playedToday: boolean;
  streak: number;
  _streakIncreased: boolean;
  _expires: number;
  _onNewDay: () => void;

  gameState: "guessing" | "post-guess" | "game-over";
  incrementGameState: () => void;
}>()(
  persist(
    (set, get) => ({
      rankdles: [],
      setRankdles: (rankdles: Rankdle[]) => set({ rankdles }),
      currentRankdle: 0,
      selectedRank: null,
      setSelectedRank: (rank: Rank | null) => set({ selectedRank: rank }),
      incrementCurrentRankdle: () =>
        set(() =>
          get().currentRankdle + 1 >= get().rankdles.length
            ? {
                playedToday: true,
                gameState: "game-over",
              }
            : {
                playedToday: true,
                currentRankdle: get().currentRankdle + 1,
              }
        ),
      stars: 0,
      playedToday: false,
      _streakIncreased: false,
      _expires: 0,
      increaseStars: () =>
        set(() => {
          const newStars =
            get().stars +
            calculateStars(
              get().selectedRank!,
              get().rankdles[get().currentRankdle].rank
            );
          const streakResetCondition =
            newStars <= 3 &&
            get().gameState === "game-over" &&
            get().playedToday;
          const streakMaintainCondition =
            (newStars >= 3 && !get()._streakIncreased) ||
            (get().rankdles.length === 0 && !get()._streakIncreased);
          const streakIncreaseCondition =
            !streakMaintainCondition && !get()._streakIncreased;

          return {
            playedToday: true,
            stars: newStars,
            streak: streakResetCondition
              ? 0
              : streakIncreaseCondition
              ? get().streak + 1
              : get().streak,
            _streakIncreased:
              streakMaintainCondition || streakIncreaseCondition,
          };
        }),
      streak: 0,
      _onNewDay: () =>
        set({
          playedToday: false,
          stars: 0,
          currentRankdle: 0,
          _streakIncreased: false,
          _expires: getExpiration(),
        }),
      gameState: "guessing",
      incrementGameState: () =>
        set({
          gameState:
            get().gameState === "guessing"
              ? "post-guess"
              : get().gameState === "post-guess" &&
                get().currentRankdle + 1 >= get().rankdles.length
              ? "game-over"
              : "guessing",
        }),
    }),
    {
      name: "rankdles-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({
        playedToday: state.playedToday,
        stars: state.stars,
        streak: state.streak,
        currentRankdle: state.currentRankdle,
        _expires: state._expires,
        gameState: state.gameState,
        selectedRank: state.selectedRank,
      }),
      version: 1,
    }
  )
);
