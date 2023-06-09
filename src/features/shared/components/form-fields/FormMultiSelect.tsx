import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useAppSelector } from '../../../../app/hooks';
import { IProps } from '../../../registries/models/registries.models';
import { AutocompleteItem, FormFieldProps } from './models/form-fields.models';

type FormAutocompleteFieldProps = FormFieldProps & {
  additional: {
    selector: any;
    parentFn?: Function;
    labelShrink?: boolean;
    placeholder?: string;
    noResultText?: string;
    data?: any;
    disable?: boolean;
    disableOption?: boolean;
  };
};
/**
 * Facade MUI Autocomplete Field component
 */
export default function FormMultiSelect({
  props,
}: IProps<FormAutocompleteFieldProps>) {
  const data: AutocompleteItem[] = useAppSelector(props.additional.selector);
  const options: any = props.additional.data;
  const dataTmp = props.additional.data ? options : data;

  const fontSize = window.devicePixelRatio === 1.5 ? '12px' : '16px';
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          multiple
          disablePortal
          disabled={props?.additional?.disableOption}
          id={`combo-box-demo_${props.name}`}
          options={[...dataTmp]}
          noOptionsText={props.additional.noResultText ?? 'No options'}
          sx={{
            '& .MuiAutocomplete-input, & .MuiInputLabel-root': {
              fontSize: fontSize,
            },
          }}
          getOptionLabel={(item: AutocompleteItem) => item.name || ''}
          isOptionEqualToValue={(option, value) =>
            Boolean(option.id === value.id)
          }
          renderOption={(props, option) => {
            return (
              <li style={{ fontSize: fontSize }} {...props} key={option.id}>
                {option.name}
              </li>
            );
          }}
          onChange={(_e, _value) => {
            props.additional.parentFn?.(_value);
            return onChange({ ..._value });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              helperText={error ? error.message : ' '}
              size="small"
              error={!!error}
              value={value}
              fullWidth
              placeholder={props.additional.placeholder ?? ''}
              label={props.label}
              InputLabelProps={{ shrink: props.additional?.labelShrink }}
              variant="outlined"
              disabled={props?.additional?.disable}
            />
          )}
        />
      )}
    />
  );
}
