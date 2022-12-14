export type checkBoxType = {
  interested: boolean;
  uniId: string;
  setAllUnis: React.Dispatch<React.SetStateAction<allUnisType[]>>;
  mine: boolean;
  onClose: () => void;
};
