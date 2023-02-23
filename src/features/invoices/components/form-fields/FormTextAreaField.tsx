import React from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { IProps } from '../../models';
import { FormFieldProps } from './models/form-fields.models';

type FormTextAreaFieldProps = FormFieldProps & { additional?: any };
/**
 * Facade MUI TextArea Field component
 */
export default function FormTextAreaField({
  props,
}: IProps<FormTextAreaFieldProps>): JSX.Element {
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          fullWidth
          placeholder=""
          multiline
          error={!!error}
          minRows={5}
          maxRows={5}
          onChange={onChange}
          value={value}
          label={props.label}
          helperText={error ? error.message : ' '}
        />
      )}
    />
  );
}
