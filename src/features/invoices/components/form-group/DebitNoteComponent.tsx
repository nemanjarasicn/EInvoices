/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography, Paper, Grid } from "@mui/material";
import React from "react";
import { IProps } from "../../models";
import { useComponentsStyles } from "../components.styles";
import FormDateField from "../form-fields/FormDateField";
import FormDropdownField from "../form-fields/FormDropdownField";
import FormTextField from "../form-fields/FormTextField";
import {
  FormFieldProps,
  GroupFieldProps,
  OptionItem,
  SourceSelectionMode,
  VATPointDate,
} from "../form-fields/models/form-fields.models";

type DebitNoteComponentProps = GroupFieldProps & {
  debitNoteFields: {
    sourceInvoiceSelectionMode: Omit<FormFieldProps, "control"> & {
      additional?: { optionNone: boolean };
      options: OptionItem[];
    };
    sourceInvoice: Omit<FormFieldProps, "control"> & {};
    modePeriodFrom: Omit<FormFieldProps, "control"> & {
      additional?: { disablePast: boolean };
    };
    modePeriodTo: Omit<FormFieldProps, "control"> & {
      additional?: { disablePast: boolean };
    };
    dueDate: Omit<FormFieldProps, "control"> & {
      additional?: { disablePast: boolean };
    };
    vatPointDate: Omit<FormFieldProps, "control"> & {
      additional?: { optionNone: boolean };
      options: OptionItem[];
    };
  };
  formSetValue?: Function;
};

export default function DebitNoteComponent({
  props,
}: IProps<DebitNoteComponentProps>): JSX.Element {
  const { formComponent } = useComponentsStyles();
  const [relationType, setRelationType] = React.useState<SourceSelectionMode>(
    SourceSelectionMode.SINGLE
  );

  React.useEffect(() => {
    props.formSetValue?.(
      props.debitNoteFields.sourceInvoiceSelectionMode.name,
      SourceSelectionMode.SINGLE
    );
    props.formSetValue?.(
      props.debitNoteFields.vatPointDate.name,
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
            <FormDropdownField
              props={{
                ...props.debitNoteFields.sourceInvoiceSelectionMode,
                control: props.control,
                parentFn: setRelationType,
              }}
            />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            {relationType === 2 && (
              <FormDateField
                props={{
                  ...props.debitNoteFields.modePeriodFrom,
                  control: props.control,
                }}
              />
            )}
            {relationType === 1 && (
              <FormTextField
                props={{
                  ...props.debitNoteFields.sourceInvoice,
                  control: props.control,
                }}
              />
            )}
            <FormDropdownField
              props={{
                ...props.debitNoteFields.vatPointDate,
                control: props.control,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            {relationType === 2 && (
              <FormDateField
                props={{
                  ...props.debitNoteFields.modePeriodTo,
                  control: props.control,
                }}
              />
            )}
            <FormDateField
              props={{
                ...props.debitNoteFields.dueDate,
                control: props.control,
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
