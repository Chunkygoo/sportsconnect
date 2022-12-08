import type { GetStaticProps } from "next";
import loadNamespaces from "next-translate/loadNamespaces";
import { useRouter } from "next/router";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import Portfolio from "../../components/Portfolio/Portfolio";

export default function PortfolioPage() {
  const router = useRouter();
  // const session = useSessionContext();
  // if (session.loading) {
  //   return null;
  // }
  // const { doesSessionExist } = session;
  // if (!doesSessionExist) {
  //   router.push("/auth/loginsignup");
  //   return null;
  // }
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-screen-xl flex-wrap items-center justify-between">
      <SessionAuth>
        <Portfolio publicView={false} publicUserData={null} />
      </SessionAuth>
    </div>
  );
}

export async function getStaticProps(staticProps: GetStaticProps) {
  return {
    props: await loadNamespaces({
      ...staticProps,
      pathname: "/portfolio",
    }),
  };
}
