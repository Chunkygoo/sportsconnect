export type selectDropdownType = {
  selected: optionType;
  setSelected: React.Dispatch<React.SetStateAction<optionType>>;
  options: optionType[] | undefined;
  label: string;
  className: string;
  titleClassName?: string;
};

type optionType = {
  value: string;
  label: string;
};
