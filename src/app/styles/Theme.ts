import { createTheme } from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";
import type {} from "@mui/x-date-pickers/themeAugmentation";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#24292e",
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
        },
      },
    },
  },
});
