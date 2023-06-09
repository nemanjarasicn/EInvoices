import React from 'react';
import * as yup from 'yup';
import { Paper, Grid, Button, Box } from '@mui/material';
import { RegistriesFormComponentProps } from './RegistriesFormComponent';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useComponentsStyles } from '../../shared/components/components.styles';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { CompanyFormModel, IProps } from '../models/registries.models';
import { sendCompanies, updateCompanies } from '../store/registries.actions';
import { selectUser } from '../../../app/core/core.selectors';
import FormTextField from '../../shared/components/form-fields/FormTextField';
import ErrorModal from '../../shared/components/ErrorModals';
import CustomButtonFc from '../../shared/components/CustomButtonFc';
import FormAutocompleteField from '../../shared/components/form-fields/FormAutocompleteField';
import {
  sendsubscribe,
  sendsubscribeUpdate,
} from '../store/registries.actions';
import { selectDistributor } from '../../shared/components/form-fields/store/form.selectors';
import { getDistributor } from '../../shared/components/form-fields/store/form.actions';
import { selectDistributorInfo } from '../../../app/core/core.selectors';
import { useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { faTrash } from '@fortawesome/pro-solid-svg-icons';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/pro-solid-svg-icons';
import { faArrowsRotate } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getSubjectDetails } from '../../articles/store/articles.actions';
import { openCloseSucessModal } from '../../shared/utils/utils';

export default function FormCompaniesComponent({
  props,
}: IProps<RegistriesFormComponentProps>): JSX.Element {
  const isDistributor =
    useAppSelector(selectUser)?.authorities?.slice(0, 1)[0].authority ===
    'ROLE_DISTRIBUTER'
      ? true
      : false;
  const idDistributor = useAppSelector(selectDistributorInfo)[0]?.idDistributor;
  const location = useLocation();
  const companyIdLocation = location.state.id;
  const companyData: any = location.state.data;
  const [listPayeeFinancialAccount, setListPayeeFinancialAccount] =
    React.useState<any[]>([]);

  /**
   * Register Form validation schema for every field
   */
  const schema = yup
    .object({
      companyName: yup.string().required('ovo je obavezno polje'),
      address: yup.string().trim().required('ovo je obavezno polje'),
      city: yup.string().trim().required('ovo je obavezno polje'),
      zip: yup.string().trim().required('ovo je obavezno polje'),
      mb: yup.string().trim().required('ovo je obavezno polje'),
      apiKey: yup.string().trim().required('ovo je obavezno polje'),
      country: yup.string().required('ovo je obavezno polje'),
      pib: yup.string().trim().required('ovo je obavezno polje'),
      payeeFinancialAccount: yup
        .string()
        .test('', 'Ovo polje je obavezno', function (item) {
          if (listPayeeFinancialAccount.length) {
            return true;
          } else {
            return false;
          }
        }),
      email: yup.string().trim().email('email mora biti ispravnog formata'),
    })
    .required();

  const defaultValues: CompanyFormModel = {
    id: '',
    companyName: '',
    primaryVat: false,
    pib: '',
    date: '',
    apiKey: '',
    mb: '',
    address: '',
    zip: '',
    city: '',
    country: '',
    distributor: isDistributor ? idDistributor : '',
    email: '',
    payeeFinancialAccount: '',
  };
  const { t } = useTranslation();
  const { formComponent } = useComponentsStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isAdmin =
    useAppSelector(selectUser)?.authorities?.slice(0, 1)[0].authority ===
    'ROLE_ADMIN'
      ? true
      : false;
  const userAuthority = isAdmin || isDistributor ? true : false;
  const distributorTmp = useAppSelector(selectDistributor);
  const [showErrorModal, setShowErrorModal] = React.useState(false);
  const [apiKeyDefault, setApiKeyDefault] = React.useState('');
  const [errorMessageSearch, setErrorMessageSearch] = React.useState('');
  const heightButton = window.devicePixelRatio === 1.5 ? '60%' : '63%';

  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { handleSubmit, reset, control, setValue, getValues } = methods;

  React.useEffect(() => {
    dispatch(getDistributor());

    if (companyIdLocation !== 0) {
      const distributorEdit = distributorTmp.find(
        (item) => item.id === companyData?.idDistributor
      );
      setValue('companyName', companyData?.companyName);
      setValue('address', companyData?.address);
      setValue('apiKey', companyData?.apiKey);
      setValue('country', companyData?.country);
      setValue('city', companyData?.city);

      setValue('mb', companyData?.mb);
      setValue('zip', companyData?.zip);
      setValue('pib', companyData?.pib);
      setValue('email', companyData?.email);

      setValue('distributor', distributorEdit);
      setListPayeeFinancialAccount(companyData?.payeeFinancialAccountDto);

      // we set apiKeyDefault when edit company
      setApiKeyDefault(companyData?.apiKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: CompanyFormModel) => {
    const actionCompanies =
      companyIdLocation === 0
        ? sendCompanies({
            data: data,
            listPayeeFinancialAccount: listPayeeFinancialAccount,
          })
        : updateCompanies({
            idCompany: companyIdLocation,
            data: data,
            idpayeeFinancialAccountDto: listPayeeFinancialAccount,
          });
    const navigateLoc = !(companyIdLocation === 0)
      ? '/registries/companies'
      : !userAuthority
      ? '/registries/companies'
      : '/registries/createObject';

    dispatch(actionCompanies as any).then(async (res: any) => {
      const stateTmp =
        companyIdLocation === 0
          ? {
              company: res.payload.data,
            }
          : '';
      if (res.payload.message === 'sucsses') {
        if (data.apiKey && companyIdLocation === 0) {
          dispatch(sendsubscribe({ data: res.payload.data }));
        } else if (data.apiKey !== apiKeyDefault) {
          dispatch(sendsubscribeUpdate({ data: res.payload.data }));
        }
        openCloseSucessModal(navigateLoc, false, dispatch, navigate, stateTmp);
      } else {
        setShowErrorModal(true);
        setTimeout(() => {
          setShowErrorModal(false);
        }, 2000);
      }
    });
  };

  const addPayeeFinancialAccount = () => {
    if (getValues('payeeFinancialAccount')) {
      setListPayeeFinancialAccount((prevState) => [
        ...prevState,
        {
          id: Math.random(),
          payeeFinancialAccountValue: getValues('payeeFinancialAccount'),
          status: 'INSERT',
        },
      ]);
      setValue('payeeFinancialAccount', '');
    }
  };

  const handleDeletePayeeFinancialAccount = (id: string | number) => {
    const newState = listPayeeFinancialAccount.filter((item) => item.id !== id);
    setListPayeeFinancialAccount(newState);
  };

  const handleEditPayeeFinancialAccount = (id: string | number) => {
    if (getValues('payeeFinancialAccount')) {
      const newState = listPayeeFinancialAccount.map((item) => {
        if (item?.id === id) {
          // Replacing with a new item, so the other component can understand it's a new item and re-render it.
          return {
            ...item,
            payeeFinancialAccountValue: getValues('payeeFinancialAccount'),
            status: 'UPDATE',
          };
        }

        // Return the same item, so the other component do not render since it's the same item.
        return item;
      });
      setListPayeeFinancialAccount(newState);
      setValue('payeeFinancialAccount', '');
    }
  };

  const handleFindSubject = () => {
    dispatch(getSubjectDetails({ pib: getValues('pib') })).then((res) => {
      if (res?.payload?.CompanyDataSet !== '') {
        setValue('pib', getValues('pib').toString());
        setValue('companyName', res?.payload?.CompanyDataSet?.Company?.Name);
        setValue('city', res?.payload?.CompanyDataSet?.Company?.City);
        setValue('address', res?.payload?.CompanyDataSet?.Company?.Address);
        setValue('zip', res?.payload?.CompanyDataSet?.Company?.PostalCode);
        setValue(
          'mb',
          res?.payload?.CompanyDataSet?.Company?.NationalIdentificationNumber
        );
        setErrorMessageSearch('');
      } else {
        setErrorMessageSearch('Ne postoji kompanija za izabrani PIB');
      }
    });
  };

  return (
    <Grid item xs={12}>
      <ErrorModal open={showErrorModal}></ErrorModal>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormTextField
            props={{
              control: control,
              name: 'companyName',
              label: t(props.formFieldsLabels.companies.companiName),
              disabled: false,
              additional: { readonly: false, labelShrink: true },
            }}
          />
          <FormTextField
            props={{
              control: control,
              name: 'address',
              label: t(props.formFieldsLabels.companies.adress),
              disabled: false,
              additional: { readonly: false, labelShrink: true },
            }}
          />
          <FormTextField
            props={{
              control: control,
              name: 'city',
              label: t(props.formFieldsLabels.companies.city),
              disabled: false,
              additional: { readonly: false, labelShrink: true },
            }}
          />
          <FormTextField
            props={{
              control: control,
              name: 'mb',
              label: t(props.formFieldsLabels.companies.mb),
              disabled: false,
              additional: { readonly: false, labelShrink: true },
            }}
          />

          <FormTextField
            props={{
              control: control,
              name: 'email',
              label: t(props.formFieldsLabels.companies.email),
              disabled: false,
              additional: { readonly: false, labelShrink: true },
            }}
          />
          <Grid item xs={12} sx={{ display: 'flex' }}>
            <Grid item xs={11}>
              <FormTextField
                props={{
                  control: control,
                  name: 'payeeFinancialAccount',
                  label: t(
                    props.formFieldsLabels.companies.payeeFinancialAccount
                  ),
                  disabled: false,
                  additional: { readonly: false, labelShrink: true },
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton
                sx={{ display: 'flex', justifyContent: 'center' }}
                color="primary"
                aria-label="pdf"
                component="label"
                onClick={() => addPayeeFinancialAccount()}
              >
                <FontAwesomeIcon icon={faPlus} color="#E9950C" />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
            {listPayeeFinancialAccount?.map((item, index) => (
              <Grid item xs={4} sx={{ display: 'flex' }}>
                <Grid item xs={1}>
                  {index + 1}.
                </Grid>
                <Grid item xs={9}>
                  {item?.payeeFinancialAccountValue}
                </Grid>
                <Grid item xs={2} sx={{ mt: -1 }}>
                  {item?.status && item?.status === 'INSERT' ? (
                    <IconButton
                      color="primary"
                      aria-label="add"
                      component="label"
                      onClick={() =>
                        handleDeletePayeeFinancialAccount(item?.id)
                      }
                    >
                      <FontAwesomeIcon icon={faTrash} color="#E9950C" />
                    </IconButton>
                  ) : (
                    <IconButton
                      color="primary"
                      aria-label="add"
                      component="label"
                      onClick={() => handleEditPayeeFinancialAccount(item?.id)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} color="#E9950C" />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid sx={{ display: 'flex' }}>
            <Grid item xs={11}>
              <FormTextField
                props={{
                  control: control,
                  name: 'pib',
                  label: t(props.formFieldsLabels.companies.pib),
                  disabled: false,
                  additional: {
                    readonly: false,
                    labelShrink: true,
                    borderButton: true,
                  },
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="outlined"
                sx={{
                  color: '#09C8C8',
                  borderColor: '#09C8C8',
                  height: heightButton,
                  borderRadius: 0,
                  borderBottomRightRadius: '5px',
                  borderTopRightRadius: '5px',
                }}
                onClick={() => handleFindSubject()}
                startIcon={<FontAwesomeIcon icon={faArrowsRotate} />}
              >
                NBS
              </Button>
            </Grid>
          </Grid>
          <FormTextField
            props={{
              control: control,
              name: 'zip',
              label: t(props.formFieldsLabels.companies.zip),
              disabled: false,
              additional: { readonly: false, labelShrink: true },
            }}
          />
          <FormTextField
            props={{
              control: control,
              name: 'country',
              label: t(props.formFieldsLabels.companies.country),
              disabled: false,
              additional: { readonly: false, labelShrink: true },
            }}
          />

          <FormTextField
            props={{
              control: control,
              name: 'apiKey',
              label: t(props.formFieldsLabels.companies.apyKey),
              disabled: false,
              additional: { readonly: false, labelShrink: true },
            }}
          />

          <div style={{ visibility: isDistributor ? 'hidden' : 'visible' }}>
            <FormAutocompleteField
              props={{
                name: 'distributor',
                control: control,
                label: t(props.formFieldsLabels.companies.distributor),
                disabled: true,
                additional: {
                  selector: selectDistributor,
                  disableOption: companyIdLocation === 0 ? false : true,
                  //data:  []
                },
              }}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <span style={{ color: 'red' }}>{errorMessageSearch}</span>
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <Box
          sx={{
            ...formComponent.basicBox,
            textAlign: 'end',
          }}
        >
          <Paper sx={formComponent.paper}>
            <CustomButtonFc
              groupButton={[
                {
                  title: 'DELETE',
                  disabled: true,
                  btnFn: () => reset(),
                },
                {
                  title: 'DOWNLOAD',
                  disabled: true,
                  btnFn: () => reset(),
                },
                {
                  title: 'UPDATE',
                  disabled: true,
                  btnFn: () => reset(),
                },
                {
                  title: 'SACUVAJ',
                  disabled: false,
                  btnFn: handleSubmit(onSubmit),
                },
              ]}
            />
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}
