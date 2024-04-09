// app/routes/auth/github.tsx
import { ActionFunctionArgs, redirect } from "@remix-run/cloudflare";
// import { redirect } from "@remix-run/cloudflare";
import { authenticator } from "~/auth.server";

import { v4 as uuid } from "uuid";

// export async function loader() {
//   return redirect("/");
// }

// export async function action({ request }: ActionFunctionArgs) {
//   return authenticator.authenticate("facebook", request,{
//     successRedirect: "/private",
//     failureRedirect: "/",
//   });
// };



// const facebookLogin = () => {
//   const client_id = "YOUR_APP_ID";
//   const redirect_uri = "http://localhost:3000/facebook-callback";
//   const state = "{st=state123abc,ds=123456789}"; // 상태 토큰은 CSRF 공격을 방지하기 위해 사용됩니다.
//   const scope = "email,public_profile"; // 요청할 권한

//   window.location.href = `https://www.facebook.com/v14.0/dialog/oauth?client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&scope=${scope}`;
// };

export async function action({ request }: ActionFunctionArgs) {
  const client_id = "1633084590837571";
  const redirect_uri = "https://my-remix-app-cf-github.pages.dev/auth/facebook/callback";
  const state = uuid(); // 상태 토큰은 CSRF 공격을 방지하기 위해 사용됩니다.
  const scope = "email,public_profile"; // 요청할 권한

  console.log(`https://www.facebook.com/v14.0/dialog/oauth?client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&scope=${scope}&response_type=code`)
  throw redirect(`https://www.facebook.com/v14.0/dialog/oauth?client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&scope=${scope}&response_type=code`)
};
