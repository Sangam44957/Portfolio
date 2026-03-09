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
    const getSectionElements = () =>
      LINKS
        .map(({ href }) => document.querySelector(href) as HTMLElement | null)
        .filter((el): el is HTMLElement => Boolean(el));

    const updateActiveSection = () => {
      const sectionElements = getSectionElements();
      if (sectionElements.length === 0) return;

      const focusLine = window.innerHeight * 0.45;

      let nextActive = sectionElements[0]?.id ?? "home";
      let smallestDistance = Number.POSITIVE_INFINITY;

      sectionElements.forEach((section) => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= focusLine && rect.bottom >= focusLine) {
          nextActive = section.id;
          smallestDistance = 0;
          return;
        }

        const distance = Math.min(
          Math.abs(rect.top - focusLine),
          Math.abs(rect.bottom - focusLine),
        );

        if (distance < smallestDistance) {
          smallestDistance = distance;
          nextActive = section.id;
        }
      });

      setActiveSection(nextActive);
    };

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    updateActiveSection();

    // Re-check after lazy sections mount.
    const lateCheckA = window.setTimeout(updateActiveSection, 300);
    const lateCheckB = window.setTimeout(updateActiveSection, 1200);

    return () => {
      window.clearTimeout(lateCheckA);
      window.clearTimeout(lateCheckB);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
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