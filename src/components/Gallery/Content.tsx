import useTranslation from "next-translate/useTranslation";
import Image from "next/legacy/image";
import type { contentType } from "../../types/content";
import CheckBox from "../Universities/CheckBox";
import IconCross from "./../Icons/IconCross";

const Content = ({ uni, myInterested, onClose, setAllUnis }: contentType) => {
  const { t } = useTranslation();
  return (
    <>
      <div>
        <div className="absolute top-0 bottom-0 left-0 z-[2] w-[30%] rounded-l-xl bg-slate-900 from-slate-900 to-transparent before:absolute before:top-0 before:bottom-0 before:left-full before:z-10 before:w-60 before:bg-gradient-to-r" />
        <div className="absolute top-0 bottom-0 right-0 z-[1] w-[70%] rounded-r-xl bg-repeat-round">
          <Image
            src={uni.backgroundImage}
            className="rounded-r-xl bg-repeat-round"
            alt="University image"
            layout="fill"
            blurDataURL={uni.blurredBackgroundImage}
            placeholder="blur"
          />
        </div>
        <span className="absolute bottom-0 right-0 z-[2] m-4 h-12 w-12 sm:left-0 sm:h-24 sm:w-24">
          <Image
            src={uni.logo}
            alt="University logo"
            layout="fill"
            blurDataURL={uni.blurredLogo}
            placeholder="blur"
          />
        </span>
      </div>
      <div className="absolute top-0 bottom-0 left-0 right-0 z-[3] h-full text-sm md:text-lg">
        <div className="w-[70%] px-4 py-4 text-[#f5deb3] lg:py-10">
          <a href={uni.link} target="_blank" rel="noreferrer">
            <div className="mb-6 flex text-[#fff] hover:text-blue-500">
              <h1 className="font-bold ">
                {uni.name.substring(uni.name.indexOf(")") + 2)}
              </h1>
              <svg
                className="my-auto ml-1 h-4 w-4 md:h-6 md:w-6"
                data-darkreader-inline-stroke=""
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                ></path>
              </svg>
            </div>
          </a>
          <div className="mt-2 max-w-xs font-[18px] text-[#d4d3d3] sm:max-w-sm md:max-w-md">
            <span className="text-white">{t("universities:category")}:</span>{" "}
            {uni.category}
          </div>
          <div className="mt-2 max-w-xs font-[18px] text-[#d4d3d3] sm:max-w-sm md:max-w-md">
            <span className="text-white">{t("universities:conference")}:</span>{" "}
            {uni.conference}
          </div>
          <div className="mt-2 max-w-xs font-[18px] text-[#d4d3d3] sm:max-w-sm md:max-w-md">
            <span className="text-white">{t("universities:division")}:</span>{" "}
            {uni.division}
          </div>
          <div className="mt-2 max-w-xs font-[18px] text-[#d4d3d3] sm:max-w-sm md:max-w-md">
            <span className="mr-2 text-white">{t("universities:city")}:</span>
            {uni.city}
          </div>
          <div className="mt-2 max-w-xs font-[18px] text-[#d4d3d3] sm:max-w-sm md:max-w-md">
            <span className="mr-2 text-white">{t("universities:state")}:</span>
            {uni.state}
          </div>
          <div className="mt-4 max-w-xs font-[18px] text-[#d4d3d3] sm:max-w-sm md:max-w-md">
            <CheckBox
              interested={uni.interested}
              uniId={uni.id}
              setAllUnis={setAllUnis}
              myInterested={myInterested}
              onClose={onClose}
            />
          </div>
        </div>
        <span
          className="absolute top-2 right-2 h-6 w-4 border-none bg-transparent text-gray-200 outline-none md:top-4 md:right-4 md:h-8 md:w-6"
          onClick={onClose}
        >
          <IconCross />
        </span>
      </div>
    </>
  );
};

export default Content;
