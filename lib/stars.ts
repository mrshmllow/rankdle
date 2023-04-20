import { Rank } from "./types";

export function calculateStars(guessedRank: Rank, correctRank: Rank): number {
  if (guessedRank === correctRank) {
    return 2; // Correct rank: two stars.
  } else if (Math.abs(guessedRank - correctRank) === 1) {
    return 1; // One rank off: one star.
  } else {
    return 0; // More than one rank off: no stars.
  }
}
