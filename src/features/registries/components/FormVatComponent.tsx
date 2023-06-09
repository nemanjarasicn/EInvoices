import React from 'react';
import * as yup from 'yup';
import { Paper, Grid, Box } from '@mui/material';
import { RegistriesFormComponentProps } from './RegistriesFormComponent';
import { useComponentsStyles } from '../../shared/components/components.styles';
import { useAppDispatch } from '../../../app/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormAutocompleteField from '../../shared/components/form-fields/FormAutocompleteField';
import FormTextField from '../../shared/components/form-fields/FormTextField';
import CustomButtonFc from '../../shared/components/CustomButtonFc';
import { IProps, VatFormModel } from '../models/registries.models';
import { selectClientCompanies } from '../../shared/components/form-fields/store/form.selectors';
import { useNavigate } from 'react-router-dom';
import { sendVat } from '../store/registries.actions';
import ErrorModal from '../../shared/components/ErrorModals';
import SucessModal from '../../shared/components/SucessModal';

/**
 * Register Form validation schema for every field
 */
const schema = yup.object({}).required();

export default function FormVatComponent({
  props,
}: IProps<RegistriesFormComponentProps>): JSX.Element {
  const defaultValues: VatFormModel = {
    id: '',
    name: '',
    value1: 0,
    value2: 0,
    value3: 0,
    activ: false,
    code: '',
    default: true,
    idCountry: 0,
  };
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

  const onSubmit = (data: VatFormModel) => {
    dispatch(sendVat({ data })).then((res) => {
      if (res.payload === 'sucsses') {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
          navigate('/registries/vat');
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
              name: 'name',
              label: 'Naziv pdv',
              disabled: false,
              additional: { readonly: false, labelShrink: true },
            }}
          />

          <FormTextField
            props={{
              control: control,
              name: 'code',
              label: 'Code',
              disabled: false,
              additional: { readonly: false, labelShrink: true },
            }}
          />

          <FormAutocompleteField
            props={{
              name: 'idCountry',
              control: control,
              label: 'Drzava',
              disabled: true,
              additional: {
                selector: selectClientCompanies,
              },
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            props={{
              control: control,
              name: 'value1',
              label: 'value1',
              disabled: false,
              additional: { readonly: false, labelShrink: true },
            }}
          />
          <FormTextField
            props={{
              control: control,
              name: 'value2',
              label: 'value2',
              disabled: false,
              additional: { readonly: false, labelShrink: true },
            }}
          />
          <FormTextField
            props={{
              control: control,
              name: 'value3',
              label: 'value3',
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
