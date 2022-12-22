import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { IProps } from "../../../invoices/models";
import { useAppSelector } from "../../../../app/hooks";
import { FormFieldProps, OptionItem } from "./models/form-fields.models";
import { useTranslation } from "react-i18next";

type FormDropdownFieldProps = FormFieldProps & {
  additional?: { optionNone: boolean };
  options?: OptionItem[];
  parentFn?: Function;
  selector: any;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

/**
 * Facade MUI Select component
 */
export default function FormDropdownField({
  props,
}: IProps<FormDropdownFieldProps>): JSX.Element {
  const { t } = useTranslation();
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const optionsList: any[]= useAppSelector(props.selector);

  const handleChange = (event: SelectChangeEvent<typeof selectedItems>) => {
    console.log('asass', event)
    const {
      target: { value },
    } = event;
    setSelectedItems(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field, fieldState: { error } }) => (
        <FormControl size={"small"} error={!!error} fullWidth>
          <InputLabel id={`select-label_${props.label}.id`}>
            {t(props.label)}
          </InputLabel>
          <Select
                {...field}
                labelId="age"
                label="age"
                multiple
                MenuProps={MenuProps}
              >
            {optionsList.map((option: OptionItem, index: any) => {
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
