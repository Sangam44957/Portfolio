"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { navLinks, personalInfo } from "@/data/portfolio";
import MagneticButton from "./MagneticButton";
import { EASE_OUT_EXPO, Z_INDEX } from "@/lib/constants";
import { useSoundContext } from "@/contexts/SoundContext";
import { HiOutlineMenuAlt4, HiOutlineX } from "react-icons/hi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();
  const { play } = useSoundContext();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsHidden(latest > previous && latest > 150);
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    play("click", 0.3);
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 transition-all duration-500 ${
          isScrolled ? "glass-strong py-3" : "bg-transparent py-6"
        }`}
        style={{ zIndex: Z_INDEX.navbar }}
        initial={{ y: -100 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
            className="relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xl font-bold font-display gradient-text">{personalInfo.name}</span>
            <span className="text-nexus-accent font-mono">.</span>
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-nexus-accent group-hover:w-full transition-all duration-300" />
          </motion.a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href }) => {
              const isActive = activeSection === href.replace("#", "");
              return (
                <motion.button
                  key={href}
                  onClick={() => handleNavClick(href)}
                  className={`relative px-4 py-2 text-sm font-mono transition-colors duration-300 rounded-full ${
                    isActive ? "text-nexus-accent" : "text-nexus-muted hover:text-nexus-text"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-nexus-accent/10 border border-nexus-accent/20"
                      layoutId="activeNavBubble"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Resume CTA */}
          <div className="hidden md:block">
            <MagneticButton href={personalInfo.resumeUrl} variant="primary" size="sm">
              <span className="w-2 h-2 rounded-full bg-nexus-green animate-pulse" />
              Resume
            </MagneticButton>
          </div>

          {/* Mobile Toggle */}
          <motion.button
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-nexus-text"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <HiOutlineX size={24} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <HiOutlineMenuAlt4 size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 md:hidden"
            style={{ zIndex: Z_INDEX.mobileMenu }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-nexus-bg/95 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <div className="relative h-full flex flex-col items-center justify-center gap-8">
              {navLinks.map(({ label, href }, index) => (
                <motion.button
                  key={href}
                  onClick={() => handleNavClick(href)}
                  className={`text-3xl font-display font-bold transition-colors ${
                    activeSection === href.replace("#", "") ? "gradient-text" : "text-nexus-muted hover:text-nexus-text"
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ delay: index * 0.1, duration: 0.4, ease: EASE_OUT_EXPO }}
                >
                  <span className="text-nexus-accent font-mono text-sm mr-2">0{index + 1}.</span>
                  {label}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-8"
              >
                <MagneticButton href={personalInfo.resumeUrl} variant="primary">
                  Download Resume
                </MagneticButton>
              </motion.div>

              <motion.span
                className="absolute bottom-12 text-xs font-mono text-nexus-muted/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                NEXUS // PORTFOLIO // 2024
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Dot Navigation */}
      <div className="hidden lg:flex fixed right-[72px] top-1/2 -translate-y-1/2 flex-col gap-3" style={{ zIndex: Z_INDEX.navDots }}>
        {navLinks.map(({ label, href }) => {
          const isActive = activeSection === href.replace("#", "");
          return (
            <motion.button
              key={href}
              onClick={() => handleNavClick(href)}
              className="group relative flex items-center justify-end"
              whileHover={{ scale: 1.2 }}
              data-cursor="pointer"
              aria-label={`Navigate to ${label}`}
            >
              <span className="absolute right-6 px-2 py-1 bg-nexus-card border border-nexus-border rounded text-xs font-mono text-nexus-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {label}
              </span>
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-nexus-accent scale-150 shadow-[0_0_10px_rgba(0,240,255,0.5)]"
                    : "bg-nexus-muted/30 hover:bg-nexus-muted"
                }`}
              />
            </motion.button>
          );
        })}
      </div>
    </>
  );
}