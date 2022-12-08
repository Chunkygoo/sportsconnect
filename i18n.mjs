const i18nConfig = {
  locales: ["en-US", "zh"],
  defaultLocale: "en-US",
  pages: {
    "*": ["header", "footer", "_404", "offline"],
    "/contactus": ["contactus"],
    "/home": ["home"],
    "/portfolio": ["portfolio"],
    "/portfolio/public/[id]": ["portfolio"],
    "/steps": ["steps"],
    "/universities": ["universities"],
    "/myuniversities": ["universities"],
    "/auth/loginsignup": ["login", "signup"],
  },
  loader: false,
  // When loader === false, then loadLocaleFrom is required. We don't want to use getInitialProps, therefore we disable the loader as it uses getInitialProps for HoC = trpc.withTRPC(MyApp)
  loadLocaleFrom: (locale, namespace) =>
    import(`./locales/${locale}/${namespace}`).then((m) => m.default),
};

export default i18nConfig;
