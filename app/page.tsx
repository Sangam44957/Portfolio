"use client";

import { useState, useEffect } from "react";
import Lenis from "lenis";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import SpotlightEffect from "@/components/SpotlightEffect";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Terminal from "@/components/Terminal";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import MobileNav from "@/components/MobileNav";
import SoundToggle from "@/components/SoundToggle";
import VisitorCounter from "@/components/VisitorCounter";
import GitHubHeatmap from "@/components/GitHubHeatmap";
import AccentPicker from "@/components/AccentPicker";
import Globe from "@/components/Globe";
import { useSoundContext } from "@/contexts/SoundContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const { isMuted, toggleMute } = useSoundContext();

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (!showContent) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [showContent]);

  // Konami code easter egg
  useEffect(() => {
    const konamiCode = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
      "KeyB", "KeyA",
    ];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          konamiIndex = 0;
          alert("🎉 KONAMI CODE ACTIVATED! You found the secret! 🕹️");
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 100);
  };

  return (
    <>
      {/* Preloader */}
      <AnimatePresence>
        {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {/* Main Content */}
      {showContent && (
        <>
          {/* Global UI Elements */}
          <CustomCursor />
          <ScrollProgress />
          <SpotlightEffect />
          <Navbar />

          {/* Right side floating controls */}
          <ThemeToggle />
          <SoundToggle isMuted={isMuted} toggleMute={toggleMute} />
          <AccentPicker />

          {/* Mobile only */}
          <MobileNav />

          {/* Temporary notification */}
          <VisitorCounter />

          {/* Page Content */}
          <motion.main
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Hero */}
            <Hero />

            <div className="h-[1px] max-w-4xl mx-auto bg-gradient-to-r from-transparent via-nexus-border/30 to-transparent" />

            {/* About + Globe */}
            <About />

            {/* Globe Section (inside About or standalone) */}
            <section className="px-6 md:px-12 lg:px-24 -mt-8 mb-16">
              <div className="max-w-md mx-auto">
                <Globe />
              </div>
            </section>

            {/* Skills */}
            <Skills />

            {/* GitHub Heatmap */}
            <section className="px-6 md:px-12 lg:px-24 py-8">
              <div className="max-w-5xl mx-auto">
                <GitHubHeatmap />
              </div>
            </section>

            <div className="h-[1px] max-w-4xl mx-auto bg-gradient-to-r from-transparent via-nexus-border/30 to-transparent" />

            {/* Projects */}
            <Projects />

            {/* Experience */}
            <Experience />

            {/* Testimonials */}
            <Testimonials />

            {/* Terminal */}
            <Terminal />

            <div className="h-[1px] max-w-4xl mx-auto bg-gradient-to-r from-transparent via-nexus-border/30 to-transparent" />

            {/* Contact */}
            <Contact />

            {/* Footer */}
            <Footer />
          </motion.main>
        </>
      )}
    </>
  );
}