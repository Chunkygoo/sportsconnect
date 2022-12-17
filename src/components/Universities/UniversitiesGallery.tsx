import useTranslation from "next-translate/useTranslation";
import { Router } from "next/router";
import { useEffect, useRef, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import {
  cateGoryOptions,
  conferenceOptions,
  divisionOptions,
  regionOptions,
  stateOptions,
} from "../../data/universityFilters";
import type { allUnisType } from "../../types/GalleryItem";
import type { UniversitiesGallery } from "../../types/universitiesGallery";
import chunk from "../../utils/chunk";
import { trpc } from "../../utils/trpc";
import Spinner from "../Common/Spinner";
import GalleryItem from "../Gallery/GalleryItem";
import SelectDropdown from "./SelectDropdown";

export default function UniversitiesGallery({
  myInterested,
  publicUnis,
}: UniversitiesGallery) {
  const [searchNameOrCity, setSearchNameOrCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({
    value: "all",
    label: "All",
  });
  const [selectedDivision, setSelectedDivision] = useState({
    value: "all",
    label: "All",
  });
  const [selectedConference, setSelectedConference] = useState({
    value: "all",
    label: "All",
  });
  const [selectedState, setSelectedState] = useState({
    value: "all",
    label: "All",
  });
  const [selectedRegion, setSelectedRegion] = useState({
    value: "all",
    label: "All",
  });
  const toastId = useRef("");
  const { t } = useTranslation();
  const {
    data: publicUniData,
    hasNextPage: publicHasNextPage,
    fetchNextPage: publicFetchNextPage,
    isLoading: publicIsloading,
  } = trpc.university.getPublicUniversities.useInfiniteQuery(
    {
      search: searchNameOrCity,
      state: selectedState.value,
      conference: selectedConference.value,
      division: selectedDivision.value,
      category: selectedCategory.value,
      region: selectedRegion.value,
      limit: 12,
    },
    {
      onSuccess(data) {
        setAllUnis(data.pages.flatMap((page) => page.unis));
      },
      enabled: publicUnis && !myInterested,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );
  const {
    data: myUniData,
    hasNextPage: myHasNextPage,
    fetchNextPage: myFetchNextPage,
    isLoading: myIsloading,
  } = trpc.university.getMyUniversities.useInfiniteQuery(
    {
      search: searchNameOrCity,
      state: selectedState.value,
      conference: selectedConference.value,
      division: selectedDivision.value,
      category: selectedCategory.value,
      region: selectedRegion.value,
      limit: 12,
    },
    {
      onSuccess(data) {
        setAllUnis(data.pages.flatMap((page) => page.unis));
      },
      enabled: !publicUnis && !myInterested,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );
  const {
    data: myInterestedUniData,
    hasNextPage: myInterestedHasNextPage,
    fetchNextPage: myInterestedFetchNextPage,
    isLoading: myInterestedIsloading,
  } = trpc.university.getMyInterestedUniversities.useInfiniteQuery(
    {
      search: searchNameOrCity,
      state: selectedState.value,
      conference: selectedConference.value,
      division: selectedDivision.value,
      category: selectedCategory.value,
      region: selectedRegion.value,
      limit: 12,
    },
    {
      onSuccess(data) {
        setAllUnis(data.pages.flatMap((page) => page.unis));
      },
      enabled: !publicUnis && myInterested,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const data =
    publicUnis && !myInterested
      ? publicUniData
      : !publicUnis && !myInterested
      ? myUniData
      : myInterestedUniData;

  const hasNextPage =
    publicUnis && !myInterested
      ? publicHasNextPage
      : !publicUnis && !myInterested
      ? myHasNextPage
      : myInterestedHasNextPage;

  const fetchNextPage =
    publicUnis && !myInterested
      ? publicFetchNextPage
      : !publicUnis && !myInterested
      ? myFetchNextPage
      : myInterestedFetchNextPage;

  const isLoading =
    publicUnis && !myInterested
      ? publicIsloading
      : !publicUnis && !myInterested
      ? myIsloading
      : myInterestedIsloading;

  const [allUnis, setAllUnis] = useState<allUnisType[]>(
    data?.pages.flatMap((page) => page.unis) || []
  );
  const searchedUnis = transformUnis(allUnis);

  const notify = () =>
    (toastId.current = String(
      toast(
        <span
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          Click me to go back to the top ⬆️⬆️⬆️
        </span>,
        {
          autoClose: false,
          closeButton: false,
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      )
    ));

  Router.events.on("routeChangeStart", () => {
    toast.dismiss(toastId.current);
  });

  useEffect(() => {
    const toggleScrollToTop = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 300 && !toastId.current) {
        notify();
      } else if (scrolled <= 300) {
        toast.dismiss(toastId.current);
        toastId.current = "";
      }
    };

    window.addEventListener("scroll", toggleScrollToTop, { passive: true });

    return () => {
      window.removeEventListener("scroll", toggleScrollToTop);
    };
  }, []);

  function transformUnis(unis: typeof allUnis) {
    return unis.map((uni) => {
      const uniObj = {
        ...uni,
        backgroundImage: `/backgrounds/${uni.name}.jpg`,
        blurredBackgroundImage: `/blurredBackgrounds/${uni.name}.jpg`,
        logo: `/logos/${uni.name}.png`,
        blurredLogo: `/blurredLogos/${uni.name}.png`,
      };
      const uniCategory =
        uni.category === "Men"
          ? t("universities:men")
          : t("universities:women");
      uniObj.name = "(" + uniCategory + ") " + uni.name;
      return uniObj;
    });
  }

  return (
    <div className="min-h-[80vw]">
      <div className="ml-4 mb-4 mt-4 flex text-xs md:text-base">
        <span className="my-auto">
          <div className={"my-auto"}>{t("universities:search")}:</div>
          <DebounceInput
            debounceTimeout={1000}
            type="text"
            placeholder={
              t("universities:search") +
              " " +
              t("universities:uni_or_city_name") +
              " ..."
            }
            value={searchNameOrCity || ""}
            className="max-w-xl rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 md:text-base xl:ml-0"
            onChange={(e) => setSearchNameOrCity(e.target.value)}
          />
        </span>
        <span className="my-auto w-full md:w-1/3">
          <SelectDropdown
            selected={selectedCategory}
            setSelected={setSelectedCategory}
            options={cateGoryOptions}
            label={t("universities:category")}
            className="z-[12] ml-4 mr-4"
            titleClassName="ml-4"
          />
        </span>
        <span className="my-auto hidden w-1/3 md:block">
          <SelectDropdown
            selected={selectedDivision}
            setSelected={setSelectedDivision}
            options={divisionOptions}
            label={t("universities:division")}
            className="z-[12]"
          />
        </span>
        <span className="my-auto mr-4 hidden w-2/3 md:block">
          <SelectDropdown
            selected={selectedConference}
            setSelected={setSelectedConference}
            options={conferenceOptions}
            label={t("universities:conference")}
            className="z-[12] ml-4"
            titleClassName="ml-4"
          />
        </span>
      </div>
      <div className="mb-4 flex text-xs md:text-base">
        <span className="ml-4 w-1/3">
          <SelectDropdown
            selected={selectedState}
            setSelected={setSelectedState}
            options={stateOptions}
            label={t("universities:state")}
            className="z-[11]"
          />
        </span>
        <span className="mr-4 w-2/3">
          <SelectDropdown
            selected={selectedRegion}
            setSelected={setSelectedRegion}
            options={regionOptions}
            label={t("universities:region")}
            className="z-[11] ml-4"
            titleClassName="ml-4"
          />
        </span>
      </div>
      <div className="mb-4 flex text-xs md:hidden md:text-base">
        <span className="ml-4 w-1/3">
          <SelectDropdown
            selected={selectedDivision}
            setSelected={setSelectedDivision}
            options={divisionOptions}
            label={t("universities:division")}
            className="z-[10]"
          />
        </span>
        <span className="mr-4 w-2/3">
          <SelectDropdown
            selected={selectedConference}
            setSelected={setSelectedConference}
            options={conferenceOptions}
            label={t("universities:conference")}
            className="z-[10] ml-4"
            titleClassName="ml-4"
          />
        </span>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <InfiniteScroll
          className="infinite-scroll-hide"
          dataLength={allUnis.length}
          next={fetchNextPage}
          hasMore={hasNextPage || false}
          endMessage={
            <span className="flex justify-center">
              <p className="max-auto p-4 text-slate-500">
                No more universities
              </p>
            </span>
          }
          loader={<Spinner />}
        >
          {chunk(searchedUnis, 3).map((uniChunk) => (
            <section
              key={uniChunk[0]?.id}
              className="overflow-hidden text-gray-700 "
            >
              <div className="mx-auto px-5 py-2 xl:px-3">
                <div className="m-1 flex flex-wrap">
                  {uniChunk.map((uniChunkBit) => {
                    return (
                      uniChunkBit && (
                        <GalleryItem
                          key={uniChunkBit.id}
                          datum={uniChunkBit}
                          setAllUnis={setAllUnis}
                          myInterested={myInterested}
                        />
                      )
                    );
                  })}
                </div>
              </div>
            </section>
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
}
