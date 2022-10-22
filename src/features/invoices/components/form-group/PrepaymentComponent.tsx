/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { IProps } from "../../models";
import { useComponentsStyles } from "../components.styles";
import FormDateField from "../form-fields/FormDateField";
import FormDropdownField from "../form-fields/FormDropdownField";
import {
  FormFieldProps,
  GroupFieldProps,
  OptionItem,
  VATPointDate,
} from "../form-fields/models/form-fields.models";

type PrepaymentComponentProps = GroupFieldProps & {
  prepaymentFields: {
    issueDate: Omit<FormFieldProps, "control"> & {
      additional?: { disablePast: boolean };
    };
    vatPointDate: Omit<FormFieldProps, "control"> & {
      additional?: { optionNone: boolean };
      options: OptionItem[];
    };
  };
  formSetValue?: Function;
};

export default function PrepaymentComponent({
  props,
}: IProps<PrepaymentComponentProps>): JSX.Element {
  const { formComponent } = useComponentsStyles();

  React.useEffect(() => {
    props.formSetValue?.(
      props.prepaymentFields.vatPointDate.name,
      VATPointDate.PAYMENT_DATE
    );
  }, []);

  return (
    <Box
      sx={{
        ...formComponent.basicBox,
        textAlign: "start",
      }}
    >
      <Typography sx={formComponent.typography}>{props.title}</Typography>
      <Paper style={formComponent.groupPaper}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormDateField
              props={{
                ...props.prepaymentFields.issueDate,
                control: props.control,
              }}
            />
          </Grid>
          <Grid item xs={6} alignSelf={"end"}>
            <FormDropdownField
              props={{
                ...props.prepaymentFields.vatPointDate,
                control: props.control,
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
