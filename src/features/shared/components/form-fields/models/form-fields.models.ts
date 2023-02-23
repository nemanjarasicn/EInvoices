import { Control } from 'react-hook-form';

export interface FormFieldProps {
  name: string;
  control: Control<any, any>;
  label: string;
  disabled: boolean;
}

export interface GroupFieldProps {
  title: string;
  control: Control<any, any>;
}
export interface OptionItem {
  value: string | VATPointDate | SourceSelectionMode | any;
  name: string;
}

export interface AutocompleteItem {
  id: number;
  item: any;
  name: string;
}

export enum VATPointDate {
  ISSUING_DATE = 1,
  DELIVERY_DATE = 2,
  PAYMENT_DATE = 3,
}

export enum SourceSelectionMode {
  SINGLE = 1,
  PERIOD = 2,
}
