"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { testimonials } from "@/data/portfolio";
import { EASE_OUT_EXPO } from "@/lib/constants";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.9 }),
  center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.9, transition: { duration: 0.6, ease: EASE_OUT_EXPO } }),
};

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isInView]);

  const navigate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => {
      if (dir === 1) return (prev + 1) % testimonials.length;
      return prev === 0 ? testimonials.length - 1 : prev - 1;
    });
  };

  return (
    <SectionWrapper id="testimonials" title="Kind Words" subtitle="What people I've worked with have to say" number="07">
      <div ref={ref} className="max-w-3xl mx-auto">
        <div className="relative min-h-[280px] flex items-center overflow-hidden">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full absolute inset-0 flex items-center"
            >
              <div className="w-full glass rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-nexus-accent/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-nexus-accentAlt/5 rounded-full blur-3xl" />

                <motion.div
                  className="text-5xl text-nexus-accent/10 mb-4 font-serif"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  &ldquo;
                </motion.div>

                <p className="text-lg md:text-xl text-nexus-text leading-relaxed mb-8 relative z-10">
                  {testimonials[current].content}
                </p>

                <div className="flex items-center justify-center gap-4 relative z-10">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-nexus-accent/30 to-nexus-accentAlt/30 flex items-center justify-center text-xl font-bold text-nexus-accent">
                      {testimonials[current].name.charAt(0)}
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-nexus-accent/20"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-nexus-text font-display">{testimonials[current].name}</p>
                    <p className="text-xs text-nexus-muted font-mono">{testimonials[current].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <motion.button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-nexus-muted hover:text-nexus-accent transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous testimonial"
          >
            <FiChevronLeft className="w-5 h-5" />
          </motion.button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className="relative h-2 rounded-full overflow-hidden transition-all duration-500"
                animate={{ width: i === current ? 24 : 8, backgroundColor: i === current ? "rgba(0,240,255,1)" : "rgba(26,26,26,1)" }}
                aria-label={`Go to testimonial ${i + 1}`}
              >
                {i === current && (
                  <motion.div
                    className="absolute inset-0 bg-nexus-accentAlt rounded-full origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 5, ease: "linear" }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <motion.button
            onClick={() => navigate(1)}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-nexus-muted hover:text-nexus-accent transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next testimonial"
          >
            <FiChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </SectionWrapper>
  );
}