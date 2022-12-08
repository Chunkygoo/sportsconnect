import type { GetStaticProps } from "next";
import loadNamespaces from "next-translate/loadNamespaces";
import useTranslation from "next-translate/useTranslation";

export default function Test() {
  const { t } = useTranslation();
  const description = t("portfolio:upload_new_photo");
  return <div>{description}</div>;
}

export async function getStaticProps(staticProps: GetStaticProps) {
  return {
    props: await loadNamespaces({
      ...staticProps,
      pathname: "/test",
    }),
  };
}
