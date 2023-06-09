import React from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { IProps } from '../../../registries/models/registries.models';
import { FormFieldProps } from './models/form-fields.models';
import { CurrencyFormatCustom, MaskProps } from './CurrencyFormatCustom';

type FormNumberFieldProps = FormFieldProps & {
  additional?: {
    mask: MaskProps;
    readonly: boolean;
    labelShrink?: boolean;
  };
};

export default function FormCurrencyField({
  props,
}: IProps<FormNumberFieldProps>): JSX.Element {
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          disabled={props.disabled}
          helperText={error ? error.message : ' '}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={props.label}
          InputLabelProps={{ shrink: props.additional?.labelShrink }}
          variant="outlined"
          InputProps={{
            readOnly: props.additional?.readonly ?? false,
            inputComponent: CurrencyFormatCustom as any,
            inputProps: {
              mask: props.additional?.mask,
            },
          }}
        />
      )}
    />
  );
}
