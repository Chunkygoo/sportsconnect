import i18nJSON from "./i18n.json";

const i18nConfig = {
  ...i18nJSON,
  // When loader === false, then loadLocaleFrom is required. We don't want to use getInitialProps, therefore we disable the loader as it uses getInitialProps for HoC = trpc.withTRPC(MyApp)
  loadLocaleFrom: (locale, namespace) =>
    import(`./locales/${locale}/${namespace}`).then((m) => m.default),
};

export default i18nConfig;
