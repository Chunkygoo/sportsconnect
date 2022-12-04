import type {
  educationCreateType,
  educationDeleteType,
  educationReadType,
  educationUpdateType,
} from "./education";
import type {
  experienceCreateType,
  experienceDeleteType,
  experienceReadType,
  experienceUpdateType,
} from "./experience";

export type templateType = {
  title: string;
  isDisabled: boolean;
  data:
    | educationReadType[]
    | experienceReadType[]
    | undefined
    | Record<string, never>; // empty object
  createItem: (arg0: educationCreateType | experienceCreateType) => void;
  updateItem: (arg0: educationUpdateType | experienceUpdateType) => void;
  deleteItem: (arg0: educationDeleteType | experienceDeleteType) => void;
};
