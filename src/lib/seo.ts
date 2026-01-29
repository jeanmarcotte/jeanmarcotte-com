import type { Metadata } from "next";

// ─── Site Constants ─────────────────────────────────────────────────────────

export const SITE_NAME = "Jean Marcotte Wedding Photography";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.jeanmarcotte.com";

export const DEFAULT_DESCRIPTION =
  "Award-style wedding photography serving Toronto, the GTA, and beyond. " +
  "Capturing authentic moments in Vaughan, Maple, Woodbridge, Markham, " +
  "Scarborough, Hamilton, Cambridge, Niagara, and Mississauga.";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

// ─── Target Keywords & Service Areas ────────────────────────────────────────

export const SERVICE_AREAS = [
  "Toronto",
  "Vaughan",
  "Maple",
  "Woodbridge",
  "Markham",
  "Scarborough",
  "Hamilton",
  "Cambridge",
  "Niagara",
  "Mississauga",
] as const;

export type ServiceArea = (typeof SERVICE_AREAS)[number];

// ─── Metadata Helper ────────────────────────────────────────────────────────

interface PageMetadataOptions {
  title: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
  keywords?: string[];
}

/**
 * Generates a complete Next.js Metadata object by merging page-specific
 * values with site-wide defaults.
 */
export function generatePageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
  keywords = [],
}: PageMetadataOptions): Metadata {
  const canonicalUrl = `${SITE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  const defaultKeywords = [
    "wedding photographer",
    "wedding photography",
    "GTA wedding photographer",
    "Toronto wedding photographer",
    ...SERVICE_AREAS.map((city) => `wedding photographer ${city}`),
  ];

  return {
    title: fullTitle,
    description,
    keywords: [...defaultKeywords, ...keywords],
    authors: [{ name: "Jean Marcotte" }],
    creator: "Jean Marcotte",
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_CA",
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} - ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      creator: "@jeanmarcotte",
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

/**
 * Returns the canonical URL for a given path.
 */
export function canonicalUrl(path: string = ""): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
