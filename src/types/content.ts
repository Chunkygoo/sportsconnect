import type { allUnisType, searchedUnisType } from "./GalleryItem";

export type contentType = {
  uni: searchedUnisType;
  setAllUnis: React.Dispatch<React.SetStateAction<allUnisType[]>>;
  myInterested: boolean;
  onClose: () => void;
};
