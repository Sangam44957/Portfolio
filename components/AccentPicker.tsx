"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSoundContext } from "@/contexts/SoundContext";
import { EASE_OUT_EXPO, Z_INDEX } from "@/lib/constants";

const PRESETS = [
  { name: "Cyan", value: "#00f0ff", alt: "#0099cc" },
  { name: "Purple", value: "#7b61ff", alt: "#5a3fd6" },
  { name: "Pink", value: "#ff006e", alt: "#d4005c" },
  { name: "Green", value: "#00ff88", alt: "#00a65a" },
  { name: "Orange", value: "#ff8c00", alt: "#cc7000" },
  { name: "Gold", value: "#ffd700", alt: "#b89b00" },
  { name: "Red", value: "#ff3333", alt: "#cc2929" },
  { name: "Lime", value: "#a3ff00", alt: "#7acc00" },
] as const;

const DEFAULT_ACCENT = PRESETS[0];

export default function AccentPicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentAccent, setCurrentAccent] = useState<string>(DEFAULT_ACCENT.value);
  const { play } = useSoundContext();

  useEffect(() => {
    const saved = localStorage.getItem("nexus-accent");
    if (saved) {
      setCurrentAccent(saved);
      applyAccent(saved);
    } else {
      applyAccent(DEFAULT_ACCENT.value);
    }
  }, []);

  const applyAccent = (color: string) => {
    document.documentElement.style.setProperty("--nexus-accent", color);
    const preset = PRESETS.find((p) => p.value === color);
    document.documentElement.style.setProperty("--nexus-accent-light", preset?.alt ?? color);
  };

  const selectAccent = (preset: (typeof PRESETS)[number]) => {
    play("toggle", 0.3);
    setCurrentAccent(preset.value as string);
    applyAccent(preset.value);
    localStorage.setItem("nexus-accent", preset.value);
    setTimeout(() => setIsOpen(false), 300);
  };

  return (
    <div className="fixed right-20 bottom-6" style={{ zIndex: Z_INDEX.floatingControls }}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full glass flex items-center justify-center overflow-hidden group relative"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        data-cursor-text="COLOR"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.4, duration: 0.5 }}
      >
        <div className="w-5 h-5 rounded-full" style={{ background: currentAccent, boxShadow: `0 0 10px ${currentAccent}40` }} />

        <motion.div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: `conic-gradient(from 0deg, ${currentAccent}20, transparent, ${currentAccent}20)` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        <div className="absolute right-14 px-2 py-1 rounded-md glass text-[10px] font-mono text-nexus-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Accent color
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 bottom-14 glass rounded-xl p-3 min-w-[180px]"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
          >
            <p className="text-[10px] font-mono text-nexus-muted mb-2 uppercase tracking-wider">Choose accent</p>

            <div className="grid grid-cols-4 gap-2">
              {PRESETS.map((preset) => (
                <motion.button
                  key={preset.name}
                  onClick={() => selectAccent(preset)}
                  className="relative w-8 h-8 rounded-full group/color"
                  style={{
                    background: preset.value,
                    boxShadow: currentAccent === preset.value ? `0 0 12px ${preset.value}60` : "none",
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {currentAccent === preset.value && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-white/50"
                      layoutId="selectedAccent"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-mono text-nexus-muted opacity-0 group-hover/color:opacity-100 transition-opacity whitespace-nowrap">
                    {preset.name}
                  </span>
                </motion.button>
              ))}
            </div>

            <button
              onClick={() => selectAccent(DEFAULT_ACCENT)}
              className="w-full mt-2 py-1 text-[10px] font-mono text-nexus-muted/50 hover:text-nexus-muted transition-colors text-center"
            >
              Reset to default
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}