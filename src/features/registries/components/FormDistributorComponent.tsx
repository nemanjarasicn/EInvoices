import React from 'react';
import * as yup from 'yup';
import { Grid } from '@mui/material';
import { RegistriesFormComponentProps } from './RegistriesFormComponent';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DistributorFormModel, IProps } from '../models/registries.models';
import { sendDistributor } from '../store/registries.actions';
import FormTextField from '../../shared/components/form-fields/FormTextField';
import CustomButtonFc from '../../shared/components/CustomButtonFc';
import CustomButtonFcTra from '../../shared/components/CustomButtonFcTra';
import ErrorModal from '../../shared/components/ErrorModals';
import { setopenModalDistributor } from '../store/registries.reducer';
import { setOpenModalSucessLoad } from '../../../app/core/core.reducer';
import { openCloseSucessModal } from '../../shared/utils/utils';

/**
 * Register Form validation schema for every field
 */
const schema = yup
  .object({
    companyName: yup.string().required('ovo je obavezno polje'),
    pib: yup.string().required('ovo je obavezno polje'),
  })
  .required();

export default function FormDistributorComponent({
  props,
}: IProps<RegistriesFormComponentProps>): JSX.Element {
  const defaultValues: DistributorFormModel = {
    id: '',
    companyName: '',
    primaryVat: false,
    pib: '',
    date: '',
    mb: '',
    address: '',
    zip: '',
    city: '',
    country: '',
  };
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showErrorModal, setShowErrorModal] = React.useState(false);

  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { handleSubmit, control } = methods;

  const onSubmit = async (data: DistributorFormModel) => {
    dispatch(sendDistributor({ data })).then(async (res) => {
      if (res.payload.message === 'sucsses') {
        dispatch(setOpenModalSucessLoad(true));
        dispatch(setopenModalDistributor(false));
        openCloseSucessModal(
          '/registries/companies',
          false,
          dispatch,
          navigate
        );
      } else {
        setShowErrorModal(true);
        setTimeout(() => {
          setShowErrorModal(false);
        }, 2000);
      }
    });
  };

  return (
    <Grid item xs={12}>
      <ErrorModal open={showErrorModal}></ErrorModal>
      <Grid container spacing={2} sx={{ mt: 5 }}>
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
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            props={{
              control: control,
              name: 'pib',
              label: t(props.formFieldsLabels.companies.pib),
              disabled: false,
              additional: { readonly: false, labelShrink: true },
            }}
          />
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
        </Grid>
      </Grid>
      <Grid item xs={5} sx={{ mt: 5 }}>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <CustomButtonFcTra
            soloButton={{
              title: 'Otkaži',
              disabled: false,
              btnFn: () => dispatch(setopenModalDistributor(false)),
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
