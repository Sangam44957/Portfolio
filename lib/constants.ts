/** Shared easing curve used across all animations */
export const EASE_OUT_EXPO = [0.76, 0, 0.24, 1] as const;

/** Standard spring configs for Framer Motion */
export const SPRING_SMOOTH = { stiffness: 300, damping: 30 };
export const SPRING_BOUNCY = { stiffness: 200, damping: 15, mass: 0.2 };
export const SPRING_CURSOR = { damping: 25, stiffness: 300, mass: 0.5 };

/** Breakpoint for mobile detection */
export const MOBILE_BREAKPOINT = 768;

/** Z-index scale */
export const Z_INDEX = {
  spotlight: 30,
  content: 10,
  mobileNav: 9998,
  navbar: 9998,
  navDots: 9996,
  mobileMenu: 9997,
  floatingControls: 9995,
  visitorCounter: 9996,
  scrollProgress: 9999,
  cursor: 99998,
  cursorTrail: 99997,
  preloader: 99999,
  matrixOverlay: 50,
} as const;

/** Toast style matching the theme */
export const TOAST_STYLE = {
  style: {
    background: "#111",
    color: "#e5e5e5",
    border: "1px solid rgba(0, 240, 255, 0.2)",
  },
  iconTheme: {
    primary: "#00f0ff",
    secondary: "#111",
  },
} as const;

/** Nexus color palette for programmatic use */
export const COLORS = {
  accent: "#00f0ff",
  accentAlt: "#7b61ff",
  pink: "#ff006e",
  green: "#00ff88",
  orange: "#ff8c00",
} as const;