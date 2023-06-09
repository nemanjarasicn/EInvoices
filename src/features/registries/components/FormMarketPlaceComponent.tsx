import React from 'react';
import * as yup from 'yup';
import { Paper, Grid, Box } from '@mui/material';
import { RegistriesFormComponentProps } from './RegistriesFormComponent';
import { useTranslation } from 'react-i18next';
import { useComponentsStyles } from '../../shared/components/components.styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { MarketPlaceFormModel } from '../models/registries.models';
import { IProps } from '../models/registries.models';
import { selectClientCompanies } from '../../shared/components/form-fields/store/form.selectors';
import FormTextField from '../../shared/components/form-fields/FormTextField';
import CustomButtonFc from '../../shared/components/CustomButtonFc';
import FormAutocompleteField from '../../shared/components/form-fields/FormAutocompleteField';
import { sendMarketPlace } from '../store/registries.actions';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectObjectsAll } from '../../shared/components/form-fields/store/form.selectors';
import { selectUser } from '../../../app/core/core.selectors';
import { getObjectsAll } from '../../shared/components/form-fields/store/form.actions';
import ErrorModal from '../../shared/components/ErrorModals';
import { useLocation } from 'react-router-dom';
import { getCompaniesAll } from '../../shared/components/form-fields/store/form.actions';
import { openCloseSucessModal } from '../../shared/utils/utils';

/**
 * Register Form validation schema for every field
 */
const schema = yup
  .object({
    marketPlaceName: yup.string().required('ovo je obavezno polje'),
    objectUuid: yup.object().required('ovo je obavezno polje'),
  })
  .required();

export default function FormMarketPlaceComponent({
  props,
}: IProps<RegistriesFormComponentProps>): JSX.Element {
  const location = useLocation();
  const id = location.state.company;
  const defaultValues: MarketPlaceFormModel = {
    companyId: id,
    marketPlaceName: '',
    objectUuid: '',
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

  const onSubmit = (data: MarketPlaceFormModel) => {
    const navigateLoc = !userAuthority
      ? '/registries/marketPlace'
      : '/registries/createUser/0';

    const stateTmp = !userAuthority
      ? ''
      : {
          company: id,
          id: 0,
        };

    dispatch(sendMarketPlace({ data })).then((res) => {
      if (res.payload === 'sucsess') {
        openCloseSucessModal(navigateLoc, false, dispatch, navigate, stateTmp);
      } else {
        setShowErrorModal(true);
        setTimeout(() => {
          setShowErrorModal(false);
        }, 2000);
      }
    });
  };

  React.useEffect(() => {
    dispatch(getObjectsAll({ companyId: id }));
    dispatch(getCompaniesAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                label: t(props.formFieldsLabels.marketPlace.company),
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
                label: t(props.formFieldsLabels.marketPlace.company),
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
              name: 'marketPlaceName',
              label: t(props.formFieldsLabels.marketPlace.name),
              disabled: false,
              additional: { readonly: false, labelShrink: true },
            }}
          />

          <FormAutocompleteField
            props={{
              name: 'objectUuid',
              control: control,
              label: t(props.formFieldsLabels.marketPlace.uuidObject),
              disabled: true,
              additional: {
                selector: selectObjectsAll,
                //data: dataObject
              },
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
