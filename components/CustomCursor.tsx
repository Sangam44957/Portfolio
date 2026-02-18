"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { isMobile, isBrowser } from "@/lib/utils";
import { SPRING_CURSOR, Z_INDEX } from "@/lib/constants";

const HOVER_SELECTOR =
  'a, button, [data-cursor="pointer"], input, textarea, [role="button"]';
const TEXT_SELECTOR = "[data-cursor-text]";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(true);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, SPRING_CURSOR);
  const smoothY = useSpring(cursorY, SPRING_CURSOR);

  // Check mobile once on mount
  useEffect(() => {
    setIsMobileDevice(isMobile());
  }, []);

  const handleEnterHover = useCallback(() => setIsHovering(true), []);
  const handleLeaveHover = useCallback(() => {
    setIsHovering(false);
    setCursorText("");
  }, []);

  useEffect(() => {
    if (isMobileDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Store refs to cleanup functions for each element
    const cleanupFns: (() => void)[] = [];

    const setupListeners = () => {
      // Clear previous listeners
      cleanupFns.forEach((fn) => fn());
      cleanupFns.length = 0;

      document.querySelectorAll(HOVER_SELECTOR).forEach((el) => {
        const enter = () => setIsHovering(true);
        const leave = () => {
          setIsHovering(false);
          setCursorText("");
        };
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
        cleanupFns.push(() => {
          el.removeEventListener("mouseenter", enter);
          el.removeEventListener("mouseleave", leave);
        });
      });

      document.querySelectorAll(TEXT_SELECTOR).forEach((el) => {
        const text = (el as HTMLElement).dataset.cursorText || "";
        const enter = () => {
          setIsHovering(true);
          setCursorText(text);
        };
        const leave = () => {
          setIsHovering(false);
          setCursorText("");
        };
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
        cleanupFns.push(() => {
          el.removeEventListener("mouseenter", enter);
          el.removeEventListener("mouseleave", leave);
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    setupListeners();

    const observer = new MutationObserver(setupListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cleanupFns.forEach((fn) => fn());
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible, isMobileDevice]);

  if (isMobileDevice) return null;

  const sharedStyle = {
    x: smoothX,
    y: smoothY,
    translateX: "-50%",
    translateY: "-50%",
    pointerEvents: "none" as const,
  };

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0"
        style={{ ...sharedStyle, zIndex: Z_INDEX.cursor }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        {isHovering && cursorText ? (
          <motion.div
            className="flex items-center justify-center rounded-full bg-nexus-accent/90"
            initial={{ width: 16, height: 16 }}
            animate={{ width: 64, height: 64 }}
            transition={{ duration: 0.2 }}
            style={{ pointerEvents: "none" }}
          >
            <span className="text-[9px] font-bold text-nexus-bg uppercase tracking-wider">
              {cursorText}
            </span>
          </motion.div>
        ) : (
          <motion.div
            animate={{
              width: isHovering ? 48 : 16,
              height: isHovering ? 48 : 16,
            }}
            transition={{ duration: 0.2 }}
            style={{ pointerEvents: "none" }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: isHovering
                  ? "rgba(0, 240, 255, 0.15)"
                  : "rgba(0, 240, 255, 0.8)",
                border: isHovering
                  ? "1.5px solid rgba(0, 240, 255, 0.4)"
                  : "none",
              }}
            />
          </motion.div>
        )}
      </motion.div>

      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0"
        style={{ ...sharedStyle, zIndex: Z_INDEX.cursorTrail }}
        animate={{
          opacity: isVisible ? 0.3 : 0,
          scale: isClicking ? 1.5 : isHovering ? 0 : 1,
          width: 40,
          height: 40,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div
          className="w-full h-full rounded-full border border-nexus-accent/30"
          style={{ pointerEvents: "none" }}
        />
      </motion.div>
    </>
  );
}