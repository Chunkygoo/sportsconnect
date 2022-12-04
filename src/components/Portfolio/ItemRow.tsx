import autosize from "autosize";
import useTranslation from "next-translate/useTranslation";
import { Fragment, useEffect, useRef } from "react";
import { DebounceInput } from "react-debounce-input";
import { BsFillTrashFill } from "react-icons/bs";
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

  return (
    <Fragment>
      <li>
        <div className="flex justify-between text-blue-600">
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
            className="mt-0 w-full  appearance-none border-0 border-b-2 border-gray-200 px-0 pt-3 pb-2 focus:border-black focus:outline-none focus:ring-0"
          />
          {!isDisabled && (
            <span className="mr-4 border-0 border-gray-200 pt-4 pb-2 focus:border-black focus:outline-none focus:ring-0">
              <BsFillTrashFill
                className="h-5 w-5 text-red-500 hover:cursor-pointer"
                onClick={() => {
                  deleteItem({ id: itemRowObject.id });
                }}
              />
            </span>
          )}
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <div className="flex">
            <YearMonthDayPicker
              isDisabled={isDisabled}
              selected={itemRowObject.startDate}
              onChange={(date: Date) => {
                updateItem({ ...itemRowObject, startDate: date });
              }}
              className="m-0 max-w-[4rem] border-0 border-gray-200 p-0 text-xs 
                          hover:cursor-pointer focus:border-black focus:outline-none focus:ring-0"
              wrapperClassName="max-w-[4.2rem] mr-1"
            />{" "}
            to{" "}
            {itemRowObject.active ? (
              <span className="ml-2">present</span>
            ) : (
              <YearMonthDayPicker
                isDisabled={isDisabled}
                selected={itemRowObject.endDate}
                onChange={(date: Date) => {
                  updateItem({ ...itemRowObject, endDate: date });
                }}
                className="m-0 max-w-[4rem] border-0 border-gray-200 p-0 text-xs
                          hover:cursor-pointer focus:border-black focus:outline-none focus:ring-0"
                wrapperClassName="max-w-[4.2rem] ml-2"
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
