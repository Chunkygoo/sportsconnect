import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

export default function Process() {
  const { t } = useTranslation();
  return (
    <section className="bg-gray-50 p-6">
      <div className="mx-auto max-w-screen-2xl py-8 px-4 sm:py-16 lg:px-6">
        <div className="mb-8 max-w-screen-md lg:mb-16">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:font-extrabold">
            {t("home:card_3_text_0")}
          </h2>
          <p className="text-gray-500 sm:text-xl">{t("home:card_3_text_0")}</p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
          <div>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 lg:h-12 lg:w-12">
              <svg
                className="h-5 w-5 text-blue-600 lg:h-6 lg:w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">
              {t("home:card_3_text_2")}
            </h3>
            <p className="text-gray-500">{t("home:card_3_text_3")}</p>
          </div>
          <div>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 lg:h-12 lg:w-12">
              <svg
                className="h-5 w-5 text-blue-600 lg:h-6 lg:w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">
              {t("home:card_3_text_4")}
            </h3>
            <p className="text-gray-500">
              {t("home:card_3_text_5")}{" "}
              <Link href="/portfolio">
                <span>
                  <u>{t("home:card_3_text_6")}</u>
                </span>
              </Link>{" "}
              {t("home:card_3_text_7")}{" "}
              <Link href="/universities">
                <span>
                  <u>{t("home:card_3_text_8")}</u>
                </span>
              </Link>{" "}
              {t("home:card_3_text_9")}
            </p>
          </div>
          <div>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 lg:h-12 lg:w-12">
              <svg
                className="h-5 w-5 text-blue-600 lg:h-6 lg:w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">
              {t("home:card_3_text_10")}
            </h3>
            <p className="text-gray-500">
              {t("home:card_3_text_11")}{" "}
              <Link href="/steps">
                <span>
                  <u>{t("home:card_3_text_12")}</u>
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
