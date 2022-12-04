import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function YearMonthDayPicker({
  selected,
  onChange,
  className,
  wrapperClassName,
  isDisabled,
}) {
  let range = (from, to) => {
    let size = to - from + 1;
    return [...Array(size).keys()].map((i) => from + i);
  };
  const years = range(1920, new Date().getFullYear());
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return (
    <ReactDatePicker
      disabled={isDisabled}
      selected={selected}
      onChange={onChange}
      className={className}
      wrapperClassName={wrapperClassName}
      renderCustomHeader={({ date, changeYear, changeMonth }) => (
        <div
          style={{
            margin: 10,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <select
            value={date.getFullYear()}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
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
