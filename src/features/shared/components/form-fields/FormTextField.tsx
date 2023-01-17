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
    mask?: any
  };
};

/**
 * Facade MUI Text Field component
 */
export default function CustomTextField({
  props,
}: IProps<FormTextFieldProps>): JSX.Element {

  const fontSize  =    window.devicePixelRatio === 1.5 ?    '12px' :  '16px';

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
          InputLabelProps={{  style: {fontSize:   fontSize}, shrink: props.additional?.labelShrink }}
          variant="outlined"
          InputProps={{
            style: {fontSize:   fontSize},
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
