import type { GetStaticProps } from "next";
import loadNamespaces from "next-translate/loadNamespaces";
import Benefits from "../components/Home/Benefits";
import Description from "../components/Home/Description";
import Features from "../components/Home/Features";
import Hero from "../components/Home/Hero";
import Process from "../components/Home/Process";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-screen-xl flex-wrap items-center justify-between">
      <Hero />
      <Features />
      <Benefits />
      <Process />
      <Description />
    </div>
  );
}
export async function getStaticProps(staticProps: GetStaticProps) {
  return {
    props: await loadNamespaces({
      ...staticProps,
      pathname: "/home",
    }),
  };
}
