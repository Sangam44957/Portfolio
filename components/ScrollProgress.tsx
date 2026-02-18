"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Z_INDEX } from "@/lib/constants";

const GRADIENT = "linear-gradient(90deg, #00f0ff, #7b61ff, #ff006e)";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-left blur-sm"
        style={{ scaleX, background: GRADIENT, opacity: 0.6, zIndex: Z_INDEX.scrollProgress }}
      />
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] origin-left"
        style={{
          scaleX,
          background: GRADIENT,
          boxShadow: "0 0 20px rgba(0,240,255,0.5), 0 0 40px rgba(123,97,255,0.3)",
          zIndex: Z_INDEX.scrollProgress + 1,
        }}
      />
    </>
  );
}