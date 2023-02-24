import React from 'react';
import { IProps } from '../../models';
import { FormFieldProps } from './models/form-fields.models';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';

type FormDateFieldProps = FormFieldProps & {
  additional?: {
    disablePast: boolean;
  };
};

/**
 * Facade MUI Date Field component
 */
export default function FormDateField({
  props,
}: IProps<FormDateFieldProps>): JSX.Element {
  const fontSize = window.devicePixelRatio === 1.5 ? '12px' : '16px';
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            InputProps={{ style: { fontSize: '12px' } }}
            value={dayjs(value)}
            inputFormat="DD/MM/YYYY"
            onChange={(newValue) => onChange(dayjs(newValue).toDate())}
            minDate={props.additional?.disablePast ? new Date() : null}
            OpenPickerButtonProps={{ style: { fontSize: '10px' } }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                sx={{ fontSize: fontSize }}
                helperText={error ? error.message : ' '}
                size="small"
                error={!!error}
                label={props.label}
                variant="outlined"
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  );
}
