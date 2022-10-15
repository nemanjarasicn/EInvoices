import { Paper, Typography, Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { IProps } from "../models";
import FormTextField from "./form-fields/FormTextField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormDropdownField from "./form-fields/FormDropdownField";

type InvoiceFormComponentProps = {};
interface IFormInput {
  textValue: string;
  radioValue: string;
  checkboxValue: string[];
  dateValue: Date;
  dropdownValue: string;
  sliderValue: number;
}

const defaultValues = {
  textValue: "",
  radioValue: "",
  checkboxValue: [],
  dateValue: new Date(),
  dropdownValue: "",
  sliderValue: 0,
};

/**
 * Register Form validation schema for every field
 */
const schema = yup
  .object({
    textValue: yup.string().required(),
    dropdownValue: yup.string().required(),
  })
  .required();

export default function InvoiceFormComponent({
  props,
}: IProps<InvoiceFormComponentProps>): JSX.Element {
  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { handleSubmit, reset, control, setValue } = methods;
  const onSubmit = (data: IFormInput) => console.log(data);

  return (
    <Paper
      style={{
        display: "grid",
        gridRowGap: "20px",
        padding: "20px",
        margin: "10px 300px",
      }}
    >
      <Typography variant="h6"> Form Demo</Typography>

      <FormTextField
        props={{
          name: "textValue",
          control: control,
          label: "Text Input",
        }}
      />
      <FormDropdownField
        props={{
          name: "dropdownValue",
          control: control,
          label: "Dropdown value",
          options: [
            { name: "1", value: "1" },
            { name: "2", value: "2" },
            { name: "3", value: "3" },
          ],
        }}
      />

      <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
        {" "}
        Submit{" "}
      </Button>
      <Button onClick={() => reset()} variant={"outlined"}>
        {" "}
        Reset{" "}
      </Button>
    </Paper>
  );
}
