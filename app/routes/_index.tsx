import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";

import { initAuth } from "~/auth.server";
// import { authenticator } from "~/auth.server";
// import { GitHubStrategy } from "remix-auth-github";

// import { auth, sessionStorage } from "~/auth.server";

export async function loader({ context }: LoaderFunctionArgs) {
  console.log("this is context.env.GITHUB_CLIENT_ID");
  // console.log(context.env.GITHUB_CLIENT_ID);
  // console.log(context); // GITHUB_CLIENT_ID = context.env.GITHUB_CLIENT_ID;
  // GITHUB_CLIENT_SECRET = context.env.GITHUB_CLIENT_SECRET;
  // BASE_URL = context.env.BASE_URL;
  console.log(context.cloudflare.env);

  // authenticator.use(
  //   new GitHubStrategy(
  //     {
  //       clientID: context.cloudflare.env.GITHUB_CLIENT_ID,
  //       clientSecret: context.cloudflare.env.GITHUB_CLIENT_SECRET,
  //       callbackURL: new URL("/auth/github/callback", context.cloudflare.env.BASE_URL).toString(),
  //     },
  //     async ({ profile, accessToken, extraParams }) => {
  //       console.log("this is accesstoken");
  //       console.log(accessToken);
  //       return { profile, accessToken, extraParams };
  //     }
  //   )
  // );

  initAuth(context.cloudflare.env);

  return null;
}

export default function Index() {
  return (
    <>
      <Form action="/auth/github" method="post">
        <button>Login with GitHub</button>
      </Form>

      <Form action="/auth/facebook" method="post">
        <button>Login with Facebook</button>
      </Form>

      <Form action="/auth/kakao" method="post">
        <button>Login with Kakao</button>
      </Form>
    </>
  );
}
