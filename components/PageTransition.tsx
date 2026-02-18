"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { EASE_OUT_EXPO } from "@/lib/constants";

const variants = {
  initial: { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", opacity: 0 },
  animate: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
  exit: { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", opacity: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} variants={variants} initial="initial" animate="animate" exit="exit">
        {children}
      </motion.div>
    </AnimatePresence>
  );
}