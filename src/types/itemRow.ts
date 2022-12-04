import type { educationDeleteType, educationUpdateType } from "./education";
import type { experienceDeleteType, experienceUpdateType } from "./experience";

export type itemRowType = {
  isDisabled: boolean;
  itemRowObject: educationUpdateType | experienceUpdateType;
  updateItem: (arg0: educationUpdateType | experienceUpdateType) => void;
  deleteItem: (arg0: educationDeleteType | experienceDeleteType) => void;
};
