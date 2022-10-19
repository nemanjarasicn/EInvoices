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

type InvoiceGroupComponentProps = {
  control: any;
};

export default function InvoiceGroupComponent({
  props,
}: IProps<InvoiceGroupComponentProps>): JSX.Element {
  const { formComponent } = useComponentsStyles();
  return (
    <Box
      sx={{
        ...formComponent.basicBox,
        textAlign: "start",
      }}
    >
      <Typography sx={formComponent.typography}>FAKTURA</Typography>
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
                name: "dateValue",
                control: props.control,
                label: "Date Input",
                disabled: false,
              }}
            />
            <FormDateField
              props={{
                name: "dateValue",
                control: props.control,
                label: "Date Input",
                disabled: false,
              }}
            />
          </Grid>
          <Grid item xs={6} alignSelf={"end"}>
            <FormDateField
              props={{
                name: "dateValue",
                control: props.control,
                label: "Date Input",
                disabled: false,
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
