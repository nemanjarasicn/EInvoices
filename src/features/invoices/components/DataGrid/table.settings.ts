import { HeaderSettingsTypes } from "../../models/invoice.enums";

type TableSettings = {
  tableSettings: {
    [key in HeaderSettingsTypes]: {
      headerSettings: {};
    };
  };
};
/**
 * hook predefine table settings
 * @returns {TableSettings}
 */
const useTableSettings = (): TableSettings => {
  return {
    tableSettings: {
      [HeaderSettingsTypes.SALES]: {
        headerSettings: {},
      },
      [HeaderSettingsTypes.PURCHASES]: {
        headerSettings: {},
      },
    },
  };
};
export { useTableSettings };
