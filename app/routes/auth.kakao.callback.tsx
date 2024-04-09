// React 컴포넌트에서 리디렉션 처리 예
import React, { useEffect } from "react";
import { useLocation } from "@remix-run/react";
import axios from 'axios';

const KakaoCallbackPage = () => {
  const location = useLocation();

  useEffect(() => {
    const sendCodeToBackend = async () => {
      const queryParams = new URLSearchParams(location.search);
      const code = queryParams.get("code");
      const state = queryParams.get("state");

      if (code && state) {
        try {
          const response = await axios.post("YOUR_BACKEND_ENDPOINT", {
            code: code,
            state: state,
          });
          console.log("Server response", response.data);
          // 서버 응답 처리 로직 (예: 토큰 저장, 리디렉션 등)
        } catch (error) {
          console.error("Error sending code and state to backend", error);
          // 에러 처리 로직
        }
      }
    };

    sendCodeToBackend();
  }, [location]);

  return <div>로그인 처리 중...</div>;
};

export default KakaoCallbackPage;

// // app/routes/auth/github/callback.tsx
// import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
// import { authenticator } from "~/auth.server";

// export async function loader({ request }: LoaderFunctionArgs) {
//   return authenticator.authenticate("facebook", request, {
//     successRedirect: "/private",
//     failureRedirect: "/",
//   });
// };
