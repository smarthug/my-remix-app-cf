// app/routes/auth/github.tsx
import type { ActionFunctionArgs } from "@remix-run/cloudflare";
// import { redirect } from "@remix-run/cloudflare";
import { authenticator } from "~/auth.server";

// export async function loader() {
//   return redirect("/");
// }

export async function action({ request }: ActionFunctionArgs) {
  return authenticator.authenticate("kakao", request,{
    successRedirect: "/private",
    failureRedirect: "/",
  });
};