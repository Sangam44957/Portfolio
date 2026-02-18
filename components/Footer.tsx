"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { COLORS } from "@/lib/constants";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiHeart,
  FiArrowUp,
} from "react-icons/fi";

const FOOTER_SOCIALS = [
  { icon: FiGithub, url: personalInfo.socials.github, label: "GitHub" },
  { icon: FiLinkedin, url: personalInfo.socials.linkedin, label: "LinkedIn" },
  { icon: FiTwitter, url: personalInfo.socials.twitter, label: "Twitter" },
  { icon: FiInstagram, url: personalInfo.socials.instagram, label: "Instagram" },
] as const;

const QUICK_LINKS = ["Home", "About", "Skills", "Projects", "Experience", "Contact"] as const;

const ACCENT_DOTS = [COLORS.accent, COLORS.accentAlt, COLORS.pink, COLORS.green, COLORS.orange];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 px-6 md:px-12 border-t border-nexus-border/10">
      <div className="absolute inset-0 grid-bg opacity-10" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <a href="#home" className="inline-block">
              <span className="text-2xl font-bold font-display gradient-text">
                {personalInfo.name}
              </span>
              <span className="text-nexus-accent text-2xl">.</span>
            </a>
            <p className="text-sm text-nexus-muted leading-relaxed max-w-xs">
              Building digital experiences with clean code and creative thinking.
              Always exploring new technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-mono text-nexus-accent uppercase tracking-wider">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {QUICK_LINKS.map((link) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm text-nexus-muted hover:text-nexus-accent transition-colors font-mono"
                  whileHover={{ x: 5 }}
                >
                  /{link.toLowerCase()}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="text-sm font-mono text-nexus-accent uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex gap-3">
              {FOOTER_SOCIALS.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center text-nexus-muted hover:text-nexus-accent hover:border-nexus-accent/20 transition-all"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
            <p className="text-xs text-nexus-muted font-mono">{personalInfo.email}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-nexus-border/30 to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-nexus-muted/50 font-mono">
            © {currentYear} {personalInfo.name} {personalInfo.lastName}. Crafted with{" "}
            <motion.span
              className="inline-block text-nexus-pink"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FiHeart className="w-3 h-3 inline fill-nexus-pink" />
            </motion.span>{" "}
            and lots of ☕
          </p>

          <div className="flex items-center gap-4 text-xs text-nexus-muted/30 font-mono">
            <span>Next.js + Tailwind + Framer Motion</span>
            <span>|</span>
            <span>Deployed on Vercel</span>
          </div>

          <motion.button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-nexus-muted hover:text-nexus-accent hover:border-nexus-accent/30 transition-all group"
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            data-cursor-text="TOP"
            aria-label="Scroll to top"
          >
            <FiArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </div>

        {/* Easter egg dots */}
        <div className="flex justify-center gap-2 mt-8">
          {ACCENT_DOTS.map((color, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full cursor-pointer"
              style={{ background: color }}
              whileHover={{ scale: 3 }}
              data-cursor-text="👀"
            />
          ))}
        </div>
      </div>
    </footer>
  );
}