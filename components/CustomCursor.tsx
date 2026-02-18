"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Hide on mobile
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const setupHoverListeners = () => {
      const hoverElements = document.querySelectorAll(
        'a, button, [data-cursor="pointer"], input, textarea, [role="button"]'
      );
      const textElements = document.querySelectorAll("[data-cursor-text]");

      hoverElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true));
        el.addEventListener("mouseleave", () => {
          setIsHovering(false);
          setCursorText("");
        });
      });

      textElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setIsHovering(true);
          setCursorText(
            (el as HTMLElement).getAttribute("data-cursor-text") || ""
          );
        });
        el.addEventListener("mouseleave", () => {
          setIsHovering(false);
          setCursorText("");
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    setupHoverListeners();

    const observer = new MutationObserver(setupHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible]);

  if (typeof window !== "undefined" && window.innerWidth < 768) return null;

  return (
    <>
      {/* Main cursor dot — POINTER EVENTS NONE is critical */}
      <motion.div
        className="fixed top-0 left-0 z-[99998]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",  // ← THIS IS KEY
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.8 : isHovering ? 1 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        {/* Cursor with text label on hover */}
        {isHovering && cursorText ? (
          <motion.div
            className="flex items-center justify-center rounded-full border"
            style={{ pointerEvents: "none" }}
            initial={{ width: 16, height: 16 }}
            animate={{ width: 64, height: 64 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="rounded-full flex items-center justify-center bg-nexus-accent/90"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                pointerEvents: "none",
              }}
            >
              <span
                className="text-[9px] font-bold text-nexus-bg uppercase tracking-wider"
                style={{ pointerEvents: "none" }}
              >
                {cursorText}
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            style={{ pointerEvents: "none" }}
            animate={{
              width: isHovering ? 48 : 16,
              height: isHovering ? 48 : 16,
            }}
            transition={{ duration: 0.2 }}
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
                pointerEvents: "none",
              }}
            />
          </motion.div>
        )}
      </motion.div>

      {/* Outer trailing ring */}
      <motion.div
        className="fixed top-0 left-0 z-[99997]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",  // ← CRITICAL
        }}
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