import Router from "next/router";
import { toast } from "react-toastify";
import type { SuperTokensConfig } from "supertokens-auth-react/lib/build/types.js";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import SessionReact from "supertokens-auth-react/recipe/session";
import ThirdPartyEmailPassword, {
  Google,
} from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import type { WindowHandlerInterface } from "supertokens-website/utils/windowHandler/types";
import { env } from "../env/client.mjs";

export const frontendConfig = (): SuperTokensConfig => {
  return {
    appInfo: {
      appName: "SportsConnect",
      apiDomain: env.NEXT_PUBLIC_APP_URL,
      websiteDomain: env.NEXT_PUBLIC_APP_URL,
      apiBasePath: "/api/auth",
      websiteBasePath: "/auth",
    },
    recipeList: [
      EmailVerification.init({
        mode: "OPTIONAL",
      }),
      SessionReact.init(),
      ThirdPartyEmailPassword.init({
        override: {
          functions: (originalImplementation) => {
            return {
              ...originalImplementation,
              // we will only be overriding what happens when a user
              // clicks the sign in or sign up button.
              getAuthorisationURLWithQueryParamsAndSetState: async function (
                input
              ) {
                const shadowRoot =
                  document.querySelector("#supertokens-root")?.shadowRoot;
                if (shadowRoot) {
                  (
                    shadowRoot.querySelector(
                      `[data-supertokens~='providerButton']`
                    ) as HTMLButtonElement
                  ).disabled = true;
                  (
                    shadowRoot.querySelector(
                      `[data-supertokens~='providerButtonText']`
                    ) as HTMLButtonElement
                  ).textContent = "Signing in...";
                }
                // then call the default behaviour as show below
                return originalImplementation.getAuthorisationURLWithQueryParamsAndSetState(
                  input
                );
              },
            };
          },
          components: {
            ThirdPartySignInAndUpCallbackTheme_Override: () => {
              return (
                <div className="flex h-screen">
                  <div className="m-auto">
                    <h1 className="mb-2 text-2xl">
                      You are getting redirected...
                    </h1>
                    <div>
                      <p className="mt-4">
                        Here is a cookie while you are waiting ????
                      </p>
                      <p>Team SportsConnect</p>
                    </div>
                  </div>
                </div>
              );
            },
          },
        },
        signInAndUpFeature: {
          disableDefaultUI: true,
          providers: [Google.init()],
        },
        resetPasswordUsingTokenFeature: {
          disableDefaultUI: true,
        },
        style: {
          button: {
            backgroundColor: "#0076ff",
            border: "0px",
            margin: "0 auto",
          },
          superTokensBranding: {
            display: "none",
          },
        },
        getRedirectionURL: async (context) => {
          if (context.action === "SUCCESS") {
            if (context.redirectToPath !== undefined) {
              // we are navigating back to where the user was before they authenticated
              return context.redirectToPath;
            }

            // For Google login, we need a workaround because Router.locale will always be the default upon successful login.
            // Hence, we use localStorage
            if (localStorage.getItem("lang") === "zh") {
              toast.success("?????????", {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
              return "/zh/home";
            } else {
              // all other cases, including localStorage.getItem("lang") is null (user never picked language) and "en-US", we use english (default)
              toast.success("Welcome back!", {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
              return "/home";
            }
          }
        },
      }),
    ],
    languageTranslations: {
      translations: {
        en: {
          THIRD_PARTY_SIGN_IN_AND_UP_HEADER_TITLE: "Sign Up / Sign In",
          THIRD_PARTY_SIGN_IN_UP_FOOTER_START:
            "By continuing, you agree to our ",
          THIRD_PARTY_SIGN_IN_UP_FOOTER_TOS: "Terms of Service",
          THIRD_PARTY_SIGN_IN_UP_FOOTER_AND: " and ",
          THIRD_PARTY_SIGN_IN_UP_FOOTER_PP: "Privacy Policy",
          THIRD_PARTY_SIGN_IN_UP_FOOTER_END: "",
          THIRD_PARTY_PROVIDER_DEFAULT_BTN_START: "Continue with ",
          THIRD_PARTY_PROVIDER_DEFAULT_BTN_END: "",
          THIRD_PARTY_ERROR_NO_EMAIL:
            "Could not retrieve email. Please try a different method.",
          BRANDING_POWERED_BY_START: "Powered by ",
          BRANDING_POWERED_BY_END: "",
          SOMETHING_WENT_WRONG_ERROR: "Something went wrong. Please try again.",
          EMAIL_VERIFICATION_RESEND_SUCCESS: "Email resent",
          EMAIL_VERIFICATION_SEND_TITLE: "Verify your email address",
          EMAIL_VERIFICATION_SEND_DESC_START: "",
          EMAIL_VERIFICATION_SEND_DESC_STRONG: "Please click on the link",
          EMAIL_VERIFICATION_SEND_DESC_END:
            " in the email we just sent you to confirm your email address.",
          EMAIL_VERIFICATION_RESEND_BTN: "Resend Email",
          EMAIL_VERIFICATION_LOGOUT: "Logout ",
          EMAIL_VERIFICATION_SUCCESS: "Email verification successful!",
          EMAIL_VERIFICATION_CONTINUE_BTN: "CONTINUE",
          EMAIL_VERIFICATION_CONTINUE_LINK: "Continue",
          EMAIL_VERIFICATION_EXPIRED: "The email verification link has expired",
          EMAIL_VERIFICATION_ERROR_TITLE: "Something went wrong",
          EMAIL_VERIFICATION_ERROR_DESC:
            "We encountered an unexpected error. Please contact support for assistance",
          EMAIL_VERIFICATION_LINK_CLICKED_HEADER: "Verify your email address",
          EMAIL_VERIFICATION_LINK_CLICKED_DESC:
            "Please click on the button below to verify your email address",
          EMAIL_VERIFICATION_LINK_CLICKED_CONTINUE_BUTTON: "CONTINUE",
          EMAIL_PASSWORD_EMAIL_LABEL: "Email",
          EMAIL_PASSWORD_EMAIL_PLACEHOLDER: "Email address",
          EMAIL_PASSWORD_PASSWORD_LABEL: "Password",
          EMAIL_PASSWORD_PASSWORD_PLACEHOLDER: "Password",
          EMAIL_PASSWORD_SIGN_IN_HEADER_TITLE: "Sign In",
          EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_START: "Not registered yet?",
          EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_SIGN_UP_LINK: "Sign Up",
          EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_END: "",
          EMAIL_PASSWORD_SIGN_IN_FOOTER_FORGOT_PW_LINK: "Forgot password?",
          EMAIL_PASSWORD_SIGN_IN_SUBMIT_BTN: "SIGN IN",
          EMAIL_PASSWORD_SIGN_IN_WRONG_CREDENTIALS_ERROR:
            "Incorrect email and password combination",
          EMAIL_PASSWORD_SIGN_UP_HEADER_TITLE: "Sign Up",
          EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_START:
            "Already have an account?",
          EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_SIGN_IN_LINK: "Sign In",
          EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_END: "",
          EMAIL_PASSWORD_SIGN_UP_FOOTER_START:
            "By continuing, you agree to our ",
          EMAIL_PASSWORD_SIGN_UP_FOOTER_TOS: "Terms of Service",
          EMAIL_PASSWORD_SIGN_UP_FOOTER_AND: " and ",
          EMAIL_PASSWORD_SIGN_UP_FOOTER_PP: "Privacy Policy",
          EMAIL_PASSWORD_SIGN_UP_FOOTER_END: "",
          EMAIL_PASSWORD_SIGN_UP_SUBMIT_BTN: "SIGN UP",
          EMAIL_PASSWORD_EMAIL_ALREADY_EXISTS:
            "This email already exists. Please sign in instead",
          EMAIL_PASSWORD_RESET_HEADER_TITLE: "Reset your password",
          EMAIL_PASSWORD_RESET_HEADER_SUBTITLE:
            "We will send you an email to reset your password",
          EMAIL_PASSWORD_RESET_SEND_FALLBACK_EMAIL: "your account",
          EMAIL_PASSWORD_RESET_SEND_BEFORE_EMAIL:
            "A password reset email has been sent to ",
          EMAIL_PASSWORD_RESET_SEND_AFTER_EMAIL:
            ", if it exists in our system. ",
          EMAIL_PASSWORD_RESET_RESEND_LINK: "Resend or change email",
          EMAIL_PASSWORD_RESET_SEND_BTN: "Email me",
          EMAIL_PASSWORD_RESET_SIGN_IN_LINK: "Sign In",
          EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_HEADER_TITLE: "Success!",
          EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_DESC:
            "Your password has been updated successfully",
          EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_SIGN_IN_BTN: "SIGN IN",
          EMAIL_PASSWORD_NEW_PASSWORD_LABEL: "New password",
          EMAIL_PASSWORD_NEW_PASSWORD_PLACEHOLDER: "New password",
          EMAIL_PASSWORD_CONFIRM_PASSWORD_LABEL: "Confirm password",
          EMAIL_PASSWORD_CONFIRM_PASSWORD_PLACEHOLDER: "Confirm your password",
          EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_TITLE: "Change your password",
          EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_SUBTITLE:
            "Enter a new password below to change your password",
          EMAIL_PASSWORD_RESET_SUBMIT_PW_CHANGE_PW_BTN: "CHANGE PASSWORD",
          EMAIL_PASSWORD_RESET_PASSWORD_INVALID_TOKEN_ERROR:
            "Invalid password reset token",
          ERROR_EMAIL_NON_STRING: "Email must be of type string",
          ERROR_EMAIL_INVALID: "Email is invalid",
          ERROR_PASSWORD_NON_STRING: "Password must be of type string",
          ERROR_PASSWORD_TOO_SHORT:
            "Password must contain at least 8 characters, including a number",
          ERROR_PASSWORD_TOO_LONG:
            "Password's length must be lesser than 100 characters",
          ERROR_PASSWORD_NO_ALPHA:
            "Password must contain at least one alphabet",
          ERROR_PASSWORD_NO_NUM: "Password must contain at least one number",
          ERROR_CONFIRM_PASSWORD_NO_MATCH:
            "Confirmation password doesn't match",
          ERROR_NON_OPTIONAL: "Field is not optional",

          /*
           * The following are error messages from our backend SDK.
           * These are returned as full messages to preserver compatibilty, but they work just like the keys above.
           * They are shown as is by default (setting the value to undefined will display the raw translation key)
           */
          "This email already exists. Please sign in instead.": undefined,
          "Field is not optional": undefined,
          "Password must contain at least 8 characters, including a number":
            undefined,
          "Password's length must be lesser than 100 characters": undefined,
          "Password must contain at least one alphabet": undefined,
          "Password must contain at least one number": undefined,
          "Email is invalid": undefined,
        },
        zh: {
          THIRD_PARTY_SIGN_IN_AND_UP_HEADER_TITLE: "??????/??????",
          THIRD_PARTY_SIGN_IN_UP_FOOTER_START: "????????????????????????????????? ",
          THIRD_PARTY_SIGN_IN_UP_FOOTER_TOS: "????????????",
          THIRD_PARTY_SIGN_IN_UP_FOOTER_AND: " ??? ",
          THIRD_PARTY_SIGN_IN_UP_FOOTER_PP: "????????????",
          THIRD_PARTY_SIGN_IN_UP_FOOTER_END: "",
          THIRD_PARTY_PROVIDER_DEFAULT_BTN_START: "????????? ",
          THIRD_PARTY_PROVIDER_DEFAULT_BTN_END: "",
          THIRD_PARTY_ERROR_NO_EMAIL: "??????????????????????????????????????????.",
          BRANDING_POWERED_BY_START: "???SuperToken??????????????????",
          BRANDING_POWERED_BY_END: "",
          SOMETHING_WENT_WRONG_ERROR: "???????????????????????????.",
          EMAIL_VERIFICATION_RESEND_SUCCESS: "????????????????????????",
          EMAIL_VERIFICATION_SEND_TITLE: "??????????????????",
          EMAIL_VERIFICATION_SEND_DESC_START: "",
          EMAIL_VERIFICATION_SEND_DESC_STRONG: "?????????",
          EMAIL_VERIFICATION_SEND_DESC_END:
            " ????????????????????????????????????????????????????????????????????????????????????.",
          EMAIL_VERIFICATION_RESEND_BTN: "??????????????????",
          EMAIL_VERIFICATION_LOGOUT: "???????????? ",
          EMAIL_VERIFICATION_SUCCESS: "????????????????????????!",
          EMAIL_VERIFICATION_CONTINUE_BTN: "??????",
          EMAIL_VERIFICATION_CONTINUE_LINK: "??????",
          EMAIL_VERIFICATION_EXPIRED: "?????????????????????????????????",
          EMAIL_VERIFICATION_ERROR_TITLE: "???????????????",
          EMAIL_VERIFICATION_ERROR_DESC:
            "??????????????????????????????????????????????????????????????????",
          EMAIL_VERIFICATION_LINK_CLICKED_HEADER: "????????????????????????",
          EMAIL_VERIFICATION_LINK_CLICKED_DESC:
            "?????????????????????????????????????????????????????????",
          EMAIL_VERIFICATION_LINK_CLICKED_CONTINUE_BUTTON: "??????",
          EMAIL_PASSWORD_EMAIL_LABEL: "??????",
          EMAIL_PASSWORD_EMAIL_PLACEHOLDER: "????????????",
          EMAIL_PASSWORD_PASSWORD_LABEL: "??????",
          EMAIL_PASSWORD_PASSWORD_PLACEHOLDER: "??????",
          EMAIL_PASSWORD_SIGN_IN_HEADER_TITLE: "??????",
          EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_START: "?????????????",
          EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_SIGN_UP_LINK: "??????????????????",
          EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_END: "",
          EMAIL_PASSWORD_SIGN_IN_FOOTER_FORGOT_PW_LINK: "?????????????",
          EMAIL_PASSWORD_SIGN_IN_SUBMIT_BTN: "??????",
          EMAIL_PASSWORD_SIGN_IN_WRONG_CREDENTIALS_ERROR:
            "?????????????????????????????????",
          EMAIL_PASSWORD_SIGN_UP_HEADER_TITLE: "??????????????????",
          EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_START: "??????????????????????",
          EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_SIGN_IN_LINK: "??????",
          EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_END: "",
          EMAIL_PASSWORD_SIGN_UP_FOOTER_START: "???????????????????????????",
          EMAIL_PASSWORD_SIGN_UP_FOOTER_TOS: "????????????",
          EMAIL_PASSWORD_SIGN_UP_FOOTER_AND: " ???",
          EMAIL_PASSWORD_SIGN_UP_FOOTER_PP: "????????????",
          EMAIL_PASSWORD_SIGN_UP_FOOTER_END: "",
          EMAIL_PASSWORD_SIGN_UP_SUBMIT_BTN: "??????????????????",
          EMAIL_PASSWORD_EMAIL_ALREADY_EXISTS: "??????????????????????????????????????????",
          EMAIL_PASSWORD_RESET_HEADER_TITLE: "??????????????????",
          EMAIL_PASSWORD_RESET_HEADER_SUBTITLE:
            "????????????????????????????????????????????????????????????",
          EMAIL_PASSWORD_RESET_SEND_FALLBACK_EMAIL: "????????????",
          EMAIL_PASSWORD_RESET_SEND_BEFORE_EMAIL: "?????????????????????????????????",
          EMAIL_PASSWORD_RESET_SEND_AFTER_EMAIL: ", ??????????????????????????????. ",
          EMAIL_PASSWORD_RESET_RESEND_LINK: "???????????????????????????",
          EMAIL_PASSWORD_RESET_SEND_BTN: "???????????????",
          EMAIL_PASSWORD_RESET_SIGN_IN_LINK: "??????",
          EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_HEADER_TITLE: "????????????!",
          EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_DESC: "??????????????????????????????",
          EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_SIGN_IN_BTN: "??????",
          EMAIL_PASSWORD_NEW_PASSWORD_LABEL: "????????????",
          EMAIL_PASSWORD_NEW_PASSWORD_PLACEHOLDER: "????????????",
          EMAIL_PASSWORD_CONFIRM_PASSWORD_LABEL: "????????????",
          EMAIL_PASSWORD_CONFIRM_PASSWORD_PLACEHOLDER: "??????????????????",
          EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_TITLE: "????????????",
          EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_SUBTITLE:
            "??????????????????????????????????????????",
          EMAIL_PASSWORD_RESET_SUBMIT_PW_CHANGE_PW_BTN: "????????????",
          EMAIL_PASSWORD_RESET_PASSWORD_INVALID_TOKEN_ERROR: "????????????????????????",
          ERROR_EMAIL_NON_STRING: "????????????????????????????????????",
          ERROR_EMAIL_INVALID: "??????????????????",
          ERROR_PASSWORD_NON_STRING: "??????????????????????????????",
          ERROR_PASSWORD_TOO_SHORT: "????????????????????????8???????????????1?????????",
          ERROR_PASSWORD_TOO_LONG: "????????????????????????100 ?????????",
          ERROR_PASSWORD_NO_ALPHA: "????????????????????????????????????",
          ERROR_PASSWORD_NO_NUM: "??????????????????????????????",
          ERROR_CONFIRM_PASSWORD_NO_MATCH: "?????????????????????",
          ERROR_NON_OPTIONAL: "????????????????????????",
        },
      },
      defaultLanguage: "en",
    },
    // this is so that the SDK uses the next router for navigation
    windowHandler: (oI: WindowHandlerInterface) => {
      return {
        ...oI,
        location: {
          ...oI.location,
          setHref: (href: string) => {
            Router.push(href);
          },
        },
      };
    },
  };
};
