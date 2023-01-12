import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { trpc } from "../../utils/trpc";
import validateEmail from "../../utils/validateEmail";

export default function ContactUs() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState("");
  const router = useRouter();
  const { mutateAsync: sendEmail } = trpc.email.sendEmail.useMutation({
    onSuccess() {
      router.push("/home");
      toast.success(t("contactus:email_sent") as string, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    onError() {
      toast.error("An error occured while sending your email", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
  });

  const sendEmailAndRedirect = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      sendEmail({ name: name, email: email, message: message });
    } catch (error) {
      toast.error("An error occured while sending your email", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  return (
    <div className="m-6 flex h-[65vh] items-center justify-start bg-white">
      <div className="mx-auto w-full max-w-lg">
        <h1 className="text-4xl font-medium">{t("contactus:contact_us")}</h1>
        <p className="mt-3">{t("contactus:description")}</p>

        <form className="mt-10">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="relative z-0">
              <input
                aria-label="name"
                type="text"
                name="name"
                className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=""
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                {t("contactus:your_name")}
              </label>
            </div>
            <div className="relative z-0">
              <input
                aria-label="email"
                type="email"
                name="email"
                id="email"
                className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=""
                value={email}
                onChange={(e) => {
                  setErrors("");
                  setEmail(e.target.value);
                  if (!validateEmail(e.target.value)) {
                    setErrors("Email is invalid");
                  }
                }}
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                {t("contactus:your_email")}
              </label>
            </div>
            <div className="relative z-0 col-span-2">
              <textarea
                aria-label="message"
                name="message"
                rows={5}
                className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=""
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                {t("contactus:your_message")}
              </label>
            </div>
          </div>
          {errors && (
            <div className="text mt-2 justify-center text-red-500">
              {errors}
            </div>
          )}
          <button
            type="submit"
            className={
              "mt-5 rounded-md px-10 py-2 text-white" +
              (errors !== "" ? " bg-gray-500" : " bg-black")
            }
            onClick={sendEmailAndRedirect}
            disabled={errors !== ""}
          >
            {t("contactus:send_message")}
          </button>
        </form>
      </div>
    </div>
  );
}
