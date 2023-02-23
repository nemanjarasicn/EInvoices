import React from 'react';
import { NumericFormat } from 'react-number-format';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  mask: any;
}
export interface MaskProps {
  decimalScale?: number;
  prefix?: string;
  suffix?: string;
  allowNegative?: boolean;
  maxValue?: any;
}

const defaultValues: MaskProps = {
  decimalScale: 2,
  prefix: window.devicePixelRatio === 1.5 ? '' : 'RSD ',
  allowNegative: false,
  maxValue: 1000000000,
  suffix: '',
};
/**
 * Currency Format Component can be used as number
 */
export const CurrencyFormatCustom = React.forwardRef<any, CustomProps>(
  function NumberFormatCustom(props, ref): JSX.Element {
    const { onChange, mask, ...other } = props;

    const MAX_VAL: number = mask?.maxValue ?? defaultValues.maxValue;
    const withValueLimit = ({ floatValue }: any) => {
      if (!floatValue) floatValue = 0;
      return floatValue <= MAX_VAL;
    };

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        suffix={mask?.suffix ?? defaultValues.suffix}
        decimalScale={mask?.decimalScale ?? defaultValues.decimalScale}
        prefix={mask?.prefix ?? defaultValues.prefix}
        isAllowed={withValueLimit}
        allowNegative={mask?.allowNegative ?? defaultValues.allowNegative}
      />
    );
  }
);
