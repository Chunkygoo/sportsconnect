import type { GetStaticProps } from "next";
import loadNamespaces from "next-translate/loadNamespaces";
import SessionAuth from "../../components/Auth/SessionAuth";
import Portfolio from "../../components/Portfolio/Portfolio";

export default function PortfolioPage() {
  return (
    <SessionAuth>
      <div className="mx-auto flex min-h-[80vh] max-w-screen-xl flex-wrap items-center justify-between">
        <Portfolio publicView={false} publicUserData={null} />
      </div>
    </SessionAuth>
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
