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
import { FormFieldProps, OptionItem } from "./models/form-fields.models";
import { useTranslation } from "react-i18next";

type FormDropdownFieldProps = FormFieldProps & {
  additional?: { optionNone: boolean };
  options: OptionItem[];
  parentFn?: Function;
};

/**
 * Facade MUI Select component
 */
export default function FormDropdownField({
  props,
}: IProps<FormDropdownFieldProps>): JSX.Element {
  const { t } = useTranslation();
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl size={"small"} error={!!error} fullWidth>
          <InputLabel id={`select-label_${props.label}.id`}>
            {t(props.label)}
          </InputLabel>
          <Select
            labelId={`select-label_${props.label}.id`}
            id={`select-component_${props.name}.id`}
            onChange={(e) => {
              props.parentFn?.(e.target.value);
              return onChange(e);
            }}
            value={value ?? ""}
            label={t(props.label)}
          >
            {props.additional?.optionNone && (
              <MenuItem value="">
                <em>{t("Common.none")}</em>
              </MenuItem>
            )}
            {props.options.map((option: OptionItem, index) => {
              return (
                <MenuItem key={`${index}_${option.name}`} value={option.value}>
                  {`${t(option.name)}`}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText>{error ? error.message : " "}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
