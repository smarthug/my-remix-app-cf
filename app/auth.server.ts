import {
  createCookieSessionStorage,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { Authenticator } from "remix-auth";
import type { GitHubExtraParams, GitHubProfile } from "remix-auth-github";
import { GitHubStrategy } from "remix-auth-github";
// import { FacebookStrategy } from "remix-auth-facebook";
import { OAuth2Strategy } from "remix-auth-oauth2";
import { FacebookStrategy } from "~/utils/auth/facebook";
// console.log(FacebookStrategy);

// if (!process.env.GITHUB_CLIENT_ID) {
//   throw new Error("GITHUB_CLIENT_ID is required");
// }

// if (!process.env.GITHUB_CLIENT_SECRET) {
//   throw new Error("GITHUB_CLIENT_SECRET is required");
// }

// if (!process.env.BASE_URL) {
//   throw new Error("BASE_URL is required");
// }

// const BASE_URL = process.env.BASE_URL;

// export const loader =
//   async () =>
//   ({ context }: LoaderFunctionArgs) => {
//     console.log("this is context.env.GITHUB_CLIENT_ID");
//     console.log(context.env.GITHUB_CLIENT_ID);
//     // GITHUB_CLIENT_ID = context.env.GITHUB_CLIENT_ID;
//     // GITHUB_CLIENT_SECRET = context.env.GITHUB_CLIENT_SECRET;
//     // BASE_URL = context.env.BASE_URL;
//   };

export async function loader({ context }: LoaderFunctionArgs) {
  console.log("this is context.env.GITHUB_CLIENT_ID");
  console.log(context.cloudflare.env.GITHUB_CLIENT_ID);
  // GITHUB_CLIENT_ID = context.env.GITHUB_CLIENT_ID;
  // GITHUB_CLIENT_SECRET = context.env.GITHUB_CLIENT_SECRET;
  // BASE_URL = context.env.BASE_URL;
}

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: ["s3cret"], // This should be an env variable
    // secure: process.env.NODE_ENV === "production",
    secure: true,
  },
});

export const authenticator = new Authenticator<{
  profile: any;
  accessToken: string;
  extraParams: GitHubExtraParams;
}>(sessionStorage);

// authenticator.use(
//   new GitHubStrategy(
//     {
//       clientID: GITHUB_CLIENT_ID,
//       clientSecret: GITHUB_CLIENT_SECRET,
//       callbackURL: new URL("/auth/github/callback", BASE_URL).toString(),
//     },
//     async ({ profile, accessToken, extraParams }) => {
//       console.log("this is accesstoken");
//       console.log(accessToken);
//       return { profile, accessToken, extraParams };
//     }
//   )
// );

export async function initAuth(env) {
  console.log(env);
  authenticator.use(
    new GitHubStrategy(
      {
        clientID: env.GITHUB_CLIENT_ID,
        clientSecret: env.GITHUB_CLIENT_SECRET,
        callbackURL: new URL("/auth/github/callback", env.BASE_URL).toString(),
      },
      async ({ profile, accessToken, extraParams }) => {
        // console.log("this is accesstoken");
        // console.log(accessToken);
        return { profile, accessToken, extraParams };
      }
    )
  );

  authenticator.use(
    new FacebookStrategy(
      {
        clientID: env.FACEBOOK_CLIENT_ID,
        clientSecret: env.FACEBOOK_CLIENT_SECRET,
        callbackURL: new URL(
          "/auth/facebook/callback",
          env.BASE_URL
        ).toString(),
      },
      async ({ profile, accessToken, extraParams }) => {
        // console.log("this is fb accesstoken");
        // console.log(accessToken);
        return { profile, accessToken, extraParams };
      }
    )
  );

  // 카카오에서 제공한 정보를 사용하여 설정
  const kakaoStrategy = new OAuth2Strategy(
    {
      authorizationURL: "https://kauth.kakao.com/oauth/authorize",
      tokenURL: "https://kauth.kakao.com/oauth/token",
      clientID: "YOUR_KAKAO_CLIENT_ID",
      clientSecret: "YOUR_KAKAO_CLIENT_SECRET", // 필요한 경우
      callbackURL: new URL("/auth/kakao/callback", env.BASE_URL).toString(),
      // scope: ["profile_nickname", "profile_image", "account_email"], // 필요한 권한
    },
    async ({ profile, accessToken, extraParams }) => {
      console.log("this is kakao accesstoken");
      console.log(accessToken);
      return { profile, accessToken, extraParams };
    }
  );

  authenticator.use(kakaoStrategy, "kakao");
}
