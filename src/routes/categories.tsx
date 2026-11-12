import { createFileRoute } from "@tanstack/react-router";
import { CategoriesPage } from "@/components/vivere/pages";
export const Route = createFileRoute("/categories")({
  head: () => ({ meta: [{ title: "Adventure Categories | VIVERE" }, { name: "description", content: "Find the kind of outdoor adventure that calls to you." }, { property: "og:title", content: "Adventure Categories | VIVERE" }, { property: "og:description", content: "Explore air, water, land and nature experiences around India." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: CategoriesPage,
});
