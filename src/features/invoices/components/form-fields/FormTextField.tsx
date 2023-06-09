import React from 'react';
import { Divider, InputAdornment, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { IProps } from '../../models';
import { FormFieldProps } from './models/form-fields.models';

type FormTextFieldProps = FormFieldProps & {
  additional?: {
    suffix?: string;
    readonly?: boolean;
    labelShrink?: boolean;
    parentFn?: Function;
    parentFnChange?: Function;
    mask?: any;
  };
};

/**
 * Facade MUI Text Field component
 */
export default function FormTextField({
  props,
}: IProps<FormTextFieldProps>): JSX.Element {
  const fontSize = window.devicePixelRatio === 1.5 ? '12px' : '16px';

  const handleOnKeyDown = (event: any) => {
    if (event.key === 'Enter' && props.additional?.parentFn) {
      props.additional?.parentFn();
    }
  };

  const handleParent = () => {
    if (props.additional?.parentFnChange) {
      props.additional?.parentFnChange();
    }
  };
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          onKeyDown={(event) => handleOnKeyDown(event)}
          disabled={props.disabled}
          helperText={error ? error.message : ' '}
          size="small"
          error={!!error}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          onBlur={() => handleParent()}
          value={value ?? ''}
          fullWidth
          label={props.label}
          InputLabelProps={{
            style: { fontSize: fontSize },
            shrink: props.additional?.labelShrink,
          }}
          variant="outlined"
          InputProps={{
            style: { fontSize: fontSize },
            readOnly: props.additional?.readonly ?? false,
            endAdornment: props.additional?.suffix ? (
              <InputAdornment position="end">
                <Divider sx={{ height: 28, mr: 1 }} orientation="vertical" />
                <span style={{ fontSize: fontSize }}>
                  {props.additional.suffix}
                </span>
              </InputAdornment>
            ) : null,
          }}
        />
      )}
    />
  );
}
