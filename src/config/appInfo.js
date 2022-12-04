const apiBasePath =
  process.env.NEXT_PUBLIC_ENV === "DEV" ? "/auth" : "/api/auth";

export const appInfo = {
  appName: "SportsConnect",
  apiDomain: process.env.NEXT_PUBLIC_API_AUTH_URL,
  websiteDomain: process.env.NEXT_PUBLIC_APP_URL,
  apiBasePath: apiBasePath,
  websiteBasePath: "/auth",
};
