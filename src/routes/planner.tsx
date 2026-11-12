import { createFileRoute } from "@tanstack/react-router";
import { PlannerPage } from "@/components/vivere/pages";
export const Route = createFileRoute("/planner")({
  head: () => ({ meta: [{ title: "Adventure Trip Planner | VIVERE" }, { name: "description", content: "Find sample adventure ideas based on your mood and destination." }, { property: "og:title", content: "Adventure Trip Planner | VIVERE" }, { property: "og:description", content: "Start planning an outdoor trip that feels like you." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: PlannerPage,
});
