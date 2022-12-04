import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import swal from "sweetalert";
import type { educationReadType } from "../../types/education";
import type { experienceReadType } from "../../types/experience";
import { trpc } from "../../utils/trpc";
import Template from "./Template";

export default function Experiences({ isDisabled = true }) {
  const { t } = useTranslation();
  const router = useRouter();
  const utils = trpc.useContext();

  const { mutate: createExperience, isLoading: isCreateLoading } =
    trpc.experience.createExperience.useMutation({
      onMutate() {
        if (Object.keys(data).length >= 5) {
          swal(
            "Optimize your portfolio",
            "Please only include the 5 most recent items for a good reading experience. Pick the ones you are proud of!"
          );
          return;
        }
        const lastKey =
          Object.keys(data)[Object.keys(data).length - 1] || "Infinity";
        const tempTimeStamp = new Date(Date.now());
        setData((prevData) => {
          const newData = { ...prevData };
          if (lastKey) {
            (newData as Record<number, educationReadType | experienceReadType>)[
              parseInt(lastKey) + 1
            ] = {
              id: parseInt(lastKey) + 1,
              description: "",
              active: false,
              startDate: tempTimeStamp,
              endDate: null,
            };
          } else {
            (
              newData as Record<number, educationReadType | experienceReadType>
            )[1] = {
              id: parseInt(lastKey) + 1,
              description: "",
              active: false,
              startDate: tempTimeStamp,
              endDate: null,
            };
          }
          return newData;
        });
        return { tempTimeStamp };
      },
      onSuccess(id, _, context) {
        if (id) {
          setData((prevData) => {
            const newData = { ...prevData };
            for (const [key, value] of Object.entries(newData)) {
              if (
                (value as educationReadType | experienceReadType).startDate ===
                context?.tempTimeStamp
              ) {
                delete (
                  newData as Record<
                    number,
                    educationReadType | experienceReadType
                  >
                )[parseInt(key)];
                (
                  newData as Record<
                    number,
                    educationReadType | experienceReadType
                  >
                )[id] = {
                  id: id,
                  description: "",
                  active: false,
                  startDate: null,
                  endDate: null,
                };
                break;
              }
            }
            return newData;
          });
        }
      },
      onError() {
        toast.error("An error occured while creating", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
      onSettled() {
        utils.experience.getExperiences.invalidate();
      },
    });
  const {
    data: { experiences: experiences } = {},
    isLoading: isGetExperienceLoading,
  } = trpc.experience.getExperiences.useQuery(undefined, {
    onSuccess({ experiences }) {
      setData(experiences.reduce((a, v) => ({ ...a, [v.id]: v }), {}));
    },
    onError() {
      toast.error("An error occured while getting your data", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    enabled: !isDisabled,
  });
  const {
    data: { experiences: experiencesForUser } = {},
    isLoading: isGetExperienceForUserLoading,
  } = trpc.experience.getExperiencesForUser.useQuery(
    {
      id: router.query.id as string,
    },
    {
      onSuccess({ experiences }) {
        setData(experiences.reduce((a, v) => ({ ...a, [v.id]: v }), {}));
      },
      onError() {
        toast.error("An error occured while getting your data", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
      enabled: isDisabled,
    }
  );
  const { mutate: updateExperience } =
    trpc.experience.updateExperience.useMutation({
      async onMutate(newItemData) {
        await utils.experience.getExperiences.cancel();
        const previousData = utils.experience.getExperiences.getData();
        setData((prevData) => {
          const newData = { ...prevData };
          newItemData.startDate = newItemData.startDate;
          newItemData.endDate = newItemData.endDate;
          (newData as Record<number, educationReadType | experienceReadType>)[
            newItemData.id
          ] = newItemData;
          return newData;
        });
        return { previousData };
      },
      onError(_, __, context) {
        utils.experience.getExperiences.setData(
          undefined,
          context?.previousData
        );
        toast.error("An error occured while updating your data", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
      onSettled() {
        utils.experience.getExperiences.invalidate();
      },
    });
  const { mutate: deleteExperience } =
    trpc.experience.deleteExperience.useMutation({
      async onMutate({ id }) {
        await utils.experience.getExperiences.cancel();
        const previousData = utils.experience.getExperiences.getData();
        setData((prevData) => {
          const newData = { ...prevData };
          delete (
            newData as Record<number, educationReadType | experienceReadType>
          )[id];
          return newData;
        });
        return { previousData };
      },
      onError(_, __, context) {
        utils.experience.getExperiences.setData(
          undefined,
          context?.previousData
        );
        toast.error("An error occured while deleting your data", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
      onSettled() {
        utils.experience.getExperiences.invalidate();
      },
    });

  const [data, setData] = useState(
    experiences?.reduce((a, v) => ({ ...a, [v.id]: v }), {}) ||
      experiencesForUser?.reduce((a, v) => ({ ...a, [v.id]: v }), {}) ||
      {}
  ); // use object instead of array to prevent random ordering

  if (
    (!isDisabled && isGetExperienceLoading) ||
    (isDisabled && isGetExperienceForUserLoading)
  ) {
    return (
      <div role="status" className="max-w-[100%] animate-pulse text-blue-600">
        <div className="mb-4">
          <div className="mb-1 mt-0 h-2.5 w-[95%] appearance-none rounded-full border-0 border-b-2 border-gray-200 bg-gray-200 px-0 pt-2 focus:border-black focus:outline-none focus:ring-0 dark:bg-gray-700"></div>
          <div className="mt-0 h-2.5 w-[90%] appearance-none rounded-full border-0 border-b-2 border-gray-200 bg-gray-200 px-0 pt-2 focus:border-black focus:outline-none focus:ring-0 dark:bg-gray-700"></div>
        </div>
        <div className="mb-4">
          <div className="mb-1 mt-0 h-2.5 w-[97%] appearance-none rounded-full border-0 border-b-2 border-gray-200 bg-gray-200 px-0 pt-2 focus:border-black focus:outline-none focus:ring-0 dark:bg-gray-700"></div>
          <div className="mt-0 h-2.5 w-[80%] appearance-none rounded-full border-0 border-b-2 border-gray-200 bg-gray-200 px-0 pt-2 focus:border-black focus:outline-none focus:ring-0 dark:bg-gray-700"></div>
        </div>
        <div className="mb-4">
          <div className="mb-1 mt-0 h-2.5 w-[80%] appearance-none rounded-full border-0 border-b-2 border-gray-200 bg-gray-200 px-0 pt-2 focus:border-black focus:outline-none focus:ring-0 dark:bg-gray-700"></div>
          <div className="mt-0 h-2.5 w-[85%] appearance-none rounded-full border-0 border-b-2 border-gray-200 bg-gray-200 px-0 pt-2 focus:border-black focus:outline-none focus:ring-0 dark:bg-gray-700"></div>
        </div>
      </div>
    );
  }
  return (
    <Template
      endpoint={"/experiences"}
      title={t("portfolio:experience")}
      isDisabled={isDisabled}
      data={data}
      createItem={createExperience}
      updateItem={updateExperience}
      deleteItem={deleteExperience}
    />
  );
}