/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Paper, Typography, Grid, Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { InvoiceFormModel, InvoiceType, IProps, ProductModel } from '../models';
import FormTextField from './form-fields/FormTextField';
import { yupResolver } from '@hookform/resolvers/yup';
import FormDropdownField from './form-fields/FormDropdownField';

import FormMultiSelect from '../../shared/components/form-fields/FormMultiSelect';
import { useTranslation } from 'react-i18next';
import { useComponentsStyles } from './components.styles';
import PrepaymentComponent from './form-group/PrepaymentComponent';
import InvoiceGroupComponent from './form-group/InvoiceGroupComponent';
import { selectOpenCreateSubject } from '../../articles/store/articles.selectors';
import ModalCreateSubject from '../../articles/components/ModalCreateSubject';
import ErrorModal from '../../shared/components/ErrorModals';
import {
  SourceSelectionMode,
  VATPointDate,
} from './form-fields/models/form-fields.models';
import CreditNoteComponent from './form-group/CreditNoteComponent';
import DebitNoteComponent from './form-group/DebitNoteComponent';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  getClientCompanies,
  getCurrentDocumentNumber,
  getMarketPlaces,
  getProducts,
  getInvoiceByType,
} from './form-fields/store/form.actions';
import {
  selectCurrentDocNumber,
  selectMarketPlaces,
  selectInvoiceByType,
} from './form-fields/store/form.selectors';
import ClientComponent from './form-group/ClientComponent';
import InvoiceItemsComponent from './invoice-items/InvoiceItemsComponent';
import {
  calculateBase,
  sumTax,
  totalWithDiscount,
  totalWithoutDiscount,
  returnInvoiceMessage,
} from '../utils/utils';
import { Subscription } from 'react-hook-form/dist/utils/createSubject';
import {
  selectCompanyCurrent,
  selectCompanyInfo,
} from '../../../app/core/core.selectors';
import {
  clearCompanies,
  clearDocumentTypes,
  clearMarketPlaces,
  clearProducts,
} from './form-fields/store/form.reducer';
import { sendInvoce } from '../store/invoice.actions';
import { useSchemaValidator } from '../utils/utils.schema';
import { useNavigate } from 'react-router-dom';
import FormTextBox from '../components/form-fields/FormTextBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclipVertical } from '@fortawesome/pro-solid-svg-icons';
import { selectOpenError } from '../store/invoice.selectors';
import { setopenModalError } from '../store/invoice.reducer';
import { getTaxBase } from '../../shared/components/form-fields/store/form.actions';
import { openCloseSucessModal } from '../../shared/utils/utils';

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
  const [jbkjsTmp, setJbkjsTmp] = React.useState('');
  const [selectionModeTmp, setSelectionModeTmp] = React.useState(0);
  const schema = useSchemaValidator(jbkjsTmp, selectionModeTmp);
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const companyId = useAppSelector(selectCompanyCurrent);
  const companyInfo = useAppSelector(selectCompanyInfo);
  const openModalCreateSubject = useAppSelector(selectOpenCreateSubject);

  const marketPlaces = useAppSelector(selectMarketPlaces);
  const [filesList, setFilesList] = React.useState<any[]>([]);
  const [errorMessage, setErrorMessage] = React.useState('');
  const id = useAppSelector(selectCurrentDocNumber);

  const [invoiceType, setInvoiceType] = React.useState<InvoiceType>(
    InvoiceType.INVOICE
  );

  const [lineError, setLineError] = React.useState<string | null>(null);
  const [advanceAccountList, setAdvanceAccountList] = React.useState<any[]>([]);
  const errorModalShow = useAppSelector(selectOpenError);

  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { handleSubmit, reset, control, setValue, getValues, watch } = methods;

  const onSubmit = handleSubmit(
    (data: InvoiceFormModel) => {
      dispatch(
        sendInvoce({
          invoice: data,
          companyInfo: companyInfo,
          filesList: filesList,
          advanceAccountList: advanceAccountList,
        })
      ).then((res) => {
        if (res.payload.message === 'REDIRECT') {
          openCloseSucessModal('/invoices/sales', false, dispatch, navigate);
        } else {
          const error = res.payload?.error?.response?.data?.description;
          //setShowErrorModal(true);
          dispatch(setopenModalError(true));
          setErrorMessage(returnInvoiceMessage(error));
        }
      });
    },
    (err: any) => {
      console.log('Error', err);
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

  const addAdvanceAcount = (value: any[]) => {
    setAdvanceAccountList(value);
  };

  /**
   * Handle values patch form fields
   */
  const patchFormFields = (
    invoiceLine: ProductModel[],
    finalSum: number
  ): void => {
    setValue(
      'priceWithoutDiscount',
      totalWithoutDiscount(invoiceLine as ProductModel[])
    );
    setValue(
      'sumWithDiscount',
      totalWithDiscount(invoiceLine as ProductModel[])
    );
    const _sumTax: number = sumTax(invoiceLine as ProductModel[]);
    setValue('taxAmount', _sumTax);
    setValue('taxableAmount', calculateBase(finalSum as number, _sumTax));
  };

  React.useEffect(() => {
    dispatch(getMarketPlaces({ companyId: companyId }));
    dispatch(getClientCompanies({ companyId: companyId }));
    dispatch(getCurrentDocumentNumber({ companyId: companyId }));
    dispatch(getInvoiceByType({ companyId: companyId }));
    dispatch(getTaxBase({ id: 1 }));
  }, []);

  React.useEffect(() => {
    if (marketPlaces.length) {
      setValue('warehouse_uuid', marketPlaces[0].value);
    }
  }, [marketPlaces]);

  React.useEffect(() => {
    if (id) {
      setValue('id', id);
    }
  }, [id]);

  const watchFields = watch('warehouse_uuid');
  React.useEffect(() => {
    if (watchFields)
      dispatch(getProducts({ marketPlace: watchFields as string }));
  }, [watchFields]);

  React.useEffect(() => {
    const subscription: Subscription = watch((value, { name, type }) => {
      switch (name) {
        case 'finalSum':
          patchFormFields(
            value.invoiceLine as ProductModel[],
            value.finalSum as number
          );
          break;
        case 'invoiceLine':
          if (value.invoiceLine?.length) setLineError(null);
          patchFormFields(
            value.invoiceLine as ProductModel[],
            value.finalSum as number
          );
          break;
        case 'warehouse_uuid':
          setValue('finalSum', 0);
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
      dispatch(clearDocumentTypes({}));
    },
    []
  );

  React.useEffect(() => {
    const jbkjsUse = getValues('accountingCustomerParty.jbkjs')
      ? String(getValues('accountingCustomerParty.jbkjs'))
      : '';
    setJbkjsTmp(jbkjsUse);
  }, [watch('accountingCustomerParty')]);

  React.useEffect(() => {
    const selectionMode = getValues('sourceInvoiceSelectionMode')
      ? getValues('sourceInvoiceSelectionMode')
      : 0;
    setSelectionModeTmp(selectionMode);
  }, [watch('sourceInvoiceSelectionMode')]);

  const UploudComponent = () => {
    //const fileInput: MutableRefObject<HTMLDivElement> = React.useRef(null);
    const onChange = (e: any) => {
      let files = e.target.files;
      let filesArr = Array.prototype.slice.call(files);
      setFilesList([...filesList, ...filesArr]);
    };

    return (
      <Grid item xs={12} sx={{ display: 'flex' }}>
        <Grid item xs={4}>
          <Button variant="contained" component="label">
            <div>
              <FontAwesomeIcon icon={faPaperclipVertical} color="#E9950C" />
            </div>
            <div style={{ paddingLeft: '5px' }}>DODAJ PRILOG</div>
            <input onChange={onChange} multiple type="file" hidden />
          </Button>
        </Grid>
        <Grid item xs={6}>
          {filesList.map((item, index) => (
            <Grid container>
              <Grid item xs={1}>
                {index}.
              </Grid>
              <Grid item xs={11}>
                {item?.name}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <ErrorModal open={errorModalShow} message={errorMessage}></ErrorModal>
      <ModalCreateSubject
        open={openModalCreateSubject.open}
      ></ModalCreateSubject>
      <Box
        sx={{
          flexGrow: 1,
          rowGap: 1,
          display: 'flex',
          flexDirection: 'column',
          mt: '20px',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                ...formComponent.basicBox,
                textAlign: 'start',
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
                            name: 'accountingCustomerParty.partyLegalEntity.registrationName',
                            label: t(props.formFieldsLabels.client.companyName),
                            disabled: false,
                            additional: { readonly: true, labelShrink: true },
                          },
                          clientAddress: {
                            name: 'accountingCustomerParty.postalAddress.streetName',
                            label: t(props.formFieldsLabels.client.address),
                            disabled: false,
                            additional: { readonly: true, labelShrink: true },
                          },
                          clientRegistrationCode: {
                            name: 'accountingCustomerParty.partyLegalEntity.companyID',
                            label: t(
                              props.formFieldsLabels.client.registrationCode
                            ),
                            disabled: false,
                            additional: { readonly: true, labelShrink: true },
                          },
                          clientVatRegistrationCode: {
                            name: 'accountingCustomerParty.party.endpointID',
                            label: t(
                              props.formFieldsLabels.client.vatRegistrationCode
                            ),
                            disabled: false,
                            additional: { readonly: true, labelShrink: true },
                          },
                          clientEmail: {
                            name: 'accountingCustomerParty.contact.electronicMail',
                            label: t(props.formFieldsLabels.client.clientEmail),
                            disabled: false,
                            additional: { readonly: true, labelShrink: true },
                          },
                          clientCity: {
                            name: 'accountingCustomerParty.postalAddress.cityName',
                            label: t(props.formFieldsLabels.client.clientCity),
                            disabled: false,
                            additional: { readonly: true, labelShrink: true },
                          },
                          zipCode: {
                            name: 'accountingCustomerParty.postalAddress.zip',
                            label: t(props.formFieldsLabels.client.zipCode),
                            disabled: false,
                            additional: { readonly: true, labelShrink: true },
                          },
                        },
                      }}
                    ></ClientComponent>
                  </Grid>
                  <Grid item xs={6} sx={{ display: 'flex' }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <FormDropdownField
                          props={{
                            name: 'invoiceTypeCode',
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
                            name: 'id',
                            control: control,
                            label: t(props.formFieldsLabels.id),
                            disabled: false,
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          mt: -2,
                        }}
                      >
                        <FormTextBox
                          props={{
                            name: 'note',
                            control: control,
                            label: t('Form.formFieldsLabels.note'),
                            disabled: false,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={3}>
                    <FormTextField
                      props={{
                        name: 'contractNumber',
                        control: control,
                        label: t(props.formFieldsLabels.contractNumber),
                        disabled: false,
                      }}
                    />
                    <FormTextField
                      props={{
                        name: 'orderNumber',
                        control: control,
                        label: t(props.formFieldsLabels.orderNumber),
                        disabled: false,
                      }}
                    />
                    <FormTextField
                      props={{
                        name: 'referenceNumber',
                        control: control,
                        label: t(props.formFieldsLabels.referenceNumber),
                        disabled: false,
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormTextField
                      props={{
                        name: 'lotNumber',
                        control: control,
                        label: t(props.formFieldsLabels.lotNumber),
                        disabled: false,
                      }}
                    />
                    <FormDropdownField
                      props={{
                        name: 'warehouse_uuid',
                        control: control,
                        label: t(props.formFieldsLabels.warehouse_uuid),
                        disabled: false,
                        options: marketPlaces,
                      }}
                    />
                    <FormTextField
                      props={{
                        name: 'modelNumber',
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
                                    name: 'issueDate',
                                    label: t(
                                      'Form.formGrpLabels.invoiceGrp.issueDate'
                                    ),
                                    disabled: false,
                                    /*additional: {
                                    disablePast: true,
                                  },*/
                                  },
                                  deliveryDate: {
                                    name: 'deliveryDate',
                                    label: t(
                                      'Form.formGrpLabels.invoiceGrp.issueDate'
                                    ),
                                    disabled: false,
                                  },
                                  dueDate: {
                                    name: 'dueDate',
                                    label: t(
                                      'Form.formGrpLabels.invoiceGrp.dueDate'
                                    ),
                                    disabled: false,
                                  },
                                  vatPointDate: {
                                    name: 'vatPointDate',
                                    label: t(
                                      'Form.formGrpLabels.invoiceGrp.vatPointDate'
                                    ),
                                    disabled: false,
                                    options: [
                                      {
                                        name: t(
                                          'Form.vatPointDateOptions.issuingDate'
                                        ),
                                        value: VATPointDate.ISSUING_DATE,
                                      },
                                      {
                                        name: t(
                                          'Form.vatPointDateOptions.deliveryDate'
                                        ),
                                        value: VATPointDate.DELIVERY_DATE,
                                      },
                                      {
                                        name: t(
                                          'Form.vatPointDateOptions.paymentDate'
                                        ),
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
                                    name: 'issueDate',
                                    label: t(
                                      'Form.formGrpLabels.invoiceGrp.issueDate'
                                    ),
                                    disabled: false,
                                    additional: {
                                      disablePast: true,
                                    },
                                  },
                                  deliveryDate: {
                                    name: 'deliveryDate',
                                    label: t(
                                      'Form.formGrpLabels.invoiceGrp.issueDate'
                                    ),
                                    disabled: false,
                                    additional: {
                                      disablePast: true,
                                    },
                                  },
                                  vatPointDate: {
                                    name: 'vatPointDate',
                                    label: t(
                                      'Form.formGrpLabels.invoiceGrp.vatPointDate'
                                    ),
                                    disabled: false,
                                    options: [
                                      {
                                        name: t(
                                          'Form.vatPointDateOptions.paymentDate'
                                        ),
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
                                    name: 'sourceInvoiceSelectionMode',
                                    label: t(
                                      'Form.formGrpLabels.creditNoteGrp.sourceMode'
                                    ),
                                    disabled: false,
                                    options: [
                                      {
                                        name: t(
                                          'Form.selectionModeOptions.single'
                                        ),
                                        value: SourceSelectionMode.SINGLE,
                                      },
                                      {
                                        name: t(
                                          'Form.selectionModeOptions.period'
                                        ),
                                        value: SourceSelectionMode.PERIOD,
                                      },
                                    ],
                                  },
                                  sourceInvoice: {
                                    name: 'sourceInvoice',
                                    label: t(
                                      'Form.formGrpLabels.creditNoteGrp.sourceInvoice'
                                    ),
                                    disabled: false,
                                  },
                                  modePeriodFrom: {
                                    name: 'modePeriodFrom',
                                    label: t(
                                      'Form.formGrpLabels.creditNoteGrp.modePeriodFrom'
                                    ),
                                    disabled: false,
                                  },
                                  modePeriodTo: {
                                    name: 'modePeriodTo',
                                    label: t(
                                      'Form.formGrpLabels.creditNoteGrp.modePeriodTo'
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
                                    name: 'sourceInvoiceSelectionMode',
                                    label: t(
                                      'Form.formGrpLabels.creditNoteGrp.sourceMode'
                                    ),
                                    disabled: false,
                                    options: [
                                      {
                                        name: t(
                                          'Form.selectionModeOptions.single'
                                        ),
                                        value: SourceSelectionMode.SINGLE,
                                      },
                                      {
                                        name: t(
                                          'Form.selectionModeOptions.period'
                                        ),
                                        value: SourceSelectionMode.PERIOD,
                                      },
                                    ],
                                  },
                                  sourceInvoice: {
                                    name: 'sourceInvoice',
                                    label: t(
                                      'Form.formGrpLabels.creditNoteGrp.sourceInvoice'
                                    ),
                                    disabled: false,
                                  },
                                  modePeriodFrom: {
                                    name: 'modePeriodFrom',
                                    label: t(
                                      'Form.formGrpLabels.creditNoteGrp.modePeriodFrom'
                                    ),
                                    disabled: false,
                                  },
                                  modePeriodTo: {
                                    name: 'modePeriodTo',
                                    label: t(
                                      'Form.formGrpLabels.creditNoteGrp.modePeriodTo'
                                    ),
                                    disabled: false,
                                  },
                                  dueDate: {
                                    name: 'dueDate',
                                    label: t(
                                      'Form.formGrpLabels.invoiceGrp.dueDate'
                                    ),
                                    disabled: false,
                                  },
                                  vatPointDate: {
                                    name: 'vatPointDate',
                                    label: t(
                                      'Form.formGrpLabels.invoiceGrp.vatPointDate'
                                    ),
                                    disabled: false,
                                    options: [
                                      {
                                        name: t(
                                          'Form.vatPointDateOptions.paymentDate'
                                        ),
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
                          throw new Error('No such invoice type');
                      }
                    })()}
                  </Grid>
                  <Grid item xs={4}>
                    <UploudComponent />
                  </Grid>
                  {invoiceType === InvoiceType.INVOICE && (
                    <Grid item xs={12}>
                      <Grid item xs={4}>
                        <FormMultiSelect
                          props={{
                            name: 'advanceAccount',
                            control: control,
                            label: 'Avansni račun',
                            disabled: false,
                            additional: {
                              selector: selectInvoiceByType,
                              parentFn: addAdvanceAcount,
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                ...formComponent.basicBox,
                textAlign: 'start',
                borderColor: () => (lineError ? 'red' : 'grey.100'),
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={formComponent.typography}>
                  {t(props.sectionTitles.title_2).toUpperCase()}
                </Typography>
                <Typography color="error" sx={{ textAlign: 'center' }}>
                  {lineError ?? ''}
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
                    reset: reset,
                  }}
                ></InvoiceItemsComponent>
              </Paper>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={4} ml={1}>
            <Paper style={formComponent.groupPaper}>
              <Grid container spacing={2}>
                <Grid item xs={4}></Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={6} sx={{ display: 'flex' }}>
                  <Button
                    sx={{
                      width: '150px',
                      borderRadius: '30px',
                      float: 'right',
                      mr: 1,
                    }}
                    size="large"
                    variant="outlined"
                    onClick={() => navigate('/invoices/sales')}
                  >
                    {t('Common.cancell')}
                  </Button>
                  <Button
                    sx={{
                      width: '150px',
                      borderRadius: '30px',
                      float: 'right',
                    }}
                    size="large"
                    variant="outlined"
                    onClick={onSubmit}
                  >
                    {t('Common.send')}
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
