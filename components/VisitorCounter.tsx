"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiX } from "react-icons/fi";

export default function VisitorCounter() {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Get and increment count
    const stored = parseInt(localStorage.getItem("nexus-visitors") || "1337");
    const newCount = stored + 1;
    localStorage.setItem("nexus-visitors", newCount.toString());
    setCount(newCount);

    // Show after 3 seconds
    const timer = setTimeout(() => setIsVisible(true), 3000);

    // Auto-hide after 10 seconds
    const hideTimer = setTimeout(() => setIsVisible(false), 13000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-20 md:bottom-6 left-1/2 z-[9996] glass rounded-full px-4 py-2 flex items-center gap-3"
          initial={{ y: 50, x: "-50%", opacity: 0, scale: 0.9 }}
          animate={{ y: 0, x: "-50%", opacity: 1, scale: 1 }}
          exit={{ y: 50, x: "-50%", opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          <FiEye className="w-3.5 h-3.5 text-nexus-muted" />

          <span className="text-xs font-mono text-nexus-muted">
            Visitor{" "}
            <span className="text-nexus-accent font-bold">
              #{count.toLocaleString()}
            </span>
          </span>

          {/* Live pulse */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nexus-green opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-nexus-green" />
          </span>

          {/* Dismiss button */}
          <button
            onClick={() => setIsDismissed(true)}
            className="text-nexus-muted/40 hover:text-nexus-muted transition-colors ml-1"
          >
            <FiX className="w-3 h-3" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}