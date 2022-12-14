export type selectDropdownType = {
  selected: optionType | undefined;
  setSelected: React.Dispatch<React.SetStateAction<optionType | undefined>>;
  options: optionType[] | undefined;
  label: string;
  className: string;
  titleClassName?: string;
};

type optionType = {
  value: string;
  label: string;
};
