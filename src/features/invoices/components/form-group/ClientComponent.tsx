import React from "react";
import { Grid } from "@mui/material";
import { Company, InvoiceFormModel, IProps } from "../../models";
import FormTextField from "../form-fields/FormTextField";
import {
  AutocompleteItem,
  FormFieldProps,
  GroupFieldProps,
} from "../form-fields/models/form-fields.models";
import { selectClientCompanies } from "../form-fields/store/form.selectors";
import FormAutocompleteField from "../form-fields/FormAutocompleteField";
import { getClientCompanies } from "../form-fields/store/form.actions";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { clearCompanies } from "../form-fields/store/form.reducer";

type ClientComponentProps = GroupFieldProps & {
  additional: {
    formSetValue: UseFormSetValue<InvoiceFormModel>; // zajebavace type
    watch: UseFormWatch<InvoiceFormModel>; // zajebavace type
  };
  clientFields: {
    clientCompanyName: Omit<FormFieldProps, "control"> & {};
    clientAddress: Omit<FormFieldProps, "control"> & {};
    clientRegistrationCode: Omit<FormFieldProps, "control"> & {};
    clientVatRegistrationCode: Omit<FormFieldProps, "control"> & {};
  };
};

export default function ClientComponent({
  props,
}: IProps<ClientComponentProps>): JSX.Element {
  const { watch, formSetValue } = props.additional;
  const formValues = watch("client");

  /**
   * Handle composition
   * @param value
   */
  const handleComposition = (value: AutocompleteItem) => {
    if (value) {
      formSetValue("client.companyName", value.item.companyName);
      formSetValue("client.registrationCode", value.item.registrationCode);
      formSetValue(
        "client.vatRegistrationCode",
        value.item.vatRegistrationCode
      );
    } else {
      formSetValue("client.companyName", "");
      formSetValue("client.registrationCode", "");
      formSetValue("client.vatRegistrationCode", "");
      formSetValue("client.address", "");
    }
  };

  React.useEffect(() => {
    if (!formValues) {
      formSetValue("client", new Company());
    }
  }, [formValues]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <FormAutocompleteField
          props={{
            name: "client",
            control: props.control,
            label: props.title,
            disabled: false,
            additional: {
              selector: selectClientCompanies,
              dispatchAction: getClientCompanies(),
              parentFn: handleComposition,
              resetStateAction: clearCompanies,
            },
          }}
        />
      </Grid>
      <Grid item xs={5}>
        <FormTextField
          props={{
            ...props.clientFields.clientCompanyName,
            control: props.control,
          }}
        />
        <FormTextField
          props={{
            ...props.clientFields.clientAddress,
            control: props.control,
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <FormTextField
          props={{
            ...props.clientFields.clientRegistrationCode,
            control: props.control,
          }}
        />
        <FormTextField
          props={{
            ...props.clientFields.clientVatRegistrationCode,
            control: props.control,
          }}
        />
      </Grid>
    </Grid>
  );
}
