// app/routes/auth/github.tsx
import { ActionFunctionArgs, redirect } from "@remix-run/cloudflare";
import { v4 as uuid } from "uuid";



export async function action({ request }: ActionFunctionArgs) {
  const client_id = "09795fa350767e792a9681248f93b88e";
  // const redirect_uri = "https://my-remix-app-cf-github.pages.dev/auth/kakao/callback";
  const redirect_uri = "http://localhost:5173/auth/kakao/callback";
  const state = uuid(); // 상태 토큰은 CSRF 공격을 방지하기 위해 사용됩니다.
  // const scope = "email,public_profile"; // 요청할 권한

  console.log(`https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&response_type=code`)
  throw redirect(`https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&response_type=code`)
};
