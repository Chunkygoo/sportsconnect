import autosize from "autosize";
import useTranslation from "next-translate/useTranslation";
import { Fragment, useEffect, useRef } from "react";
import { DebounceInput } from "react-debounce-input";
import { BsFillTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";
import type { itemRowType } from "../../types/itemRow";
import YearMonthDayPicker from "../DatePicker/YearMonthDayPicker";

export default function ItemRow({
  isDisabled,
  itemRowObject,
  updateItem,
  deleteItem,
}: itemRowType) {
  const { t } = useTranslation();
  const textareaRef = useRef(null);
  useEffect(() => {
    if (textareaRef.current) autosize(textareaRef.current);
  }, []);

  const startEndDatesValid = (startDateTime: number, endDateTime: number) => {
    if (endDateTime < startDateTime) {
      toast.warn("Start date must be earlier than end date", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return false;
    }
    return true;
  };

  return (
    <Fragment>
      <li>
        <div className="mr-2 flex justify-between text-blue-600">
          <DebounceInput
            disabled={isDisabled}
            debounceTimeout={1000}
            label="description"
            type="text"
            inputRef={textareaRef}
            element="textarea"
            rows="1"
            placeholder={t("portfolio:add_a_description")}
            value={itemRowObject.description || ""}
            onChange={(e) =>
              updateItem({ ...itemRowObject, description: e.target.value })
            }
            className="mt-0 mr-2 w-full appearance-none  border-0 border-b-2 border-gray-200 bg-transparent px-0 pt-3 pb-2 focus:border-black focus:outline-none focus:ring-0"
          />
          <span className="border-0 border-gray-200 pt-4 pb-2 focus:border-black focus:outline-none focus:ring-0">
            {!isDisabled && (
              <BsFillTrashFill
                className="h-5 w-5 text-red-500 hover:cursor-pointer"
                onClick={() => {
                  if (!isDisabled) deleteItem({ id: itemRowObject.id });
                }}
              />
            )}
          </span>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <div className="flex">
            <YearMonthDayPicker
              isDisabled={isDisabled}
              selected={itemRowObject.startDate}
              onChange={(date: Date) => {
                if (
                  startEndDatesValid(
                    date.getTime(),
                    itemRowObject.endDate.getTime()
                  )
                ) {
                  updateItem({
                    ...itemRowObject,
                    startDate: date,
                  });
                  return true;
                }
                return false;
              }}
              className="m-0 max-w-[4rem] border-0 border-gray-200 bg-transparent p-0 text-xs 
                          hover:cursor-pointer focus:border-black focus:outline-none focus:ring-0"
              wrapperClassName="max-w-[4.2rem] mr-1"
            />{" "}
            to
            {itemRowObject.active ? (
              <span className="ml-1">present</span>
            ) : (
              <YearMonthDayPicker
                isDisabled={isDisabled}
                selected={itemRowObject.endDate}
                onChange={(date: Date) => {
                  if (
                    startEndDatesValid(
                      itemRowObject.startDate.getTime(),
                      date.getTime()
                    )
                  ) {
                    updateItem({
                      ...itemRowObject,
                      endDate: date,
                    });
                    return true;
                  }
                  return false;
                }}
                className="m-0 max-w-[4rem] border-0 border-gray-200 bg-transparent p-0 text-xs 
                          hover:cursor-pointer focus:border-black focus:outline-none focus:ring-0"
                wrapperClassName="max-w-[4.2rem] ml-1"
              />
            )}
          </div>
          {itemRowObject.active ? (
            <div
              className="mr-10 hover:cursor-pointer"
              onClick={() => {
                if (isDisabled) return;
                updateItem({
                  ...itemRowObject,
                  active: !itemRowObject.active,
                });
              }}
            >
              {t("portfolio:active")}
            </div>
          ) : (
            <div
              className="mr-8 hover:cursor-pointer"
              onClick={() => {
                if (isDisabled) return;
                updateItem({
                  ...itemRowObject,
                  active: !itemRowObject.active,
                });
              }}
            >
              {t("portfolio:inactive")}
            </div>
          )}
        </div>
      </li>
    </Fragment>
  );
}
