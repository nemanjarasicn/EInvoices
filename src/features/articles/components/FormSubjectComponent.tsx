/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Button, Grid } from '@mui/material';
import { ArticlesFormComponentProps } from './ArticlesFormComponent';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import CustomButtonFc from '../../shared/components/CustomButtonFc';
import CustomButtonFcTra from '../../shared/components/CustomButtonFcTra';
import { IProps, SubjectFormModel } from '../models/articles.models';
import { useNavigate } from 'react-router-dom';
import ErrorModal from '../../shared/components/ErrorModals';
import { selectCompanyCurrent } from '../../../app/core/core.selectors';
import FormAutocompleteField from '../../shared/components/form-fields/FormAutocompleteField';
import { setopenModalCreateSubject } from '../store/articles.reducer';
import FormTextField from '../../shared/components/form-fields/FormTextField';
import {
  sendSubject,
  updateSubject,
  getSubjectDetails,
} from '../store/articles.actions';
import { setOpenModalSucessLoad } from '../../../app/core/core.reducer';
import {
  selectSubjectGategory,
  selectSubjectType,
} from '../../shared/components/form-fields/store/form.selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/pro-solid-svg-icons';
import {
  getSubjectCategory,
  getSubjectType,
} from '../../shared/components/form-fields/store/form.actions';
import { openCloseSucessModal } from '../../shared/utils/utils';

export default function FormSubjectComponent({
  props,
}: IProps<ArticlesFormComponentProps>): JSX.Element {
  const companyId = useAppSelector(selectCompanyCurrent);
  const { t } = useTranslation();
  const [disableJbkjs, setDisableJbkjs] = React.useState(true);
  const subjectCategoryTmp = useAppSelector(selectSubjectGategory);
  const subjectType = useAppSelector(selectSubjectType);
  const defaultValues: SubjectFormModel = {
    firstName: '',
    lastName: '',
    companyName: '',
    identificationNumber: '',
    pib: '',
    mb: '',
    companyId: companyId,
    address: '',
    city: '',
    zip: '',
    phone: '',
    email: '',
    jbkjs: '',
    subjectIdCategory: '',
    subjectIdType: '',
    payeeFinancialAccountDto: '',
    searchSubject: '',
  };

  /**
   * Register Form validation schema for every field
   */
  const schema = yup.object({
    companyName: yup.string().required(t('Validation.requiredField')),
    address: yup.string().required(t('Validation.requiredField')),
    city: yup.string().required(t('Validation.requiredField')),
    zip: yup.string().required(t('Validation.requiredField')),
    mb: yup.string().trim().required(t('Validation.requiredField')),
    pib: yup.string().trim().required(t('Validation.requiredField')),
    payeeFinancialAccountDto: yup
      .string()
      .required(t('Validation.requiredField')),
    email: yup
      .string()
      .email('email mora biti ispravnog formata')
      .required('ovo je obavezno polje'),
    subjectIdCategory: yup.object().required(t('Validation.requiredField')),
    subjectIdType: yup.object().required(t('Validation.requiredField')),
    jbkjs: yup
      .string()
      .test('', t('Validation.requiredField'), function (item) {
        if (disableJbkjs) {
          return true;
        } else {
          return this.parent.jbkjs;
        }
      }),
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showErrorModal, setShowErrorModal] = React.useState(false);
  const [errorMessageSearch, setErrorMessageSearch] = React.useState('');
  const marginTopBox = window.devicePixelRatio === 1.5 ? 2 : 5;
  const heightButton = window.devicePixelRatio === 1.5 ? '60%' : '63%';
  const buttonGrid = window.devicePixelRatio === 1.5 ? 7 : 8;

  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { handleSubmit, control, setValue, getValues, watch } = methods;

  React.useEffect(() => {
    dispatch(getSubjectCategory());
    dispatch(getSubjectType());
    if (props.flag === 'edit') {
      const subjectIdCategoryObject = subjectCategoryTmp.find(
        (item) => item.id === props.data.subjectIdCategory
      );
      const subjectIdTypeObject = subjectType.find(
        (item) => item.id === props.data.subjectIdType
      );
      setValue('companyName', props.data.companyName);
      setValue('mb', props.data.mb);

      setValue('city', props.data.city);
      setValue('phone', props.data.phone);
      setValue('pib', props.data.pib);
      setValue('address', props.data.address);
      setValue('zip', props.data.zip);
      setValue('email', props.data.email);
      setValue(
        'payeeFinancialAccountDto',
        props.data?.payeeFinancialAccountDto
          ? props.data.payeeFinancialAccountDto[0]?.payeeFinancialAccountValue
          : ''
      );
      setValue('subjectIdCategory', subjectIdCategoryObject);
      setValue('subjectIdType', subjectIdTypeObject);
      setValue('jbkjs', props.data.jbkjs);
    }
  }, []);

  const onSubmit = async (data: SubjectFormModel) => {
    const actionSubject =
      props.flag !== 'edit'
        ? sendSubject({ data })
        : updateSubject({
            idSubject: props.data.id,
            data: data,
            idpayeeFinancialAccountDto:
              props.data.payeeFinancialAccountDto[0]?.id,
          });

    await dispatch(actionSubject).then((res) => {
      if (res.payload === 'sucsess') {
        dispatch(setopenModalCreateSubject({ open: false }));
        openCloseSucessModal('/articles/subject', true, dispatch, navigate);
      } else {
        setShowErrorModal(true);
        setTimeout(() => {
          setShowErrorModal(false);
        }, 2000);
      }
    });
  };

  React.useEffect(() => {
    if (getValues('subjectIdCategory')) {
      const subjectCategory = getValues('subjectIdCategory');
      if (subjectCategory.name === 'Javna preduzeća') {
        setDisableJbkjs(false);
      } else {
        setDisableJbkjs(true);
      }
    }
  }, [watch('subjectIdCategory')]);

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
      <Grid
        container
        spacing={2}
        sx={{ minHeight: '300px', marginTop: '10px' }}
      >
        <Grid item xs={4}>
          <FormTextField
            props={{
              name: 'companyName',
              control: control,
              label: 'Naziv komitenta',
              additional: { mask: {}, readonly: false },
              disabled: false,
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <FormTextField
            props={{
              name: 'companyId',
              control: control,
              label: 'Id kompanije',
              additional: { mask: {}, readonly: true },
              disabled: true,
            }}
          />
          <FormTextField
            props={{
              name: 'mb',
              control: control,
              label: 'Matični broj',
              additional: { mask: {}, readonly: false },
              disabled: false,
            }}
          />
          <FormTextField
            props={{
              name: 'city',
              control: control,
              label: 'Grad',
              additional: { mask: {}, readonly: false },
              disabled: false,
            }}
          />

          <FormTextField
            props={{
              name: 'phone',
              control: control,
              label: 'Telefon',
              additional: { mask: {}, readonly: false },
              disabled: false,
            }}
          />
          <FormAutocompleteField
            props={{
              name: 'subjectIdCategory',
              control: control,
              label: 'Kategorija komitenta',
              disabled: true,
              additional: {
                selector: selectSubjectGategory,
                //data: dataObject
              },
            }}
          />

          <div style={{ visibility: disableJbkjs ? 'hidden' : 'visible' }}>
            <FormTextField
              props={{
                name: 'jbkjs',
                control: control,
                label: 'jbkjs',
                additional: { mask: {}, readonly: disableJbkjs },
                disabled: disableJbkjs,
              }}
            />
          </div>
        </Grid>
        <Grid item xs={4}>
          <Grid sx={{ display: 'flex' }}>
            <Grid item xs={buttonGrid}>
              <FormTextField
                props={{
                  name: 'pib',
                  control: control,
                  label: 'PIB',
                  additional: { mask: {}, readonly: false, borderButton: true },
                  disabled: false,
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
              name: 'address',
              control: control,
              label: 'Adresa',
              additional: { mask: {}, readonly: false },
              disabled: false,
            }}
          />

          <FormTextField
            props={{
              name: 'zip',
              control: control,
              label: 'Poštanski broj',
              additional: { mask: {}, readonly: false },
              disabled: false,
            }}
          />
          <FormTextField
            props={{
              name: 'email',
              control: control,
              label: 'Email',
              additional: { mask: {}, readonly: false },
              disabled: false,
            }}
          />

          <FormAutocompleteField
            props={{
              name: 'subjectIdType',
              control: control,
              label: 'Tip komitenta',
              disabled: true,
              additional: {
                selector: selectSubjectType,
                //data: dataObject
              },
            }}
          />
          <FormTextField
            props={{
              name: 'payeeFinancialAccountDto',
              control: control,
              label: 'Žiro račun',
              additional: { mask: {}, readonly: false },
              disabled: false,
            }}
          />
          <div style={{ visibility: 'hidden' }}>
            <FormTextField
              props={{
                name: 'identificationNumber',
                control: control,
                label: 'Indetifikacioni broj',
                additional: { mask: {}, readonly: false },
                disabled: false,
              }}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <span style={{ color: 'red' }}>{errorMessageSearch} </span>
        </Grid>
      </Grid>
      <Grid item xs={5} sx={{ mt: marginTopBox }}>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <CustomButtonFcTra
            soloButton={{
              title: 'Otkaži',
              disabled: false,
              btnFn: () => dispatch(setopenModalCreateSubject({ open: false })),
            }}
          />

          <CustomButtonFc
            soloButton={{
              title: 'SAČUVAJ',
              disabled: false,
              btnFn: handleSubmit(onSubmit),
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
