import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { v4 as uuidv4 } from "uuid";
import type { educationReadType } from "../../types/education";
import { trpc } from "../../utils/trpc";
import Template from "./Template";

export default function Educations({ isDisabled = true }) {
  const { t } = useTranslation();
  const router = useRouter();
  const utils = trpc.useContext();

  const { mutate: createEducation } =
    trpc.education.createEducation.useMutation({
      async onMutate() {
        if (Object.keys(data).length >= 5) {
          swal(
            "Optimize your portfolio",
            "Please only include the 5 most recent items for a good reading experience. Pick the ones you are proud of!"
          );
          return;
        }
        await utils.education.getEducations.cancel();
        const previousData = utils.education.getEducations.getData();
        const tempkey = "tempKey" + uuidv4();
        setData((prevData) => {
          const newData = { ...prevData };
          (newData as Record<string, educationReadType>)[tempkey] = {
            id: tempkey,
            description: "",
            active: false,
            startDate: null,
            endDate: null,
          };
          return newData;
        });
        return { tempkey, previousData };
      },
      onSuccess(id, _, context) {
        if (id && context?.tempkey) {
          setData((prevData) => {
            const newData = { ...prevData };
            delete (newData as Record<string, educationReadType>)[
              context?.tempkey
            ];
            (newData as Record<string, educationReadType>)[id] = {
              id: id,
              description: "",
              active: false,
              startDate: null,
              endDate: null,
            };
            return newData;
          });
        }
      },
      onError(_, __, context) {
        utils.education.getEducations.setData(undefined, context?.previousData);
        toast.error("An error occured while creating", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
      onSettled() {
        utils.education.getEducations.invalidate();
      },
    });
  const { data: educations, isLoading: isGetEducationLoading } =
    trpc.education.getEducations.useQuery(undefined, {
      onSuccess(educations) {
        setData(educations.reduce((a, v) => ({ ...a, [v.id]: v }), {}));
      },
      onError() {
        toast.error("An error occured while getting your data", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
      enabled: !isDisabled,
    });
  const { data: educationsForUser, isLoading: isGetEducationForUserLoading } =
    trpc.education.getEducationsForUser.useQuery(
      {
        id: router.query.id as string,
      },
      {
        onSuccess(educations) {
          setData(educations.reduce((a, v) => ({ ...a, [v.id]: v }), {}));
        },
        onError() {
          toast.error("An error occured while getting your data", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        },
        enabled: isDisabled,
      }
    );
  const { mutate: updateEducation } =
    trpc.education.updateEducation.useMutation({
      async onMutate(newItemData) {
        await utils.education.getEducations.cancel();
        const previousData = utils.education.getEducations.getData();
        setData((prevData) => {
          const newData = { ...prevData };
          newItemData.startDate = newItemData.startDate;
          newItemData.endDate = newItemData.endDate;
          (newData as Record<string, educationReadType>)[newItemData.id] =
            newItemData;
          return newData;
        });
        return { previousData };
      },
      onError(_, __, context) {
        utils.education.getEducations.setData(undefined, context?.previousData);
        toast.error("An error occured while updating your data", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
      onSettled() {
        utils.education.getEducations.invalidate();
      },
    });
  const { mutate: deleteEducation } =
    trpc.education.deleteEducation.useMutation({
      async onMutate({ id }) {
        await utils.education.getEducations.cancel();
        const previousData = utils.education.getEducations.getData();
        setData((prevData) => {
          const newData = { ...prevData };
          delete (newData as Record<string, educationReadType>)[id];
          return newData;
        });
        return { previousData };
      },
      onError(_, __, context) {
        utils.education.getEducations.setData(undefined, context?.previousData);
        toast.error("An error occured while deleting your data", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
      onSettled() {
        utils.education.getEducations.invalidate();
      },
    });

  const [data, setData] = useState(
    educations?.reduce((a, v) => ({ ...a, [v.id]: v }), {}) ||
      educationsForUser?.reduce((a, v) => ({ ...a, [v.id]: v }), {}) ||
      {}
  ); // use object instead of array to easily get the data

  if (
    (!isDisabled && isGetEducationLoading) ||
    (isDisabled && isGetEducationForUserLoading)
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
      title={t("portfolio:educations")}
      isDisabled={isDisabled}
      data={data}
      createItem={createEducation}
      updateItem={updateEducation}
      deleteItem={deleteEducation}
    />
  );
}
