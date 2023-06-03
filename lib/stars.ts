import { Rank } from "./types";

const RANK_VALUES: { [rank in Rank]: number } = {
  iron: 1,
  bronze: 2,
  silver: 3,
  gold: 4,
  platinum: 5,
  diamond: 6,
  ascendant: 7,
  immortal: 8,
  radiant: 9,
};

export function calculateStars(guessedRank: Rank, correctRank: Rank): number {
  const guessedValue = RANK_VALUES[guessedRank];
  const correctValue = RANK_VALUES[correctRank];

  if (guessedValue === correctValue) {
    return 2; // Correct rank: two stars.
  } else if (Math.abs(guessedValue - correctValue) === 1) {
    return 1; // One rank off: one star.
  } else {
    return 0; // More than one rank off: no stars.
  }
}
