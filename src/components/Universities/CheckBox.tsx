import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import type { checkBoxType } from "../../types/checkBox";
import { trpc } from "../../utils/trpc";

export default function CheckBox({
  interested,
  uniId,
  setAllUnis,
  myInterested,
  onClose,
}: checkBoxType) {
  const session = useSessionContext();
  const router = useRouter();
  const { t } = useTranslation();
  const utils = trpc.useContext();

  const { mutate: toggleInterestInUni } =
    trpc.university.toggleInterestInUni.useMutation({
      async onMutate({ uniId: _uniId, interested: _interested }) {
        let previousUniData;
        if (myInterested) {
          await utils.university.getMyInterestedUniversities.cancel();
          previousUniData =
            utils.university.getMyInterestedUniversities.getInfiniteData();
        } else {
          await utils.university.getMyUniversities.cancel();
          previousUniData =
            utils.university.getMyUniversities.getInfiniteData();
        }
        setAllUnis((prevAllUnis) => {
          let modifiedUniIndex = -1;
          let newAllUnis = [...prevAllUnis];
          newAllUnis = newAllUnis.map((uni, index) => {
            if (uni.id === _uniId) {
              modifiedUniIndex = index;
              return {
                ...uni,
                interested: !_interested,
              };
            }
            return uni;
          });
          if (myInterested && _interested && modifiedUniIndex !== -1) {
            newAllUnis.splice(modifiedUniIndex, 1); // remove from myuniversities
          }
          return newAllUnis;
        });
        return { previousUniData };
      },
      onError(_, __, context) {
        if (myInterested) {
          utils.university.getMyInterestedUniversities.setInfiniteData(
            {},
            context?.previousUniData
          );
        } else {
          utils.university.getMyUniversities.setInfiniteData(
            {},
            context?.previousUniData
          );
        }
        toast.error("An error occured while updating your data", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
      onSettled() {
        if (myInterested) {
          utils.university.getMyInterestedUniversities.invalidate();
        } else {
          utils.university.getMyUniversities.invalidate();
        }
      },
    });

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
          toggleInterestInUni({
            uniId: uniId,
            interested: interested,
          });
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
