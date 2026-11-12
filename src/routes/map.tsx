import { createFileRoute } from "@tanstack/react-router";
import { AdventureMapPage } from "@/components/vivere/pages";
export const Route = createFileRoute("/map")({
  head: () => ({ meta: [{ title: "Adventure Map | VIVERE" }, { name: "description", content: "Browse featured adventure destinations on an illustrated map of India." }, { property: "og:title", content: "Adventure Map | VIVERE" }, { property: "og:description", content: "Explore sample adventure locations across India." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: AdventureMapPage,
});
