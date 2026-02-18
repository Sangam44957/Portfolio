"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/constants";

interface SectionWrapperProps {
  children: React.ReactNode;
  id: string;
  className?: string;
  title?: string;
  subtitle?: string;
  showNumber?: boolean;
  number?: string;
}

export default function SectionWrapper({
  children,
  id,
  className = "",
  title,
  subtitle,
  showNumber = true,
  number,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id={id}
      className={`relative py-24 md:py-32 px-6 md:px-12 lg:px-24 ${className}`}
    >
      {title && (
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
        >
          <div className="flex items-center gap-4 mb-4">
            {showNumber && number && (
              <span className="text-nexus-accent font-mono text-sm">{number}</span>
            )}
            <div className="h-[1px] w-12 bg-gradient-to-r from-nexus-accent to-transparent" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display">
            <span className="gradient-text">{title}</span>
          </h2>

          {subtitle && (
            <p className="mt-4 text-nexus-muted text-lg max-w-2xl">{subtitle}</p>
          )}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {children}
      </motion.div>

      {/* Decorative corners */}
      <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-nexus-border/20 rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-nexus-border/20 rounded-bl-lg pointer-events-none" />
    </section>
  );
}