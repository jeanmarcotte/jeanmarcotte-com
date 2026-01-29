import { SITE_NAME, SITE_URL, SERVICE_AREAS } from "./seo";

// ─── Types ──────────────────────────────────────────────────────────────────

interface WithContext {
  "@context": "https://schema.org";
}

export interface LocalBusinessSchema extends WithContext {
  "@type": "LocalBusiness";
  "@id": string;
  name: string;
  description: string;
  url: string;
  image: string;
  telephone?: string;
  email?: string;
  priceRange?: string;
  areaServed: Array<{ "@type": "City"; name: string }>;
  address: {
    "@type": "PostalAddress";
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  geo?: {
    "@type": "GeoCoordinates";
    latitude: number;
    longitude: number;
  };
  sameAs?: string[];
}

export interface PhotographerSchema extends WithContext {
  "@type": "Person";
  name: string;
  jobTitle: string;
  url: string;
  image?: string;
  description: string;
  sameAs?: string[];
  knowsAbout: string[];
  worksFor: {
    "@type": "LocalBusiness";
    name: string;
  };
}

export interface ImageGallerySchema extends WithContext {
  "@type": "ImageGallery";
  name: string;
  description: string;
  url: string;
  image: Array<{
    "@type": "ImageObject";
    contentUrl: string;
    caption?: string;
    name?: string;
  }>;
}

export interface BlogPostingSchema extends WithContext {
  "@type": "BlogPosting";
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author: {
    "@type": "Person";
    name: string;
    url: string;
  };
  image?: string;
  publisher: {
    "@type": "Organization";
    name: string;
    url: string;
    logo?: {
      "@type": "ImageObject";
      url: string;
    };
  };
}

export interface FAQPageSchema extends WithContext {
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}

export interface BreadcrumbListSchema extends WithContext {
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item?: string;
  }>;
}

// ─── Generators ─────────────────────────────────────────────────────────────

/**
 * LocalBusiness structured data for the photography business.
 */
export function generateLocalBusiness(
  overrides?: Partial<Omit<LocalBusinessSchema, "@context" | "@type">>
): LocalBusinessSchema {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    description:
      "Premium wedding photography serving Toronto and the Greater Toronto Area. " +
      "Capturing authentic, editorial-style moments for couples across the GTA.",
    url: SITE_URL,
    image: `${SITE_URL}/og-default.jpg`,
    priceRange: "$$$$",
    areaServed: SERVICE_AREAS.map((city) => ({
      "@type": "City" as const,
      name: `${city}, Ontario, Canada`,
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toronto",
      addressRegion: "Ontario",
      addressCountry: "CA",
    },
    ...overrides,
  };
}

/**
 * Photographer (Person) structured data.
 */
export function generatePhotographer(
  overrides?: Partial<Omit<PhotographerSchema, "@context" | "@type">>
): PhotographerSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jean Marcotte",
    jobTitle: "Wedding Photographer",
    url: SITE_URL,
    description:
      "Wedding photographer based in the Greater Toronto Area, specializing in " +
      "editorial and documentary-style wedding photography.",
    knowsAbout: [
      "Wedding Photography",
      "Portrait Photography",
      "Editorial Photography",
      "Engagement Photography",
      "Event Photography",
    ],
    worksFor: {
      "@type": "LocalBusiness",
      name: SITE_NAME,
    },
    ...overrides,
  };
}

/**
 * ImageGallery structured data for portfolio pages.
 */
export function generateImageGallery(options: {
  name: string;
  description: string;
  url: string;
  images: Array<{ src: string; caption?: string; name?: string }>;
}): ImageGallerySchema {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: options.name,
    description: options.description,
    url: options.url,
    image: options.images.map((img) => ({
      "@type": "ImageObject",
      contentUrl: img.src,
      ...(img.caption && { caption: img.caption }),
      ...(img.name && { name: img.name }),
    })),
  };
}

/**
 * BlogPosting structured data for blog posts.
 */
export function generateBlogPosting(options: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}): BlogPostingSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: options.headline,
    description: options.description,
    url: options.url,
    datePublished: options.datePublished,
    ...(options.dateModified && { dateModified: options.dateModified }),
    ...(options.image && { image: options.image }),
    author: {
      "@type": "Person",
      name: "Jean Marcotte",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

/**
 * FAQPage structured data for FAQ sections.
 */
export function generateFAQPage(
  faqs: Array<{ question: string; answer: string }>
): FAQPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * BreadcrumbList structured data for navigation.
 */
export function generateBreadcrumbs(
  items: Array<{ name: string; path?: string }>
): BreadcrumbListSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path && { item: `${SITE_URL}${item.path}` }),
    })),
  };
}

// ─── Script Tag Helper ──────────────────────────────────────────────────────

/**
 * Wraps structured data into a JSON-LD script tag for use in Next.js pages.
 */
export function jsonLdScript(data: WithContext): string {
  return JSON.stringify(data);
}
