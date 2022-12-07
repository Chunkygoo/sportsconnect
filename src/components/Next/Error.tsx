import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { trpc } from "../../utils/trpc";

export default function Error() {
  const router = useRouter();
  const { refetch: getServerHealth } = trpc.health.getServerHealth.useQuery(
    undefined,
    {
      onSuccess() {
        router.back();
      },
      onError() {
        toast.error(
          "Our server is down. Please contact sportsconnecthq@gmail.com",
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
      },
    }
  );
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        getServerHealth();
      } catch (_) {
        router.push(router.asPath, undefined, {
          locale: localStorage.getItem("lang") || "en-US",
        });
      }
    }, 10000);
    return () => {
      clearTimeout(timer);
    };
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
