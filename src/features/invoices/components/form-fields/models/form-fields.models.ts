import { Control } from "react-hook-form";

export interface FormProps {
  name: string;
  control: Control<any, any>;
  label: string;
}
export interface OptionItem {
  value: string;
  name: string;
}
