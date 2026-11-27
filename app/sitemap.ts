import type { MetadataRoute } from "next";
import { business } from "../lib/business";
import { pages } from "../lib/content";
import { isLegal } from "../lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!business.indexable) return [];
  return ["", ...pages.filter(page => !isLegal(page.slug)).map(page => page.slug + "/")].map(path => ({ url: business.origin + "/" + path }));
}
