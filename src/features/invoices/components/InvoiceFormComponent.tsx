/* eslint-disable react-hooks/exhaustive-deps */
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
  Button,
  TextField
} from "@mui/material";
import { useForm } from "react-hook-form";
import { InvoiceFormModel, InvoiceType, IProps, ProductModel } from "../models";
import FormTextField from "./form-fields/FormTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import FormDropdownField from "./form-fields/FormDropdownField";
import FormTextAreaField from "./form-fields/FormTextAreaField";
import FormDateField from "./form-fields/FormDateField";
import {FormAutocompleteField} from "./form-fields/FormAutocompleteField";
import { useTranslation } from "react-i18next";
import { useComponentsStyles } from "./components.styles";
import CustomButtonFc from "./CustomButtonFc";
import FormCheckboxField from "./form-fields/FormCheckboxField";
import FormCurrencyField from "./form-fields/FormCurrencyField";
import PrepaymentComponent from "./form-group/PrepaymentComponent";
import InvoiceGroupComponent from "./form-group/InvoiceGroupComponent";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SucessModal   from "../../shared/components/SucessModal"
import { selectOpenCreateSubject }  from "../../articles/store/articles.selectors"
import ModalCreateSubject from "../../articles/components/ModalCreateSubject";
import RestoreRoundedIcon from "@mui/icons-material/RestoreRounded";
import  ErrorModal   from   "../../shared/components/ErrorModals"
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import {
  OptionItem,
  SourceSelectionMode,
  VATPointDate,
} from "./form-fields/models/form-fields.models";
import CreditNoteComponent from "./form-group/CreditNoteComponent";
import DebitNoteComponent from "./form-group/DebitNoteComponent";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  getClientCompanies,
  getCurrentDocumentNumber,
  getDocumentTypes,
  getMarketPlaces,
  getProducts,
} from "./form-fields/store/form.actions";
import {
  selectClientCompanies,
  selectCurrentDocNumber,
  selectMarketPlaces,
} from "./form-fields/store/form.selectors";
import ClientComponent from "./form-group/ClientComponent";
import InvoiceItemsComponent from "./invoice-items/InvoiceItemsComponent";
import {
  calculateBase,
  sumTax,
  totalWithDiscount,
  totalWithoutDiscount,
} from "../utils/utils";
import { Subscription } from "react-hook-form/dist/utils/createSubject";
import { selectCompanyCurrent, selectCompanyInfo } from "../../../app/core/core.selectors";
import {
  clearCompanies,
  clearDocumentTypes,
  clearMarketPlaces,
  clearProducts,
} from "./form-fields/store/form.reducer";
import { sendInvoce } from "../store/invoice.actions";
import { useSchemaValidator } from "../utils/utils.schema";
import { useNavigate } from "react-router-dom";

export type InvoiceFormComponentProps = {
  invoiceTypeOptions: any;
  sectionTitles: any;
  formGrpsSettings: any;
  formFieldsLabels: any;
};

export default function InvoiceFormComponent({
  props,
}: IProps<InvoiceFormComponentProps>): JSX.Element {
  const defaultValues = new InvoiceFormModel();
  const { t } = useTranslation();
  const { formComponent } = useComponentsStyles();
  const schema = useSchemaValidator();
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const companyId = useAppSelector(selectCompanyCurrent);
  const companyInfo = useAppSelector(selectCompanyInfo);
  const openModalCreateSubject = useAppSelector(selectOpenCreateSubject);

  const marketPlaces = useAppSelector(selectMarketPlaces);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [showErrorModal, setShowErrorModal] = React.useState(false);
  const id = useAppSelector(selectCurrentDocNumber);

  const [invoiceType, setInvoiceType] = React.useState<InvoiceType>(
    InvoiceType.INVOICE
  );

  const [lineError, setLineError] = React.useState<string | null>(null);
  const [showError, setShowError] = React.useState(false);

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
    setError,
  } = methods;

  const onSubmit = handleSubmit(
    (data: InvoiceFormModel) => {
      dispatch(sendInvoce({ invoice: data, companyInfo: companyInfo })).then((res) => {
        if (res.payload.message === "REDIRECT") {
           setShowError(true);  
              setTimeout(async () => {
                    setShowError(false);
                    navigate("/invoices/sales");
                    
              }, 2000);
        } else {
          setShowErrorModal(true); 
          setErrorMessage(res.payload?.error?.response?.data?.description) 
              setTimeout(() => {
                    setShowErrorModal(false);
                    setErrorMessage("")
                    /*navigate('/registries/companies'
                    )*/
              }, 2000);
        }
      });
    },
    (err: any) => {
      console.log("Error", err);
      if (err.invoiceLine) setLineError(err.invoiceLine.message);
    }
  );

  /**
   * Handle switch of template by invoice type
   * @param invoicetype
   */
  const handleChangeType = (invoicetype: InvoiceType): void => {
    setInvoiceType(invoicetype);
  };

  /**
   * Handle values patch form fields
   */
  const patchFormFields = (
    invoiceLine: ProductModel[],
    finalSum: number
  ): void => {
    setValue(
      "priceWithoutDiscount",
      totalWithoutDiscount(invoiceLine as ProductModel[])
    );
    setValue(
      "sumWithDiscount",
      totalWithDiscount(invoiceLine as ProductModel[])
    );
    const _sumTax: number = sumTax(invoiceLine as ProductModel[]);
    setValue("taxAmount", _sumTax);
    setValue("taxableAmount", calculateBase(finalSum as number, _sumTax));
  };

  React.useEffect(() => {
    dispatch(getMarketPlaces({ companyId: companyId }));
    dispatch(getClientCompanies({ companyId: companyId }));
    dispatch(getCurrentDocumentNumber({ companyId: companyId }));
    dispatch(getDocumentTypes());
  }, []);

  React.useEffect(() => {
    if (marketPlaces.length) {
      setValue("warehouse_uuid", marketPlaces[0].value);
    }
  }, [marketPlaces]);

  React.useEffect(() => {
    if (id) {
      setValue("id", id);
    }
  }, [id]);

  const watchFields = watch("warehouse_uuid");
  React.useEffect(() => {
    if (watchFields)
      dispatch(getProducts({ marketPlace: watchFields as string }));
  }, [watchFields]);

  React.useEffect(() => {
    const subscription: Subscription = watch((value, { name, type }) => {
      switch (name) {
        case "finalSum":
          patchFormFields(
            value.invoiceLine as ProductModel[],
            value.finalSum as number
          );
          break;
        case "invoiceLine":
          if (value.invoiceLine?.length) setLineError(null);
          patchFormFields(
            value.invoiceLine as ProductModel[],
            value.finalSum as number
          );
          break;
        case "warehouse_uuid":
          setValue("finalSum", 0);
          break;
        default:
          break;
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  /**
   *  Unmount
   */
  React.useEffect(
    () => () => {
      dispatch(clearProducts({}));
      dispatch(clearCompanies({}));
      dispatch(clearMarketPlaces({}));
      dispatch(clearDocumentTypes({}));
    },
    []
  );

  return (
    <>
    <SucessModal    open={showError} ></SucessModal>
    <ErrorModal    open={showErrorModal}  message={errorMessage} ></ErrorModal>
    <ModalCreateSubject    open={openModalCreateSubject} ></ModalCreateSubject>
    <Box
      sx={{ flexGrow: 1, rowGap: 1, display: "flex", flexDirection: "column", mt: '20px' }}
    >
      {/*<Box
        sx={{
          ...formComponent.basicBox,
          width: "25%",
          textAlign: "center",
        }}
      >
        <Typography sx={formComponent.typography}>
          {t("Common.newInvoice").toUpperCase()}
        </Typography>
      </Box>*/}
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
                      additional: {
                        formSetValue: setValue,
                      },
                      clientFields: {
                        clientCompanyName: {
                          name: "accountingCustomerParty.partyLegalEntity.registrationName",
                          label: t(props.formFieldsLabels.client.companyName),
                          disabled: false,
                          additional: { readonly: true, labelShrink: true },
                        },
                        clientAddress: {
                          name: "accountingCustomerParty.postalAddress.streetName",
                          label: t(props.formFieldsLabels.client.address),
                          disabled: false,
                          additional: { readonly: true, labelShrink: true },
                        },
                        clientRegistrationCode: {
                          name: "accountingCustomerParty.partyLegalEntity.companyID",
                          label: t(
                            props.formFieldsLabels.client.registrationCode
                          ),
                          disabled: false,
                          additional: { readonly: true, labelShrink: true },
                        },
                        clientVatRegistrationCode: {
                          name: "accountingCustomerParty.party.endpointID",
                          label: t(
                            props.formFieldsLabels.client.vatRegistrationCode
                          ),
                          disabled: false,
                          additional: { readonly: true, labelShrink: true },
                        },
                        clientEmail: {
                          name: "accountingCustomerParty.contact.electronicMail",
                          label: t(props.formFieldsLabels.client.clientEmail),
                          disabled: false,
                          additional: { readonly: true, labelShrink: true },
                        },
                        clientCity: {
                          name: "accountingCustomerParty.postalAddress.cityName",
                          label: t(props.formFieldsLabels.client.clientCity),
                          disabled: false,
                          additional: { readonly: true, labelShrink: true },
                        },
                        zipCode: {
                          name: "accountingCustomerParty.postalAddress.zip",
                          label: t(props.formFieldsLabels.client.zipCode),
                          disabled: false,
                          additional: { readonly: true, labelShrink: true },
                        },
                      },
                    }}
                  ></ClientComponent>
                </Grid>
                <Grid item xs={6} sx={{display:  'flex'}} >
                <Grid container spacing={2}>
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
                        <FormTextField
                          props={{
                            name: "id",
                            control: control,
                            label: t(props.formFieldsLabels.id),
                            disabled: false,
                          }}
                        />
                    </Grid>
                    <Grid item xs={12}  sx={{display:  'flex', justifyContent:  'center', alignItems:   'center', mt: -10}} >
                    <TextField
                          sx={{width:  '100%'}}
                          placeholder =  {t("Form.formFieldsLabels.note")}
                          multiline
                          rows={3}
                          
                        />
                    </Grid>
                </Grid>
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
                  <FormDropdownField
                    props={{
                      name: "warehouse_uuid",
                      control: control,
                      label: t(props.formFieldsLabels.warehouse_uuid),
                      disabled: false,
                      options: marketPlaces,
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
                <Grid item xs={12}>
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
              </Grid>
            </Paper>
          </Box>
        </Grid>
        {/*<Grid item xs={2}>
          <Grid item xs={12}>
            <IconButton
              color="primary"
              aria-label="TextsmsOutlinedIcon"
              size="large"
              disabled
              sx={{
                backgroundColor: "#f5f5f5",
                "&:disabled": {
                  backgroundColor: "#f5f5f5",
                },
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
                  backgroundColor: "#f5f5f5",
                },
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
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <RestoreRoundedIcon />
            </IconButton>
          </Grid>
            </Grid>*/}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              ...formComponent.basicBox,
              textAlign: "start",
              borderColor: () => (lineError ? "red" : "grey.100"),
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={formComponent.typography}>
                {t(props.sectionTitles.title_2).toUpperCase()}
              </Typography>
              <Typography color="error" sx={{ textAlign: "center" }}>
                {lineError ?? ""}
              </Typography>
            </div>
            <Paper style={formComponent.groupPaperLowScale}>
              <InvoiceItemsComponent
                props={{
                  control: control,
                  formSetValue: setValue,
                  formGetValues: getValues,
                  formWatch: watch,
                  fieldLabels: props.formFieldsLabels.invoiceItems,
                  reset: reset
                }}
              ></InvoiceItemsComponent>
            </Paper>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {/*<Grid item xs={6}>
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
        </Grid>*/}
        <Grid item xs={4}   ml={1}>
          {/*<Box
            sx={{
              ...formComponent.basicBox,
              textAlign: "start",
              marginBottom: "1rem",
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
                      name: "priceWithoutDiscount",
                      control: control,
                      label: t(props.formFieldsLabels.priceWithoutDiscount),
                      additional: { mask: {}, readonly: true },
                      disabled: false,
                    }}
                  />
                  <FormCurrencyField
                    props={{
                      name: "taxableAmount",
                      control: control,
                      label: t(props.formFieldsLabels.taxableAmount),
                      additional: { mask: {}, readonly: true },
                      disabled: false,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormCurrencyField
                    props={{
                      name: "sumWithDiscount",
                      control: control,
                      label: t(props.formFieldsLabels.sumWithDiscount),
                      additional: { mask: {}, readonly: true },
                      disabled: false,
                    }}
                  />
                  <FormCurrencyField
                    props={{
                      name: "taxAmount",
                      control: control,
                      label: t(props.formFieldsLabels.taxAmount),
                      additional: { mask: {}, readonly: true },
                      disabled: false,
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
                  </Box>*/}
          
            {/*<Typography sx={formComponent.typography}>
              {t(props.sectionTitles.title_3).toUpperCase()}
                </Typography>*/}
            <Paper style={formComponent.groupPaper}>
              <Grid container spacing={2}>
                 {/*<Grid item xs={3}>
                  <FormCurrencyField
                    props={{
                      name: "finalSum",
                      control: control,
                      label: t(props.formFieldsLabels.finalSum),
                      additional: { mask: {}, readonly: true },
                      disabled: false,
                    }}
                  />
                  </Grid>*/}
                <Grid item xs={4}></Grid>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={6}  sx={{display:  'flex'}}>
                <Button
                    sx={{
                      width: "150px",
                      borderRadius: "30px",
                      float: "right",
                      mr: 1
                    }}
                    size="large"
                    variant="outlined"
                    onClick={() => navigate("/invoices/sales")}
                  >
                    {t('Common.cancell')}
                  </Button>
                  <Button
                    sx={{
                      width: "150px",
                      borderRadius: "30px",
                      float: "right",
                    }}
                    size="large"
                    variant="outlined"
                    onClick={onSubmit}
                  >
                    {t("Common.send")}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          
        </Grid>
      </Grid>
    </Box>
    </>
  );
}
