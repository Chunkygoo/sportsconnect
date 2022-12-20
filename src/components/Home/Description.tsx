import useTranslation from "next-translate/useTranslation";
import Image from "next/legacy/image";

export default function Description() {
  const { t } = useTranslation();
  return (
    <section className="bg-white p-6">
      <div className="mx-auto max-w-screen-2xl items-center gap-16 py-8 px-4 lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:font-extrabold">
            {t("home:card_2_text_0")}
          </h2>
          <p className="mb-4">{t("home:card_2_text_1")} 😇</p>
          <p>{t("home:card_2_text_2")} 😊</p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="h-full w-full">
            <Image
              src={"/tennis.png"}
              className="rounded-lg"
              alt="Tennis photo"
              width={550}
              height={700}
              blurDataURL={"/tennis_blurred.png"}
              placeholder="blur"
            />
          </div>
          <div className="w-full lg:mt-10 xl:mt-10 2xl:mt-10">
            <Image
              src={"/swimming.jpg"}
              className="rounded-lg"
              alt="Swimming photo"
              width={550}
              height={700}
              blurDataURL={"/swimming_blurred.png"}
              placeholder="blur"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
