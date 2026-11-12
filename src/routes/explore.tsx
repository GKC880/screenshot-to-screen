import { createFileRoute } from "@tanstack/react-router";
import { ExplorePage } from "@/components/vivere/pages";
export const Route = createFileRoute("/explore")({
  head: () => ({ meta: [{ title: "Explore Adventures | VIVERE" }, { name: "description", content: "Browse outdoor activities and adventure experiences across India." }, { property: "og:title", content: "Explore Adventures | VIVERE" }, { property: "og:description", content: "Browse outdoor activities and adventure experiences across India." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: ExplorePage,
});
