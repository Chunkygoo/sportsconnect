import type { allUnisType, searchedUnisType } from "./GalleryItem";

export type detailModalType = {
  display: React.ReactNode;
  uni: searchedUnisType;
  setAllUnis: React.Dispatch<React.SetStateAction<allUnisType[]>>;
  myInterested: boolean;
};
