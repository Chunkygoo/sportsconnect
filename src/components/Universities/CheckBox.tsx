import { useMutation, useQueryClient } from "@tanstack/react-query";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import type { checkBoxType } from "../../types/checkBox";
// import { reactQueryKeys } from "../../config/reactQueryKeys";
// import {
//   expressInterestInUni,
//   removeInterestInUni,
// } from "../../network/lib/users";

export default function CheckBox({
  interested,
  uniId,
  setAllUnis,
  mine,
  onClose,
}: checkBoxType) {
  const session = useSessionContext();
  const router = useRouter();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  // Use toggleInterestInUni
  const alterInterestMutationFunction = interested
    ? async (id) => {
        return await removeInterestInUni(id);
      }
    : async (id) => {
        return await expressInterestInUni(id);
      };
  const { mutate: updateInterestInUni } = useMutation(
    (_uniId) => alterInterestMutationFunction(_uniId),
    {
      onMutate: async (_uniId) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries([
          reactQueryKeys.universities,
          mine,
          searchTerm,
        ]);
        const previousUniData = queryClient.getQueryData([
          reactQueryKeys.universities,
          mine,
          searchTerm,
        ]);
        // Optimistic update
        setAllUnis((prevAllUnis) => {
          const newAllUnis = [...prevAllUnis];
          const modifiedUniIndex = prevAllUnis.findIndex(
            (uni) => uni.id === _uniId
          );
          newAllUnis[modifiedUniIndex] = {
            ...newAllUnis[modifiedUniIndex],
            interested: !interested,
          };
          if (mine && interested) {
            newAllUnis.splice(modifiedUniIndex, 1); // remove from myuniversities
          }
          return newAllUnis;
        });
        return { previousUniData };
      },
      onError: (_, __, context) => {
        queryClient.setQueryData(
          [reactQueryKeys.universities, mine, searchTerm],
          context.previousUniData
        );
        toast.error("An error occured while updating your data", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
      onSettled: () => {
        queryClient.invalidateQueries([
          reactQueryKeys.universities,
          mine,
          searchTerm,
        ]);
      },
    }
  );

  return (
    <span
      className={
        "rounded p-1 " +
        (interested
          ? "bg-red-500 text-red-100 hover:bg-red-600 hover:text-red-200"
          : "bg-blue-500 text-blue-100 hover:bg-blue-600 hover:text-blue-200")
      }
      onClick={() => {
        if (!session.loading && session.doesSessionExist) {
          onClose();
          updateInterestInUni(uniId);
        } else {
          router.push("/auth/loginsignup");
        }
      }}
    >
      <span className="mr-2 pl-2 text-white">
        {interested
          ? t("universities:remove_from_interested")
          : t("universities:add_to_interested")}
      </span>
    </span>
  );
}
