// app/routes/auth/github/callback.tsx
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { authenticator } from "~/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {

  // console.log(request);
  return authenticator.authenticate("github", request, {
    successRedirect: "/private",
    failureRedirect: "/",
  });
};