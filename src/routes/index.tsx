import { createFileRoute } from "@tanstack/react-router";
import { ExploreHome } from "@/components/vivere/home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VIVERE — Discover India's Adventure Playground" },
      { name: "description", content: "Find, compare and book real adventure experiences across India — from the highest peaks to the deepest seas." },
      { property: "og:title", content: "VIVERE — Discover India's Adventure Playground" },
      { property: "og:description", content: "Find your next feeling with memorable adventure experiences across India." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExploreHome,
});
