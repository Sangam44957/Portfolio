"use client";

import { useCallback, useState, useRef, useEffect } from "react";

// Generate sounds programmatically as fallback
function createAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    return new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
  } catch {
    return null;
  }
}

type SoundType =
  | "click"
  | "hover"
  | "type"
  | "success"
  | "toggle"
  | "boot"
  | "whoosh"
  | "error";

export function useSound() {
  const [isMuted, setIsMuted] = useState(true); // Start muted by default
  const ctxRef = useRef<AudioContext | null>(null);
  const audioCache = useRef<Map<SoundType, HTMLAudioElement>>(new Map());
  const [useFiles, setUseFiles] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check saved preference
    const savedMute = localStorage.getItem("nexus-sound-muted");
    if (savedMute !== null) {
      setIsMuted(savedMute === "true");
    }

    // Preload sound files
    const sounds: Partial<Record<SoundType, string>> = {
      click: "/sounds/click.wav",
      hover: "/sounds/hove.wav",
      type: "/sounds/type.wav",
      success: "/sounds/success.wav",
      toggle: "/sounds/toggle.wav",
      boot: "/sounds/boot.mp3",
    };

    let loadedCount = 0;
    const totalSounds = Object.keys(sounds).length;

    Object.entries(sounds).forEach(([key, path]) => {
      const audio = new Audio(path);
      audio.preload = "auto";
      audio.volume = 0.3;
      audio.onerror = () => {
        console.warn(`Failed to load sound: ${path}`);
        setUseFiles(false);
      };
      audio.onloadeddata = () => {
        loadedCount++;
        if (loadedCount === totalSounds) {
          setIsInitialized(true);
          console.log("✅ All sounds loaded successfully");
        }
      };
      audioCache.current.set(key as SoundType, audio);
    });

    // Fallback initialization
    setTimeout(() => {
      if (!isInitialized) {
        setIsInitialized(true);
      }
    }, 2000);
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

      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      const now = ctx.currentTime;
      gainNode.gain.setValueAtTime(0, now);

      switch (sound) {
        case "click":
          oscillator.frequency.setValueAtTime(800, now);
          oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.05);
          oscillator.type = "sine";
          gainNode.gain.linearRampToValueAtTime(volume, now + 0.005);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
          oscillator.start(now);
          oscillator.stop(now + 0.08);
          break;

        case "hover":
          oscillator.frequency.setValueAtTime(600, now);
          oscillator.frequency.exponentialRampToValueAtTime(900, now + 0.06);
          oscillator.type = "sine";
          gainNode.gain.linearRampToValueAtTime(volume * 0.3, now + 0.01);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
          oscillator.start(now);
          oscillator.stop(now + 0.06);
          break;

        case "type":
          oscillator.frequency.setValueAtTime(1200 + Math.random() * 400, now);
          oscillator.type = "square";
          gainNode.gain.linearRampToValueAtTime(volume * 0.2, now + 0.002);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
          oscillator.start(now);
          oscillator.stop(now + 0.03);
          break;

        case "success":
          oscillator.frequency.setValueAtTime(523, now);
          oscillator.frequency.setValueAtTime(659, now + 0.1);
          oscillator.frequency.setValueAtTime(784, now + 0.2);
          oscillator.type = "sine";
          gainNode.gain.linearRampToValueAtTime(volume, now + 0.01);
          gainNode.gain.setValueAtTime(volume, now + 0.25);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
          oscillator.start(now);
          oscillator.stop(now + 0.5);
          break;

        case "toggle":
          oscillator.frequency.setValueAtTime(500, now);
          oscillator.frequency.exponentialRampToValueAtTime(1000, now + 0.04);
          oscillator.type = "sine";
          gainNode.gain.linearRampToValueAtTime(volume * 0.5, now + 0.005);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
          oscillator.start(now);
          oscillator.stop(now + 0.06);
          break;

        case "boot":
          oscillator.frequency.setValueAtTime(100, now);
          oscillator.frequency.exponentialRampToValueAtTime(2000, now + 0.3);
          oscillator.type = "sawtooth";
          gainNode.gain.linearRampToValueAtTime(volume * 0.3, now + 0.01);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
          oscillator.start(now);
          oscillator.stop(now + 0.4);
          break;

        case "whoosh":
          oscillator.frequency.setValueAtTime(200, now);
          oscillator.frequency.exponentialRampToValueAtTime(50, now + 0.15);
          oscillator.type = "sine";
          gainNode.gain.linearRampToValueAtTime(volume * 0.3, now + 0.02);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
          oscillator.start(now);
          oscillator.stop(now + 0.15);
          break;

        case "error":
          oscillator.frequency.setValueAtTime(300, now);
          oscillator.frequency.setValueAtTime(200, now + 0.1);
          oscillator.type = "square";
          gainNode.gain.linearRampToValueAtTime(volume * 0.3, now + 0.01);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
          oscillator.start(now);
          oscillator.stop(now + 0.2);
          break;

        default:
          oscillator.frequency.setValueAtTime(440, now);
          oscillator.type = "sine";
          gainNode.gain.linearRampToValueAtTime(volume, now + 0.01);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
          oscillator.start(now);
          oscillator.stop(now + 0.1);
      }
    },
    [getContext]
  );

  const play = useCallback(
    (sound: SoundType, volume = 0.3) => {
      if (isMuted) return;
      if (!isInitialized) {
        console.log("⏳ Sounds not initialized yet");
        return;
      }

      // Try to use audio files first
      if (useFiles) {
        const audio = audioCache.current.get(sound);
        if (audio) {
          const soundClone = audio.cloneNode() as HTMLAudioElement;
          soundClone.volume = volume;
          soundClone.play().catch((err) => {
            console.warn(`⚠️ File failed, trying programmatic:`, err);
            playProgrammatic(sound, volume);
          });
          return;
        }
      }

      // Fallback to programmatic sounds
      playProgrammatic(sound, volume);
    },
    [isMuted, useFiles, playProgrammatic, isInitialized]
  );

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const newValue = !prev;
      localStorage.setItem("nexus-sound-muted", String(newValue));
      return newValue;
    });
  }, []);

  return { play, isMuted, toggleMute };
}
