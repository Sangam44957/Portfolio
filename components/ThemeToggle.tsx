"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSoundContext } from "@/contexts/SoundContext";
import { EASE_OUT_EXPO, Z_INDEX } from "@/lib/constants";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { play } = useSoundContext();

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("nexus-theme");
    if (saved === "light") {
      setIsDark(false);
      document.documentElement.classList.add("light");
    }
  }, []);

  const toggleTheme = () => {
    if (isAnimating) return;
    play("toggle", 0.3);
    setIsAnimating(true);

    const newIsDark = !isDark;
    const rect = buttonRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 40;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    const maxRadius = Math.sqrt(
      Math.max(x, window.innerWidth - x) ** 2 + Math.max(y, window.innerHeight - y) ** 2,
    );

    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position:fixed;top:${y}px;left:${x}px;width:0;height:0;
      border-radius:50%;transform:translate(-50%,-50%);z-index:99999;
      pointer-events:none;background:${newIsDark ? "#050505" : "#f5f5f7"};
      transition:width 0.8s cubic-bezier(0.76,0,0.24,1),height 0.8s cubic-bezier(0.76,0,0.24,1);
    `;
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      const size = maxRadius * 2.2;
      overlay.style.width = `${size}px`;
      overlay.style.height = `${size}px`;
    });

    setTimeout(() => {
      setIsDark(newIsDark);
      if (newIsDark) {
        document.documentElement.classList.remove("light");
        localStorage.setItem("nexus-theme", "dark");
      } else {
        document.documentElement.classList.add("light");
        localStorage.setItem("nexus-theme", "light");
      }
    }, 400);

    setTimeout(() => {
      overlay.style.opacity = "0";
      overlay.style.transition = "opacity 0.3s ease";
      setTimeout(() => {
        document.body.removeChild(overlay);
        setIsAnimating(false);
      }, 300);
    }, 900);
  };

  if (!mounted) return null;

  return (
    <motion.button
      ref={buttonRef}
      onClick={toggleTheme}
      className="fixed right-6 bottom-24 w-12 h-12 rounded-full flex items-center justify-center overflow-hidden group glass"
      style={{ zIndex: Z_INDEX.floatingControls }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      data-cursor-text="THEME"
      aria-label="Toggle theme"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: isDark
            ? "conic-gradient(from 0deg, rgba(0,240,255,0.1), rgba(123,97,255,0.1), rgba(0,240,255,0.1))"
            : "conic-gradient(from 0deg, rgba(255,140,0,0.15), rgba(255,200,50,0.15), rgba(255,140,0,0.15))",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.svg key="moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 text-nexus-accent" initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: 90, scale: 0 }} transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}>
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </motion.svg>
        ) : (
          <motion.svg key="sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 text-amber-500" initial={{ rotate: 90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: -90, scale: 0 }} transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}>
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </motion.svg>
        )}
      </AnimatePresence>

      <div className="absolute right-14 px-2 py-1 rounded-md glass text-[10px] font-mono text-nexus-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {isDark ? "Light mode" : "Dark mode"}
      </div>
    </motion.button>
  );
}