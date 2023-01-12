import useTranslation from "next-translate/useTranslation";
import Image from "next/legacy/image";
import Link from "next/link";

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-screen-2xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="mb-4 max-w-2xl text-4xl font-bold leading-none md:text-5xl md:font-extrabold xl:text-6xl">
            {t("home:card_0_text_0")}
          </h1>
          <p className="mb-6 max-w-2xl font-light text-gray-500 md:text-lg lg:mb-8 lg:text-xl">
            {t("home:card_0_text_1")}
          </p>
          <Link href="/universities">
            <span className="mr-3 inline-flex items-center justify-center rounded-lg bg-blue-700 px-2 py-3 text-center text-base font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:px-5">
              {t("home:card_0_text_2")}
            </span>
          </Link>
          <Link href="/steps">
            <span className="mt-4 inline-flex items-center justify-center rounded-lg border border-gray-300 px-2 py-3 text-center text-base font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 sm:px-4">
              {t("home:card_0_text_3")}
            </span>
          </Link>
        </div>
        <div className="mt-10 lg:col-span-5 lg:mt-0 lg:flex">
          <Image
            src={"/athlete.png"}
            className="rounded"
            alt="Athlete"
            width={800}
            height={500}
            blurDataURL={"/athlete_blurred.png"}
            placeholder="blur"
          />
        </div>
      </div>
    </section>
  );
}
