import { createFileRoute } from "@tanstack/react-router";
import { AdventureDetailPage } from "@/components/vivere/pages";
import { adventures } from "@/lib/adventures";
export const Route = createFileRoute("/adventures/$slug")({
  head: ({ params }) => {
    const adventure = adventures.find((item) => item.slug === params.slug) ?? adventures[0];
    return { meta: [{ title: `${adventure.title} | VIVERE` }, { name: "description", content: `${adventure.description} Discover the experience in ${adventure.location}, ${adventure.state}.` }, { property: "og:title", content: `${adventure.title} | VIVERE` }, { property: "og:description", content: `Explore ${adventure.activity.toLowerCase()} in ${adventure.location}, ${adventure.state}.` }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  component: AdventureDetailPage,
});
