export type yearMonthDayPickerType = {
  isDisabled: boolean;
  selected: Date | null;
  onChange: (arg0: Date) => boolean;
  className: string;
  wrapperClassName: string;
};
