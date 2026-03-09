"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { achievements } from "@/data/portfolio";

export default function Achievements() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <SectionWrapper
      id="achievements"
      title="Achievements"
      subtitle="Milestones and accomplishments"
      number="06"
    >
      <div ref={ref} className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            className="glass rounded-xl p-6 hover:border-nexus-accent/30 transition-all duration-300 group relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <div className="absolute top-4 right-4 text-4xl opacity-20 group-hover:opacity-30 transition-opacity">
              {achievement.icon}
            </div>
            <div className="relative z-10">
              <div className="text-3xl mb-3">{achievement.icon}</div>
              <h3 className="text-xl font-bold text-nexus-text mb-2">
                {achievement.title}
              </h3>
              <p className="text-sm text-nexus-muted mb-3">
                {achievement.description}
              </p>
              <div className="inline-block px-3 py-1 rounded-full bg-nexus-accent/10 text-nexus-accent text-xs font-mono">
                {achievement.date}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
