# UI Elements Location Guide

## Desktop Layout (Right Side Controls)

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  Navbar (Top)                                       │
│                                                     │
│                                          ┌────┐    │
│                                          │ •  │    │ ← Side Dots (right-[72px])
│                                          │ •  │    │
│                                          │ •  │    │
│                                          │ •  │    │
│                                          │ •  │    │
│                                          │ •  │    │
│                                          └────┘    │
│                                                     │
│                                          ┌────┐    │
│                                          │ 🌙 │    │ ← Theme Toggle (right-6, top-1/2 + 60px)
│                                          └────┘    │
│                                                     │
│                                          ┌────┐    │
│                                          │ 🔊 │    │ ← Sound Toggle (right-6, top-1/2 + 120px)
│                                          └────┘    │
│                                                     │
│                                                     │
│  Content Area                                       │
│                                                     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Mobile Layout

```
┌─────────────────────────────────┐
│                                 │
│  Navbar (Top)                   │
│                                 │
│                                 │
│                                 │
│  Content Area                   │
│                                 │
│                                 │
│                                 │
│                                 │
│                                 │
│                                 │
│                                 │
│                                 │
│ ┌─────────────────────────────┐ │
│ │  Mobile Nav (Bottom)        │ │
│ │  [Home] [About] [Projects]  │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

## Key Positions

### Theme Toggle
- **Position**: `fixed right-6 top-1/2 translate-y-[60px]`
- **Z-index**: 9995
- **Size**: 48px × 48px
- **States**: 
  - Dark mode: Moon icon (🌙)
  - Light mode: Sun icon (☀️)

### Sound Toggle
- **Position**: `fixed right-6 top-1/2 translate-y-[120px]`
- **Z-index**: 9995
- **Size**: 48px × 48px
- **States**:
  - Muted: Speaker with X (🔇)
  - Unmuted: Speaker with waves (🔊) + pulse rings

### Side Dot Navigation
- **Position**: `fixed right-[72px] top-1/2 -translate-y-1/2`
- **Z-index**: 9996
- **Display**: Hidden on mobile, visible on lg+ screens
- **Purpose**: Quick section navigation

### Navbar
- **Position**: `fixed top-0 left-0 right-0`
- **Z-index**: 9998
- **Behavior**: Hides on scroll down, shows on scroll up

### Mobile Nav
- **Position**: `fixed bottom-0 left-0 right-0`
- **Z-index**: 9997
- **Display**: Visible only on mobile (< 768px)

## Color Scheme

### Dark Mode (Default)
- Background: `#050505`
- Text: `#e5e5e5`
- Accent: `#00f0ff` (cyan)
- Accent Alt: `#7b61ff` (purple)
- Pink: `#ff006e`
- Green: `#00ff88`

### Light Mode
- Background: `#f8f9fc`
- Text: `#1a1a2e`
- Accent: `#0099cc` (blue)
- Accent Alt: `#5a3fd6` (purple)
- Pink: `#d4005c`
- Green: `#00a65a`

## Interactive Elements

### Hover Effects
- Scale: 1.15 on theme/sound toggles
- Cursor: Custom cursor with text hints
- Tooltips: Show on hover with glass effect

### Click Effects
- Scale: 0.9 (tap effect)
- Sound: Plays click sound (if unmuted)
- Visual feedback: Immediate state change

### Animations
- Theme transition: Expanding circle from button position
- Sound toggle: Pulse rings when active
- Page transitions: Clip-path animations
- Smooth scroll: Lenis smooth scrolling

## Accessibility

- **ARIA labels**: All buttons have proper labels
- **Keyboard navigation**: Tab through interactive elements
- **Focus states**: Visible focus indicators
- **Screen reader**: Semantic HTML structure
- **Color contrast**: WCAG AA compliant

## Performance

- **Lazy loading**: Components load on demand
- **Preloading**: Sounds preloaded on mount
- **Memoization**: Expensive calculations cached
- **Debouncing**: Scroll events optimized
- **Code splitting**: Route-based splitting
