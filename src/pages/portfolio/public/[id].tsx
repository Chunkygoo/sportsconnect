import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import loadNamespaces from "next-translate/loadNamespaces";
import superjson from "superjson";
import Portfolio from "../../../components/Portfolio/Portfolio";
import { createContextInner } from "../../../server/trpc/context";
import { appRouter } from "../../../server/trpc/router/_app";
import { trpc } from "../../../utils/trpc";

export default function publicPortfolio(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { id } = props;
  const { data } = trpc.userInfo.getPublicUserInfo.useQuery({ id });
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-screen-xl flex-wrap items-center justify-between">
      <Portfolio publicView={true} publicUserData={data || null} />
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>
) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner({}),
    transformer: superjson,
  });
  const id = context.params?.id as string;
  await ssg.userInfo.getPublicUserInfo.prefetch({ id });
  const locales = await loadNamespaces({
    ...context,
    pathname: "/portfolio/public/[id]",
  });
  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
      locales,
    },
  };
}
