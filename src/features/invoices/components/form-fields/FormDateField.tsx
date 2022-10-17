import React from "react";
import { IProps } from "../../models";
import { FormProps } from "./models/form-fields.models";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

type FormDateFieldProps = FormProps & { additional?: any };

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
            value={value}
            onChange={(newValue) => onChange(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
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
