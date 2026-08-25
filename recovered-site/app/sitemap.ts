import type { MetadataRoute } from "next";
import { SITE_URL } from "@/utils/site";

const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/account-blocked", priority: 0.9, changeFrequency: "monthly" },
  { path: "/account-hacked", priority: 0.9, changeFrequency: "monthly" },
  { path: "/no-phone-email-access", priority: 0.9, changeFrequency: "monthly" },
  { path: "/login-code-not-arriving", priority: 0.9, changeFrequency: "monthly" },
  { path: "/account-protection-guide", priority: 0.8, changeFrequency: "monthly" },
  { path: "/knowledge-base", priority: 0.8, changeFrequency: "weekly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: route.path === "" ? `${SITE_URL}/` : `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
