import { createFileRoute } from "@tanstack/react-router";
import { WishlistPage } from "@/components/vivere/pages";
export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Saved Adventures | VIVERE" }, { name: "description", content: "Keep your favourite India adventure experiences close." }, { property: "og:title", content: "Saved Adventures | VIVERE" }, { property: "og:description", content: "Your shortlist of outdoor experiences to come back to." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: WishlistPage,
});
