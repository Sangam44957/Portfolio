"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export default function TextReveal({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
  as: Component = "p",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const words = text.split(" ");

  return (
    <div ref={ref} className="overflow-hidden">
      <Component className={className}>
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block overflow-hidden mr-[0.3em]">
            <motion.span
              className="inline-block"
              initial={{ y: "100%", opacity: 0 }}
              animate={
                isInView
                  ? { y: "0%", opacity: 1 }
                  : { y: "100%", opacity: 0 }
              }
              transition={{
                duration: 0.6,
                delay: delay + wordIndex * staggerDelay,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Component>
    </div>
  );
}