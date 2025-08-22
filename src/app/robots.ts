import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/audio/", "/hdr/", "/midi/", "/models/", "/textures/"],
      },
    ],
  }
}
