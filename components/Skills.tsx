"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { skills, type Skill } from "@/data/portfolio";

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "languages", label: "Languages" },
  { key: "tools", label: "Tools" },
] as const;

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = skill.icon;

  return (
    <motion.div
      className="relative h-32 cursor-pointer"
      style={{ perspective: "1000px" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      layout
      onClick={() => setIsFlipped(!isFlipped)}
      data-cursor-text="FLIP"
    >
      <motion.div
        className="w-full h-full relative"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 glass rounded-xl p-4 flex flex-col items-center justify-center gap-3 group hover:border-opacity-40 transition-all duration-300"
          style={{ backfaceVisibility: "hidden", borderColor: `${skill.color}20` }}
        >
          <span style={{ color: skill.color }}>
            <Icon className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
          </span>
          <span className="text-sm font-mono text-nexus-text text-center">{skill.name}</span>
          <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-nexus-accent/30" />
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 glass rounded-xl p-4 flex flex-col items-center justify-center gap-2"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderColor: `${skill.color}30`,
          }}
        >
          <span className="text-2xl font-bold font-display" style={{ color: skill.color }}>
            {skill.level}%
          </span>
          <div className="w-full h-1.5 bg-nexus-border rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: skill.color }}
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </div>
          <span className="text-xs text-nexus-muted font-mono capitalize">{skill.category}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredSkills =
    activeFilter === "all" ? skills : skills.filter((s) => s.category === activeFilter);

  return (
    <SectionWrapper
      id="skills"
      title="Tech Arsenal"
      subtitle="The tools and technologies I use to bring ideas to life"
      number="02"
    >
      <div ref={ref}>
        {/* Marquee */}
        <div className="marquee-container overflow-hidden mb-16">
          <motion.div
            className="flex gap-8 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...skills, ...skills].map((skill, i) => {
              const MarqueeIcon = skill.icon;
              return (
                <div key={`${skill.name}-${i}`} className="flex items-center gap-2 px-4 py-2 glass rounded-full shrink-0">
                  <span style={{ color: skill.color }}>
                    <MarqueeIcon className="w-4 h-4" />
                  </span>
                  <span className="text-sm font-mono text-nexus-muted whitespace-nowrap">{skill.name}</span>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {CATEGORIES.map((cat) => {
            const count = cat.key === "all" ? skills.length : skills.filter((s) => s.category === cat.key).length;
            return (
              <motion.button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 ${
                  activeFilter === cat.key
                    ? "bg-nexus-accent/10 text-nexus-accent border border-nexus-accent/30"
                    : "glass text-nexus-muted hover:text-nexus-text"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat.label}
                <span className="ml-2 text-xs opacity-50">{count}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" layout>
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.p
          className="text-center text-xs text-nexus-muted/40 font-mono mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          💡 Click on any skill to see proficiency level
        </motion.p>
      </div>
    </SectionWrapper>
  );
}