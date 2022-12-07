import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { BiGlobe } from "react-icons/bi";
import type { languageDropdownType } from "../../types/languageDropdown";
import listenForOutsideClick from "../../utils/listenForOutsideClick";

export default function LanguageDropdown({
  setIsNavOpen,
}: languageDropdownType) {
  const [showLang, setShowLang] = useState(false);
  const router = useRouter();
  const divRef = useRef(null);
  const [listening, setListening] = useState(false);
  useEffect(() => {
    listenForOutsideClick(listening, setListening, divRef, () => {
      setShowLang(false);
    })();
  }, [listening]);
  return (
    <div ref={divRef} className="relative inline-block text-left">
      <div>
        <span
          // type="button"
          className="block rounded px-4 text-gray-700 focus:outline-0 lg:bg-transparent lg:p-0"
          id="menu-button"
          // aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setShowLang(!showLang)}
        >
          <BiGlobe className="mt-0.5 -mr-1 h-5 w-7" />
        </span>
      </div>
      <div
        className={
          "absolute mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:right-0 " +
          (showLang ? "" : "hidden")
        }
        // role="menu"
        // aria-orientation="vertical"
        // aria-labelledby="menu-button"
      >
        <div className="py-1" role="none">
          {router.locales?.map((locale) => (
            <Link href={router.asPath} locale={locale} key={locale}>
              <span
                className="block px-4 py-2 text-sm text-gray-700"
                onClick={() => {
                  setShowLang(!showLang);
                  if (setIsNavOpen) setIsNavOpen(false);
                  localStorage.setItem("lang", locale); // For Google login
                }}
              >
                {locale === "en-US" ? "English" : "中文"}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
