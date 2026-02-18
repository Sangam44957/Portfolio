"use client";

import { useEffect, useRef } from "react";
import { isMobile } from "@/lib/utils";
import { Z_INDEX } from "@/lib/constants";

export default function SpotlightEffect() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile()) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current) return;
      spotlightRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(0,240,255,0.04), transparent 40%)`;
    };

    const handleMouseLeave = () => {
      if (spotlightRef.current) spotlightRef.current.style.background = "transparent";
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none fixed inset-0 transition-opacity duration-300"
      style={{ zIndex: Z_INDEX.spotlight }}
    />
  );
}