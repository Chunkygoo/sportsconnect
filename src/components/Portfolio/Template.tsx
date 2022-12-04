import { Fragment } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import ItemRow from "./ItemRow";
// import {
//   createEducation,
//   deleteEducation,
//   getEducations,
//   getEducationsForUser,
//   updateEducation,
// } from '../../network/lib/education';
// import {
//   createExperience,
//   deleteExperience,
//   getExperiences,
//   getExperiencesForUser,
//   updateExperience,
// } from '../../network/lib/experience';
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { templateType } from "../../types/template";
import Spinner from "../Common/Spinner";

export default function Template({
  endpoint,
  title,
  isDisabled,
  data,
  createItem,
  updateItem,
  deleteItem,
}: templateType) {
  // const router = useRouter();
  // const queryClient = useQueryClient();
  // const userId = router.query.id;

  // const getItems = endpoint === "/educations" ? getEducations : getExperiences;
  // const getItemsForUser =
  //   endpoint === "/educations" ? getEducationsForUser : getExperiencesForUser;
  // const createItem =
  //   endpoint === "/educations" ? createEducation : createExperience;
  // const updateItem =
  //   endpoint === "/educations" ? updateEducation : updateExperience;
  // const deleteItem =
  //   endpoint === "/educations" ? deleteEducation : deleteExperience;
  // const reactQueryKey =
  //   endpoint === "/educations"
  //     ? reactQueryKeys.educations
  //     : reactQueryKeys.experiences;

  // const { data: userData, isLoading } = useQuery(
  //   [reactQueryKey],
  //   ({ signal }) => getItems(signal),
  //   {
  //     onSuccess: ({ data, status }) => {
  //       if (status === 200) {
  //         setData(data.reduce((a, v) => ({ ...a, [v.id]: v }), {}));
  //       } else if (status == 404 || status == 422) {
  //         router.push("/usernotfound");
  //       }
  //     },
  //     onError: () => {
  //       toast.error("An error occured while getting your data", {
  //         position: toast.POSITION.BOTTOM_RIGHT,
  //       });
  //     },
  //     enabled: !isDisabled,
  //   }
  // );

  // const { data: publicUserData, isLoading: isLoadingForUser } = useQuery(
  //   [reactQueryKey],
  //   ({ signal }) => getItemsForUser(signal, userId),
  //   {
  //     onSuccess: ({ data, status }) => {
  //       if (status === 200) {
  //         setData(data.reduce((a, v) => ({ ...a, [v.id]: v }), {}));
  //       } else if (status == 404 || status == 422) {
  //         router.push("/usernotfound");
  //       }
  //     },
  //     onError: () => {
  //       toast.error("An error occured while getting your data", {
  //         position: toast.POSITION.BOTTOM_RIGHT,
  //       });
  //     },
  //     enabled: isDisabled,
  //   }
  // );
  // const [data, setData] = useState(
  //   userData?.data.reduce((a, v) => ({ ...a, [v.id]: v }), {}) ||
  //     publicUserData?.data.reduce((a, v) => ({ ...a, [v.id]: v }), {}) ||
  //     {}
  // ); // use object instead of array to prevent random ordering

  // let createItemMutationFunction = async (dummyCreateObject) => {
  //   if (Object.keys(data).length >= 5) {
  //     swal(
  //       "Optimize your portfolio",
  //       "Please only include the 5 most recent items for a good reading experience. Pick the ones you are proud of!"
  //     );
  //     return;
  //   }
  //   try {
  //     let res = await createItem(dummyCreateObject);
  //     if (res.status === 201) {
  //       // because creating Item requires us to use the id it returns, we can't do OU
  //       setData((prevData) => {
  //         const newData = { ...prevData };
  //         newData[res.id] = dummyCreateObject;
  //         return newData;
  //       });
  //     }
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // };

  // const { mutate: handleCreate, isLoading: isCreateLoading } = useMutation(
  //   (dummyCreateObject) => createItemMutationFunction(dummyCreateObject),
  //   {
  //     onError: () => {
  //       toast.error("An error occured while creating a new item", {
  //         position: toast.POSITION.BOTTOM_RIGHT,
  //       });
  //     },
  //     // Always refetch after error or success - sync the cache no matter what
  //     onSettled: () => {
  //       queryClient.invalidateQueries([reactQueryKey]);
  //     },
  //   }
  // );

  // let updateItemMutationFunction = async (_itemData) => {
  //   let updateObject = {
  //     description: _itemData.description,
  //     active: _itemData.active,
  //     start_date: _itemData.startDate.yyyymmdd(),
  //     end_date:
  //       _itemData.endDate !== undefined ? _itemData.endDate.yyyymmdd() : null,
  //   };
  //   try {
  //     await updateItem(_itemData.id, updateObject);
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // };

  // const { mutate: handleUpdate } = useMutation(
  //   (itemData) => updateItemMutationFunction(itemData),
  //   {
  //     onMutate: async (newItemData) => {
  //       // Cancel any outgoing updates (so they don't overwrite our optimistic update)
  //       await queryClient.cancelQueries([reactQueryKey]);
  //       const previousData = queryClient.getQueryData([reactQueryKey]);
  //       // Optimistic update
  //       setData((prevData) => {
  //         const newData = { ...prevData };
  //         newItemData.start_date = newItemData.startDate.yyyymmdd();
  //         newItemData.end_date = newItemData.endDate.yyyymmdd();
  //         newData[newItemData.id] = newItemData;
  //         return newData;
  //       });
  //       return { previousData };
  //     },
  //     onError: (_, __, context) => {
  //       queryClient.setQueryData([reactQueryKey], context.previousData);
  //       toast.error("An error occured while updating your data", {
  //         position: toast.POSITION.BOTTOM_RIGHT,
  //       });
  //     },
  //     // Always refetch after error or success - sync the cache no matter what
  //     onSettled: () => {
  //       queryClient.invalidateQueries([reactQueryKey]);
  //     },
  //   }
  // );

  // const { mutate: handleDelete } = useMutation((id) => deleteItem(id), {
  //   onMutate: async (id) => {
  //     // Cancel any outgoing updates (so they don't overwrite our optimistic update)
  //     await queryClient.cancelQueries([reactQueryKey]);
  //     const previousData = queryClient.getQueryData([reactQueryKey]);
  //     // Optimistic update
  //     setData((prevData) => {
  //       const newData = { ...prevData };
  //       delete newData[id];
  //       return newData;
  //     });
  //     return { previousData };
  //   },
  //   onError: (_, __, context) => {
  //     queryClient.setQueryData([reactQueryKey], context.previousData);
  //     toast.error("An error occured while deleting your data", {
  //       position: toast.POSITION.BOTTOM_RIGHT,
  //     });
  //   },
  //   // Always refetch after error or success - sync the cache no matter what
  //   onSettled: () => {
  //     queryClient.invalidateQueries([reactQueryKey]);
  //   },
  // });

  return (
    <Fragment>
      <div>
        <div className="mb-3 mr-4 flex justify-between space-x-2 font-semibold leading-8 text-gray-900">
          <div className="flex items-center">
            <span className="mr-2 text-blue-500">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </span>
            <div>
              <span className="tracking-wide">{title}</span>
            </div>
          </div>
          <span className="float-right pt-1">
            {false ? (
              <Spinner />
            ) : (
              !isDisabled && (
                <AiOutlinePlusSquare
                  className="h-6 w-6 text-green-400"
                  onClick={() => {
                    createItem({
                      description: "",
                      active: false,
                      startDate: null,
                      endDate: null,
                    });
                  }}
                />
              )
            )}
          </span>
        </div>
        <ul className="list-inside space-y-2">
          {data &&
            Object.values(data).map((datum) => {
              // const startDate = new Date(datum.start_date + "T15:00:00Z");
              // const endDate = datum.active
              //   ? new Date(datum.start_date + "T15:00:00Z")
              //   : (endDate = new Date(datum.end_date + "T15:00:00Z"));
              const itemRowObject = {
                id: datum.id,
                active: datum.active,
                description: datum.description,
                startDate: datum.startDate,
                endDate: datum.endDate,
              };
              return (
                <ItemRow
                  key={datum.id}
                  isDisabled={isDisabled}
                  itemRowObject={itemRowObject}
                  updateItem={updateItem}
                  deleteItem={deleteItem}
                />
              );
            })}
        </ul>
      </div>
    </Fragment>
  );
}
