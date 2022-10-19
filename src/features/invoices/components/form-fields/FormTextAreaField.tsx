import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { IProps } from "../../models";
import { FormProps } from "./models/form-fields.models";

type FormTextAreaFieldProps = FormProps & { additional?: any };
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
          placeholder="MultiLine with rows: 2 and rowsMax: 4"
          multiline
          error={!!error}
          minRows={5}
          maxRows={5}
          onChange={onChange}
          value={value}
          label={props.label}
          helperText={error ? error.message : " "}
        />
      )}
    />
  );
}
