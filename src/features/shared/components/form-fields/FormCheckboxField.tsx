import React from "react";
import { Divider, InputAdornment, TextField } from "@mui/material";
import { Checkbox,  FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";
import { IProps } from "../../../registries/models/registries.models";
import { FormFieldProps } from "./models/form-fields.models";


type FormCheckboxFieldProps = FormFieldProps & {
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
export default function CheckboxField({
  props,
}: IProps<FormCheckboxFieldProps>): JSX.Element {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field:  { onChange, value }, fieldState: { error } }) => (
        <FormControlLabel
            key={value}
            label={props.label}
            control={
                <Checkbox
                    {...props}
                    checked={value}
                    onChange={(e) => onChange(e.target.checked ? 1 : 0)}
                />
            }
        />
      )}
    />
  );
}
