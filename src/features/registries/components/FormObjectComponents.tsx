import React from 'react';
import * as yup from 'yup';
import { Paper, Grid, Box } from '@mui/material';
import { RegistriesFormComponentProps } from './RegistriesFormComponent';
import { useTranslation } from 'react-i18next';
import { useComponentsStyles } from '../../shared/components/components.styles';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ObjectFormModel, IProps } from '../models/registries.models';
import { selectClientCompanies } from '../../shared/components/form-fields/store/form.selectors';
import { useNavigate } from 'react-router-dom';
import FormAutocompleteField from '../../shared/components/form-fields/FormAutocompleteField';
import FormTextField from '../../shared/components/form-fields/FormTextField';
import CustomButtonFc from '../../shared/components/CustomButtonFc';
import { sendObjects } from '../store/registries.actions';
import { selectUser } from '../../../app/core/core.selectors';
import ErrorModal from '../../shared/components/ErrorModals';
import { getCompaniesAll } from '../../shared/components/form-fields/store/form.actions';
import { useLocation } from 'react-router-dom';
import { openCloseSucessModal } from '../../shared/utils/utils';

/**
 * Register Form validation schema for every field
 */
const schema = yup
  .object({
    objectName: yup.string().required('ovo je obavezno polje'),
    latitude: yup.string().required('ovo je obavezno polje'),
    longitude: yup.string().required('ovo je obavezno polje'),
  })
  .required();

export default function FormObjectComponent({
  props,
}: IProps<RegistriesFormComponentProps>): JSX.Element {
  const location = useLocation();
  const id = location.state.company?.idCompany;
  const defaultValues: ObjectFormModel = {
    id: '',
    companyId: id,
    objectName: '',
    latitude: '',
    longitude: '',
  };
  const { t } = useTranslation();
  const { formComponent } = useComponentsStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isDistributor =
    useAppSelector(selectUser)?.authorities?.slice(0, 1)[0].authority ===
    'ROLE_DISTRIBUTER'
      ? true
      : false;
  const isAdmin =
    useAppSelector(selectUser)?.authorities?.slice(0, 1)[0].authority ===
    'ROLE_ADMIN'
      ? true
      : false;
  const userAuthority = isAdmin || isDistributor ? true : false;
  const [showErrorModal, setShowErrorModal] = React.useState(false);

  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { handleSubmit, reset, control } = methods;

  const onSubmit = (data: ObjectFormModel) => {
    const navigateLoc = !userAuthority
      ? '/registries/objects'
      : '/registries/createMarketPlace';

    const stateTmp = !userAuthority
      ? ''
      : {
          company: id,
        };

    dispatch(sendObjects({ data })).then((res) => {
      if (res.payload === 'sucsses') {
        openCloseSucessModal(navigateLoc, false, dispatch, navigate, stateTmp);
      } else {
        setShowErrorModal(true);
        setTimeout(() => {
          setShowErrorModal(false);
        }, 2000);
      }
    });
  };

  React.useEffect(
    () => () => {
      dispatch(getCompaniesAll());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Grid item xs={12}>
      <ErrorModal open={showErrorModal}></ErrorModal>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {false ? (
            <FormAutocompleteField
              props={{
                name: 'companyId',
                control: control,
                label: t(props.formFieldsLabels.objects.company),
                disabled: true,
                additional: {
                  selector: selectClientCompanies,
                },
              }}
            />
          ) : (
            <FormTextField
              props={{
                control: control,
                name: 'companyId',
                label: t(props.formFieldsLabels.objects.company),
                disabled: true,
                additional: { readonly: true, labelShrink: true },
              }}
            />
          )}
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            props={{
              control: control,
              name: 'objectName',
              label: t(props.formFieldsLabels.objects.name),
              disabled: false,
              additional: { readonly: false, labelShrink: true },
            }}
          />
          <FormTextField
            props={{
              control: control,
              name: 'longitude',
              label: t(props.formFieldsLabels.objects.longitude),
              disabled: false,
              additional: { readonly: false, labelShrink: true },
            }}
          />
          <FormTextField
            props={{
              control: control,
              name: 'latitude',
              label: t(props.formFieldsLabels.objects.latitude),
              disabled: false,
              additional: { readonly: false, labelShrink: true },
            }}
          />
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
