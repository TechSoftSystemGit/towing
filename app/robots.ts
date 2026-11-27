import type { MetadataRoute } from "next";
import { business } from "../lib/business";

export default function robots(): MetadataRoute.Robots {
  return business.indexable
    ? { rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/admin/", "/private/"] }, sitemap: business.origin + "/sitemap.xml" }
    : { rules: { userAgent: "*", allow: "/" } };
}
