"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSoundContext } from "@/contexts/SoundContext";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  magneticStrength?: number;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  dataCursorText?: string;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  magneticStrength = 0.3,
  variant = "primary",
  size = "md",
  dataCursorText,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { play } = useSoundContext();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * magneticStrength;
    const deltaY = (e.clientY - centerY) * magneticStrength;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent) => {
    play("click", 0.3);
    if (onClick) onClick();
  };

  const variants = {
    primary:
      "bg-gradient-to-r from-nexus-accent/20 to-nexus-accentAlt/20 border border-nexus-accent/30 text-nexus-accent hover:border-nexus-accent/60 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)]",
    secondary:
      "bg-nexus-surface border border-nexus-border text-nexus-text hover:border-nexus-accent/40 hover:bg-nexus-card",
    ghost:
      "bg-transparent border border-transparent text-nexus-muted hover:text-nexus-text hover:border-nexus-border",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const Component = href ? "a" : "button";
  const linkProps = href
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.2 }}
      className="inline-block"
      data-cursor-text={dataCursorText}
    >
      <Component
        onClick={handleClick}
        {...linkProps}
        className={`
          magnetic-btn inline-flex items-center gap-2 rounded-full
          font-mono text-sm tracking-wider uppercase
          transition-all duration-300 ease-out
          ${variants[variant]}
          ${sizes[size]}
          ${className}
        `}
      >
        {children}
      </Component>
    </motion.div>
  );
}