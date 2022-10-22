import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { IProps } from "../../models";
import { useComponentsStyles } from "../components.styles";
import FormDateField from "../form-fields/FormDateField";
import { Control } from "react-hook-form";
import {
  FormFieldProps,
  GroupFieldProps,
} from "../form-fields/models/form-fields.models";
import FormDropdownField from "../form-fields/FormDropdownField";
import { useTranslation } from "react-i18next";

type InvoiceGroupComponentProps = GroupFieldProps & {};

export default function InvoiceGroupComponent({
  props,
}: IProps<InvoiceGroupComponentProps>): JSX.Element {
  const { formComponent } = useComponentsStyles();
  const { t } = useTranslation();

  const fieldNames: string[] = [
    "datumPrometa",
    "datumDospeca",
    "datumObracunaPDV",
  ];

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
      <Typography sx={formComponent.typography}>{t(props.title)}</Typography>
      <Paper style={formComponent.groupPaper}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormDateField
              props={{
                name: "datumPrometa",
                control: props.control,
                label: "Datum Prometa",
                disabled: false,
              }}
            />
            <FormDateField
              props={{
                name: "datumDospeca",
                control: props.control,
                label: "Datum dospeca",
                disabled: false,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormDropdownField
              props={{
                name: "datumObracunaPDV",
                control: props.control,
                label: "Datum Obracuna PDV",
                disabled: false,
                options: [
                  { name: "Datum slanja Fakture", value: "1" },
                  { name: "Datum Prometa fakture", value: "2" },
                  { name: "Obracun PDV na dan placanja", value: "3" },
                ],
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
