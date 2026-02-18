// components/Confetti.tsx
"use client";

import { useCallback } from "react";
import confetti from "canvas-confetti";

export function useConfetti() {
  const fireConfetti = useCallback(() => {
    // First burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#00f0ff", "#7b61ff", "#ff006e", "#00ff88", "#ff8c00"],
      disableForReducedMotion: true,
    });

    // Second burst with delay
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#00f0ff", "#7b61ff", "#ff006e"],
      });
    }, 200);

    // Third burst from right
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#00ff88", "#ff8c00", "#7b61ff"],
      });
    }, 400);
  }, []);

  return { fireConfetti };
}