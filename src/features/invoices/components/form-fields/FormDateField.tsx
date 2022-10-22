import React from "react";
import { IProps } from "../../models";
import { FormFieldProps } from "./models/form-fields.models";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";

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
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={dayjs(value)}
            inputFormat="DD/MM/YYYY"
            onChange={(newValue) => onChange(dayjs(newValue).toDate())}
            minDate={props.additional?.disablePast ? new Date() : null}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                helperText={error ? error.message : " "}
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
