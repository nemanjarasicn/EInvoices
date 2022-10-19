import React from "react";
import {
  Paper,
  Typography,
  Grid,
  Box,
  Switch,
  FormControlLabel,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { InvoiceType, IProps } from "../models";
import FormTextField from "./form-fields/FormTextField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormDropdownField from "./form-fields/FormDropdownField";
import FormTextAreaField from "./form-fields/FormTextAreaField";
import FormDateField from "./form-fields/FormDateField";
import FormAutocompleteField from "./form-fields/FormAutocompleteField";
import { useTranslation } from "react-i18next";
import { useComponentsStyles } from "./components.styles";
import CustomButtonFc from "./CustomButtonFc";
import FormCheckboxField from "./form-fields/FormCheckboxField";
import FormCurrencyField from "./form-fields/FormCurrencyField";
import PrepaymentComponent from "./form-group/PrepaymentComponent";
import InvoiceGroupComponent from "./form-group/InvoiceGroupComponent";
import { error } from "console";
import { OptionItem } from "./form-fields/models/form-fields.models";

export type InvoiceFormComponentProps = {
  invoiceTypeOptions: any;
};
interface IFormInput {
  textValue: string;
  textValueSuffix: string;
  dropdownValue: string;
  textAreaValue: string;
  dateValue: string;
  autocompleteValue: any;
  checkbox: boolean | string;
  currencyValue: number | string;
}

const defaultValues = {
  textValue: "",
  textValueSuffix: "",
  dropdownValue: "",
  textAreaValue: "",
  dateValue: "",
  autocompleteValue: "",
  checkbox: "",
  currencyValue: "",
};

/**
 * Register Form validation schema for every field
 */
const schema = yup
  .object({
    // textValue: yup.string().required(),
    // dropdownValue: yup.string().required(),
    // textAreaValue: yup.string().required(),
    // dateValue: yup.string().required(), //validate date format
    // autocompleteValue: yup.object().required(),
    // checkbox: yup.bool().required(),
    // numberValue: yup.number().required(),
  })
  .required();

export default function InvoiceFormComponent({
  props,
}: IProps<InvoiceFormComponentProps>): JSX.Element {
  const { t } = useTranslation();
  const { formComponent } = useComponentsStyles();
  /**
   * Handle Invoice type
   */
  const [invoiceType, setInvoiceType] = React.useState<InvoiceType>(
    InvoiceType.INVOICE
  );

  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    reset,
    control,
    setValue,
    formState,
    getValues,
    trigger,
    getFieldState,
  } = methods;

  const onSubmit = (data: IFormInput) => console.log(data);

  // TODO CONTROLA SETTINGSA
  // const [first, setfirst] = React.useState();
  // const handleChangeSwitch = () => {
  //   console.log(control);
  //   setfirst((state) => ({
  //     ...state,
  //     additional: { ...state.additional, disabled: false },
  //   }));
  // };

  React.useEffect(() => {
    console.log("MENJA SE", getFieldState("dropdownValue"));
  }, []);

  return (
    <Box
      sx={{ flexGrow: 1, rowGap: 1, display: "flex", flexDirection: "column" }}
    >
      <Box
        sx={{
          ...formComponent.basicBox,
          width: "25%",
          textAlign: "center",
        }}
      >
        <Typography sx={formComponent.typography}>STATUS FAKTURE</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Box
            sx={{
              ...formComponent.basicBox,
              textAlign: "start",
            }}
          >
            <Typography sx={formComponent.typography}>
              PODACI NA FAKTURI
            </Typography>
            <Paper
              style={{
                display: "grid",
                gridRowGap: "20px",
                padding: "20px",
                background: "white",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <FormDropdownField
                    props={{
                      name: "dropdownValue",
                      control: control,
                      label: "MEMORANDUM",
                      disabled: false,
                      options: [
                        { name: "1", value: "1" },
                        { name: "2", value: "2" },
                        { name: "3", value: "3" },
                      ],
                    }}
                  />
                  <FormDropdownField
                    props={{
                      name: "dropdownValue",
                      control: control,
                      label: "KLIJENT",
                      options: [
                        { name: "1", value: "1" },
                        { name: "2", value: "2" },
                        { name: "3", value: "3" },
                      ],
                      disabled: false,
                    }}
                  />
                  <FormControl size={"small"} fullWidth>
                    <InputLabel
                      id={`select-label_${props.invoiceTypeOptions.name}.id`}
                    >
                      {t(props.invoiceTypeOptions.optionLabel)}
                    </InputLabel>
                    <Select
                      labelId={`select-label_${props.invoiceTypeOptions.name}.id`}
                      id={`select-component_${props.invoiceTypeOptions.name}.id`}
                      onChange={(e) =>
                        setInvoiceType(e.target.value as InvoiceType)
                      }
                      value={invoiceType}
                      label={t(props.invoiceTypeOptions.optionLabel)}
                    >
                      {props.invoiceTypeOptions.options.map(
                        (option: any, index: number) => {
                          return (
                            <MenuItem key={index} value={option.value}>
                              {`${t(option.name)}`}
                            </MenuItem>
                          );
                        }
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                  <FormTextField
                    props={{
                      name: "textValue",
                      control: control,
                      label: "Text Input",
                      disabled: false,
                    }}
                  />
                  <FormTextField
                    props={{
                      name: "textValue",
                      control: control,
                      label: "Text Input",
                      disabled: false,
                    }}
                  />
                  <FormTextField
                    props={{
                      name: "textValue",
                      control: control,
                      label: "Text Input",
                      disabled: false,
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormTextField
                    props={{
                      name: "textValueSuffix",
                      control: control,
                      label: "Text Input with Suffix",
                      additional: { suffix: "%" },
                      disabled: false,
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormControlLabel
                    value={true}
                    control={
                      <Switch
                        // onChange={handleChangeSwitch}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label="Primeni popust"
                    labelPlacement="end"
                  />
                </Grid>

                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                  <FormTextAreaField
                    props={{
                      name: "textAreaValue",
                      control: control,
                      label: "Area Input",
                      disabled: false,
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormTextField
                    props={{
                      name: "textValue",
                      control: control,
                      label: "Text Input",
                      disabled: false,
                    }}
                  />
                  <FormTextField
                    props={{
                      name: "textValueSuffix",
                      control: control,
                      label: "Text Input with Suffix",
                      additional: { suffix: "%" },
                      disabled: false,
                    }}
                  />
                  <FormTextField
                    props={{
                      name: "textValue",
                      control: control,
                      label: "Text Input",
                      disabled: false,
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormTextField
                    props={{
                      name: "textValue",
                      control: control,
                      label: "Text Input",
                      disabled: false,
                    }}
                  />
                  <FormTextField
                    props={{
                      name: "textValueSuffix",
                      control: control,
                      label: "Text Input with Suffix",
                      additional: { suffix: "%" },
                      disabled: false,
                    }}
                  />
                  <FormTextField
                    props={{
                      name: "textValue",
                      control: control,
                      label: "Text Input",
                      disabled: false,
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={2}>
          Actions
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Box
            sx={{
              ...formComponent.basicBox,
              textAlign: "start",
            }}
          >
            <Typography sx={formComponent.typography}>
              STAVKE NA FAKTURI
            </Typography>
            <Paper
              style={{
                display: "grid",
                gridRowGap: "20px",
                padding: "20px",
                background: "white",
              }}
            >
              <FormTextField
                props={{
                  name: "textValueSuffix",
                  control: control,
                  label: "Text Input with Suffix",
                  additional: { suffix: "%" },
                  disabled: false,
                }}
              />
            </Paper>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          {(() => {
            switch (invoiceType) {
              case InvoiceType.INVOICE:
                return (
                  <InvoiceGroupComponent
                    props={{ control: control }}
                  ></InvoiceGroupComponent>
                );

              case InvoiceType.PREPAYMENT:
                return (
                  <PrepaymentComponent
                    props={{ control: control }}
                  ></PrepaymentComponent>
                );
              default:
              case InvoiceType.INVOICE:
                return (
                  <InvoiceGroupComponent
                    props={{ control: control }}
                  ></InvoiceGroupComponent>
                );
            }
          })()}
          {/* <PrepaymentComponent
            props={{ control: control }}
          ></PrepaymentComponent>
          <InvoiceGroupComponent
            props={{ control: control }}
          ></InvoiceGroupComponent> */}
        </Grid>
        <Grid item xs={5}>
          <Box
            sx={{
              ...formComponent.basicBox,
              textAlign: "start",
            }}
          >
            <Typography sx={formComponent.typography}>TOTAL</Typography>
            <Paper
              style={{
                display: "grid",
                gridRowGap: "20px",
                padding: "20px",
                background: "white",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormCurrencyField
                    props={{
                      name: "currencyValue",
                      control: control,
                      label: "Currency field",
                      additional: { mask: {} },
                      disabled: false,
                    }}
                  />
                  <FormTextField
                    props={{
                      name: "textValueSuffix",
                      control: control,
                      label: "Text Input with Suffix",
                      additional: { suffix: "%" },
                      disabled: false,
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Box
            sx={{
              ...formComponent.basicBox,
              textAlign: "start",
            }}
          >
            <Typography sx={formComponent.typography}>PDV</Typography>
            <Paper sx={formComponent.paper}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormTextField
                    props={{
                      name: "textValue",
                      control: control,
                      label: "Text Input ",
                      additional: { suffix: "%" },
                      disabled: false,
                    }}
                  />
                  <FormTextField
                    props={{
                      name: "textValueSuffix",
                      control: control,
                      label: "Text Input with Suffix",
                      additional: { suffix: "%" },
                      disabled: false,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormTextField
                    props={{
                      name: "textValueSuffix",
                      control: control,
                      label: "Text Input with Suffix",
                      additional: { suffix: "%" },
                      disabled: false,
                    }}
                  />
                  <FormTextField
                    props={{
                      name: "textValueSuffix",
                      control: control,
                      label: "Text Input with Suffix",
                      additional: { suffix: "%" },
                      disabled: false,
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box
            sx={{
              ...formComponent.basicBox,
              textAlign: "start",
            }}
          >
            <Paper sx={formComponent.paper}>
              <CustomButtonFc
                groupButton={[
                  {
                    title: "RESET",
                    disabled: false,
                    btnFn: () => reset(),
                  },
                  {
                    title: "SUBMIT",
                    disabled: false,
                    btnFn: handleSubmit(onSubmit),
                  },
                  {
                    title: "RESET",
                    disabled: false,
                    btnFn: () => reset(),
                  },
                  {
                    title: "SET",
                    disabled: false,
                    btnFn: handleSubmit(onSubmit),
                  },
                ]}
              />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

{
  /* <Paper
            style={{
              display: "grid",
              gridRowGap: "20px",
              padding: "20px",
              background: "wheat",
            }}
          >
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                Grid 1
              </Grid>
              <Grid item xs={6}>
                Grid 2
              </Grid>
              <Grid item xs={6}>
                Grid 3
              </Grid>
              <Grid item xs={6}>
                Grid 4
              </Grid>
            </Grid> 
            <FormTextField
              props={{
                name: "textValue",
                control: control,
                label: "Text Input",
              }}
            />
            <FormTextField
              props={{
                name: "textValueSuffix",
                control: control,
                label: "Text Input with Suffix",
                additional: { suffix: "%" },
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

            <FormTextAreaField
              props={{
                name: "textAreaValue",
                control: control,
                label: "Area Input",
              }}
            />

            <FormDateField
              props={{
                name: "dateValue",
                control: control,
                label: "Date Input",
              }}
            />

            <FormAutocompleteField
              props={{
                name: "autocompleteValue",
                control: control,
                label: "Autocomplete Input",
              }}
            /> 
            
             <FormCheckboxField
                    props={{
                      control: control,
                      name: "checkbox",
                      disabled: false,
                      label: "Checkbox Field",
                    }}
                  ></FormCheckboxField>
            <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
              {" "}
              Submit{" "}
            </Button>
            <Button onClick={() => reset()} variant={"outlined"}>
              {" "}
              Reset{" "}
            </Button> 
          {/* </Paper> */
}
