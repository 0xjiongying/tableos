import type { MetadataRoute } from "next";
import { SITE } from "@/features/marketing/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/product", "/technology", "/security", "/about", "/contact", "/book/kintsugi", "/staff/login"];
  const lastModified = new Date();

  return routes.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/book") || path.startsWith("/staff") ? 0.7 : 0.8,
  }));
}
