import React from "react";
import { Divider, InputAdornment, TextField } from "@mui/material";
import { Checkbox,  FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";
import { withStyles } from '@mui/material/styles';
import { IProps } from "../../../registries/models/registries.models";
import { FormFieldProps } from "./models/form-fields.models";


type FormCheckboxFieldProps = FormFieldProps & {
  additional?: {
    suffix?: string;
    readonly?: boolean;
    labelShrink?: boolean;
    valueForm?: string;
    defaultValue?: string,
    color?: string, 
  };
};


/**
 * Facade MUI Text Field component
 */
export default function CheckboxField({
  props,
}: IProps<FormCheckboxFieldProps>): JSX.Element {

  const fontSizeCheckbox  =   window.devicePixelRatio === 1.5 ?  '12px' :     '14px';
  const widthCheckbox  =   window.devicePixelRatio === 1.5 ?  '12px' :     '20px';
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field:  { onChange, value }, fieldState: { error } }) => (
        <FormControlLabel
            key={value}
            label={props.label}
            sx={{color: props.additional?.color ? props.additional.color  :  'white',  '& .MuiFormControlLabel-label': { fontSize:  fontSizeCheckbox }}}
            control={
                <Checkbox
                    {...props}
                    checked={value}
                    value={props.additional?.defaultValue}
                    onChange={(e) => {onChange(e.target.checked ? e.target.value : false)}}
                    sx={{ color: props.additional?.color ? props.additional.color  :  'white', '&.Mui-checked': {color: '#6cb238' }, '& .MuiSvgIcon-root': { fontSize:   widthCheckbox }}}
                />
            }
        />
      )}
    />
  );
}
