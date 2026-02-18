"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { useSound } from "@/hooks/useSound";

type SoundType =
  | "click"
  | "hover"
  | "type"
  | "success"
  | "toggle"
  | "boot"
  | "whoosh"
  | "error";

interface SoundContextValue {
  play: (sound: SoundType, volume?: number) => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const SoundContext = createContext<SoundContextValue>({
  play: () => {},
  isMuted: true,
  toggleMute: () => {},
});

export function SoundProvider({ children }: { children: ReactNode }) {
  const sound = useSound();

  return (
    <SoundContext.Provider value={sound}>{children}</SoundContext.Provider>
  );
}

export function useSoundContext() {
  return useContext(SoundContext);
}