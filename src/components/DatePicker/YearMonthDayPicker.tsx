import momentt from "moment-timezone";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { yearMonthDayPickerType } from "../../types/yearMonthDayPicker";

export default function YearMonthDayPicker({
  selected,
  onChange,
  className,
  wrapperClassName,
  isDisabled,
}: yearMonthDayPickerType) {
  const range = (from: number, to: number) => {
    const size = to - from + 1;
    return [...Array(size).keys()].map((i) => from + i);
  };
  const years = range(1920, new Date().getFullYear());
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [updatedDateWithTimezone, setUpdatedDateWithTimezone] =
    useState(selected);

  return (
    <ReactDatePicker
      disabled={isDisabled}
      // selected={selected}
      // onChange={onChange}
      selected={updatedDateWithTimezone}
      onChange={(date: Date) => {
        // force ReactDatePicker to use UTC: https://github.com/Hacker0x01/react-datepicker/issues/1787#issuecomment-1295771383
        const applyOffset = date.setTime(
          date.getTime() - date.getTimezoneOffset() * 60_000 // getTimezoneOffset returns minutes, * 60_000 to convert to ms
        );
        const actualTime = new Date(applyOffset).toISOString().replace("Z", "");
        const toTz = momentt
          .tz(actualTime, Intl.DateTimeFormat().resolvedOptions().timeZone)
          .format();
        const getUTCTime = momentt.utc(toTz).format();
        const newUpdatedDateWithTimezone = new Date(getUTCTime);
        if (onChange(newUpdatedDateWithTimezone)) {
          setUpdatedDateWithTimezone(newUpdatedDateWithTimezone);
        }
      }}
      className={className}
      wrapperClassName={wrapperClassName}
      renderCustomHeader={({ date, changeYear, changeMonth }) => (
        <div className="m-2 flex justify-center">
          <select
            className="w-[35%] p-2 text-base"
            aria-label="years"
            value={date.getFullYear()}
            onChange={({ target: { value } }) => changeYear(Number(value))}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            className="w-[65%] p-2 text-base"
            aria-label="months"
            value={months[date.getMonth()]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
    />
  );
}
