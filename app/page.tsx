"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Lenis from "lenis";
import { motion, AnimatePresence } from "framer-motion";
import { useSoundContext } from "@/contexts/SoundContext";

/* ── Eagerly loaded (lightweight) ── */
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";

/* ── Lazy loaded (heavy / below fold) ── */
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const SpotlightEffect = dynamic(() => import("@/components/SpotlightEffect"), { ssr: false });
const ThemeToggle = dynamic(() => import("@/components/ThemeToggle"), { ssr: false });
const SoundToggle = dynamic(() => import("@/components/SoundToggle"), { ssr: false });
const AccentPicker = dynamic(() => import("@/components/AccentPicker"), { ssr: false });
const VisitorCounter = dynamic(() => import("@/components/VisitorCounter"), { ssr: false });
const About = dynamic(() => import("@/components/About"));
const Skills = dynamic(() => import("@/components/Skills"));
const Projects = dynamic(() => import("@/components/Projects"));
const Experience = dynamic(() => import("@/components/Experience"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const Terminal = dynamic(() => import("@/components/Terminal"));
const Contact = dynamic(() => import("@/components/Contact"));
const GitHubHeatmap = dynamic(() => import("@/components/GitHubHeatmap"));
const Globe = dynamic(() => import("@/components/Globe"), { ssr: false });

/** Konami code key sequence */
const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA",
];

function Divider() {
  return (
    <div className="h-[1px] max-w-4xl mx-auto bg-gradient-to-r from-transparent via-nexus-border/30 to-transparent" />
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const { isMuted, toggleMute } = useSoundContext();

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 100);
  }, []);

  // Lenis smooth scroll
  useEffect(() => {
    if (!showContent) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [showContent]);

  // Konami code easter egg
  useEffect(() => {
    let index = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === KONAMI_CODE[index]) {
        index++;
        if (index === KONAMI_CODE.length) {
          index = 0;
          alert("🎉 KONAMI CODE ACTIVATED! You found the secret! 🕹️");
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {showContent && (
        <>
          <CustomCursor />
          <ScrollProgress />
          <SpotlightEffect />
          <Navbar />
          <ThemeToggle />
          <SoundToggle isMuted={isMuted} toggleMute={toggleMute} />
          <AccentPicker />
          <MobileNav />
          <VisitorCounter />

          <motion.main
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Hero />
            <Divider />
            <About />

            <section className="px-6 md:px-12 lg:px-24 -mt-8 mb-16">
              <div className="max-w-md mx-auto">
                <Globe />
              </div>
            </section>

            <Skills />

            <section className="px-6 md:px-12 lg:px-24 py-8">
              <div className="max-w-5xl mx-auto">
                <GitHubHeatmap />
              </div>
            </section>

            <Divider />
            <Projects />
            <Experience />
            <Testimonials />
            <Terminal />
            <Divider />
            <Contact />
            <Footer />
          </motion.main>
        </>
      )}
    </>
  );
}