import React from "react";
import {
  Autocomplete,
  autocompleteClasses,
  Popper,
  styled,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useAppSelector } from "../../../../app/hooks";
import { IProps } from "../../models";
import { AutocompleteItem, FormFieldProps } from "./models/form-fields.models";

type FormAutocompleteFieldProps = FormFieldProps & {
  additional: {
    selector: any;
    parentFn?: Function;
    labelShrink?: boolean;
    placeholder?: string;
    noResultText?: string;
    reset?: any
  };
};

/**
 * Facade MUI Autocomplete Field component
 */
export default function FormAutocompleteField({
  props,
}: IProps<FormAutocompleteFieldProps>) {
  const data: AutocompleteItem[] = useAppSelector(props.additional.selector);
  const [name, setName] = React.useState('');

  const StyledPopper = styled(Popper)({
    [`& .${autocompleteClasses.listbox}`]: {
      boxSizing: "border-box",
      "& ul": {
        padding: 0,
        margin: 0,
        height: 20,
      },
    },
  });

  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <Autocomplete
          ref={ref}
          value={null}
          blurOnSelect={true}
          disablePortal
          PopperComponent={StyledPopper}
          id={`combo-box-demo_${props.name}`}
          options={[...data]}
          noOptionsText={props.additional.noResultText ?? "No options"}
          getOptionLabel={(item: AutocompleteItem) => item.name}
          isOptionEqualToValue={(option, value) =>
            Boolean(option.id === value.id)
          }
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.id}>
                {option.name}
              </li>
            );
          }}
          onChange={(_e, _value) => {
            props.additional.parentFn?.(_value);
            return onChange({ ..._value?.item });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              helperText={error ? error.message : " "}
              size="small"
              error={!!error}
              value={value}
              fullWidth
              placeholder={props.additional.placeholder ?? ""}
              label={props.label}
              InputLabelProps={{ shrink: props.additional?.labelShrink }}
              variant="outlined"
            />
          )}
        />
      )}
    />
  );
}
