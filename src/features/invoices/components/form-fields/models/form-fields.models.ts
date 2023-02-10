import { Control } from "react-hook-form";

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
  ISSUING_DATE = 3,//datum slanja
  DELIVERY_DATE = 35, //datum prometa
  PAYMENT_DATE = 432, //na dan placanja
}

export enum SourceSelectionMode {
  SINGLE = 1,
  PERIOD = 2,
}
