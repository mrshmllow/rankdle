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
  _internal: {
    streakIncreased: boolean;
    expires: number;
  };
  _onNewDay: () => void;
  lifetime: {
    stars: number[];
    wins: number;
  };
  rankdles: Rankdle[];
  setRankdles: (rankdles: Rankdle[]) => void;
  currentRankdle: number;
  incrementCurrentRankdle: () => void;
  selectedRank: Rank | null;
  setSelectedRank: (rank: Rank | null) => void;
  incrementGameState: () => void;
  stars: number;
  playedToday: boolean;
  increaseStars: () => void;
  streak: number;
  gameState: "guessing" | "post-guess" | "game-over";
}>()(
  persist(
    (set, get) => ({
      _internal: {
        streakIncreased: false,
        expires: 0,
      },
      _onNewDay: () =>
        set({
          playedToday: false,
          stars: 0,
          currentRankdle: 0,
          _internal: {
            ...get()._internal,
            streakIncreased: false,
            expires: getExpiration(),
          },
        }),
      lifetime: {
        stars: Array(7).fill(0),
        wins: 0,
      },
      rankdles: [],
      setRankdles: (rankdles: Rankdle[]) => set({ rankdles }),
      currentRankdle: 0,
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
      selectedRank: null,
      setSelectedRank: (rank: Rank | null) => set({ selectedRank: rank }),
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
      stars: 0,
      playedToday: false,
      increaseStars: () =>
        set(() => {
          const newStars =
            get().stars +
            calculateStars(
              get().selectedRank!,
              get().rankdles[get().currentRankdle].rank
            );

          let streakResetCondition = false;
          let streakIncreaseCondition = false;
          let lifetimeWins = get().lifetime.wins;
          let lifetimeStars = [...get().lifetime.stars];

          if (newStars < 3 && get().gameState === "game-over") {
            streakResetCondition = true;
          }

          if (newStars >= 3 && !get()._internal.streakIncreased) {
            streakIncreaseCondition = true;

            lifetimeStars[newStars]++;

            lifetimeWins =
              newStars >= 3 ? get().lifetime.wins + 1 : get().lifetime.wins;
          }

          return {
            playedToday: true,
            stars: newStars,
            streak: streakResetCondition
              ? 0
              : streakIncreaseCondition
              ? get().streak + 1
              : get().streak,
            _internal: {
              ...get()._internal,
              streakIncreased:
                streakIncreaseCondition || get()._internal.streakIncreased,
            },
            lifetime: {
              stars: lifetimeStars,
              wins: lifetimeWins,
            },
          };
        }),
      streak: 0,
      gameState: "guessing",
    }),
    {
      name: "rankdles-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({
        playedToday: state.playedToday,
        stars: state.stars,
        streak: state.streak,
        currentRankdle: state.currentRankdle,
        gameState: state.gameState,
        selectedRank: state.selectedRank,
        lifetime: {
          ...state.lifetime,
        },
        _internal: {
          ...state._internal,
        },
      }),
      version: 1,
      skipHydration: true,
    }
  )
);
