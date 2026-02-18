"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_OUT_EXPO, Z_INDEX } from "@/lib/constants";
import { FiEye, FiX } from "react-icons/fi";

export default function VisitorCounter() {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const stored = parseInt(localStorage.getItem("nexus-visitors") || "1337", 10);
    const next = stored + 1;
    localStorage.setItem("nexus-visitors", next.toString());
    setCount(next);

    const showTimer = setTimeout(() => setIsVisible(true), 3000);
    const hideTimer = setTimeout(() => setIsVisible(false), 13000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-20 md:bottom-6 left-1/2 glass rounded-full px-4 py-2 flex items-center gap-3"
          style={{ zIndex: Z_INDEX.visitorCounter }}
          initial={{ y: 50, x: "-50%", opacity: 0, scale: 0.9 }}
          animate={{ y: 0, x: "-50%", opacity: 1, scale: 1 }}
          exit={{ y: 50, x: "-50%", opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        >
          <FiEye className="w-3.5 h-3.5 text-nexus-muted" />
          <span className="text-xs font-mono text-nexus-muted">
            Visitor <span className="text-nexus-accent font-bold">#{count.toLocaleString()}</span>
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nexus-green opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-nexus-green" />
          </span>
          <button onClick={() => setIsDismissed(true)} className="text-nexus-muted/40 hover:text-nexus-muted transition-colors ml-1" aria-label="Dismiss">
            <FiX className="w-3 h-3" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}