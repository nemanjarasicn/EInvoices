import React from "react";
import { Grid } from "@mui/material";
import { InvoiceFormModel, IProps } from "../../models";
import FormTextField from "../form-fields/FormTextField";
import {
  AutocompleteItem,
  FormFieldProps,
  GroupFieldProps,
} from "../form-fields/models/form-fields.models";
import { selectClientCompanies } from "../form-fields/store/form.selectors";
import FormAutocompleteField from "../form-fields/FormAutocompleteField";
import { UseFormSetValue } from "react-hook-form";

type ClientComponentProps = GroupFieldProps & {
  additional: {
    formSetValue: UseFormSetValue<InvoiceFormModel>; // zajebavace type
  };
  clientFields: {
    clientCompanyName: Omit<FormFieldProps, "control"> & {
      additional: { readonly: boolean; labelShrink: boolean };
    };
    clientAddress: Omit<FormFieldProps, "control"> & {
      additional: { readonly: boolean; labelShrink: boolean };
    };
    clientRegistrationCode: Omit<FormFieldProps, "control"> & {
      additional: { readonly: boolean; labelShrink: boolean };
    };
    clientVatRegistrationCode: Omit<FormFieldProps, "control"> & {
      additional: { readonly: boolean; labelShrink: boolean };
    };
    clientEmail: Omit<FormFieldProps, "control"> & {
      additional: { readonly: boolean; labelShrink: boolean };
    };
    clientCity: Omit<FormFieldProps, "control"> & {
      additional: { readonly: boolean; labelShrink: boolean };
    };
    zipCode: Omit<FormFieldProps, "control"> & {
      additional: { readonly: boolean; labelShrink: boolean };
    };
  };
};
enum FIELDS {
  REGISTRATION_NAME = "accountingCustomerParty.partyLegalEntity.registrationName",
  STREET_NAME = "accountingCustomerParty.postalAddress.streetName",
  COMPANY_ID = "accountingCustomerParty.partyLegalEntity.companyID",
  ENDPOINT_ID = "accountingCustomerParty.party.endpointID",
  EMAIL = "accountingCustomerParty.contact.electronicMail",
  CITY = "accountingCustomerParty.postalAddress.cityName",
  ZIP = "accountingCustomerParty.postalAddress.zip",
}

export default function ClientComponent({
  props,
}: IProps<ClientComponentProps>): JSX.Element {
  const { formSetValue } = props.additional;

  /**
   * Handle composition
   * @param value
   */
  const handleComposition = (value: AutocompleteItem) => {
    if (value) {
      formSetValue("accountingCustomerParty", { ...value.item });
    } else {
      formSetValue(FIELDS.REGISTRATION_NAME, "");
      formSetValue(FIELDS.STREET_NAME, "");
      formSetValue(FIELDS.COMPANY_ID, "" as any);
      formSetValue(FIELDS.ENDPOINT_ID, "" as any);
      formSetValue(FIELDS.EMAIL, "" as any);
      formSetValue(FIELDS.CITY, "" as any);
      formSetValue(FIELDS.ZIP, "" as any);
      formSetValue("accountingCustomerParty", null);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <FormAutocompleteField
          props={{
            name: "foundClient",
            control: props.control,
            label: props.title,
            disabled: false,
            additional: {
              selector: selectClientCompanies,
              parentFn: handleComposition,
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
        <div style={{ display: "flex", gap: `10px` }}>
          <FormTextField
            props={{
              ...props.clientFields.clientCity,
              control: props.control,
            }}
          />
          <FormTextField
            props={{
              ...props.clientFields.zipCode,
              control: props.control,
            }}
          />
        </div>
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
        <FormTextField
          props={{
            ...props.clientFields.clientEmail,
            control: props.control,
          }}
        />
      </Grid>
    </Grid>
  );
}
