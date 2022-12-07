import { useQuery, useQueryClient } from "@tanstack/react-query";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useRef, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import Session from "supertokens-auth-react/recipe/session";
import {
  getInterestedUniversities,
  getPublicUniversities,
  getUniversities,
} from "../../network/lib/universities";
import chunk from "../../utilities/chunk";
import GalleryRow from "../Gallery/GalleryRow";
import Spinner from "../Spinner";
import {
  cateGoryOptions,
  conferenceOptions,
  divisionOptions,
  regionOptions,
  stateOptions,
} from "./data";
import SelectDropdown from "./SelectDropdown";

export default function UniversitiesGallery({ _res }) {
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(cateGoryOptions[0]);
  const [selectedConference, setSelectedConference] = useState(
    conferenceOptions[0]
  );
  const [selectedState, setSelectedState] = useState(stateOptions[0]);
  const [selectedRegion, setSelectedRegion] = useState(regionOptions[0]);
  const [selectedDivision, setSelectedDivision] = useState(divisionOptions[0]);
  const [searchNameOrCity, setSearchNameOrCity] = useState("");

  const toastId = useRef(null);

  const { t } = useTranslation();
  const queryClient = useQueryClient();

  var mine = !_res; // needs to be var to avoid scope errors

  const searchTerm = JSON.stringify({
    searchNameOrCity: searchNameOrCity,
    selectedState: selectedState.value,
    selectedConference: selectedConference.value,
    selectedDivision: selectedDivision.value,
    selectedRegion: selectedRegion.value,
    selectedCategory: selectedCategory.value,
  });

  // const resetLength =
  //   queryClient.getQueryData([reactQueryKeys.universities, mine, searchTerm])
  //     ?.data.length || 9;
  const getUnisFunction = async (limit, skip, search = "", signal) => {
    if (!(await Session.doesSessionExist())) {
      return await getPublicUniversities(limit, signal, skip, search);
    }
    const getUnis = mine ? getInterestedUniversities : getUniversities;
    return await getUnis(limit, signal, skip, search);
  };

  const getRequestLength = () => {
    const currentCacheLength = queryClient.getQueryData([
      reactQueryKeys.universities,
      mine,
      searchTerm,
    ])?.data.length;
    if (currentCacheLength && currentCacheLength >= 9) {
      return currentCacheLength;
    }
    return 9;
  };

  const { data: uniData, isLoading: loading } = useQuery(
    [reactQueryKeys.universities, mine, searchTerm],
    ({ signal }) => {
      // we cannot use resetLength here because it captures the length at render, not in real/current time
      // whereas how we do it below, we compute the values when the function "getRequestLength" is invoked, so we get the most
      // up to date values.
      return getUnisFunction(getRequestLength(), 0, searchTerm, signal);
    },
    {
      onSuccess: async ({ data, status }) => {
        if (status === 200) {
          setAllUnis(data);
          if (data.length === 0) {
            setHasMore(false);
          } else {
            await fetchMoreData();
          }
        } else {
          router.push("/error");
        }
      },
      onError: async () => {
        toast.error("An error occured while retrieving universities", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setHasMore(false);
      },
    }
  );
  const [allUnis, setAllUnis] = useState(_res?.data || uniData?.data || []);
  const searchedUnis = transformUnis(allUnis);

  // optimistic retrieve - if data in cache, use it. The reason we can't use useQuery to do this for us is because
  // searchTerm in [reactQueryKeys.universities, mine, searchTerm] changes
  useEffect(() => {
    const cachedData = queryClient.getQueryData([
      reactQueryKeys.universities,
      mine,
      searchTerm,
    ])?.data;
    if (cachedData) {
      setAllUnis(cachedData);
      setHasMore(true);
    }
  }, [mine, queryClient, searchTerm]);
  // end optimistic retrieve

  const notify = () =>
    (toastId.current = toast("Click me to go back to the top ⬆️⬆️⬆️", {
      autoClose: false,
      closeButton: false,
      position: toast.POSITION.BOTTOM_RIGHT,
      onClose: () =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        }),
    }));

  useEffect(() => {
    const toggleScrollToTop = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 300 && !toastId.current) {
        notify();
      } else if (scrolled <= 300) {
        toastId.current = null;
        toast.dismiss(toastId.current);
      }
    };

    window.addEventListener("scroll", toggleScrollToTop, { passive: true });

    return () => {
      window.removeEventListener("scroll", toggleScrollToTop);
    };
  }, []);

  const fetchMoreData = async () => {
    try {
      let res = await getUnisFunction(
        9,
        queryClient.getQueryData([
          reactQueryKeys.universities,
          mine,
          searchTerm,
        ])?.data.length || 9,
        searchTerm
      );
      // unlike the intial fetch, we want to check if there is more data to be fetched. So check < 9, not === 0
      if (res?.data.length < 9) {
        setHasMore(false);
      }
      setAllUnis((prevUnis) => {
        const newAllUnis = [].concat(prevUnis, res.data);
        queryClient.setQueryData(
          [reactQueryKeys.universities, mine, searchTerm],
          (oldQueryObj) => {
            const newQueryObj = { ...oldQueryObj };
            newQueryObj.data = newAllUnis;
            return newQueryObj;
          }
        );
        return newAllUnis;
      });
    } catch (error) {
      toast.error("An error occured while retrieving more universities", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  function transformUnis(unis) {
    return unis.map((uni, index) => {
      let uniObj = {
        ...uni,
        index: index,
        backgroundImage: `/backgrounds/${uni.name}.jpg`,
        blurredBackgroundImage: `/blurredBackgrounds/${uni.name}.jpg`,
        logo: `/logos/${uni.name}.png`,
        blurredLogo: `/blurredLogos/${uni.name}.png`,
      };
      let uniCategory = "";
      if (uni.category === "Men") {
        uniCategory = t("universities:men");
      } else {
        uniCategory = t("universities:women");
      }
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
      {loading ? (
        <Spinner />
      ) : (
        <InfiniteScroll
          className="infinite-scroll-hide"
          dataLength={allUnis.length}
          next={fetchMoreData}
          hasMore={hasMore}
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
            <GalleryRow
              key={uniChunk[0].id}
              dataChunk={uniChunk}
              setAllUnis={setAllUnis}
              mine={mine}
              searchTerm={searchTerm}
            />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
}