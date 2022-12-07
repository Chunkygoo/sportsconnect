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
  return (
    <ReactDatePicker
      disabled={isDisabled}
      selected={selected}
      onChange={onChange}
      className={className}
      wrapperClassName={wrapperClassName}
      renderCustomHeader={({ date, changeYear, changeMonth }) => (
        <div className="m-2 flex justify-center ">
          <select
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
