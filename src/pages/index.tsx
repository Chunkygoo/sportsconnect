import type { GetStaticProps } from "next";
import loadNamespaces from "next-translate/loadNamespaces";
import Index from "../components/Next/Index";

export default function index() {
  return <Index />;
}

export async function getStaticProps(staticProps: GetStaticProps) {
  return {
    props: await loadNamespaces({
      ...staticProps,
      pathname: "*",
    }),
  };
}
