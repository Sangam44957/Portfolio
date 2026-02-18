"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
}

export default function ScrambleText({
  text,
  className = "",
  scrambleSpeed = 30,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearScramble = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const scramble = useCallback(() => {
    let iteration = 0;
    clearScramble();

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join(""),
      );

      iteration += 0.5;

      if (iteration >= text.length) {
        clearScramble();
        setDisplayText(text);
      }
    }, scrambleSpeed);
  }, [text, scrambleSpeed, clearScramble]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    scramble();
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    clearScramble();
    setDisplayText(text);
  };

  useEffect(() => clearScramble, [clearScramble]);

  return (
    <motion.span
      className={`inline-block cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor-text="👀"
    >
      {displayText.split("").map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-colors duration-100 ${
            isHovering && char !== text[index] ? "text-nexus-accent" : ""
          }`}
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char}
        </span>
      ))}
    </motion.span>
  );
}