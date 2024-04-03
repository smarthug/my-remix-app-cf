
import { Form } from "@remix-run/react";

// import { auth, sessionStorage } from "~/auth.server";


export default function Index() {
 

  return (
    <Form action="/auth/github" method="post">
    <button>Login with GitHub</button>
  </Form>
  );
}
