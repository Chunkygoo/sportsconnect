import type { GetStaticProps } from "next";
import loadNamespaces from "next-translate/loadNamespaces";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useSessionLoading from "../../hooks/useSessionLoading";

const IndexNoSSR = dynamic(
  import("../../components/Auth/Index").then((module) => module.default),
  {
    ssr: false,
  }
);

export default function Loginsignup() {
  const router = useRouter();
  const { loading, Loader } = useSessionLoading();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (router.query && router.query.from === "sessionAuth") {
        toast.info("Log in to continue", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [router.query]);
  if (loading) {
    return Loader;
  }
  return <IndexNoSSR />;
}

export async function getStaticProps(staticProps: GetStaticProps) {
  return {
    props: await loadNamespaces({
      ...staticProps,
      pathname: "/auth/loginsignup",
    }),
  };
}
