"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Glow effect */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[9998] origin-left blur-sm"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #00f0ff, #7b61ff, #ff006e)",
          opacity: 0.6,
        }}
      />
      {/* Main progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[9999] origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #00f0ff, #7b61ff, #ff006e)",
          boxShadow: "0 0 20px rgba(0, 240, 255, 0.5), 0 0 40px rgba(123, 97, 255, 0.3)",
        }}
      />
    </>
  );
}