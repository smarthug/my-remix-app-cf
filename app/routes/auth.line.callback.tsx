// app/routes/auth/github/callback.tsx
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { authenticator } from "~/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  return authenticator.authenticate("line", request, {
    successRedirect: "/private",
    failureRedirect: "/",
  });
};