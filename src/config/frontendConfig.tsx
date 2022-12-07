import Router from "next/router";
import { toast } from "react-toastify";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import SessionReact from "supertokens-auth-react/recipe/session";
import ThirdPartyEmailPassword, {
  Google,
} from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { appInfo } from "./appInfo";

export const frontendConfig = {
  appInfo,
  recipeList: [
    EmailVerification.init({
      // mode: process.env.NEXT_PUBLIC_EMAIL_VERIFICATION,
      mode: "OPTIONAL",
    }),
    // process.env.NEXT_PUBLIC_ENV === "DEV"
    //   ? SessionReact.init({
    //       cookieDomain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
    //     })
    //   : SessionReact.init(),
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
                      Here is a cookie while you are waiting 🍪
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
          // Hence, we use localStorage in _app.js, LanguageDropdown.js, frontendConfig.js and home.js to redirect and set
          // the right locale
          if (localStorage.getItem("lang") === "en-US") {
            toast.success("Welcome back!", {
              position: toast.POSITION.BOTTOM_RIGHT,
              delay: 500,
            }); // Without timeout, emailpassword login somehow dismisses the toast upon redirect
            return "/home"; // must redirect to home.js because that is where router.locale gets updated
          } else if (localStorage.getItem("lang") === "zh") {
            toast.success("欢迎！", {
              position: toast.POSITION.BOTTOM_RIGHT,
              delay: 500,
            });
            return "/zh/home"; // must redirect to home.js because that is where router.locale gets updated
          }
        }
        return undefined;
      },
    }),
  ],
  languageTranslations: {
    translations: {
      en: {
        THIRD_PARTY_SIGN_IN_AND_UP_HEADER_TITLE: "Sign Up / Sign In",
        THIRD_PARTY_SIGN_IN_UP_FOOTER_START: "By continuing, you agree to our ",
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
        EMAIL_PASSWORD_SIGN_UP_FOOTER_START: "By continuing, you agree to our ",
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
        EMAIL_PASSWORD_RESET_SEND_AFTER_EMAIL: ", if it exists in our system. ",
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
        ERROR_PASSWORD_NO_ALPHA: "Password must contain at least one alphabet",
        ERROR_PASSWORD_NO_NUM: "Password must contain at least one number",
        ERROR_CONFIRM_PASSWORD_NO_MATCH: "Confirmation password doesn't match",
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
        THIRD_PARTY_SIGN_IN_AND_UP_HEADER_TITLE: "注册/登入",
        THIRD_PARTY_SIGN_IN_UP_FOOTER_START: "点击继续，即表示您同意 ",
        THIRD_PARTY_SIGN_IN_UP_FOOTER_TOS: "服务条款",
        THIRD_PARTY_SIGN_IN_UP_FOOTER_AND: " 和 ",
        THIRD_PARTY_SIGN_IN_UP_FOOTER_PP: "隐私条款",
        THIRD_PARTY_SIGN_IN_UP_FOOTER_END: "",
        THIRD_PARTY_PROVIDER_DEFAULT_BTN_START: "继续与 ",
        THIRD_PARTY_PROVIDER_DEFAULT_BTN_END: "",
        THIRD_PARTY_ERROR_NO_EMAIL: "无法找回邮箱，请尝试其他方法.",
        BRANDING_POWERED_BY_START: "由SuperToken提供技术支持",
        BRANDING_POWERED_BY_END: "",
        SOMETHING_WENT_WRONG_ERROR: "出了点问题，请重试.",
        EMAIL_VERIFICATION_RESEND_SUCCESS: "重新发送电子邮件",
        EMAIL_VERIFICATION_SEND_TITLE: "核实邮箱地址",
        EMAIL_VERIFICATION_SEND_DESC_START: "",
        EMAIL_VERIFICATION_SEND_DESC_STRONG: "请点击",
        EMAIL_VERIFICATION_SEND_DESC_END:
          " 我们刚刚发送给您的电子邮件中的链接以确认您的电子邮件地址.",
        EMAIL_VERIFICATION_RESEND_BTN: "重新发送邮件",
        EMAIL_VERIFICATION_LOGOUT: "退出登录 ",
        EMAIL_VERIFICATION_SUCCESS: "电子邮件验证成功!",
        EMAIL_VERIFICATION_CONTINUE_BTN: "继续",
        EMAIL_VERIFICATION_CONTINUE_LINK: "继续",
        EMAIL_VERIFICATION_EXPIRED: "电子邮件验证链接已过期",
        EMAIL_VERIFICATION_ERROR_TITLE: "出了点问题",
        EMAIL_VERIFICATION_ERROR_DESC:
          "我们遇到了一个错误意外。请联系客服以获得帮助",
        EMAIL_VERIFICATION_LINK_CLICKED_HEADER: "核实您的邮箱地址",
        EMAIL_VERIFICATION_LINK_CLICKED_DESC:
          "请点击下面的按钮以验证您的电子邮件地址",
        EMAIL_VERIFICATION_LINK_CLICKED_CONTINUE_BUTTON: "继续",
        EMAIL_PASSWORD_EMAIL_LABEL: "邮箱",
        EMAIL_PASSWORD_EMAIL_PLACEHOLDER: "邮箱地址",
        EMAIL_PASSWORD_PASSWORD_LABEL: "密码",
        EMAIL_PASSWORD_PASSWORD_PLACEHOLDER: "密码",
        EMAIL_PASSWORD_SIGN_IN_HEADER_TITLE: "登入",
        EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_START: "还未注册?",
        EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_SIGN_UP_LINK: "创建新的账户",
        EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_END: "",
        EMAIL_PASSWORD_SIGN_IN_FOOTER_FORGOT_PW_LINK: "忘记密码?",
        EMAIL_PASSWORD_SIGN_IN_SUBMIT_BTN: "登入",
        EMAIL_PASSWORD_SIGN_IN_WRONG_CREDENTIALS_ERROR:
          "邮箱号或者登录密码错误",
        EMAIL_PASSWORD_SIGN_UP_HEADER_TITLE: "创建新的账户",
        EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_START: "已拥有一个账户?",
        EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_SIGN_IN_LINK: "登入",
        EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_END: "",
        EMAIL_PASSWORD_SIGN_UP_FOOTER_START: "继续，即表示您同意",
        EMAIL_PASSWORD_SIGN_UP_FOOTER_TOS: "服务条款",
        EMAIL_PASSWORD_SIGN_UP_FOOTER_AND: " 和",
        EMAIL_PASSWORD_SIGN_UP_FOOTER_PP: "隐私政策",
        EMAIL_PASSWORD_SIGN_UP_FOOTER_END: "",
        EMAIL_PASSWORD_SIGN_UP_SUBMIT_BTN: "创建新的账户",
        EMAIL_PASSWORD_EMAIL_ALREADY_EXISTS: "此电子邮箱已存在，请改为登入",
        EMAIL_PASSWORD_RESET_HEADER_TITLE: "重置您的密码",
        EMAIL_PASSWORD_RESET_HEADER_SUBTITLE:
          "我们将向您发送一封电子邮件以重置您的密码",
        EMAIL_PASSWORD_RESET_SEND_FALLBACK_EMAIL: "您的账户",
        EMAIL_PASSWORD_RESET_SEND_BEFORE_EMAIL: "已发送密码重置电子邮件",
        EMAIL_PASSWORD_RESET_SEND_AFTER_EMAIL: ", 如果此账户存在于系统. ",
        EMAIL_PASSWORD_RESET_RESEND_LINK: "重新发送或更改邮箱",
        EMAIL_PASSWORD_RESET_SEND_BTN: "发邮件给我",
        EMAIL_PASSWORD_RESET_SIGN_IN_LINK: "登入",
        EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_HEADER_TITLE: "更改成功!",
        EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_DESC: "您已成功更改您的密码",
        EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_SIGN_IN_BTN: "登入",
        EMAIL_PASSWORD_NEW_PASSWORD_LABEL: "新的密码",
        EMAIL_PASSWORD_NEW_PASSWORD_PLACEHOLDER: "新的密码",
        EMAIL_PASSWORD_CONFIRM_PASSWORD_LABEL: "确认密码",
        EMAIL_PASSWORD_CONFIRM_PASSWORD_PLACEHOLDER: "确认您的密码",
        EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_TITLE: "更改密码",
        EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_SUBTITLE:
          "在下方输入密码以更改您的密码",
        EMAIL_PASSWORD_RESET_SUBMIT_PW_CHANGE_PW_BTN: "更改密码",
        EMAIL_PASSWORD_RESET_PASSWORD_INVALID_TOKEN_ERROR: "无效密码数字代币",
        ERROR_EMAIL_NON_STRING: "电子邮件必须是字符串类型",
        ERROR_EMAIL_INVALID: "电子邮箱无效",
        ERROR_PASSWORD_NON_STRING: "密码必须是字符串类型",
        ERROR_PASSWORD_TOO_SHORT: "密码必须至少包含8个字符以及1个数字",
        ERROR_PASSWORD_TOO_LONG: "密码长度必须小于100 个字符",
        ERROR_PASSWORD_NO_ALPHA: "密码必须至少包含一个字母",
        ERROR_PASSWORD_NO_NUM: "密码必须含有一个数字",
        ERROR_CONFIRM_PASSWORD_NO_MATCH: "确认密码不匹配",
        ERROR_NON_OPTIONAL: "请输入您的邮箱号",
      },
    },
    defaultLanguage: "en",
  },
  // this is so that the SDK uses the next router for navigation
  windowHandler: (oI: any) => {
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
