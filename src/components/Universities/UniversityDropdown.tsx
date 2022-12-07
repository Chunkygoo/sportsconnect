import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import type { universityDropdownType } from "../../types/universityDropdown";
import listenForOutsideClick from "../../utils/listenForOutsideClick";

export default function UniversityDropdown({
  navSmall,
  setIsNavOpen,
}: universityDropdownType) {
  const [showUni, setShowUni] = useState(false);
  const { t } = useTranslation();
  const uniRoutes = ["/universities", "/myuniversities"];
  const router = useRouter();
  const urlPath = router.asPath;
  const divRef = useRef(null);
  const [listening, setListening] = useState(false);
  useEffect(() => {
    listenForOutsideClick(listening, setListening, divRef, () => {
      setShowUni(false);
    })();
  }, [listening]);
  return (
    <div ref={divRef} className="relative inline-block text-left">
      <div>
        <span
          className={
            "lg:p-0focus:outline-0 rounded text-gray-700 lg:bg-transparent " +
            (navSmall
              ? "border-b border-gray-400 text-xl uppercase hover:bg-gray-200 "
              : "") +
            (urlPath.includes("universities")
              ? "border-b border-gray-800 text-blue-700"
              : "")
          }
          id="menu-button"
          // aria-expanded="true"
          // aria-haspopup="true"
          onClick={() => setShowUni(!showUni)}
        >
          {urlPath === "/universities" || urlPath === "/universities#"
            ? t("header:all_universities")
            : t("header:my_universities")}
        </span>
      </div>
      {showUni && (
        <div
          className={
            "absolute mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:right-0 " +
            (showUni ? "" : "hidden")
          }
          // role="menu"
          // aria-orientation="vertical"
          // aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {uniRoutes.map((uniRoute, index) => (
              <Link
                href={router.asPath !== uniRoute ? uniRoute : "#"}
                key={index}
              >
                <span
                  className="block px-4 py-2 text-sm text-gray-700"
                  onClick={() => {
                    setShowUni(!showUni);
                    if (setIsNavOpen) setIsNavOpen(false);
                  }}
                >
                  {uniRoute === "/universities"
                    ? t("header:all_universities")
                    : t("header:my_universities")}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
