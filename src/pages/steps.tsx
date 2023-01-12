import type { GetStaticProps } from "next";
import loadNamespaces from "next-translate/loadNamespaces";
import Steps from "../components/Next/Steps";

export default function steps() {
  return <Steps />;
}

export async function getStaticProps(staticProps: GetStaticProps) {
  return {
    props: await loadNamespaces({
      ...staticProps,
      pathname: "/steps",
    }),
  };
}
