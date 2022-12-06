import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import SessionReact from "supertokens-auth-react/recipe/session";
import type { portfolioType } from "../../types/portfolio";
import { trpc } from "../../utils/trpc";
import Spinner from "../Common/Spinner";
import CropImage from "../CropImage/CropImage";
import YearMonthDayPicker from "../DatePicker/YearMonthDayPicker";
import Educations from "./Educations";
import Experiences from "./Experiences";
import Input from "./Input";
import Textarea from "./Textarea";
import Tooltip from "./Tooltip";

const Portfolio = ({ publicView, publicUserData }: portfolioType) => {
  const { t } = useTranslation();
  const router = useRouter();
  const utils = trpc.useContext();
  const [loading, setLoading] = useState(false);
  const { data, isError } = trpc.userInfo.getCurrentUserInfo.useQuery(
    undefined,
    {
      onSuccess(data) {
        // console.log(data);
        // if (status === 200) {
        //   setUser(data);
        // } else if (status == 404 || status == 422) {
        //   router.push("/usernotfound");
        // }
        setUserInfo(data);
      },
      onError() {
        toast.error("An error occured while getting your data", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
      enabled: !publicView,
    }
  );
  const { mutate: updateUserInfo } = trpc.userInfo.updateUserInfo.useMutation({
    async onMutate(newUserInfo) {
      await utils.userInfo.getCurrentUserInfo.cancel();
      const previousUserInfo = utils.userInfo.getCurrentUserInfo.getData();
      setUserInfo((prev) => {
        return {
          ...prev,
          ...newUserInfo,
        };
      });
      return { previousUserInfo };
    },
    onError(_, __, context) {
      utils.userInfo.getCurrentUserInfo.setData(
        undefined,
        context?.previousUserInfo
      );
      toast.error("An error occured while updating your data", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    onSettled() {
      utils.userInfo.getCurrentUserInfo.invalidate();
    },
    // retry: async (failureCount, error) => {
    //   const refresh = async () => {
    //     if (
    //       error.message ===
    //       "Access token has expired. Please call the refresh API"
    //     ) {
    //       if (await SessionReact.attemptRefreshingSession()) {
    //         console.log("succeeded calling needs-refresh");
    //         return true;
    //       } else {
    //         router.push("/auth/loginsignup");
    //         return false;
    //       }
    //     }
    //     return false;
    //   };
    //   if (await refresh()) {
    //     return true;
    //   }
    //   return false;
    // },
    retry: async (failureCount, error) => {
      const refresh = async () => {
        if (
          error.message ===
          "Access token has expired. Please call the refresh API"
        ) {
          if (await SessionReact.attemptRefreshingSession()) {
            console.log("succeeded calling needs-refresh");
            return true;
          } else {
            router.push("/auth/loginsignup");
            return false;
          }
        }
        return false;
      };
      if (await refresh()) {
        return true;
      }
      return false;
    },
  });
  const [userInfo, setUserInfo] = useState(publicView ? publicUserData : data); // need this for OU
  const isDisabled = publicView;

  const {
    data: { getUrl: profilePhotoUrl } = {},
    // mutate,
  } = trpc.image.getPreSignedURLForRead.useQuery(
    { key: userInfo?.profilePhoto?.key },
    {
      onError() {
        toast.error("An error occured while getting your image", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
      enabled: !!userInfo?.profilePhoto?.key,
    }
  );

  useEffect(() => {
    if (publicView && !publicUserData) {
      router.push("/usernotfound");
    }
  }, [publicUserData, publicView, router]);

  if (isError) {
    // router.push("/error");
    return (
      <div className="m-auto">
        Error
        <Spinner size="16" />
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="m-auto">
        <Spinner size="16" />
      </div>
    );
  }

  return (
    <Fragment>
      <div className="container mx-auto my-5 min-h-[80vh] p-5">
        <div className="no-wrap mx-2 md:flex ">
          <div className="w-full sm:mx-2 md:w-3/12">
            <div className="h-full border-t-4 border-blue-400 bg-white">
              <div className="image overflow-hidden">
                {profilePhotoUrl ? (
                  <Image
                    className="mx-auto h-auto w-full"
                    src={profilePhotoUrl}
                    alt=""
                    width={600}
                    height={600}
                    blurDataURL={"/default-photo.jpg"}
                    placeholder="blur"
                  />
                ) : (
                  <Image
                    className="mx-auto h-auto w-full"
                    src="/default-photo.jpg"
                    alt=""
                    width={600}
                    height={600}
                  />
                )}
                {!isDisabled &&
                  (loading ? (
                    <svg
                      aria-hidden="true"
                      className="mx-auto mb-2 h-8 w-8 animate-spin fill-blue-600 text-gray-200"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  ) : (
                    <div className="text-md grid place-items-center bg-slate-200  text-blue-600">
                      {userInfo?.profilePhoto ? (
                        <CropImage
                          display={t("portfolio:upload_new_photo")}
                          setLoading={setLoading}
                          imageKey={userInfo?.profilePhoto?.key}
                        />
                      ) : (
                        <CropImage
                          display={t("portfolio:change_profile_photo")}
                          setLoading={setLoading}
                          imageKey={userInfo?.profilePhoto?.key}
                        />
                      )}
                    </div>
                  ))}
              </div>
              {!isDisabled && (
                <div className="mt-2 flex border-b-2 border-gray-300 md:text-xs lg:text-base">
                  <div className="w-full">
                    <Tooltip
                      description={
                        userInfo.public
                          ? t("portfolio:make_private")
                          : t("portfolio:make_public")
                      }
                      extraInformation={
                        userInfo.public
                          ? t("portfolio:make_private_description")
                          : t("portfolio:make_public_description")
                      }
                      initialMessage={undefined}
                      transitionedMessage={undefined}
                      hoverColor={undefined}
                    />
                  </div>
                  <div>
                    {userInfo.public ? (
                      <svg
                        className="h-6 w-6 text-blue-500 hover:text-fuchsia-600 md:h-3 md:w-3 lg:h-6 lg:w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() =>
                          updateUserInfo({
                            ...userInfo,
                            public: !userInfo.public,
                          })
                        }
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="h-6 w-6 text-blue-500 hover:text-fuchsia-600 md:h-3 md:w-3 lg:h-6 lg:w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                          toast.success(t("portfolio:made_public") as string, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                          });
                          updateUserInfo({
                            ...userInfo,
                            public: !userInfo.public,
                          });
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        ></path>
                      </svg>
                    )}
                  </div>
                  {userInfo.public && (
                    <div>
                      <Tooltip
                        description={
                          <svg
                            className="my-auto h-6 w-6 md:h-3 md:w-3 lg:h-6 lg:w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() =>
                              navigator.clipboard.writeText(
                                `${process.env.NEXT_PUBLIC_APP_URL}/portfolio/public/${userInfo.id}`
                              )
                            }
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            ></path>
                          </svg>
                        }
                        initialMessage={t("portfolio:copy")}
                        transitionedMessage={t("portfolio:copied")}
                        hoverColor="text-green-500"
                        extraInformation={undefined}
                      />
                    </div>
                  )}
                </div>
              )}
              <h1 className="my-3 leading-8 text-gray-900">
                <Input
                  isDisabled={isDisabled}
                  label={t("portfolio:preferred_name")}
                  name="Preferred name"
                  type="text"
                  value={userInfo.preferredName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateUserInfo({
                      ...userInfo,
                      preferredName: e.target.value,
                    })
                  }
                />
              </h1>
              <div className="h-[20vh] max-h-[10rem] w-full leading-6 md:h-full md:max-h-[12rem]">
                <Textarea
                  isDisabled={isDisabled}
                  label={t("portfolio:bio")}
                  name="Bio"
                  type="text"
                  value={userInfo.bio}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateUserInfo({ ...userInfo, bio: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="my-4"></div>
          </div>
          <div className="w-full sm:mx-2 md:w-9/12 ">
            <div className="rounded-sm bg-white pb-3 shadow-sm">
              <div className="flex items-center space-x-2 font-semibold leading-8 text-gray-900">
                <span className="text-blue-500">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">{t("portfolio:about")}</span>
              </div>
              <div className="text-gray-700">
                <div className="grid text-sm md:grid-cols-2">
                  <div className="py-2 md:px-4">
                    <Input
                      isDisabled={isDisabled}
                      label={t("portfolio:name")}
                      name="Name"
                      type="text"
                      value={userInfo.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateUserInfo({ ...userInfo, name: e.target.value })
                      }
                      // onChange={(e) => console.log(e)}
                    />
                  </div>
                  <div className="py-2 md:px-4">
                    <Input
                      isDisabled={isDisabled}
                      label={t("portfolio:wechat_id")}
                      name=""
                      type="text"
                      value={userInfo.wechatId}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateUserInfo({
                          ...userInfo,
                          wechatId: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="py-2 md:px-4">
                    <Input
                      isDisabled={isDisabled}
                      label={t("portfolio:gender")}
                      name="Gender"
                      type="text"
                      value={userInfo.gender}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateUserInfo({ ...userInfo, gender: e.target.value })
                      }
                    />
                  </div>
                  <div className="py-2 md:px-4">
                    <Input
                      isDisabled={isDisabled}
                      label={t("portfolio:contact_no")}
                      name="Contact No."
                      type="text"
                      value={userInfo.contactNumber}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateUserInfo({
                          ...userInfo,
                          contactNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="py-2 md:px-4">
                    <Input
                      isDisabled={isDisabled}
                      label={t("portfolio:current_address")}
                      name="Current address"
                      type="text"
                      value={userInfo.currentAddress}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateUserInfo({
                          ...userInfo,
                          currentAddress: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="py-2 pb-0 md:px-4">
                    <Input
                      isDisabled={isDisabled}
                      label={t("portfolio:permanent_address")}
                      name="Permanent address"
                      type="text"
                      value={userInfo.permanentAddress}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateUserInfo({
                          ...userInfo,
                          permanentAddress: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="py-2 md:px-4">
                    <Input
                      isDisabled={true}
                      label={t("portfolio:email")}
                      name="Email"
                      type="email"
                      value={userInfo.email}
                    />
                  </div>

                  <div className="focus:text-black-700 md:px-4">
                    <div className="text-gray-500">
                      {t("portfolio:birthday")}
                    </div>
                    <YearMonthDayPicker
                      isDisabled={isDisabled}
                      selected={
                        userInfo.birthday
                          ? new Date(userInfo.birthday)
                          : new Date("2022-07-02T15:00:00Z")
                      }
                      onChange={(date: Date) =>
                        updateUserInfo({ ...userInfo, birthday: date })
                      }
                      className="w-full border-0 border-b-2 border-gray-200 bg-transparent pb-2 focus:border-black focus:outline-none focus:ring-0"
                      wrapperClassName={undefined}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="my-4"></div>

            <div className="rounded-sm bg-white shadow-sm">
              <div className="gap-x-3 px-4 sm:grid sm:grid-cols-2">
                <div className="mb-10 sm:mb-0">
                  <Experiences isDisabled={isDisabled} />
                </div>
                <Educations isDisabled={isDisabled} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Portfolio;
