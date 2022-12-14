import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";

export default function _404({ description = "" }) {
  const { t } = useTranslation();
  let desc = t("_404:description");
  if (description === "user") {
    desc = t("_404:usernotfound");
  }
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50 ">
      <div className="container flex flex-col items-center justify-between px-5 text-gray-700 md:flex-row">
        <div className="mx-8 w-full lg:w-1/2">
          <div className="font-dark mb-8 text-7xl font-extrabold"> 404</div>
          <p className="mb-8 text-2xl font-light leading-normal md:text-3xl">
            {desc}
          </p>
          <Link href="/home">
            <span className="duration-400 inline rounded-lg border border-transparent bg-white px-5 py-3  text-xl font-medium leading-5 text-black shadow-2xl transition-all focus:outline-none">
              {t("_404:back")}
            </span>
          </Link>
        </div>
        <div className="mx-5 my-12 w-full lg:flex lg:w-1/2 lg:justify-end">
          <Image src="/404.png" alt="Page not found" width={800} height={500} />
        </div>
      </div>
    </div>
  );
}
