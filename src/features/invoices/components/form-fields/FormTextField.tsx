import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { IProps } from "../../models";
import { FormProps } from "./models/form-fields.models";

type FormTextFieldProps = FormProps & { additional?: any };

/**
 * Facade MUI Text Field component
 */
export default function FormTextField({
  props,
}: IProps<FormTextFieldProps>): JSX.Element {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={props.label}
          variant="outlined"
        />
      )}
    />
  );
}
