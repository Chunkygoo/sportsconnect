import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto max-w-screen-xl">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              {/* <img
                className="mr-3 h-6 sm:h-9"
                alt="Logo"
                src="/logo.png"
                width="40"
                height="40"
              /> */}
              <Image
                width={40}
                height={40}
                src="/logo.png"
                className="mr-3 h-6 sm:h-9"
                alt="Logo"
              />
              <span className="ml-4 self-center whitespace-nowrap text-xl font-semibold">
                SportsConnect
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 sm:gap-6">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900">
                {t("footer:about")}
              </h2>
              <ul className="text-gray-600">
                <li className="mb-4">
                  <Link href="/contactus">
                    <span className="hover:underline">
                      {t("footer:contact_us")}
                    </span>
                  </Link>
                </li>
                <li>
                  <span className="hover:underline">{t("footer:team")}</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900">
                {t("footer:follow_us")}
              </h2>
              <ul className="text-gray-600">
                <li className="mb-4">
                  <a
                    href="https://www.instagram.com/sportsconnect_official/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:underline "
                  >
                    {t("footer:instagram")}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/sportsconnecthq/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:underline"
                  >
                    {t("footer:linkedin")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2022 SportsConnect.com. {t("footer:all_rights_reserved")}.
          </span>
        </div>
      </div>
    </footer>
  );
}
