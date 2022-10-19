import { Control } from "react-hook-form";

export interface FormProps {
  name: string;
  control: Control<any, any>;
  label: string;
  disabled: boolean;
}
export interface OptionItem {
  value: string;
  name: string;
}
