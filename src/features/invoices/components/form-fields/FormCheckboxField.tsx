import {
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { IProps } from '../../models';
import { FormFieldProps } from './models/form-fields.models';

type FormCheckboxFieldProps = FormFieldProps & {
  additional?: any;
};

export default function FormCheckboxField({
  props,
}: IProps<FormCheckboxFieldProps>) {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl size={'small'} error={!!error}>
          <FormControlLabel
            control={<Checkbox value={value} onChange={onChange} />}
            label="Label"
          />
          <FormHelperText>{error ? error.message : ' '}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
