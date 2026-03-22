"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import MagneticButton from "./MagneticButton";
import ParticleField from "./ParticleField";
import ScrambleText from "./ScrambleText";
import { FiGithub, FiLinkedin, FiTwitter, FiArrowDown, FiDownload } from "react-icons/fi";

const ROLES = [
  "Full-Stack Developer",
  "UI/UX Enthusiast",
  "Open Source Contributor",
  "Problem Solver",
  "Coffee → Code Converter",
];

const HERO_SOCIALS = [
  { icon: FiGithub, url: personalInfo.socials.github, label: "GitHub" },
  { icon: FiLinkedin, url: personalInfo.socials.linkedin, label: "LinkedIn" },
  { icon: FiTwitter, url: personalInfo.socials.twitter, label: "Twitter" },
] as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  // Typing effect
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ParticleField />

      {/* Radial gradient overlay — adapts to theme */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, var(--nexus-bg, #050505) 70%)",
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-20 z-[1]" />

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{ opacity, y, scale }}
      >
        {/* Greeting */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <span className="text-nexus-accent font-mono text-lg">{"// Hello, World! I'm"}</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-display mb-6 leading-none"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="gradient-text">
            <ScrambleText text={personalInfo.name} />
          </span>
          <br />
          <span className="text-nexus-text">
            <ScrambleText text={personalInfo.lastName} scrambleSpeed={25} />
          </span>
          <span className="text-nexus-accent">.</span>
        </motion.h1>

        {/* Typing Role */}
        <motion.div
          className="h-12 flex items-center justify-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="glass px-6 py-3 rounded-full inline-flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-nexus-accent/20 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-nexus-accent" />
            </span>
            <span className="font-mono text-nexus-text text-lg">{displayText}</span>
            <motion.span
              className="w-[2px] h-6 bg-nexus-accent"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-nexus-muted text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <MagneticButton onClick={scrollToProjects} variant="primary" size="lg" dataCursorText="VIEW">
            <span className="w-2 h-2 rounded-full bg-nexus-accent animate-pulse" />
            View My Work
          </MagneticButton>

          <MagneticButton href={personalInfo.resumeUrl} variant="secondary" size="lg" dataCursorText="PDF">
            <FiDownload className="w-4 h-4" />
            Resume
          </MagneticButton>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          {HERO_SOCIALS.map(({ icon: Icon, url, label }) => (
            <motion.a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-nexus-muted hover:text-nexus-accent hover:border-nexus-accent/30 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              data-cursor-text={label}
            >
              <Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <span className="text-xs font-mono text-nexus-muted/50 uppercase tracking-widest">Scroll</span>
        <motion.div
          className="w-6 h-10 rounded-full border border-nexus-border/30 flex items-start justify-center p-1.5"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-nexus-accent"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        <FiArrowDown className="w-3 h-3 text-nexus-muted/30 animate-bounce" />
      </motion.div>

      {/* Decorative lines */}
      <div className="absolute top-1/4 left-12 w-[1px] h-32 bg-gradient-to-b from-transparent via-nexus-accent/20 to-transparent hidden lg:block" />
      <div className="absolute top-1/3 right-12 w-[1px] h-32 bg-gradient-to-b from-transparent via-nexus-accentAlt/20 to-transparent hidden lg:block" />
    </section>
  );
}