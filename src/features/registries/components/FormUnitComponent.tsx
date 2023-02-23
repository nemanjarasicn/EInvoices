import React from 'react';
import { Paper, Grid, Box } from '@mui/material';
import { RegistriesFormComponentProps } from './RegistriesFormComponent';
import FormTextField from '../../shared/components/form-fields/FormTextField';
import { useComponentsStyles } from '../../shared/components/components.styles';
import { useAppDispatch } from '../../../app/hooks';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import CustomButtonFc from '../../shared/components/CustomButtonFc';
import { UnitFormModel, IProps } from '../models/registries.models';
import { useNavigate } from 'react-router-dom';
import { sendUnit } from '../store/registries.actions';
import ErrorModal from '../../shared/components/ErrorModals';
import SucessModal from '../../shared/components/SucessModal';
import CheckboxField from '../../shared/components/form-fields/FormCheckboxField';
//import ClientComponent from "./form-group/ClientComponent";

/**
 * Register Form validation schema for every field
 */
const schema = yup.object({}).required();

export default function FormUnitComponent({
  props,
}: IProps<RegistriesFormComponentProps>): JSX.Element {
  const defaultValues: UnitFormModel = {
    productUnitName: '',
    productUnitCode: '',
    productUnitPlural: '',
    productUnitPriority: 1,
    productUnitDecimalShow: 0,
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

  const onSubmit = (data: any) => {
    dispatch(sendUnit({ data })).then((res) => {
      if (res.payload === 'sucsses') {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
          navigate('/registries/units');
        }, 2000);
      } else {
        setShowErrorModal(true);
        setTimeout(() => {
          setShowErrorModal(false);
          /*navigate('/registries/companies'
                    )*/
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
              name: 'productUnitName',
              label: 'Naziv unit',
              disabled: false,
              additional: { readonly: false, labelShrink: true },
            }}
          />
          <FormTextField
            props={{
              control: control,
              name: 'productUnitCode',
              label: 'Unit code',
              disabled: false,
              additional: { readonly: false, labelShrink: true },
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            props={{
              control: control,
              name: 'productUnitPlural',
              label: 'Unit Plural',
              disabled: false,
              additional: { readonly: false, labelShrink: true },
            }}
          />
          <CheckboxField
            props={{
              control: control,
              name: 'productUnitPriority',
              label: 'productUnitPriority',
              disabled: false,
              additional: { readonly: false, labelShrink: true },
            }}
          />
          <CheckboxField
            props={{
              control: control,
              name: 'productUnitDecimalShow',
              label: 'productUnitDecimalShow',
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
