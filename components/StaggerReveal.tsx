// components/StaggerReveal.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export default function StaggerReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const directionOffset = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  };

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{
          opacity: 0,
          ...directionOffset[direction],
          filter: "blur(10px)",
        }}
        animate={
          isInView
            ? {
                opacity: 1,
                y: 0,
                x: 0,
                filter: "blur(0px)",
              }
            : {}
        }
        transition={{
          duration: 0.8,
          delay,
          ease: [0.76, 0, 0.24, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}