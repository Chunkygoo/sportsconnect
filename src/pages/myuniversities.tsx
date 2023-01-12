import type { GetStaticProps } from "next";
import loadNamespaces from "next-translate/loadNamespaces";
import SessionAuth from "../components/Auth/SessionAuth";
import UniversitiesGallery from "../components/Universities/UniversitiesGallery";
import useSessionLoading from "../hooks/useSessionLoading";

export default function MyUniversities() {
  const { loading, session, Loader } = useSessionLoading();
  if (loading) return Loader;
  else if (!session.loading) {
    return (
      <SessionAuth>
        <div className="max-h-screen-xl mx-auto min-h-[80vh] max-w-screen-xl">
          <UniversitiesGallery
            publicUnis={!session.doesSessionExist}
            myInterested={true}
          />
        </div>
      </SessionAuth>
    );
  }
}

export async function getStaticProps(staticProps: GetStaticProps) {
  return {
    props: await loadNamespaces({
      ...staticProps,
      pathname: "/myuniversities",
    }),
  };
}
