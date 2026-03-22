"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiExternalLink, FiGithub, FiArrowUpRight } from "react-icons/fi";
import type { Project } from "@/data/portfolio";
import { EASE_OUT_EXPO } from "@/lib/constants";

const CATEGORY_EMOJI: Record<string, string> = {
  fullstack: "🚀",
  ai: "🧠",
  backend: "💻",
  mobile: "📱",
  "3d": "🎨",
};

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15, duration: 0.8, ease: EASE_OUT_EXPO }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      data-cursor-text="VIEW"
    >
      <motion.div
        className="glass rounded-2xl overflow-hidden"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* Image area */}
        <div className="relative h-64 md:h-80 overflow-hidden bg-nexus-surface">
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
            style={{ background: `linear-gradient(135deg, ${project.color}20, ${project.color}05)` }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-8xl opacity-20">{CATEGORY_EMOJI[project.category] ?? "🚀"}</span>
              )}
            </div>
          </div>

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-nexus-bg/80 backdrop-blur-sm flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {[
              { href: project.liveUrl, icon: FiExternalLink, delay: 0.1 },
              { href: project.githubUrl, icon: FiGithub, delay: 0.2 },
            ].map(({ href, icon: Icon, delay }) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full glass flex items-center justify-center text-nexus-accent hover:bg-nexus-accent/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 20, opacity: 0 }}
                animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay }}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span
              className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider"
              style={{
                background: `${project.color}15`,
                color: project.color,
                border: `1px solid ${project.color}30`,
              }}
            >
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono text-nexus-muted glass">
              {project.year}
            </span>
          </div>

          {project.featured && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-nexus-accent/10 text-nexus-accent border border-nexus-accent/20">
                ⭐ Featured
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl md:text-2xl font-bold font-display text-nexus-text group-hover:text-nexus-accent transition-colors">
              {project.title}
            </h3>
            <motion.div
              className="w-8 h-8 rounded-full flex items-center justify-center text-nexus-muted group-hover:text-nexus-accent transition-colors"
              animate={{ rotate: isHovered ? 45 : 0 }}
            >
              <FiArrowUpRight className="w-5 h-5" />
            </motion.div>
          </div>

          <p className="text-nexus-muted text-sm leading-relaxed mb-5">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-nexus-surface text-nexus-muted border border-nexus-border/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="h-[2px] mx-6 mb-1 rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
}