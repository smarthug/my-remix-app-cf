import type { ActionArgs, LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";

import { authenticator } from "~/auth.server";

export const action = async ({ request }: ActionArgs) => {
  await authenticator.logout(request, { redirectTo: "/" });
};

export const loader = async ({ request }: LoaderArgs) => {
  const { profile } = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  return json({ profile });
};

export default function Screen() {
  const { profile } = useLoaderData<typeof loader>();
  return (
    <>
      <Form method="post">
        <button>Log Out</button>
      </Form>

      <hr />

      <pre>
        <code>{JSON.stringify(profile, null, 2)}</code>
      </pre>
    </>
  );
}
