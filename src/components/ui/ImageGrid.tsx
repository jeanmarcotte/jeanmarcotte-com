"use client";

import { useCallback } from "react";
import type { SanityImageSource } from "@sanity/image-url";
import BlurImage from "./BlurImage";
import { IMAGE_SIZES, type AspectRatioKey } from "@/sanity/lib/image";

/* ─── Types ───────────────────────────────────────────────────────────────── */

export interface GridImage {
  /** Unique key for React rendering. */
  _key: string;
  /** Sanity image reference. */
  image: SanityImageSource;
  /** Alt text for accessibility. */
  alt: string;
  /** LQIP base64 from Sanity asset metadata. */
  lqip?: string;
  /** Optional aspect ratio override per image. */
  aspectRatio?: AspectRatioKey;
}

export interface ImageGridProps {
  /** Array of images to display. */
  images: GridImage[];
  /** Gap between images in pixels. Default 8. */
  gap?: number;
  /** Aspect ratio applied to all images (can be overridden per image). */
  aspectRatio?: AspectRatioKey;
  /** Callback when an image is clicked. Index of clicked image is passed. */
  onImageClick?: (index: number) => void;
  /** Additional CSS class names for the grid container. */
  className?: string;
}

/* ─── Component ───────────────────────────────────────────────────────────── */

/**
 * Responsive photo grid for gallery pages.
 *
 * - Uses Tailwind responsive grid: 2 columns mobile, 3 tablet, 4 desktop.
 * - Each image uses BlurImage for lazy loading + fade-in effect.
 * - Supports LQIP blur-up placeholders from Sanity.
 * - Click handler wired up for future lightbox integration.
 */
export default function ImageGrid({
  images,
  gap = 8,
  aspectRatio = "3:2",
  onImageClick,
  className,
}: ImageGridProps) {
  const handleClick = useCallback(
    (index: number) => {
      onImageClick?.(index);
    },
    [onImageClick],
  );

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${className ?? ""}`}
      style={{ gap: `${gap}px` }}
    >
      {images.map((img, index) => (
        <button
          key={img._key}
          type="button"
          onClick={() => handleClick(index)}
          className="group cursor-pointer border-0 bg-transparent p-0"
          aria-label={`View ${img.alt}`}
          style={{ display: "block", width: "100%" }}
        >
          <BlurImage
            image={img.image}
            alt={img.alt}
            lqip={img.lqip}
            aspectRatio={img.aspectRatio ?? aspectRatio}
            sizes={IMAGE_SIZES.galleryThumb}
            width={640}
            quality={75}
            className="rounded transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </button>
      ))}
    </div>
  );
}
