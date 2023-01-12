import type { GetStaticProps } from "next";
import loadNamespaces from "next-translate/loadNamespaces";
import _404 from "../components/Next/_404";

export default function custom404() {
  return <_404 />;
}

export async function getStaticProps(staticProps: GetStaticProps) {
  return {
    props: await loadNamespaces({
      ...staticProps,
      pathname: "/404",
    }),
  };
}
