import { json } from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";

import { authenticator } from "~/auth.server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const action = async ({ request }: any) => {
  await authenticator.logout(request, { redirectTo: "/" });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loader = async ({ request }: any) => {
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
