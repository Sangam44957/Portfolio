"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useMotionValue } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { personalInfo, stats } from "@/data/portfolio";

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
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, motionValue, target]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplay(Math.floor(latest).toLocaleString());
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

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
        {/* Left — Image & Visual */}
        <motion.div
          ref={imageRef}
          className="relative flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
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

            {/* Avatar image */}
            <div className="absolute inset-3 rounded-full overflow-hidden glass">
              <div className="w-full h-full bg-gradient-to-br from-nexus-accent/20 via-nexus-accentAlt/20 to-nexus-pink/20 flex items-center justify-center">
                <span className="text-6xl">👨‍💻</span>
                {/* Replace with:
                <Image
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.name}
                  fill
                  className="object-cover"
                /> */}
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              className="absolute -top-4 -right-4 glass rounded-xl px-3 py-2"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-sm font-mono text-nexus-accent">
                {"</>"}
              </span>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 glass rounded-xl px-3 py-2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              <span className="text-sm">🚀</span>
            </motion.div>

            <motion.div
              className="absolute top-1/2 -right-8 glass rounded-xl px-3 py-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            >
              <span className="text-sm">☕</span>
            </motion.div>

            {/* Orbit dots */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: ["#00f0ff", "#7b61ff", "#ff006e", "#00ff88"][i],
                  top: "50%",
                  left: "50%",
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: ["#00f0ff", "#7b61ff", "#ff006e", "#00ff88"][i],
                    transform: `translateX(${140 + i * 15}px)`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right — Text Content */}
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

            <p className="text-nexus-muted leading-relaxed">
              {personalInfo.description}
            </p>

            <p className="text-nexus-muted leading-relaxed">
              When I&apos;m not coding, you&apos;ll find me exploring new technologies,
              contributing to open source, writing technical blog posts, or competing
              in hackathons. I believe in writing clean, maintainable code and building
              products that make a real difference.
            </p>

            <p className="text-nexus-muted leading-relaxed">
              Currently focused on{" "}
              <span className="text-nexus-accent">React ecosystem</span>,{" "}
              <span className="text-nexus-accentAlt">system design</span>, and{" "}
              <span className="text-nexus-pink">AI/ML integration</span> in web
              applications.
            </p>
          </motion.div>

          {/* Quick Info */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[
              { label: "Location", value: personalInfo.location, icon: "📍" },
              { label: "Email", value: personalInfo.email, icon: "📧" },
              { label: "Experience", value: "3+ years", icon: "💼" },
              { label: "Status", value: "Open to work", icon: "🟢" },
            ].map((item) => (
              <div
                key={item.label}
                className="glass rounded-xl px-4 py-3 hover:border-nexus-accent/20 transition-colors"
              >
                <div className="text-xs text-nexus-muted font-mono mb-1">
                  {item.icon} {item.label}
                </div>
                <div className="text-sm text-nexus-text font-medium truncate">
                  {item.value}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
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
              <AnimatedCounter
                target={stat.value}
                suffix={stat.suffix}
                duration={2 + index * 0.3}
              />
            </div>
            <div className="text-sm text-nexus-muted font-mono">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}