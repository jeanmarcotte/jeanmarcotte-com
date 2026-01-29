/**
 * Design Tokens for Jean Marcotte Photography
 *
 * Premium wedding photography brand aesthetic:
 * Dark editorial feel inspired by high-end photography portfolios.
 * Warm neutrals, champagne/gold accents, elegant serif + clean sans-serif pairing.
 */

// ─── Colors ──────────────────────────────────────────────────────────────────

export const colors = {
  /** Core neutrals */
  charcoal: {
    50: "#f7f7f6",
    100: "#e5e4e2",
    200: "#cac8c4",
    300: "#a8a5a0",
    400: "#86827c",
    500: "#6b6762",
    600: "#55524e",
    700: "#444240",
    800: "#2e2d2b",
    900: "#1a1918",
    950: "#0d0d0c",
  },

  ivory: {
    50: "#fefdfb",
    100: "#fdf9f3",
    200: "#faf3e6",
    300: "#f5e9d4",
    400: "#eedcc0",
    500: "#e6cfac",
    600: "#d4b88e",
    700: "#bfa070",
    800: "#9a7f56",
    900: "#6e5a3d",
    950: "#3d3222",
  },

  warmGray: {
    50: "#faf9f7",
    100: "#f0eee9",
    200: "#e0ddd5",
    300: "#cbc7bc",
    400: "#b3aea1",
    500: "#9a9486",
    600: "#7d776b",
    700: "#625d54",
    800: "#4a4640",
    900: "#33312d",
    950: "#1f1e1b",
  },

  /** Accent: champagne / gold */
  gold: {
    50: "#fdf9ef",
    100: "#faf0d5",
    200: "#f4e0aa",
    300: "#eccc79",
    400: "#e4b84e",
    500: "#d4a23a",
    600: "#b8862e",
    700: "#986a27",
    800: "#7a5323",
    900: "#5c3f1c",
    950: "#33220f",
  },

  /** Deep accent for contrast */
  midnight: {
    50: "#f4f5f7",
    100: "#e3e5eb",
    200: "#c6cad6",
    300: "#a0a7b9",
    400: "#78819a",
    500: "#5b647e",
    600: "#474f65",
    700: "#3a4053",
    800: "#2d3242",
    900: "#1e2230",
    950: "#12141e",
  },
} as const;

// ─── Typography ──────────────────────────────────────────────────────────────

export const fontFamily = {
  /** Elegant serif for headings and editorial moments */
  serif: '"Playfair Display", "Georgia", "Times New Roman", serif',
  /** Clean sans-serif for body text and UI elements */
  sans: '"Inter", "Helvetica Neue", "Arial", sans-serif',
  /** Monospace for metadata / technical details */
  mono: '"JetBrains Mono", "Fira Code", "Consolas", monospace',
} as const;

export const fontSize = {
  xs: ["0.75rem", { lineHeight: "1rem" }],
  sm: ["0.875rem", { lineHeight: "1.25rem" }],
  base: ["1rem", { lineHeight: "1.625rem" }],
  lg: ["1.125rem", { lineHeight: "1.75rem" }],
  xl: ["1.25rem", { lineHeight: "1.875rem" }],
  "2xl": ["1.5rem", { lineHeight: "2rem" }],
  "3xl": ["1.875rem", { lineHeight: "2.375rem" }],
  "4xl": ["2.25rem", { lineHeight: "2.75rem" }],
  "5xl": ["3rem", { lineHeight: "1.15" }],
  "6xl": ["3.75rem", { lineHeight: "1.1" }],
  "7xl": ["4.5rem", { lineHeight: "1.05" }],
  "8xl": ["6rem", { lineHeight: "1" }],
  "9xl": ["8rem", { lineHeight: "1" }],
} as const;

export const fontWeight = {
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export const letterSpacing = {
  tighter: "-0.04em",
  tight: "-0.02em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.12em",
} as const;

// ─── Spacing ─────────────────────────────────────────────────────────────────

export const spacing = {
  px: "1px",
  0: "0",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  48: "12rem",
  56: "14rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem",
} as const;

// ─── Breakpoints (mobile-first) ──────────────────────────────────────────────

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// ─── Border Radius ───────────────────────────────────────────────────────────

export const borderRadius = {
  none: "0",
  sm: "0.125rem",
  DEFAULT: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  full: "9999px",
} as const;

// ─── Shadows ─────────────────────────────────────────────────────────────────

export const boxShadow = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  editorial: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  none: "none",
} as const;

// ─── Animation / Transition ──────────────────────────────────────────────────

export const animation = {
  durations: {
    fast: "150ms",
    base: "300ms",
    slow: "500ms",
    slower: "700ms",
  },
  easings: {
    DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    elegant: "cubic-bezier(0.25, 0.1, 0.25, 1)",
  },
} as const;

// ─── Z-Index Scale ───────────────────────────────────────────────────────────

export const zIndex = {
  behind: "-1",
  base: "0",
  raised: "10",
  dropdown: "20",
  sticky: "30",
  overlay: "40",
  modal: "50",
  toast: "60",
} as const;

// ─── Consolidated Export ─────────────────────────────────────────────────────

export const designTokens = {
  colors,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  spacing,
  breakpoints,
  borderRadius,
  boxShadow,
  animation,
  zIndex,
} as const;

export type DesignTokens = typeof designTokens;

export default designTokens;
