import { Fragment, useState } from "react";
import type { headerType } from "../../types/header";

import HeaderNavLarge from "./HeaderNavLarge";
import HeaderNavSmall from "./HeaderNavSmall";
import Home from "./Home";

export default function Header({ logOutHelper }: headerType) {
  const [loggingOut, setLoggingOut] = useState(false);
  const handleLogout = async () => {
    setLoggingOut(true);
    await logOutHelper();
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
