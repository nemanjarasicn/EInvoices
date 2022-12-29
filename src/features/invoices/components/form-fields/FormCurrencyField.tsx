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
    parentFnChange?:   Function;  
  };
};

export default function FormCurrencyField({
  props,
}: IProps<FormNumberFieldProps>): JSX.Element {


  
  const focusFlag =  props.label  ===  "Količina"  ?  true  :  false;
  const fontSize  =    window.devicePixelRatio === 1.5 ?    '12px' :  '16px';


  const handleOnKeyDown  =  (event: any) =>  {
    if(event.key === 'Enter'  &&  props.additional?.parentFn){
      console.log('enter press here! ');
      props.additional?.parentFn();
    }
  }

  const handleParent  =  () =>  {
    if( props.additional?.parentFnChange){
      console.log('enter press here! ');
      props.additional?.parentFnChange();
    }
  }

  const textFieldFocus = React.createRef();

  
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          onKeyDown={(event)  =>  handleOnKeyDown(event)}
          autoFocus={focusFlag}
          inputRef={textFieldFocus} 
          disabled={props.disabled}
          helperText={error ? error.message : " "}
          size="small"
          error={!!error} 
          onChange={onChange}
          onBlur={()  =>  handleParent()}
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
