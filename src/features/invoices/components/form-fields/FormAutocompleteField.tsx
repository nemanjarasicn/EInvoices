import { Autocomplete, TextField } from "@mui/material";
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  AsyncThunkAction,
} from "@reduxjs/toolkit";
import React from "react";
import { Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { IProps } from "../../models";
import { AutocompleteItem, FormFieldProps } from "./models/form-fields.models";

type FormAutocompleteFieldProps = FormFieldProps & {
  additional: {
    dispatchAction: AsyncThunkAction<any, void, {}>;
    resetStateAction: Function;
    selector: any;
    parentFn?: Function;
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

  /**
   *  Unmount
   */
  React.useEffect(
    () => () => {
      dispatch(props.additional.resetStateAction());
    },
    []
  );

  const data: AutocompleteItem[] = useAppSelector(props.additional.selector);

  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          disablePortal
          id={`combo-box-demo_${props.name}`}
          options={[...data]}
          getOptionLabel={(item: AutocompleteItem) => item.name}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.id}>
                {option.name}
              </li>
            );
          }}
          onChange={(e, _value) => {
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
              label={props.label}
              variant="outlined"
            />
          )}
        />
      )}
    />
  );
}
