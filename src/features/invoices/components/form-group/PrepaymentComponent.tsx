import {
  Box,
  Typography,
  Paper,
  Grid,
  FormControlLabel,
  Switch,
} from "@mui/material";
import React from "react";
import { IProps } from "../../models";
import { useComponentsStyles } from "../components.styles";
import FormTextField from "../form-fields/FormTextField";

type PrepaymentComponentProps = {
  control: any;
};

export default function PrepaymentComponent({
  props,
}: IProps<PrepaymentComponentProps>): JSX.Element {
  const { formComponent } = useComponentsStyles();
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
            <FormTextField
              props={{
                name: "textValueSuffix",
                control: props.control,
                label: "Text Input with Suffix",
                additional: { suffix: "%" },
                disabled: false,
              }}
            />
            <FormTextField
              props={{
                name: "textValueSuffix",
                control: props.control,
                label: "Text Input with Suffix",
                additional: { suffix: "%" },
                disabled: false,
              }}
            />
          </Grid>
          <Grid item xs={6} alignSelf={"end"}>
            <FormControlLabel
              style={{
                margin: "auto",
                marginBottom: "25px",
                display: "flex",
                justifyContent: "flex-end",
              }}
              value={true}
              control={
                <Switch
                  // onChange={handleChangeSwitch}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Da/Ne"
              labelPlacement="end"
            />
            <FormTextField
              props={{
                name: "textValueSuffix",
                control: props.control,
                label: "Text Input with Suffix",
                additional: { suffix: "%" },
                disabled: false,
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
