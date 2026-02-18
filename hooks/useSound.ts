"use client";

import { useCallback, useRef, useEffect, useState } from "react";

type SoundType =
  | "click"
  | "hover"
  | "type"
  | "success"
  | "toggle"
  | "boot"
  | "whoosh"
  | "error";

function createAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    return new Ctor();
  } catch {
    return null;
  }
}

/** Sound file manifest — single source of truth */
const SOUND_FILES: Partial<Record<SoundType, string>> = {
  click: "/sounds/click.wav",
  hover: "/sounds/hove.wav",
  type: "/sounds/type.wav",
  success: "/sounds/success.wav",
  toggle: "/sounds/toggle.wav",
  boot: "/sounds/boot.mp3",
};

export function useSound() {
  const [isMuted, setIsMuted] = useState(true);
  const isMutedRef = useRef(true);
  const ctxRef = useRef<AudioContext | null>(null);
  const audioCache = useRef<Map<SoundType, HTMLAudioElement>>(new Map());
  const useFilesRef = useRef(true);
  const isInitializedRef = useRef(false);

  // Keep ref in sync to avoid stale closures
  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  // Load preferences and preload audio files
  useEffect(() => {
    const savedMute = localStorage.getItem("nexus-sound-muted");
    if (savedMute !== null) {
      const parsed = savedMute === "true";
      setIsMuted(parsed);
      isMutedRef.current = parsed;
    }

    let loadedCount = 0;
    const entries = Object.entries(SOUND_FILES);
    const totalSounds = entries.length;

    entries.forEach(([key, path]) => {
      const audio = new Audio(path);
      audio.preload = "auto";
      audio.volume = 0.3;

      audio.addEventListener("error", () => {
        useFilesRef.current = false;
      });

      audio.addEventListener("canplaythrough", () => {
        loadedCount++;
        if (loadedCount >= totalSounds) {
          isInitializedRef.current = true;
        }
      });

      audioCache.current.set(key as SoundType, audio);
    });

    // Fallback: mark initialized after timeout even if files fail
    const fallbackTimer = setTimeout(() => {
      isInitializedRef.current = true;
    }, 2000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  const getContext = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = createAudioContext();
    }
    return ctxRef.current;
  }, []);

  const playProgrammatic = useCallback(
    (sound: SoundType, volume: number) => {
      const ctx = getContext();
      if (!ctx) return;
      if (ctx.state === "suspended") ctx.resume();

      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      const now = ctx.currentTime;
      gainNode.gain.setValueAtTime(0, now);

      const configs: Record<SoundType, () => { duration: number }> = {
        click: () => {
          oscillator.frequency.setValueAtTime(800, now);
          oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.05);
          oscillator.type = "sine";
          gainNode.gain.linearRampToValueAtTime(volume, now + 0.005);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
          return { duration: 0.08 };
        },
        hover: () => {
          oscillator.frequency.setValueAtTime(600, now);
          oscillator.frequency.exponentialRampToValueAtTime(900, now + 0.06);
          oscillator.type = "sine";
          gainNode.gain.linearRampToValueAtTime(volume * 0.3, now + 0.01);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
          return { duration: 0.06 };
        },
        type: () => {
          oscillator.frequency.setValueAtTime(1200 + Math.random() * 400, now);
          oscillator.type = "square";
          gainNode.gain.linearRampToValueAtTime(volume * 0.2, now + 0.002);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
          return { duration: 0.03 };
        },
        success: () => {
          oscillator.frequency.setValueAtTime(523, now);
          oscillator.frequency.setValueAtTime(659, now + 0.1);
          oscillator.frequency.setValueAtTime(784, now + 0.2);
          oscillator.type = "sine";
          gainNode.gain.linearRampToValueAtTime(volume, now + 0.01);
          gainNode.gain.setValueAtTime(volume, now + 0.25);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
          return { duration: 0.5 };
        },
        toggle: () => {
          oscillator.frequency.setValueAtTime(500, now);
          oscillator.frequency.exponentialRampToValueAtTime(1000, now + 0.04);
          oscillator.type = "sine";
          gainNode.gain.linearRampToValueAtTime(volume * 0.5, now + 0.005);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
          return { duration: 0.06 };
        },
        boot: () => {
          oscillator.frequency.setValueAtTime(100, now);
          oscillator.frequency.exponentialRampToValueAtTime(2000, now + 0.3);
          oscillator.type = "sawtooth";
          gainNode.gain.linearRampToValueAtTime(volume * 0.3, now + 0.01);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
          return { duration: 0.4 };
        },
        whoosh: () => {
          oscillator.frequency.setValueAtTime(200, now);
          oscillator.frequency.exponentialRampToValueAtTime(50, now + 0.15);
          oscillator.type = "sine";
          gainNode.gain.linearRampToValueAtTime(volume * 0.3, now + 0.02);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
          return { duration: 0.15 };
        },
        error: () => {
          oscillator.frequency.setValueAtTime(300, now);
          oscillator.frequency.setValueAtTime(200, now + 0.1);
          oscillator.type = "square";
          gainNode.gain.linearRampToValueAtTime(volume * 0.3, now + 0.01);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
          return { duration: 0.2 };
        },
      };

      const { duration } = (configs[sound] ?? configs.click)();
      oscillator.start(now);
      oscillator.stop(now + duration);
    },
    [getContext],
  );

  const play = useCallback(
    (sound: SoundType, volume = 0.3) => {
      if (isMutedRef.current || !isInitializedRef.current) return;

      if (useFilesRef.current) {
        const audio = audioCache.current.get(sound);
        if (audio) {
          const clone = audio.cloneNode() as HTMLAudioElement;
          clone.volume = volume;
          clone.play().catch(() => playProgrammatic(sound, volume));
          return;
        }
      }

      playProgrammatic(sound, volume);
    },
    [playProgrammatic],
  );

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      isMutedRef.current = next;
      localStorage.setItem("nexus-sound-muted", String(next));
      return next;
    });
  }, []);

  return { play, isMuted, toggleMute };
}
