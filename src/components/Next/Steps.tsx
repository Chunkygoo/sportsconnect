import useTranslation from "next-translate/useTranslation";
import { Fragment } from "react";
import Modal from "../Modal/Modal";

export default function Steps() {
  const { t } = useTranslation();
  return (
    <Fragment>
      <div className="m-8 grid place-items-center">
        <div className="mb-8 text-gray-500 sm:text-xl">
          <h1>{t("steps:title")}</h1>
        </div>
        <ol className="relative border-l border-gray-200">
          <li className="mb-10 ml-6">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-200 ring-8 ring-white">
              <svg
                className="h-3 w-3 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            <h3 className="mb-1 flex items-center text-lg font-semibold text-gray-900">
              {t("steps:card_0_text_0")}
            </h3>
            <time className="mb-2 block text-sm font-normal leading-none text-gray-400">
              {t("steps:step")} 1
            </time>
            <div className="mb-4 text-base font-normal text-gray-500">
              {t("steps:card_0_text_1")}
            </div>
          </li>
          <li className="mb-10 ml-6">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-200 ring-8 ring-white">
              <svg
                className="h-3 w-3 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            <h3 className="mb-1 text-lg font-semibold text-gray-900">
              {t("steps:card_1_text_0")}
            </h3>
            <time className="mb-2 block text-sm font-normal leading-none text-gray-400">
              {t("steps:step")} 2
            </time>
            <div className="text-base font-normal text-gray-500">
              {t("steps:card_1_text_1")}{" "}
              <a
                href="https://www.ets.org/toefl"
                target="_blank"
                rel="noreferrer noopener"
              >
                <u>{t("steps:card_1_text_2")}</u>
              </a>{" "}
              {t("steps:card_1_text_3")}{" "}
              <Modal
                display={t("steps:card_1_text_4")}
                title={t("steps:card_1_text_2")}
                description={t("steps:card_1_text_5")}
              />
            </div>
          </li>
          <li className="mb-10 ml-6">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-200 ring-8 ring-white">
              <svg
                className="h-3 w-3 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            <h3 className="mb-1 text-lg font-semibold text-gray-900">
              {t("steps:card_2_text_0")}
            </h3>
            <time className="mb-2 block text-sm font-normal leading-none text-gray-400">
              {t("steps:step")} 3
            </time>
            <div className="text-base font-normal text-gray-500">
              {t("steps:card_2_text_1")}{" "}
              <a
                href="https://satsuite.collegeboard.org/sat"
                target="_blank"
                rel="noreferrer noopener"
              >
                <u>{t("steps:card_2_text_2")}</u>
              </a>{" "}
              {t("steps:card_2_text_3")}
              <Modal
                display={t("steps:card_2_text_4")}
                title={t("steps:card_2_text_2")}
                description={t("steps:card_2_text_5")}
              />
            </div>
          </li>
          <li className="mb-10 ml-6">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-200 ring-8 ring-white">
              <svg
                className="h-3 w-3 text-blue-600 "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            <h3 className="mb-1 text-lg font-semibold text-gray-900">
              {t("steps:card_3_text_0")}
            </h3>
            <time className="mb-2 block text-sm font-normal leading-none text-gray-400">
              {t("steps:step")} 4
            </time>
            <div className="text-base font-normal text-gray-500">
              {t("steps:card_3_text_1")}
            </div>
          </li>
          <li className="mb-10 ml-6">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-200 ring-8 ring-white">
              <svg
                className="h-3 w-3 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            <h3 className="mb-1 text-lg font-semibold text-gray-900">
              {t("steps:card_4_text_0")}
            </h3>
            <time className="mb-2 block text-sm font-normal leading-none text-gray-400">
              {t("steps:step")} 5
            </time>
            <div className="text-base font-normal text-gray-500">
              {t("steps:card_4_text_1")}
            </div>
          </li>
          <li className="mb-10 ml-6">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-200 ring-8 ring-white">
              <svg
                className="h-3 w-3 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            <h3 className="mb-1 text-lg font-semibold text-gray-900">
              {t("steps:card_5_text_0")}
            </h3>
            <time className="mb-2 block text-sm font-normal leading-none text-gray-400">
              {t("steps:step")} 6
            </time>
            <div className="text-base font-normal text-gray-500">
              {t("steps:card_5_text_1")}
            </div>
            <Modal
              display={t("steps:card_5_text_2")}
              title={t("steps:card_5_text_3")}
              link={
                <a
                  href="https://www.topuniversities.com/student-info/studying-abroad/how-get-us-student-visa"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {t("steps:card_5_text_4")}
                </a>
              }
            />
          </li>
        </ol>
      </div>
    </Fragment>
  );
}
