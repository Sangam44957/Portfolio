"use client";

import { useCallback } from "react";
import confetti from "canvas-confetti";
import { COLORS } from "@/lib/constants";

const PALETTE = [COLORS.accent, COLORS.accentAlt, COLORS.pink, COLORS.green, COLORS.orange];

export function useConfetti() {
  const fireConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: PALETTE,
      disableForReducedMotion: true,
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: PALETTE.slice(0, 3),
      });
    }, 200);

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: PALETTE.slice(2),
      });
    }, 400);
  }, []);

  return { fireConfetti };
}