import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import type { headerNavType } from "../../types/headerNav";
import UniversityDropdown from "../Universities/UniversityDropdown";
import LanguageDropdown from "./LanguageDropdown";

export default function HeaderNavSmall({
  loggingOut,
  handleLogout,
}: headerNavType) {
  const { t } = useTranslation();
  const session = useSessionContext();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();
  const urlPath = router.asPath;
  const loading = session.loading;
  const loadedNotAuth = !session.loading && !session.doesSessionExist;

  return (
    <section className="MOBILE-MENU flex lg:hidden">
      <div
        className="HAMBURGER-ICON space-y-2"
        onClick={() => setIsNavOpen((prev) => !prev)}
      >
        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
      </div>

      <div
        className={
          isNavOpen
            ? "absolute top-0 left-0 z-10 flex h-screen w-full flex-col items-center justify-evenly bg-white"
            : "hidden"
        }
      >
        <div
          className="absolute top-0 right-0 px-8 py-8"
          onClick={() => setIsNavOpen(false)}
        >
          <svg
            className="h-8 w-8 text-gray-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
        <ul className="flex min-h-[250px] flex-col items-center justify-between">
          <li>
            <Link href={router.asPath !== "/home" ? "/home" : "#"}>
              <span
                onClick={() => {
                  setIsNavOpen(false);
                }}
                className={
                  "my-12 border-b border-gray-400 text-xl uppercase hover:bg-gray-200" +
                  (urlPath.includes("home")
                    ? "border-blue-800 text-blue-700"
                    : "")
                }
                aria-current="page"
              >
                {t("header:home")}
              </span>
            </Link>
          </li>
          <li>
            <UniversityDropdown navSmall={true} setIsNavOpen={setIsNavOpen} />
          </li>
          <li>
            <Link href={router.asPath !== "/steps" ? "/steps" : "#"}>
              <span
                onClick={() => {
                  setIsNavOpen(false);
                }}
                className={
                  "my-12 border-b border-gray-400 text-xl uppercase hover:bg-gray-200" +
                  (urlPath.includes("steps")
                    ? "border-blue-800 text-blue-700"
                    : "")
                }
                aria-current="page"
              >
                {t("header:steps")}
              </span>
            </Link>
          </li>
          <li>
            <Link href={router.asPath !== "/portfolio" ? "/portfolio" : "#"}>
              <span
                onClick={() => {
                  setIsNavOpen(false);
                }}
                className={
                  "my-12 border-b border-gray-400 text-xl uppercase hover:bg-gray-200" +
                  (urlPath.includes("portfolio")
                    ? "border-blue-800 text-blue-700"
                    : "")
                }
              >
                {t("header:portfolio")}
              </span>
            </Link>
          </li>
          {loading || loadedNotAuth ? (
            <li>
              <Link
                href={
                  router.asPath !== "/auth/loginsignup"
                    ? "/auth/loginsignup"
                    : "#"
                }
                onClick={(event) => {
                  if (loading) {
                    event.preventDefault();
                  }
                }}
              >
                <span
                  onClick={() => {
                    setIsNavOpen(false);
                  }}
                  className={
                    "my-12 border-b border-gray-400 text-xl uppercase hover:bg-gray-200" +
                    (urlPath.includes("loginsignup")
                      ? "border-blue-800 text-blue-700"
                      : "")
                  }
                >
                  {t("header:login_signup")}
                </span>
              </Link>
            </li>
          ) : (
            <li>
              <button
                type="button"
                disabled={loggingOut}
                onClick={() => {
                  handleLogout();
                  setIsNavOpen(false);
                }}
                className="border-b border-gray-400 text-xl uppercase hover:bg-gray-200"
              >
                {t("header:log_out")}
              </button>
            </li>
          )}
          <li>
            <LanguageDropdown setIsNavOpen={setIsNavOpen} />
          </li>
        </ul>
      </div>
    </section>
  );
}
