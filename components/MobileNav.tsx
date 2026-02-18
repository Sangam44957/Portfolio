"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { EASE_OUT_EXPO, Z_INDEX } from "@/lib/constants";
import { FiHome, FiUser, FiCode, FiFolder, FiMail } from "react-icons/fi";

const LINKS = [
  { icon: FiHome, label: "Home", href: "#home" },
  { icon: FiUser, label: "About", href: "#about" },
  { icon: FiCode, label: "Skills", href: "#skills" },
  { icon: FiFolder, label: "Work", href: "#projects" },
  { icon: FiMail, label: "Contact", href: "#contact" },
] as const;

export default function MobileNav() {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );

    LINKS.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      className="md:hidden fixed bottom-0 left-0 right-0"
      style={{ zIndex: Z_INDEX.mobileNav }}
      initial={{ y: 100 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
    >
      <div className="h-6 bg-gradient-to-t from-nexus-bg to-transparent pointer-events-none" />

      <div className="glass-strong border-t border-nexus-border/20 px-2 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around py-2">
          {LINKS.map(({ icon: Icon, label, href }) => {
            const isActive = activeSection === href.replace("#", "");
            return (
              <motion.button
                key={href}
                onClick={() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })}
                className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl"
                whileTap={{ scale: 0.85 }}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-nexus-accent/10 rounded-xl border border-nexus-accent/20"
                    layoutId="mobileActiveTab"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className={`relative z-10 w-5 h-5 transition-colors duration-300 ${isActive ? "text-nexus-accent" : "text-nexus-muted"}`} />
                <span className={`relative z-10 text-[10px] font-mono transition-colors duration-300 ${isActive ? "text-nexus-accent" : "text-nexus-muted/60"}`}>
                  {label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}