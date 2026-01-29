"use client";

import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";

import {
  urlFor,
  IMAGE_SIZES,
  ASPECT_RATIOS,
  type AspectRatioKey,
} from "@/sanity/lib/image";

/* ─── Types ───────────────────────────────────────────────────────────────── */

export interface OptimizedImageProps {
  /** Sanity image reference (the `image` field from a document). */
  image: SanityImageSource;
  /** Accessible alt text. */
  alt: string;
  /** Responsive `sizes` attribute — defaults to full-width. */
  sizes?: string;
  /** Mark as above-the-fold to disable lazy loading and preload. */
  priority?: boolean;
  /** Optional aspect ratio constraint. When set, width/height are computed. */
  aspectRatio?: AspectRatioKey;
  /** Image width in pixels (used for Next/Image intrinsic sizing). Default 1200. */
  width?: number;
  /** Image height in pixels. Auto-computed when aspectRatio is set. */
  height?: number;
  /** Sanity CDN quality setting (1-100). Default 75. */
  quality?: number;
  /** Sanity image fit mode. Default "max". */
  fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "scale" | "min";
  /** LQIP base64 string from Sanity asset metadata for blur placeholder. */
  lqip?: string;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── Component ───────────────────────────────────────────────────────────── */

/**
 * Wrapper around Next/Image optimised for Sanity CDN images.
 *
 * - Builds the `src` URL via the `@sanity/image-url` pipeline (auto WebP/AVIF).
 * - Generates a responsive `srcSet` across standard breakpoints.
 * - Supports LQIP blur-up placeholder from Sanity metadata.
 * - Lazy loads by default; use `priority` for above-the-fold images.
 * - Supports aspect-ratio variants for consistent layout (no CLS).
 */
export default function OptimizedImage({
  image,
  alt,
  sizes = IMAGE_SIZES.fullWidth,
  priority = false,
  aspectRatio,
  width = 1200,
  height,
  quality = 75,
  fit = "max",
  lqip,
  className,
}: OptimizedImageProps) {
  // Compute height from aspect ratio if provided
  const computedHeight = aspectRatio
    ? Math.round(width / ASPECT_RATIOS[aspectRatio])
    : height ?? Math.round(width * 0.667); // default ~3:2

  // Build the primary src URL
  const src = urlFor(image)
    .width(width)
    .height(computedHeight)
    .fit(fit)
    .quality(quality)
    .auto("format")
    .url();

  // Blur placeholder config
  const blurProps = lqip
    ? { placeholder: "blur" as const, blurDataURL: lqip }
    : {};

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={computedHeight}
      sizes={sizes}
      quality={quality}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      className={className}
      {...blurProps}
      style={{
        // Prevent CLS: maintain aspect ratio via CSS
        aspectRatio: aspectRatio
          ? `${ASPECT_RATIOS[aspectRatio]}`
          : `${width} / ${computedHeight}`,
        objectFit: "cover",
        width: "100%",
        height: "auto",
      }}
    />
  );
}
