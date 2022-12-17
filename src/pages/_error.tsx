import type { GetStaticProps } from "next";
import loadNamespaces from "next-translate/loadNamespaces";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { trpc } from "../utils/trpc";

export default function Error() {
  const router = useRouter();
  trpc.health.getServerHealth.useQuery(undefined, {
    onSuccess() {
      router.back();
    },
    onError() {
      toast.error("Error: Please contact sportsconnecthq@gmail.com", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
  });
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <h1 className="mb-2 text-2xl">An error occured...</h1>
        <div>
          <p className="mt-4">
            Sorry about that! Please refresh the page or try again later.
          </p>
          <p>Team SportsConnect</p>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(staticProps: GetStaticProps) {
  return {
    props: await loadNamespaces({
      ...staticProps,
      pathname: "*",
    }),
  };
}
