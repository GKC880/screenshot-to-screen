import { createFileRoute } from "@tanstack/react-router";
import { DestinationsPage } from "@/components/vivere/pages";
export const Route = createFileRoute("/destinations")({
  head: () => ({ meta: [{ title: "Adventure Destinations in India | VIVERE" }, { name: "description", content: "Discover memorable outdoor experiences from Bir Billing to Goa." }, { property: "og:title", content: "Adventure Destinations in India | VIVERE" }, { property: "og:description", content: "Find your next adventure across India's mountains, forests and coast." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: DestinationsPage,
});
