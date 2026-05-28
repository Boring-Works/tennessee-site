import type { MetadataRoute } from "next";
import eventsData from "@/data/events.json";

const baseUrl = "https://tennesseestartshere.com";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: baseUrl, changeFrequency: "weekly", priority: 1 },
  { url: `${baseUrl}/home`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${baseUrl}/visit`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${baseUrl}/events`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${baseUrl}/programs`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${baseUrl}/lectures`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${baseUrl}/educators`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${baseUrl}/first-250`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${baseUrl}/our-story`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${baseUrl}/explore`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${baseUrl}/membership`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${baseUrl}/groups`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${baseUrl}/support`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${baseUrl}/almanac`, changeFrequency: "daily", priority: 0.8 },
];

const evidenceRoot: MetadataRoute.Sitemap = [
  { url: `${baseUrl}/evidence`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${baseUrl}/evidence/documents`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${baseUrl}/evidence/collections`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${baseUrl}/evidence/people`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${baseUrl}/evidence/timeline`, changeFrequency: "monthly", priority: 0.7 },
];

const eventPages: MetadataRoute.Sitemap = eventsData.events
  .filter((e) => 'slug' in e && e.slug)
  .map((e) => ({
    url: `${baseUrl}/events/${String(e.slug)}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

export default function sitemap(): MetadataRoute.Sitemap {
  return [...staticRoutes, ...evidenceRoot, ...eventPages].map((entry) => ({
    ...entry,
    lastModified: new Date(),
  }));
}
