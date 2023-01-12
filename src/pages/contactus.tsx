import type { GetStaticProps } from "next";
import loadNamespaces from "next-translate/loadNamespaces";
import ContactUs from "../components/Nav/ContactUs";

export default function contactus() {
  return <ContactUs />;
}

export async function getStaticProps(staticProps: GetStaticProps) {
  return {
    props: await loadNamespaces({
      ...staticProps,
      pathname: "/contactus",
    }),
  };
}
