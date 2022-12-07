export type inputType = {
  isDisabled: boolean;
  label: string;
  name: string;
  type: string;
  value: string | null;
  isTextarea?: boolean;
  onChange: (arg0: React.ChangeEvent<HTMLInputElement>) => void;
};
