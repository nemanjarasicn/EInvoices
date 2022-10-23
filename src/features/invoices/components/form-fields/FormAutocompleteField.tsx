import { Autocomplete, TextField } from "@mui/material";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import React from "react";
import { Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { IProps } from "../../models";
import { AutocompleteItem, FormFieldProps } from "./models/form-fields.models";

type FormAutocompleteFieldProps = FormFieldProps & {
  additional: {
    dispatchAction: AsyncThunkAction<any, void, {}>;
    selector: any;
  };
};
/**
 * Facade MUI Autocomplete Field component
 */
export default function FormAutocompleteField({
  props,
}: IProps<FormAutocompleteFieldProps>) {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(props.additional.dispatchAction);
  }, []);

  const data: AutocompleteItem[] = useAppSelector(props.additional.selector);

  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={data}
          getOptionLabel={(item: AutocompleteItem) => item.name}
          onChange={(_event, value) => onChange(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              helperText={error ? error.message : " "}
              size="small"
              error={!!error}
              value={value}
              fullWidth
              label={props.label}
              variant="outlined"
            />
          )}
        />
      )}
    />
  );
}
