import type { GetStaticProps } from "next";
import loadNamespaces from "next-translate/loadNamespaces";
import { toast } from "react-toastify";
import { trpc } from "../utils/trpc";

export default function Error() {
  trpc.health.getServerHealth.useQuery(undefined, {
    onSuccess() {
      toast.error("Error: Please contact sportsconnecthq@gmail.com", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    onError() {
      toast.error("Server down: Please contact sportsconnecthq@gmail.com", {
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
            Sorry about that! Please refresh the page, try again later or
            contact sportsconnecthq@gmail.com
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
