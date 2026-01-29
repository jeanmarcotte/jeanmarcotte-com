import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Returns an image URL builder instance for chaining transformations.
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/* ─── Image Size Presets ──────────────────────────────────────────────────── */

/** Thumbnail — 400px wide, quality 60, auto format (WebP/AVIF). */
export function thumbnailUrl(source: SanityImageSource, width = 400): string {
  return urlFor(source).width(width).quality(60).auto("format").url();
}

/** Gallery / medium — 800px wide, quality 75, auto format. */
export function galleryUrl(source: SanityImageSource, width = 800): string {
  return urlFor(source).width(width).quality(75).auto("format").url();
}

/** Hero / large — 1920px wide, quality 80, auto format. */
export function heroUrl(source: SanityImageSource, width = 1920): string {
  return urlFor(source).width(width).quality(80).auto("format").url();
}

/** Full-resolution — no resize, quality 85, auto format. */
export function fullUrl(source: SanityImageSource): string {
  return urlFor(source).quality(85).auto("format").url();
}

/* ─── Responsive Helpers ──────────────────────────────────────────────────── */

/** Standard responsive breakpoints for srcSet generation. */
export const RESPONSIVE_WIDTHS = [320, 480, 640, 768, 1024, 1280, 1536, 1920] as const;

/**
 * Generate a `srcSet` string for a Sanity image at multiple widths.
 * Usage: <img srcSet={generateSrcSet(image)} sizes="..." />
 */
export function generateSrcSet(
  source: SanityImageSource,
  widths: readonly number[] = RESPONSIVE_WIDTHS,
  quality = 75,
): string {
  return widths
    .map((w) => `${urlFor(source).width(w).quality(quality).auto("format").url()} ${w}w`)
    .join(", ");
}

/**
 * Common `sizes` attribute strings for responsive images.
 */
export const IMAGE_SIZES = {
  /** Full-bleed hero: always 100vw. */
  fullWidth: "100vw",
  /** Content column: 100vw on mobile, 768px on tablet, 1024px on desktop. */
  contentWidth: "(max-width: 768px) 100vw, (max-width: 1280px) 768px, 1024px",
  /** Gallery thumbnail in a grid. */
  galleryThumb: "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
  /** Half-width image. */
  halfWidth: "(max-width: 768px) 100vw, 50vw",
} as const;

/* ─── Blur Placeholder ────────────────────────────────────────────────────── */

/**
 * Generate a tiny (20px-wide) data URL suitable for use as a blur placeholder.
 * For LQIP that comes from Sanity's asset metadata, prefer using that directly
 * (asset.metadata.lqip). This is a fallback for when LQIP is not available.
 */
export function blurDataUrl(source: SanityImageSource): string {
  return urlFor(source).width(20).quality(20).blur(10).auto("format").url();
}

/* ─── Aspect Ratio Helpers ────────────────────────────────────────────────── */

export const ASPECT_RATIOS = {
  square: 1,
  "3:2": 3 / 2,
  "2:3": 2 / 3,
  "4:3": 4 / 3,
  "3:4": 3 / 4,
  "16:9": 16 / 9,
  "9:16": 9 / 16,
  portrait: 2 / 3,
  landscape: 3 / 2,
} as const;

export type AspectRatioKey = keyof typeof ASPECT_RATIOS;

/**
 * Build a Sanity image URL with a specific aspect ratio by computing the
 * height from the requested width.
 */
export function urlForAspectRatio(
  source: SanityImageSource,
  width: number,
  aspectRatio: AspectRatioKey,
  quality = 75,
): string {
  const height = Math.round(width / ASPECT_RATIOS[aspectRatio]);
  return urlFor(source)
    .width(width)
    .height(height)
    .fit("crop")
    .quality(quality)
    .auto("format")
    .url();
}
