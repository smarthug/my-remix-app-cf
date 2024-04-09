// React 컴포넌트에서 리디렉션 처리 예
import React, { useEffect } from 'react';
import { useLocation } from "@remix-run/react";


const FacebookCallbackPage = () => {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    const state = queryParams.get('state');

    if (code) {
      // 백엔드로 code 전송하여 액세스 토큰 요청
      console.log('code:', code);
      console.log('state:', state);
    }
  }, [location]);

  return (
    <div>
      로그인 처리 중...
    </div>
  );
};

export default FacebookCallbackPage;





// // app/routes/auth/github/callback.tsx
// import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
// import { authenticator } from "~/auth.server";

// export async function loader({ request }: LoaderFunctionArgs) {
//   return authenticator.authenticate("facebook", request, {
//     successRedirect: "/private",
//     failureRedirect: "/",
//   });
// };