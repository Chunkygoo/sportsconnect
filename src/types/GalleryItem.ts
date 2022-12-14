export type galleryItemType = {
  datum: searchedUnisType;
  setAllUnis: React.Dispatch<React.SetStateAction<allUnisType[]>>;
  mine: boolean;
};

export type searchedUnisType = {
  backgroundImage: string;
  blurredBackgroundImage: string;
  logo: string;
  blurredLogo: string;
  id: string;
  name: string;
  city: string;
  state: string;
  conference: string;
  division: string;
  category: string;
  region: string;
  link: string;
  interested?: boolean;
};

export type allUnisType = {
  id: string;
  name: string;
  city: string;
  state: string;
  conference: string;
  division: string;
  category: string;
  region: string;
  link: string;
};
