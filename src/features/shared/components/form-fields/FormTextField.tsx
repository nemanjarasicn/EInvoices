import React from "react";
import { Divider, InputAdornment, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { IProps } from "../../../registries/models/registries.models";
import { FormFieldProps } from "./models/form-fields.models";

type FormTextFieldProps = FormFieldProps & {
  additional?: {
    suffix?: string;
    readonly?: boolean;
    labelShrink?: boolean;
    valueForm?: string;
  };
};

/**
 * Facade MUI Text Field component
 */
export default function CustomTextField({
  props,
}: IProps<FormTextFieldProps>): JSX.Element {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { onChange, value },fieldState: { error } }) => (
        <TextField
          disabled={false}
          helperText={error ? error.message : " "}
          size="small"
          error={!!error}
          onChange={(e) => onChange(e.target.value)}
          value={value ?? ""}
          fullWidth
          label={props.label}
          InputLabelProps={{ shrink: props.additional?.labelShrink }}
          variant="outlined"
          InputProps={{
            readOnly: props.additional?.readonly ?? false,
            endAdornment: props.additional?.suffix ? (
              <InputAdornment position="end">
                <Divider sx={{ height: 28, mr: 1 }} orientation="vertical" />
                <span>{props.additional.suffix}</span>
              </InputAdornment>
            ) : null,
          }}
        />
      )}
    />
  );
}
