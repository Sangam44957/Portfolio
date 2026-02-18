// components/ScrambleText.tsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  revealSpeed?: number;
}

export default function ScrambleText({
  text,
  className = "",
  scrambleSpeed = 30,
  revealSpeed = 50,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = useCallback(() => {
    let iteration = 0;
    const originalText = text;

    // Clear any existing interval
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        originalText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return originalText[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      iteration += 1 / 2;

      if (iteration >= originalText.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(originalText);
      }
    }, scrambleSpeed);
  }, [text, scrambleSpeed]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    scramble();
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(text);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

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
            isHovering && char !== text[index]
              ? "text-nexus-accent"
              : ""
          }`}
          style={{
            fontFamily: "inherit",
            whiteSpace: char === " " ? "pre" : undefined,
          }}
        >
          {char}
        </span>
      ))}
    </motion.span>
  );
}