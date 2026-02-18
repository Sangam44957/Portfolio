"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useMotionValue } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { personalInfo, stats } from "@/data/portfolio";
import { EASE_OUT_EXPO, COLORS } from "@/lib/constants";

const ORBIT_COLORS = [COLORS.accent, COLORS.accentAlt, COLORS.pink, COLORS.green];

function AnimatedCounter({
  target,
  suffix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (isInView) motionValue.set(target);
  }, [isInView, motionValue, target]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplay(Math.floor(latest).toLocaleString());
    });
  }, [springValue]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const QUICK_INFO = [
  { label: "Location", value: personalInfo.location, icon: "📍" },
  { label: "Email", value: personalInfo.email, icon: "📧" },
  { label: "Experience", value: "Fresher (3rd Year)", icon: "💼" },
  { label: "Status", value: "Open to work", icon: "🟢" },
] as const;

export default function About() {
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(imageRef, { once: true });

  return (
    <SectionWrapper
      id="about"
      title="About Me"
      subtitle="A little bit about who I am and what I do"
      number="01"
    >
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — Visual */}
        <motion.div
          ref={imageRef}
          className="relative flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
        >
          <div className="relative w-72 h-72 md:w-80 md:h-80">
            {/* Animated border ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, #00f0ff, #7b61ff, #ff006e, #00ff88, #00f0ff)",
                padding: "3px",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full rounded-full bg-nexus-bg" />
            </motion.div>

            {/* Avatar */}
            <div className="absolute inset-3 rounded-full overflow-hidden glass">
              <div className="w-full h-full bg-gradient-to-br from-nexus-accent/20 via-nexus-accentAlt/20 to-nexus-pink/20 flex items-center justify-center">
                <span className="text-6xl">👨‍💻</span>
              </div>
            </div>

            {/* Floating badges */}
            {[
              { content: "</>", className: "-top-4 -right-4", animation: { y: [0, -10, 0] }, delay: 0, isMono: true },
              { content: "🚀", className: "-bottom-4 -left-4", animation: { y: [0, 10, 0] }, delay: 1, isMono: false },
              { content: "☕", className: "top-1/2 -right-8", animation: { x: [0, 5, 0] }, delay: 0.5, isMono: false },
            ].map((badge, i) => (
              <motion.div
                key={i}
                className={`absolute glass rounded-xl px-3 py-2 ${badge.className}`}
                animate={badge.animation}
                transition={{ duration: badge.isMono ? 3 : 4, repeat: Infinity, delay: badge.delay }}
              >
                <span className={`text-sm ${badge.isMono ? "font-mono text-nexus-accent" : ""}`}>
                  {badge.content}
                </span>
              </motion.div>
            ))}

            {/* Orbit dots */}
            {ORBIT_COLORS.map((color, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{ background: color, top: "50%", left: "50%" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: color, transform: `translateX(${140 + i * 15}px)` }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right — Text */}
        <div className="space-y-6">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-display font-bold text-nexus-text">
              Building the future,{" "}
              <span className="gradient-text-static">one commit at a time</span>
            </h3>
            <p className="text-nexus-muted leading-relaxed">{personalInfo.description}</p>
            <p className="text-nexus-muted leading-relaxed">
              When I&apos;m not coding, you&apos;ll find me exploring new technologies,
              contributing to open source, writing technical blog posts, or competing in hackathons.
            </p>
            <p className="text-nexus-muted leading-relaxed">
              Currently focused on{" "}
              <span className="text-nexus-accent">React ecosystem</span>,{" "}
              <span className="text-nexus-accentAlt">system design</span>, and{" "}
              <span className="text-nexus-pink">AI/ML integration</span> in web applications.
            </p>
          </motion.div>

          {/* Quick Info */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {QUICK_INFO.map((item) => (
              <div
                key={item.label}
                className="glass rounded-xl px-4 py-3 hover:border-nexus-accent/20 transition-colors"
              >
                <div className="text-xs text-nexus-muted font-mono mb-1">
                  {item.icon} {item.label}
                </div>
                <div className="text-sm text-nexus-text font-medium truncate">{item.value}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="glass rounded-2xl p-6 text-center group hover:border-nexus-accent/20 transition-all duration-300"
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="text-3xl md:text-4xl font-bold font-display gradient-text-static mb-2">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={2 + index * 0.3} />
            </div>
            <div className="text-sm text-nexus-muted font-mono">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}