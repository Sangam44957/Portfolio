"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/constants";

const BOOT_LINES = [
  { text: "Portfolio v1.0 — Initializing...", delay: 0 },
  { text: "[OK] Loading system modules", delay: 300 },
  { text: "[OK] Mounting creative filesystem", delay: 600 },
  { text: "[OK] Establishing connection", delay: 900 },
  { text: "[OK] Compiling portfolio assets", delay: 1200 },
  { text: "[OK] Loading dependencies", delay: 1500 },
  { text: "[OK] Rendering interface", delay: 1800 },
  { text: "", delay: 2100 },
  { text: "Welcome, visitor.", delay: 2300 },
  { text: "System ready. ✓", delay: 2600 },
] as const;

function getLineColor(text: string): string {
  if (text.includes("[OK]")) return "text-nexus-green";
  if (text.includes("Welcome")) return "text-nexus-accent font-bold text-base";
  if (text.includes("System ready")) return "text-nexus-accent font-bold";
  return "text-nexus-muted";
}

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"boot" | "logo" | "done">("boot");

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    BOOT_LINES.forEach((line, index) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines(index + 1);
          setProgress(((index + 1) / BOOT_LINES.length) * 100);
        }, line.delay),
      );
    });

    timers.push(setTimeout(() => setPhase("logo"), 3000));
    timers.push(
      setTimeout(() => {
        setPhase("done");
        setTimeout(onComplete, 600);
      }, 4200),
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[99999] bg-nexus-bg flex items-center justify-center"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          {/* Scanlines via CSS gradient instead of 100 divs */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 5px)",
            }}
          />

          <div className="absolute inset-0 grid-bg opacity-30" />

          <AnimatePresence mode="wait">
            {phase === "boot" && (
              <motion.div
                key="boot"
                className="w-full max-w-2xl px-8"
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="glass rounded-xl overflow-hidden">
                  {/* Terminal header */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-nexus-border">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="ml-3 text-xs text-nexus-muted font-mono">
                      portfolio://boot
                    </span>
                  </div>

                  {/* Terminal body */}
                  <div className="p-6 font-mono text-sm space-y-1 min-h-[300px]">
                    {BOOT_LINES.slice(0, visibleLines).map((line, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className={getLineColor(line.text)}
                      >
                        {line.text}
                        {index === visibleLines - 1 && (
                          <span className="terminal-cursor" />
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Progress bar */}
                  <div className="px-6 pb-4">
                    <div className="flex justify-between text-xs text-nexus-muted mb-2 font-mono">
                      <span>Loading portfolio</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full h-1 bg-nexus-border rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, #00f0ff, #7b61ff, #ff006e)",
                        }}
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {phase === "logo" && (
              <motion.div
                key="logo"
                className="flex flex-col items-center gap-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              >
                <motion.div
                  className="relative w-24 h-24"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                >
                  <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-nexus-accent border-r-nexus-accentAlt" />
                  <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-nexus-pink border-l-nexus-green" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      className="text-2xl font-bold gradient-text font-display"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                    >
                      S
                    </motion.span>
                  </div>
                </motion.div>

                <motion.p
                  className="text-nexus-muted font-mono text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0, 1] }}
                  transition={{ duration: 1.5 }}
                >
                  Preparing portfolio...
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Corner decorations */}
          <span className="absolute top-6 left-6 text-xs font-mono text-nexus-muted/30">PORTFOLIO</span>
          <span className="absolute top-6 right-6 text-xs font-mono text-nexus-muted/30">v1.0</span>
          <span className="absolute bottom-6 left-6 text-xs font-mono text-nexus-muted/30">2025</span>
          <span className="absolute bottom-6 right-6 text-xs font-mono text-nexus-muted/30">SANGAM.DEV</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}