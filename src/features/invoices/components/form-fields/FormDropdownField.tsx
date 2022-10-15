import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { IProps } from "../../models";
import { FormProps, OptionItem } from "./models/form-fields.models";

type FormDropdownFieldProps = FormProps & {
  additional?: any;
  options: OptionItem[];
};

/**
 * Facade MUI Select component
 */
export default function FormDropdownField({
  props,
}: IProps<FormDropdownFieldProps>): JSX.Element {
  return (
    <Controller
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl size={"small"} error={!!error}>
          <InputLabel id={`select-label_${props.label}.id`}>
            {props.label}
          </InputLabel>
          <Select
            labelId={`select-label_${props.label}.id`}
            id={`select-component_${props.name}.id`}
            onChange={onChange}
            value={value}
            label={props.label}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {props.options.map((option: OptionItem, index) => {
              return (
                <MenuItem key={index} value={option.value}>
                  {`${option.name}`}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText>{error ? error.message : ""}</FormHelperText>
        </FormControl>
      )}
      control={props.control}
      name={props.name}
    />
  );
}
