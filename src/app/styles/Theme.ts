import { createTheme } from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";
import type {} from "@mui/x-date-pickers/themeAugmentation";


export const theme = (colorSecondary: string) => createTheme({
  
  palette: {
    primary: {
      main: "#24292e",
    },
    secondary: {
      main:   colorSecondary !== '' ?  colorSecondary :  '#ef3e56',  //#ef3e56
    },
    info: {
      main: "#FFFFFF",
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: "#EAEDED",
        },
      },
    },
  },
});

