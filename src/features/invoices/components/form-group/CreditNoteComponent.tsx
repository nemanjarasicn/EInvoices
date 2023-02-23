/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { IProps } from '../../models';
import { useComponentsStyles } from '../components.styles';
import FormDateField from '../form-fields/FormDateField';
import FormDropdownField from '../form-fields/FormDropdownField';
import FormTextField from '../form-fields/FormTextField';
import {
  FormFieldProps,
  GroupFieldProps,
  OptionItem,
  SourceSelectionMode,
} from '../form-fields/models/form-fields.models';

type CreditNoteComponentProps = GroupFieldProps & {
  creditNoteFields: {
    sourceInvoiceSelectionMode: Omit<FormFieldProps, 'control'> & {
      additional?: { optionNone: boolean };
      options: OptionItem[];
    };
    sourceInvoice: Omit<FormFieldProps, 'control'> & {};
    modePeriodFrom: Omit<FormFieldProps, 'control'> & {
      additional?: { disablePast: boolean };
    };
    modePeriodTo: Omit<FormFieldProps, 'control'> & {
      additional?: { disablePast: boolean };
    };
  };
  formSetValue?: Function;
};

export default function CreditNoteComponent({
  props,
}: IProps<CreditNoteComponentProps>): JSX.Element {
  const { formComponent } = useComponentsStyles();
  const [relationType, setRelationType] = React.useState<SourceSelectionMode>(
    SourceSelectionMode.SINGLE
  );

  React.useEffect(() => {
    props.formSetValue?.(
      props.creditNoteFields.sourceInvoiceSelectionMode.name,
      SourceSelectionMode.SINGLE
    );
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormDropdownField
          props={{
            ...props.creditNoteFields.sourceInvoiceSelectionMode,
            control: props.control,
            parentFn: setRelationType,
          }}
        />
      </Grid>
      {relationType === 1 && (
        <Grid item xs={6}>
          <FormTextField
            props={{
              ...props.creditNoteFields.sourceInvoice,
              control: props.control,
            }}
          />
        </Grid>
      )}
      <Grid item xs={6}>
        {relationType === 2 && (
          <FormDateField
            props={{
              ...props.creditNoteFields.modePeriodFrom,
              control: props.control,
            }}
          />
        )}
        {relationType === 2 && (
          <FormDateField
            props={{
              ...props.creditNoteFields.modePeriodTo,
              control: props.control,
            }}
          />
        )}
      </Grid>
    </Grid>
  );
}
