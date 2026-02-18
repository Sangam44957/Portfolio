"use client";

import { motion } from "framer-motion";
import { Z_INDEX } from "@/lib/constants";

interface SoundToggleProps {
  isMuted: boolean;
  toggleMute: () => void;
}

export default function SoundToggle({ isMuted, toggleMute }: SoundToggleProps) {
  const handleToggle = () => {
    toggleMute();
    if (isMuted) {
      setTimeout(() => {
        const audio = new Audio("/sounds/toggle.wav");
        audio.volume = 0.3;
        audio.play().catch(() => {});
      }, 100);
    }
  };

  return (
    <motion.button
      onClick={handleToggle}
      className="fixed right-6 bottom-6 w-12 h-12 rounded-full flex items-center justify-center overflow-hidden group glass"
      style={{ zIndex: Z_INDEX.floatingControls }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      data-cursor-text={isMuted ? "UNMUTE" : "MUTE"}
      aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.2, duration: 0.5 }}
    >
      {!isMuted && (
        <>
          <motion.div className="absolute inset-0 rounded-full border border-nexus-accent/20" animate={{ scale: [1, 1.6], opacity: [0.3, 0] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.div className="absolute inset-0 rounded-full border border-nexus-accent/10" animate={{ scale: [1, 1.9], opacity: [0.2, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }} />
        </>
      )}

      <div className="relative z-10">
        {isMuted ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-nexus-muted group-hover:text-nexus-accent transition-colors">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-nexus-accent">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </div>

      <div className="absolute right-14 px-2 py-1 rounded-md glass text-[10px] font-mono text-nexus-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {isMuted ? "Enable sounds" : "Mute sounds"}
      </div>
    </motion.button>
  );
}