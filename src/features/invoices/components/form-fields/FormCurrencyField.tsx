import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { IProps } from "../../models";
import { FormFieldProps } from "./models/form-fields.models";
import { CurrencyFormatCustom, MaskProps } from "./CurrencyFormatCustom";

type FormNumberFieldProps = FormFieldProps & {
  additional?: {
    mask: MaskProps;
    readonly: boolean;
    labelShrink?: boolean;
    parentFn?:  Function;
  };
};

export default function FormCurrencyField({
  props,
}: IProps<FormNumberFieldProps>): JSX.Element {


  
  const focusFlag =  props.label  ===  "Količina"  ?  true  :  false;
  const fontSize  =    window.devicePixelRatio === 1.5 ?    '10px' :  '16px';


  const handleOnKeyDown  =  (event: any) =>  {
    if(event.key === 'Enter'  &&  props.additional?.parentFn){
      console.log('enter press here! ');
      props.additional?.parentFn();
    }
  }
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          onKeyDown={(event)  =>  handleOnKeyDown(event)}
          autoFocus={focusFlag}
          disabled={props.disabled}
          helperText={error ? error.message : " "}
          size="small"
          onFocus={event => {
            event.target.select();
          }}
          error={!!error} 
          onChange={onChange}
          value={value}
          fullWidth
          label={props.label}
          InputLabelProps={{ 
            style: {fontSize: fontSize} ,
            shrink: props.additional?.labelShrink }}
          variant="outlined"
          InputProps={{
            style: {fontSize: fontSize} ,
            readOnly: props.additional?.readonly ?? false,
            inputComponent: CurrencyFormatCustom as any,
            inputProps: {
              style: {fontSize: fontSize} ,
              mask: props.additional?.mask,
            },
          }}
        />
      )}
    />
  );
}
