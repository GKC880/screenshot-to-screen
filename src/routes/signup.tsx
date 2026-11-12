import { createFileRoute } from "@tanstack/react-router";
import { SignupPage } from "@/components/vivere/pages";
export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign Up | VIVERE" }, { name: "description", content: "Join VIVERE to keep the adventures you love in one place." }, { property: "og:title", content: "Sign Up | VIVERE" }, { property: "og:description", content: "Create your VIVERE profile and save your next outdoor escape." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: SignupPage,
});
