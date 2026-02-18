"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/portfolio";

const filterOptions = [
  { key: "all", label: "All Projects" },
  { key: "featured", label: "Featured" },
  { key: "fullstack", label: "Full-Stack" },
  { key: "ai", label: "AI/ML" },
  { key: "mobile", label: "Mobile" },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : activeFilter === "featured"
      ? projects.filter((p) => p.featured)
      : projects.filter((p) => p.category === activeFilter);

  return (
    <SectionWrapper
      id="projects"
      title="Featured Work"
      subtitle="A selection of projects I've built with passion and precision"
      number="03"
    >
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-12">
        {filterOptions.map((filter) => (
          <motion.button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 ${
              activeFilter === filter.key
                ? "bg-nexus-accent/10 text-nexus-accent border border-nexus-accent/30"
                : "glass text-nexus-muted hover:text-nexus-text"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {filter.label}
          </motion.button>
        ))}
      </div>

      {/* Project Grid */}
      <motion.div
        className="grid md:grid-cols-2 gap-8"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* "More on GitHub" link */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.a
          href="https://github.com/Sangam44957"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-nexus-muted hover:text-nexus-accent font-mono text-sm transition-colors group"
          whileHover={{ y: -2 }}
        >
          <span>View more on GitHub</span>
          <motion.span
            className="inline-block"
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.a>
      </motion.div>
    </SectionWrapper>
  );
}