import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jean Marcotte Wedding Photography",
    short_name: "Jean Marcotte",
    description:
      "Premium wedding photography serving Toronto and the Greater Toronto Area.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d0d0c",
    theme_color: "#d4a23a",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
