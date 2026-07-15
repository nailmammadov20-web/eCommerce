import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/account", "/api", "/checkout", "/cart", "/login", "/register"],
      },
    ],
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
