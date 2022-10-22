import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { IProps } from "../../models";
import { useComponentsStyles } from "../components.styles";
import FormTextField from "../form-fields/FormTextField";
import FormDateField from "../form-fields/FormDateField";
import FormDropdownField from "../form-fields/FormDropdownField";
import { Control } from "react-hook-form";

type PrepaymentComponentProps = {
  control: Control<any, any>;
};

export default function PrepaymentComponent({
  props,
}: IProps<PrepaymentComponentProps>): JSX.Element {
  const { formComponent } = useComponentsStyles();
  const fieldNames: string[] = ["datumPlacanja", "datumObracunaPDV"];

  /**
   * Unmount and unregister fields
   */
  React.useEffect(
    () => () => {
      fieldNames.map((field) => {
        props.control.unregister(field);
      });
    },
    []
  );

  return (
    <Box
      sx={{
        ...formComponent.basicBox,
        textAlign: "start",
      }}
    >
      <Typography sx={formComponent.typography}>AVANSNA UPLATA</Typography>
      <Paper
        style={{
          display: "grid",
          gridRowGap: "20px",
          padding: "20px",
          background: "white",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormDateField
              props={{
                name: "datumPlacanja",
                control: props.control,
                label: "Datum Prometa",
                disabled: false,
              }}
            />
          </Grid>
          <Grid item xs={6} alignSelf={"end"}>
            <FormDropdownField
              props={{
                name: "datumObracunaPDV",
                control: props.control,
                label: "Datum Obracuna PDV",
                disabled: false,
                options: [{ name: "Obracun PDV na dan placanja", value: "3" }],
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
