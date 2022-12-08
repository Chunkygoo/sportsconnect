import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

import HeaderNavLarge from "./HeaderNavLarge";
import HeaderNavSmall from "./HeaderNavSmall";
import Home from "./Home";

export default function Header() {
  const { t } = useTranslation();
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    setLoggingOut(true);
    await signOut();
    toast.success(t("header:logged_out") as string, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    router.push("/home");
    setLoggingOut(false);
  };
  return (
    <Fragment>
      <header className="sticky top-0 z-50">
        <nav className="border-gray-200 bg-blue-50 px-4 py-2.5 lg:px-6">
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
            <Home />
            <div>
              <nav>
                <HeaderNavSmall
                  loggingOut={loggingOut}
                  handleLogout={handleLogout}
                />
                <HeaderNavLarge
                  loggingOut={loggingOut}
                  handleLogout={handleLogout}
                />
              </nav>
            </div>
          </div>
        </nav>
      </header>
    </Fragment>
  );
}
