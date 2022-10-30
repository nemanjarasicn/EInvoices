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
  IconButton,
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
import AttachFileIcon from "@mui/icons-material/AttachFile";
import RestoreRoundedIcon from "@mui/icons-material/RestoreRounded";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
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
import ClientComponent from "./form-group/ClientComponent";
import InvoiceItemsComponent from "./invoice-items/InvoiceItemsComponent";

export type InvoiceFormComponentProps = {
  invoiceTypeOptions: any;
  sectionTitles: any;
  formGrpsSettings: any;
  formFieldsLabels: any;
};

/**
 * Register Form validation schema for every field
 */
const schema = yup
  .object({
    // client: yup
    //   .object({
    //     vatRegistrationCode: yup.string().required(),
    //   })
    //   .required(),
    // dropdownValue: yup.string().required(),
    // textAreaValue: yup.string().required(),
    // dateValue: yup.string().required(), //validate date format
    // autocompleteValue: yup.object().required(),
    // checkbox: yup.bool().required(),
    // numberValue: yup.number().required(),
    // invoiceLine: yup.array().of(
    //   yup.object({
    //     kolicina: yup.string().required(""),
    //   })
    // ),
  })
  .required();

export default function InvoiceFormComponent({
  props,
}: IProps<InvoiceFormComponentProps>): JSX.Element {
  const defaultValues = new InvoiceFormModel();
  const { t } = useTranslation();
  const { formComponent } = useComponentsStyles();

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

  const onSubmit = (data: InvoiceFormModel) => console.log(data.invoiceLine);

  /**
   * Handle switch of template by invoice type
   * @param invoicetype
   */
  const handleChangeType = (invoicetype: InvoiceType) => {
    setInvoiceType(invoicetype);
  };

  React.useEffect(() => {}, []);

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
        <Typography sx={formComponent.typography}>NOVA FAKTURA</Typography>
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
                <Grid item xs={12}>
                  <ClientComponent
                    props={{
                      control: control,
                      title: t(props.formGrpsSettings.client.title),
                      additional: { formSetValue: setValue, watch: watch },
                      clientFields: {
                        clientCompanyName: {
                          name: "client.companyName",
                          label: t(props.formFieldsLabels.client.companyName),
                          disabled: false,
                        },
                        clientAddress: {
                          name: "client.address",
                          label: t(props.formFieldsLabels.client.address),
                          disabled: false,
                        },
                        clientRegistrationCode: {
                          name: "client.registrationCode",
                          label: t(
                            props.formFieldsLabels.client.registrationCode
                          ),
                          disabled: false,
                        },
                        clientVatRegistrationCode: {
                          name: "client.vatRegistrationCode",
                          label: t(
                            props.formFieldsLabels.client.vatRegistrationCode
                          ),
                          disabled: false,
                        },
                      },
                    }}
                  ></ClientComponent>
                </Grid>
                <Grid item xs={3}>
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
                <Grid item xs={3}>
                  <FormTextField
                    props={{
                      name: "id",
                      control: control,
                      label: t(props.formFieldsLabels.id),
                      disabled: false,
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormTextField
                    props={{
                      name: "contractNumber",
                      control: control,
                      label: t(props.formFieldsLabels.contractNumber),
                      disabled: false,
                    }}
                  />
                  <FormTextField
                    props={{
                      name: "orderNumber",
                      control: control,
                      label: t(props.formFieldsLabels.orderNumber),
                      disabled: false,
                    }}
                  />
                  <FormTextField
                    props={{
                      name: "referenceNumber",
                      control: control,
                      label: t(props.formFieldsLabels.referenceNumber),
                      disabled: false,
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormTextField
                    props={{
                      name: "lotNumber",
                      control: control,
                      label: t(props.formFieldsLabels.lotNumber),
                      disabled: false,
                    }}
                  />
                  <FormTextField
                    props={{
                      name: "warehouse_uuid",
                      control: control,
                      label: t(props.formFieldsLabels.warehouse_uuid),
                      disabled: false,
                    }}
                  />
                  <FormTextField
                    props={{
                      name: "modelNumber",
                      control: control,
                      label: t(props.formFieldsLabels.modelNumber),
                      disabled: false,
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Grid item xs={12}>
            <IconButton
              color="primary"
              aria-label="TextsmsOutlinedIcon"
              size="large"
              disabled
              sx={{
                backgroundColor: "#f5f5f5",
                "&:disabled": {
                  backgroundColor: "#f5f5f5"
                }
              }}
            >
              <TextsmsOutlinedIcon />
            </IconButton>
          </Grid>
          <br />
          <Grid item xs={12}>
            <IconButton
              color="primary"
              aria-label="AttachFileIcon"
              size="large"
              disabled
              sx={{
                backgroundColor: "#f5f5f5",
                "&:disabled": {
                  backgroundColor: "#f5f5f5"
                }
              }}
            >
              <AttachFileIcon />
            </IconButton>
          </Grid>
          <br />
          <Grid item xs={12}>
            <IconButton
              color="primary"
              aria-label="RestoreRoundedIcon"
              size="large"
              disabled
              sx={{
                backgroundColor: "#f5f5f5",
                "&:disabled": {
                  backgroundColor: "#f5f5f5"
                }
              }}
            >
              <RestoreRoundedIcon />
            </IconButton>
          </Grid>
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
            <Paper style={formComponent.groupPaperLowScale}>
              <InvoiceItemsComponent
                props={{
                  control: control,
                  formSetValue: setValue,
                  formGetValues: getValues,
                  formWatch: watch,
                  fieldLabels: props.formFieldsLabels.invoiceItems,
                }}
              ></InvoiceItemsComponent>
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
                <Grid item xs={5}>
                  <FormCurrencyField
                    props={{
                      name: "finalSum",
                      control: control,
                      label: t(props.formFieldsLabels.finalSum),
                      additional: { mask: {}, readonly: true },
                      disabled: false,
                    }}
                  />
                </Grid>
                <Grid item xs={12} style={{ paddingTop: 0 }}>
                  <FormTextField
                    props={{
                      name: "finalSumLetters",
                      control: control,
                      label: t(props.formFieldsLabels.finalSumLetters),
                      disabled: true,
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
            <Typography sx={formComponent.typography}>
              {t(props.sectionTitles.title_4).toUpperCase()}
            </Typography>
            <Paper sx={formComponent.paper}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormCurrencyField
                    props={{
                      name: "iznosBezPopusta",
                      control: control,
                      label: "Ukupan iznos bez popusta",
                      additional: { mask: {}, readonly: false },
                      disabled: false,
                    }}
                  />
                  <FormCurrencyField
                    props={{
                      name: "taxableAmount",
                      control: control,
                      label: "Osnovica za PDV",
                      additional: { mask: {}, readonly: false },
                      disabled: false,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormCurrencyField
                    props={{
                      name: "ukupanPopust",
                      control: control,
                      label: "Ukupan iznos popusta",
                      additional: { mask: {}, readonly: false },
                      disabled: false,
                    }}
                  />
                  <FormCurrencyField
                    props={{
                      name: "taxAmount",
                      control: control,
                      label: "Iznos PDV",
                      additional: { mask: {}, readonly: false },
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
                    title: "DELETE",
                    disabled: false,
                    btnFn: () => reset(),
                  },
                  {
                    title: "DOWNLOAD",
                    disabled: false,
                    btnFn: handleSubmit(onSubmit),
                  },
                  {
                    title: "UPDATE",
                    disabled: false,
                    btnFn: () => reset(),
                  },
                  {
                    title: "SEND",
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
