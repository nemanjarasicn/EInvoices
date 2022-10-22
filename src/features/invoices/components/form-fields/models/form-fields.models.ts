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
  value: string;
  name: string;
}
