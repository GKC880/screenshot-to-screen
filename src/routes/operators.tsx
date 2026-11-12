import { createFileRoute } from "@tanstack/react-router";
import { OperatorsPage } from "@/components/vivere/pages";
export const Route = createFileRoute("/operators")({
  head: () => ({ meta: [{ title: "For Adventure Operators | VIVERE" }, { name: "description", content: "Learn about the VIVERE discovery preview for adventure operators in India." }, { property: "og:title", content: "For Adventure Operators | VIVERE" }, { property: "og:description", content: "Bring local adventure experiences to travellers exploring India." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: OperatorsPage,
});
