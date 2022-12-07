import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import React from 'react';

export default function Description() {
  const { t } = useTranslation();
  return (
    <section className="bg-white p-6">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-2xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg">
          <h2 className="mb-4 text-4xl font-bold md:font-extrabold text-gray-900">
            {t('home:card_2_text_0')}
          </h2>
          <p className="mb-4">{t('home:card_2_text_1')} 😇</p>
          <p>{t('home:card_2_text_2')} 😊</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="w-full h-full">
            {/* <img
              className="rounded-lg"
              src="/tennis0.png"
              alt="Tennis photo"
              width="550"
              height="700"
            /> */}
            {/* <Image
              className="rounded-lg"
              src={'/tennis.png'}
              alt="Tennis photo"
              width={550}
              height={700}
            /> */}
            <Image
              src={'/tennis.png'}
              className="rounded-lg"
              alt="Tennis photo"
              width={550}
              height={700}
              blurDataURL={'/tennis_blurred.png'}
              placeholder="blur"
            />
          </div>
          <div className="w-full lg:mt-10 xl:mt-10 2xl:mt-10">
            {/* <img
              className="rounded-lg"
              src="/tennis1.png"
              alt="Tennis photo"
              width="550"
              height="700"
            /> */}
            {/* <Image
              className="rounded-lg"
              src={'/swimming.jpg'}
              alt="Tennis photo"
              width={550}
              height={700}
            /> */}
            <Image
              src={'/swimming.jpg'}
              className="rounded-lg"
              alt="Swimming photo"
              width={550}
              height={700}
              blurDataURL={'/swimming_blurred.png'}
              placeholder="blur"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
