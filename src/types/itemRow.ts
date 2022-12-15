import type { educationDeleteType, educationUpdateType } from "./education";
import type { experienceDeleteType, experienceUpdateType } from "./experience";

export type itemRowType = {
  isDisabled: boolean;
  itemRowObject: itemRowObjectType;
  updateItem: (arg0: educationUpdateType | experienceUpdateType) => void;
  deleteItem: (arg0: educationDeleteType | experienceDeleteType) => void;
};

type itemRowObjectType = {
  id: string;
  description: string;
  active: boolean;
  startDate: Date;
  endDate: Date;
};
