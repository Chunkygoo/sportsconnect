import useTranslation from "next-translate/useTranslation";
import Image from "next/legacy/image";
import { SignInAndUp } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

export default function Index() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto dark:bg-white">
      <div className="flex min-h-[100vh] justify-center">
        <div className="relative hidden bg-cover lg:block lg:w-[60%] xl:w-2/3">
          <Image
            src="/computer.jpg"
            className="pointer-events-none object-cover object-center"
            alt="Computer image"
            layout="fill"
            blurDataURL="/computer_blurred.png"
            placeholder="blur"
          />
          <div className="z-1 relative flex h-full items-center bg-gray-900 bg-opacity-40 px-20">
            <div>
              <h2 className="text-4xl font-bold text-white">SportsConnect</h2>
              <p className="mt-3 max-w-xl text-gray-300">
                {t("login:image_description")}
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-md items-center px-3 lg:w-[40%] xl:w-2/6">
          <div className="mx-auto text-center">
            <h2 className="text-center text-4xl font-bold text-gray-700">
              SportsConnect
            </h2>
            <SignInAndUp />
          </div>
        </div>
      </div>
    </div>
  );
}
