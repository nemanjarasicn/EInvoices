import React from 'react';
import { Grid } from '@mui/material';
import { IProps } from '../../models';
import FormDateField from '../form-fields/FormDateField';
import {
  FormFieldProps,
  GroupFieldProps,
  OptionItem,
} from '../form-fields/models/form-fields.models';
import FormDropdownField from '../form-fields/FormDropdownField';

type InvoiceGroupComponentProps = GroupFieldProps & {
  invoiceFileds: {
    issueDate: Omit<FormFieldProps, 'control'> & {
      additional?: { disablePast: boolean };
    };
    deliveryDate: Omit<FormFieldProps, 'control'> & {
      additional?: { disablePast: boolean };
    };
    dueDate: Omit<FormFieldProps, 'control'> & {
      additional?: { disablePast: boolean };
    };

    vatPointDate: Omit<FormFieldProps, 'control'> & {
      additional?: { optionNone: boolean };
      options: OptionItem[];
    };
  };
};

export default function InvoiceGroupComponent({
  props,
}: IProps<InvoiceGroupComponentProps>): JSX.Element {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <FormDateField
          props={{
            ...props.invoiceFileds.deliveryDate,
            control: props.control,
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <FormDateField
          props={{
            ...props.invoiceFileds.dueDate,
            control: props.control,
          }}
        />
      </Grid>

      <Grid item xs={3}></Grid>

      <Grid item xs={3}>
        <FormDropdownField
          props={{
            ...props.invoiceFileds.vatPointDate,
            control: props.control,
          }}
        />
      </Grid>
    </Grid>
  );
}
