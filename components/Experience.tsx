"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { experiences } from "@/data/portfolio";
import { EASE_OUT_EXPO } from "@/lib/constants";
import { FiBriefcase, FiBookOpen, FiAward } from "react-icons/fi";

const TYPE_CONFIG = {
  work: { icon: FiBriefcase, color: "#00f0ff" },
  education: { icon: FiBookOpen, color: "#7b61ff" },
  achievement: { icon: FiAward, color: "#ff006e" },
} as const;

function TimelineItem({
  experience,
  index,
}: {
  experience: (typeof experiences)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;
  const config = TYPE_CONFIG[experience.type];
  const Icon = config.icon;

  return (
    <motion.div
      ref={ref}
      className={`relative flex items-start gap-8 md:gap-16 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.8, ease: EASE_OUT_EXPO }}
    >
      {/* Node */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
        <motion.div
          className="w-12 h-12 rounded-full glass flex items-center justify-center"
          style={{ borderColor: `${config.color}30` }}
          whileHover={{ scale: 1.2 }}
          animate={isInView ? { boxShadow: [`0 0 0px ${config.color}00`, `0 0 20px ${config.color}30`, `0 0 0px ${config.color}00`] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Icon className="w-5 h-5" style={{ color: config.color }} />
        </motion.div>
      </div>

      {/* Card */}
      <div className={`ml-16 md:ml-0 md:w-[calc(50%-3rem)] ${isEven ? "" : "md:text-right"}`}>
        <motion.div
          className="glass rounded-2xl p-6 md:p-8 group hover:border-opacity-40 transition-all duration-500"
          style={{ borderColor: `${config.color}15` }}
          whileHover={{ y: -5, scale: 1.01 }}
        >
          <div className={`flex items-center gap-2 mb-3 ${isEven ? "" : "md:justify-end"}`}>
            <span
              className="px-3 py-1 rounded-full text-xs font-mono"
              style={{ background: `${config.color}10`, color: config.color, border: `1px solid ${config.color}20` }}
            >
              {experience.duration}
            </span>
          </div>

          <h3 className="text-xl font-bold font-display text-nexus-text mb-1 group-hover:text-nexus-accent transition-colors">
            {experience.role}
          </h3>

          <a
            href={experience.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono hover:underline transition-colors inline-block mb-4"
            style={{ color: config.color }}
          >
            @ {experience.company} ↗
          </a>

          <ul className={`space-y-2 mb-5 ${isEven ? "" : "md:text-right"}`}>
            {experience.description.map((item, i) => (
              <motion.li
                key={i}
                className="text-sm text-nexus-muted leading-relaxed flex items-start gap-2"
                style={!isEven ? { justifyContent: "flex-end", textAlign: "right" } : {}}
                initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2 + i * 0.1 + 0.3 }}
              >
                {isEven && <span className="text-nexus-accent mt-1 shrink-0">▸</span>}
                <span>{item}</span>
                {!isEven && <span className="text-nexus-accent mt-1 shrink-0">◂</span>}
              </motion.li>
            ))}
          </ul>

          <div className={`flex flex-wrap gap-2 ${isEven ? "" : "md:justify-end"}`}>
            {experience.techUsed.map((tech) => (
              <span key={tech} className="px-2 py-1 rounded-md text-xs font-mono bg-nexus-surface text-nexus-muted border border-nexus-border/50">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <SectionWrapper id="experience" title="Journey" subtitle="My professional path and the milestones along the way" number="04">
      <div ref={containerRef} className="relative">
        {/* Timeline line */}
        <div className="absolute left-5 md:left-1/2 md:-translate-x-[0.5px] top-0 bottom-0 w-[1px] bg-nexus-border/20">
          <motion.div
            className="w-full origin-top"
            style={{ height: lineHeight, background: "linear-gradient(180deg, #00f0ff, #7b61ff, #ff006e, #00ff88)" }}
          />
        </div>

        <div className="space-y-16 md:space-y-24">
          {experiences.map((exp, index) => (
            <TimelineItem key={exp.id} experience={exp} index={index} />
          ))}
        </div>

        {/* End dot */}
        <motion.div
          className="absolute left-5 md:left-1/2 md:-translate-x-1/2 -bottom-4 w-4 h-4 rounded-full bg-nexus-accent/20 border-2 border-nexus-accent flex items-center justify-center"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-nexus-accent" />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}