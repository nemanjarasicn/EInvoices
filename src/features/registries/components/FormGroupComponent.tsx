import React from 'react';
import * as yup from 'yup';
import { Paper, Grid, Box } from '@mui/material';
import { RegistriesFormComponentProps } from './RegistriesFormComponent';
import { useTranslation } from 'react-i18next';
import { useComponentsStyles } from '../../shared/components/components.styles';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormAutocompleteField from '../../shared/components/form-fields/FormAutocompleteField';
import FormTextField from '../../shared/components/form-fields/FormTextField';
import CustomButtonFc from '../../shared/components/CustomButtonFc';
import { GroupFormModel, IProps } from '../models/registries.models';
import { useNavigate } from 'react-router-dom';
import { sendGroup } from '../store/registries.actions';
import { selectCompanyCurrent } from '../../../app/core/core.selectors';
import SucessModal from '../../shared/components/SucessModal';
import ErrorModal from '../../shared/components/ErrorModals';

import {
  getPointOfSalesAll,
  getObjectsAll,
} from '../../shared/components/form-fields/store/form.actions';
import {
  selectPointOfSale,
  selectObjectsAll,
} from '../../shared/components/form-fields/store/form.selectors';

/**
 * Register Form validation schema for every field
 */
const schema = yup
  .object({
    groupName: yup.string().required('ovo je obavezno polje'),
    idPointOfSale: yup.object().required(),
    idObject: yup.object().required(),
  })
  .required();

export default function FormGroupComponent({
  props,
}: IProps<RegistriesFormComponentProps>): JSX.Element {
  const companyId = useAppSelector(selectCompanyCurrent) as any;
  const defaultValues: GroupFormModel = {
    groupName: '',
    idPointOfSale: '',
    idCompany: companyId,
    idObject: 0,
  };

  const { t } = useTranslation();
  const { formComponent } = useComponentsStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showError, setShowError] = React.useState(false);
  const [showErrorModal, setShowErrorModal] = React.useState(false);

  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { handleSubmit, reset, control } = methods;

  React.useEffect(() => {
    dispatch(getPointOfSalesAll({ companyId: companyId }));
    dispatch(getObjectsAll({ companyId: companyId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data: GroupFormModel) => {
    dispatch(sendGroup({ data })).then((res) => {
      if (res.payload === 'sucsses') {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
          navigate('/registries/groups');
        }, 2000);
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
      <SucessModal open={showError}></SucessModal>
      <ErrorModal open={showErrorModal}></ErrorModal>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormTextField
            props={{
              control: control,
              name: 'idCompany',
              label: t(props.formFieldsLabels.objects.company),
              disabled: true,
              additional: { readonly: true, labelShrink: true },
            }}
          />

          <FormAutocompleteField
            props={{
              name: 'idPointOfSale',
              control: control,
              label: 'Kasa',
              disabled: true,
              additional: {
                selector: selectPointOfSale,
              },
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            props={{
              control: control,
              name: 'groupName',
              label: 'Naziv grupe',
              disabled: false,
              additional: { readonly: false, labelShrink: true },
            }}
          />

          <FormAutocompleteField
            props={{
              name: 'idObject',
              control: control,
              label: 'Objekat',
              disabled: true,
              additional: {
                selector: selectObjectsAll,
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
