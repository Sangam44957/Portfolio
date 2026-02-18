"use client";

import { createContext, useContext, ReactNode } from "react";
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

type SoundContextType = {
  play: (sound: SoundType, volume?: number) => void;
  isMuted: boolean;
  toggleMute: () => void;
};

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: ReactNode }) {
  const sound = useSound();
  return <SoundContext.Provider value={sound}>{children}</SoundContext.Provider>;
}

export function useSoundContext() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSoundContext must be used within SoundProvider");
  }
  return context;
}
