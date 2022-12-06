import dynamic from "next/dynamic";

// const ResetPasswordUsingTokenNoSSR = dynamic(
//   new Promise((res) => res(ResetPasswordUsingToken)),
//   (() => import("MyComponents")) as any,
//   {
//     ssr: false,
//   }
// );

const ResetPasswordUsingTokenNoSSR = dynamic(
  import("supertokens-auth-react/recipe/thirdpartyemailpassword").then(
    (module) => module.ResetPasswordUsingToken
  ),
  {
    ssr: false,
  }
);

export default function resetpassword() {
  return (
    <div className="flex min-h-[80vh]">
      <div className="m-auto">
        <ResetPasswordUsingTokenNoSSR />
      </div>
    </div>
  );
}
