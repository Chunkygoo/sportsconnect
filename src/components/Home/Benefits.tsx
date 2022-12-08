import React from 'react';
import useTranslation from 'next-translate/useTranslation';

export default function Benefits() {
  const { t } = useTranslation();
  return (
    <span className="mx-auto p-6">
      <div className="bg-white py-8 px-4 mx-auto max-w-screen-2xl sm:py-16 lg:px-6">
        <div className="max-w-screen-md mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl font-bold md:font-extrabold text-gray-900">
            {t('home:card_4_text_0')}
          </h2>
          <p className="text-gray-500 sm:text-xl">{t('home:card_4_text_1')}</p>
        </div>
        <div className="container px-4 mx-auto">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-evenly gap-10">
              <div
                id="plan"
                className="rounded-lg text-center overflow-hidden w-full transform hover:shadow-2xl hover:scale-105 transition duration-200 ease-in"
              >
                <div
                  id="title"
                  className="w-full py-5 border-b border-gray-800"
                >
                  <h3 className="font-normal text-indigo-500 text-xl mt-2">
                    {t('home:card_4_text_2')}
                  </h3>
                </div>
                <div id="content" className="">
                  <div id="icon" className="my-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto fill-stroke text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-gray-500 text-sm pt-2">
                      {t('home:card_4_text_3')} 🥳
                    </p>
                  </div>
                  <div
                    id="contain"
                    className="leading-8 mb-10 text-lg font-light"
                  >
                    <ul>
                      <li>{t('home:card_4_text_4')}</li>
                      <li>{t('home:card_4_text_5')}</li>
                      <li>{t('home:card_4_text_6')}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                id="plan"
                className="rounded-lg text-center overflow-hidden w-full transform hover:shadow-2xl hover:scale-105 transition duration-200 ease-in"
              >
                <div
                  id="title"
                  className="w-full py-5 border-b border-gray-800"
                >
                  <h3 className="font-normal text-indigo-500 text-xl mt-2">
                    {t('home:card_4_text_7')}
                  </h3>
                </div>
                <div id="content" className="">
                  <div id="icon" className="my-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto fill-stroke text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                    <p className="text-gray-500 text-sm pt-2">
                      {t('home:card_4_text_8')} 🤩
                    </p>
                  </div>
                  <div
                    id="contain"
                    className="leading-8 mb-10 text-lg font-light"
                  >
                    <ul>
                      <li>{t('home:card_4_text_9')}</li>
                      <li>{t('home:card_4_text_10')}</li>
                      <li>{t('home:card_4_text_11')}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                id="plan"
                className="rounded-lg text-center overflow-hidden w-full transform hover:shadow-2xl hover:scale-105 transition duration-200 ease-in"
              >
                <div
                  id="title"
                  className="w-full py-5 border-b border-gray-800"
                >
                  <h3 className="font-normal text-indigo-500 text-xl mt-2">
                    {t('home:card_4_text_12')}
                  </h3>
                </div>
                <div id="content" className="">
                  <div id="icon" className="my-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto fill-stroke text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <p className="text-gray-500 text-sm pt-2">
                      {t('home:card_4_text_13')} 🚀
                    </p>
                  </div>
                  <div
                    id="contain"
                    className="leading-8 mb-10 text-lg font-light"
                  >
                    <ul>
                      <li>{t('home:card_4_text_14')}</li>
                      <li>{t('home:card_4_text_15')}</li>
                      <li>{t('home:card_4_text_16')}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                id="plan"
                className="rounded-lg text-center overflow-hidden w-full transform hover:shadow-2xl hover:scale-105 transition duration-200 ease-in"
              >
                <div
                  id="title"
                  className="w-full py-5 border-b border-gray-800"
                >
                  <h3 className="font-normal text-indigo-500 text-xl mt-2">
                    {t('home:card_4_text_17')}
                  </h3>
                </div>
                <div id="content" className="">
                  <div id="icon" className="my-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto fill-stroke text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-gray-500 text-sm pt-2">
                      {t('home:card_4_text_18')} 🥳
                    </p>
                  </div>
                  <div
                    id="contain"
                    className="leading-8 mb-10 text-lg font-light"
                  >
                    <ul>
                      <li>{t('home:card_4_text_19')}</li>
                      <li>{t('home:card_4_text_20')}</li>
                      <li>{t('home:card_4_text_21')}</li>
                      <li>{t('home:card_4_text_22')}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </span>
  );
}
