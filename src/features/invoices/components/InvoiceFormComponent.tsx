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
import { InvoiceFormModel, InvoiceType, IProps } from "../models";
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
import {
  OptionItem,
  SourceSelectionMode,
  VATPointDate,
} from "./form-fields/models/form-fields.models";
import CreditNoteComponent from "./form-group/CreditNoteComponent";
import DebitNoteComponent from "./form-group/DebitNoteComponent";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getClientCompanies } from "./form-fields/store/form.actions";
import { selectClientCompanies } from "./form-fields/store/form.selectors";

export type InvoiceFormComponentProps = {
  invoiceTypeOptions: any;
  sectionTitles: any;
  formGrpsSettings: any;
};
interface IFormInput {
  invoiceTypeCode: InvoiceType;
  // textValue: string;
  // textValueSuffix: string;
  dropdownValue: string;
  // textAreaValue: string;
  // dateValue: string;
  // autocompleteValue: any;
  // checkbox: boolean | string;
  // currencyValue: number | string;
  // sourceInvoice: string;
}

const defaultValues = new InvoiceFormModel();

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

  const dispatch = useAppDispatch();

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
    watch,
  } = methods;
  const formValues = watch(); //EEG
  const onSubmit = (data: IFormInput) => console.log(data);

  /**
   * Handle switch of template by invoice type
   * @param invoicetype
   */
  const handleChangeType = (invoicetype: InvoiceType) => {
    setInvoiceType(invoicetype);
  };

  React.useEffect(() => {
    console.log("EFFECt MOUNT");
    dispatch(getClientCompanies());
    // console.log("FORM VALUES WATCH", formValues);
    // console.log("MENJA SE", getFieldState("dropdownValue"));
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
              {t(props.sectionTitles.title_1).toUpperCase()}
            </Typography>
            <Paper style={formComponent.groupPaper}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  {/* <FormDropdownField
                    props={{
                      name: "dropdownValue",
                      control: control,
                      label: "KLIJENT",
                      options: [...useAppSelector(selectClientCompanies)],
                      disabled: false,
                    }}
                  /> */}
                  {/* <FormDropdownField
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
                  /> */}
                  <FormDropdownField
                    props={{
                      name: "invoiceTypeCode",
                      control: control,
                      label: props.invoiceTypeOptions.optionLabel,
                      options: props.invoiceTypeOptions.options,
                      disabled: false,
                      parentFn: handleChangeType,
                    }}
                  />
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                  {/* <FormTextField
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
                  /> */}
                </Grid>
                <Grid item xs={3}>
                  {/* <FormTextField
                    props={{
                      name: "textValueSuffix",
                      control: control,
                      label: "Text Input with Suffix",
                      additional: { suffix: "%" },
                      disabled: false,
                    }}
                  /> */}
                </Grid>
                <Grid item xs={3}>
                  {/* <FormControlLabel
                    value={true}
                    control={
                      <Switch
                        // onChange={handleChangeSwitch}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label="Primeni popust"
                    labelPlacement="end"
                  /> */}
                </Grid>

                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                  {/* <FormTextAreaField
                    props={{
                      name: "textAreaValue",
                      control: control,
                      label: "Area Input",
                      disabled: false,
                    }}
                  /> */}
                </Grid>
                <Grid item xs={3}>
                  {/* <FormTextField
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
                  /> */}
                </Grid>
                <Grid item xs={3}>
                  {/* <FormTextField
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
                  /> */}
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
              {t(props.sectionTitles.title_2).toUpperCase()}
            </Typography>
            <Paper style={formComponent.groupPaper}>
              {/* <FormTextField
                props={{
                  name: "textValueSuffix",
                  control: control,
                  label: "Text Input with Suffix",
                  additional: { suffix: "%" },
                  disabled: false,
                }}
              /> */}
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
                    props={{
                      control: control,
                      title: t(
                        props.formGrpsSettings.invoiceGrp.title
                      ).toUpperCase(),
                      invoiceFileds: {
                        issueDate: {
                          name: "issueDate",
                          label: t("Form.formGrpLabels.invoiceGrp.issueDate"),
                          disabled: false,
                          additional: {
                            disablePast: true,
                          },
                        },
                        dueDate: {
                          name: "dueDate",
                          label: t("Form.formGrpLabels.invoiceGrp.dueDate"),
                          disabled: false,
                        },
                        vatPointDate: {
                          name: "vatPointDate",
                          label: t(
                            "Form.formGrpLabels.invoiceGrp.vatPointDate"
                          ),
                          disabled: false,
                          options: [
                            {
                              name: t("Form.vatPointDateOptions.issuingDate"),
                              value: VATPointDate.ISSUING_DATE,
                            },
                            {
                              name: t("Form.vatPointDateOptions.deliveryDate"),
                              value: VATPointDate.DELIVERY_DATE,
                            },
                            {
                              name: t("Form.vatPointDateOptions.paymentDate"),
                              value: VATPointDate.PAYMENT_DATE,
                            },
                          ],
                        },
                      },
                    }}
                  ></InvoiceGroupComponent>
                );
              case InvoiceType.PREPAYMENT:
                return (
                  <PrepaymentComponent
                    props={{
                      control: control,
                      title: t(
                        props.formGrpsSettings.prepaymentGrp.title
                      ).toUpperCase(),
                      prepaymentFields: {
                        issueDate: {
                          name: "issueDate",
                          label: t("Form.formGrpLabels.invoiceGrp.issueDate"),
                          disabled: false,
                          additional: {
                            disablePast: true,
                          },
                        },
                        vatPointDate: {
                          name: "vatPointDate",
                          label: t(
                            "Form.formGrpLabels.invoiceGrp.vatPointDate"
                          ),
                          disabled: false,
                          options: [
                            {
                              name: t("Form.vatPointDateOptions.paymentDate"),
                              value: VATPointDate.PAYMENT_DATE,
                            },
                          ],
                        },
                      },
                      formSetValue: setValue,
                    }}
                  ></PrepaymentComponent>
                );
              case InvoiceType.CREDIT_NOTE:
                return (
                  <CreditNoteComponent
                    props={{
                      control: control,
                      title: t(
                        props.formGrpsSettings.creditNoteGrp.title
                      ).toUpperCase(),
                      creditNoteFields: {
                        sourceInvoiceSelectionMode: {
                          name: "sourceInvoiceSelectionMode",
                          label: t(
                            "Form.formGrpLabels.creditNoteGrp.sourceMode"
                          ),
                          disabled: false,
                          options: [
                            {
                              name: t("Form.selectionModeOptions.single"),
                              value: SourceSelectionMode.SINGLE,
                            },
                            {
                              name: t("Form.selectionModeOptions.period"),
                              value: SourceSelectionMode.PERIOD,
                            },
                          ],
                        },
                        sourceInvoice: {
                          name: "sourceInvoice",
                          label: t(
                            "Form.formGrpLabels.creditNoteGrp.sourceInvoice"
                          ),
                          disabled: false,
                        },
                        modePeriodFrom: {
                          name: "modePeriodFrom",
                          label: t(
                            "Form.formGrpLabels.creditNoteGrp.modePeriodFrom"
                          ),
                          disabled: false,
                        },
                        modePeriodTo: {
                          name: "modePeriodTo",
                          label: t(
                            "Form.formGrpLabels.creditNoteGrp.modePeriodTo"
                          ),
                          disabled: false,
                        },
                      },
                      formSetValue: setValue,
                    }}
                  ></CreditNoteComponent>
                );
              case InvoiceType.DEBIT_NOTE:
                return (
                  <DebitNoteComponent
                    props={{
                      control: control,
                      title: t(
                        props.formGrpsSettings.debitNoteGrp.title
                      ).toUpperCase(),
                      debitNoteFields: {
                        sourceInvoiceSelectionMode: {
                          name: "sourceInvoiceSelectionMode",
                          label: t(
                            "Form.formGrpLabels.creditNoteGrp.sourceMode"
                          ),
                          disabled: false,
                          options: [
                            {
                              name: t("Form.selectionModeOptions.single"),
                              value: SourceSelectionMode.SINGLE,
                            },
                            {
                              name: t("Form.selectionModeOptions.period"),
                              value: SourceSelectionMode.PERIOD,
                            },
                          ],
                        },
                        sourceInvoice: {
                          name: "sourceInvoice",
                          label: t(
                            "Form.formGrpLabels.creditNoteGrp.sourceInvoice"
                          ),
                          disabled: false,
                        },
                        modePeriodFrom: {
                          name: "modePeriodFrom",
                          label: t(
                            "Form.formGrpLabels.creditNoteGrp.modePeriodFrom"
                          ),
                          disabled: false,
                        },
                        modePeriodTo: {
                          name: "modePeriodTo",
                          label: t(
                            "Form.formGrpLabels.creditNoteGrp.modePeriodTo"
                          ),
                          disabled: false,
                        },
                        dueDate: {
                          name: "dueDate",
                          label: t("Form.formGrpLabels.invoiceGrp.dueDate"),
                          disabled: false,
                        },
                        vatPointDate: {
                          name: "vatPointDate",
                          label: t(
                            "Form.formGrpLabels.invoiceGrp.vatPointDate"
                          ),
                          disabled: false,
                          options: [
                            {
                              name: t("Form.vatPointDateOptions.paymentDate"),
                              value: VATPointDate.PAYMENT_DATE,
                            },
                          ],
                        },
                      },
                      formSetValue: setValue,
                    }}
                  ></DebitNoteComponent>
                );
              default:
                throw new Error("No such invoice type");
            }
          })()}
        </Grid>
        <Grid item xs={5}>
          <Box
            sx={{
              ...formComponent.basicBox,
              textAlign: "start",
            }}
          >
            <Typography sx={formComponent.typography}>
              {t(props.sectionTitles.title_3).toUpperCase()}
            </Typography>
            <Paper style={formComponent.groupPaper}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {/* <FormCurrencyField
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
                  /> */}
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
            <Typography sx={formComponent.typography}>
              {t(props.sectionTitles.title_4).toUpperCase()}
            </Typography>
            <Paper sx={formComponent.paper}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  {/* <FormTextField
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
                  /> */}
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
