import type { allUnisType } from "./GalleryItem";

export type checkBoxType = {
  interested: boolean;
  uniId: string;
  setAllUnis: React.Dispatch<React.SetStateAction<allUnisType[]>>;
  myInterested: boolean;
  onClose: () => void;
};
