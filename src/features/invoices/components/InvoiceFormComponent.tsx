import React from "react";
import { Paper, Typography, Button, Grid, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { IProps } from "../models";
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

type InvoiceFormComponentProps = {};
interface IFormInput {
  textValue: string;
  textValueSuffix: string;
  dropdownValue: string;
  textAreaValue: string;
  dateValue: string;
  autocompleteValue: any;
}

const defaultValues = {
  textValue: "",
  textValueSuffix: "",
  dropdownValue: "",
  textAreaValue: "",
  dateValue: "",
  autocompleteValue: "",
};

/**
 * Register Form validation schema for every field
 */
const schema = yup
  .object({
    textValue: yup.string().required(),
    dropdownValue: yup.string().required(),
    textAreaValue: yup.string().required(),
    dateValue: yup.string().required(), //validate date format
    autocompleteValue: yup.object().required(),
  })
  .required();

export default function InvoiceFormComponent({
  props,
}: IProps<InvoiceFormComponentProps>): JSX.Element {
  const { t } = useTranslation();
  const { formComponent } = useComponentsStyles();
  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { handleSubmit, reset, control, setValue } = methods;
  const onSubmit = (data: IFormInput) => console.log(data);

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
                      label: "Dropdown value",
                      options: [
                        { name: "1", value: "1" },
                        { name: "2", value: "2" },
                        { name: "3", value: "3" },
                      ],
                    }}
                  />
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                  <FormTextField
                    props={{
                      name: "textValue",
                      control: control,
                      label: "Text Input",
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
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
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                  <FormTextField
                    props={{
                      name: "textValue",
                      control: control,
                      label: "Text Input",
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormTextAreaField
                    props={{
                      name: "textAreaValue",
                      control: control,
                      label: "Area Input",
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormTextField
                    props={{
                      name: "textValue",
                      control: control,
                      label: "Text Input",
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
                    }}
                  />
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}>
                  <FormTextField
                    props={{
                      name: "textValueSuffix",
                      control: control,
                      label: "Text Input with Suffix",
                      additional: { suffix: "%" },
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
                    }}
                  />
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={3}>
                  <FormTextField
                    props={{
                      name: "textValueSuffix",
                      control: control,
                      label: "Text Input with Suffix",
                      additional: { suffix: "%" },
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
                    }}
                  />
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={3}>
                  <FormTextField
                    props={{
                      name: "textValueSuffix",
                      control: control,
                      label: "Text Input with Suffix",
                      additional: { suffix: "%" },
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
                }}
              />
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
            <Typography sx={formComponent.typography}>
              AVANSNA UPLATA
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
                }}
              />
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
            <Typography sx={formComponent.typography}>TOTAL</Typography>
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
                }}
              />
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
              <Grid container xs={12} spacing={2}>
                <Grid item xs={6}>
                  <FormTextField
                    props={{
                      name: "textValue",
                      control: control,
                      label: "Text Input ",
                      additional: { suffix: "%" },
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
                </Grid>
                <Grid item xs={6}>
                  <FormTextField
                    props={{
                      name: "textValueSuffix",
                      control: control,
                      label: "Text Input with Suffix",
                      additional: { suffix: "%" },
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
                    title: "SUBMIT",
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
            Podaci na fakturi
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
