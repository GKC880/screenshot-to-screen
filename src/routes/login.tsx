import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@/components/vivere/pages";
export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log In | VIVERE" }, { name: "description", content: "Return to your VIVERE adventure shortlist." }, { property: "og:title", content: "Log In | VIVERE" }, { property: "og:description", content: "Welcome back to VIVERE adventures across India." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: LoginPage,
});
