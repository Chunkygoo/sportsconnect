import { Fragment } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import type { templateType } from "../../types/template";
import yymmdd from "../../utils/yymmdd";
import ItemRow from "./ItemRow";

export default function Template({
  title,
  isDisabled,
  data,
  createItem,
  updateItem,
  deleteItem,
}: templateType) {
  return (
    <Fragment>
      <div>
        <div className="mb-3 mr-2 flex justify-between space-x-2 font-semibold leading-8 text-gray-900">
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
          <span className="float-right  pt-1">
            {!isDisabled && (
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
            )}
          </span>
        </div>
        <ul className="list-inside space-y-2">
          {data &&
            Object.values(data).map((datum) => {
              const itemRowObject = {
                id: datum.id,
                active: datum.active || false,
                description: datum.description || "",
                startDate:
                  datum.startDate ||
                  new Date(yymmdd(new Date()) + "T17:00:00Z"),
                endDate:
                  datum.endDate || new Date(yymmdd(new Date()) + "T17:00:00Z"),
              };
              return (
                <ItemRow
                  key={datum.id}
                  isDisabled={
                    isDisabled || datum.id.substring(0, 7) === "tempKey"
                  }
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
