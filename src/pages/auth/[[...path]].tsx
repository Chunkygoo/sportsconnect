import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SuperTokens from "supertokens-auth-react";

// const SuperTokensComponentNoSSR = dynamic(
//   new Promise((res) => res(SuperTokens.getRoutingComponent)),
//   { ssr: false }
// );

const SuperTokensComponentNoSSR = dynamic(
  import("supertokens-auth-react").then((module) => module.getRoutingComponent),
  {
    ssr: false,
  }
);

export default function Auth() {
  const router = useRouter();
  // if the user visits a page that is not handled by us
  // (like /auth/asdjklnogjk), then we redirect them back to the /auth/loginsignup page.
  useEffect(() => {
    if (SuperTokens.canHandleRoute() === false) {
      router.push("/auth/loginsignup");
    }
  }, [router]);

  return (
    <div className="flex h-[75vh]">
      <div className="m-auto">
        <SuperTokensComponentNoSSR />
      </div>
    </div>
  );
}