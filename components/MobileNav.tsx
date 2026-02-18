"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiHome,
  FiUser,
  FiCode,
  FiFolder,
  FiMail,
} from "react-icons/fi";

const mobileLinks = [
  { icon: FiHome, label: "Home", href: "#home" },
  { icon: FiUser, label: "About", href: "#about" },
  { icon: FiCode, label: "Skills", href: "#skills" },
  { icon: FiFolder, label: "Work", href: "#projects" },
  { icon: FiMail, label: "Contact", href: "#contact" },
];

export default function MobileNav() {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(false);

  // Show after initial load
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    mobileLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-[9998]"
      initial={{ y: 100 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Gradient fade above nav */}
      <div className="h-6 bg-gradient-to-t from-nexus-bg to-transparent pointer-events-none" />

      {/* Nav bar */}
      <div className="glass-strong border-t border-nexus-border/20 px-2 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around py-2">
          {mobileLinks.map(({ icon: Icon, label, href }) => {
            const isActive = activeSection === href.replace("#", "");

            return (
              <motion.button
                key={href}
                onClick={() => handleClick(href)}
                className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl"
                whileTap={{ scale: 0.85 }}
              >
                {/* Active background pill */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-nexus-accent/10 rounded-xl border border-nexus-accent/20"
                    layoutId="mobileActiveTab"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}

                <div className="relative z-10">
                  <Icon
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isActive ? "text-nexus-accent" : "text-nexus-muted"
                    }`}
                  />
                </div>

                <span
                  className={`relative z-10 text-[10px] font-mono transition-colors duration-300 ${
                    isActive ? "text-nexus-accent" : "text-nexus-muted/60"
                  }`}
                >
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