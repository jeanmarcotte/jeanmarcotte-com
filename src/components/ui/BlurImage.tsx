"use client";

import { useState, useCallback } from "react";
import OptimizedImage from "./OptimizedImage";
import type { OptimizedImageProps } from "./OptimizedImage";

/* ─── Types ───────────────────────────────────────────────────────────────── */

export interface BlurImageProps extends OptimizedImageProps {
  /** Duration of the fade-in animation in milliseconds. Default 500. */
  fadeDuration?: number;
}

/* ─── Component ───────────────────────────────────────────────────────────── */

/**
 * Extends OptimizedImage with a CSS fade-in animation on load.
 *
 * The image starts at opacity 0 and transitions to opacity 1 when the
 * browser has finished loading the full image. Ideal for gallery grids
 * and hero images where a smooth blur-up effect is desired.
 */
export default function BlurImage({
  fadeDuration = 500,
  className,
  ...props
}: BlurImageProps) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <div
      className={`overflow-hidden ${className ?? ""}`}
      style={{ position: "relative" }}
    >
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: `opacity ${fadeDuration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
        }}
      >
        <OptimizedImage
          {...props}
          className=""
          onLoad={handleLoad}
        />
      </div>
    </div>
  );
}
