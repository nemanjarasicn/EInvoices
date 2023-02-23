import React from 'react';
import { Paper, Grid, Box } from '@mui/material';
import { RegistriesFormComponentProps } from './RegistriesFormComponent';
import { useTranslation } from 'react-i18next';
import FormTextField from '../../shared/components/form-fields/FormTextField';
import { useComponentsStyles } from '../../shared/components/components.styles';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import CustomButtonFc from '../../shared/components/CustomButtonFc';
import { IProps, WarehouseFormModel } from '../models/registries.models';
import { selectMarketPlaces } from '../../shared/components/form-fields/store/form.selectors';
import { useNavigate } from 'react-router-dom';
import FormAutocompleteField from '../../shared/components/form-fields/FormAutocompleteField';
import { sendWarehouse } from '../store/registries.actions';
import ErrorModal from '../../shared/components/ErrorModals';
import SucessModal from '../../shared/components/SucessModal';
import { selectCompanyCurrent } from '../../../app/core/core.selectors';
import { getMarketPlacesAll } from '../../shared/components/form-fields/store/form.actions';
//import ClientComponent from "./form-group/ClientComponent";

/**
 * Register Form validation schema for every field
 */
const schema = yup
  .object({
    warehouses: yup.string().required('ovo je obavezno polje'),
  })
  .required();

export default function FormWarehouseComponent({
  props,
}: IProps<RegistriesFormComponentProps>): JSX.Element {
  const defaultValues: WarehouseFormModel = {
    idMarketPlace: 0,
    warehouseName: '',
    marketPlaceUuid: '',
  };
  const { t } = useTranslation();
  const { formComponent } = useComponentsStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showError, setShowError] = React.useState(false);
  const companyId = useAppSelector(selectCompanyCurrent);
  const [showErrorModal, setShowErrorModal] = React.useState(false);

  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { handleSubmit, reset, control } = methods;

  React.useEffect(() => {
    dispatch(getMarketPlacesAll({ companyId: companyId }));
  }, []);

  const onSubmit = (data: WarehouseFormModel) => {
    dispatch(sendWarehouse({ data })).then((res) => {
      if (res.payload === 'sucsses') {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
          navigate('/registries/warehouse');
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
          <FormAutocompleteField
            props={{
              name: 'marketPlace',
              control: control,
              label: t(props.formFieldsLabels.warehouse.marketPlace),
              disabled: true,
              additional: {
                selector: selectMarketPlaces,
              },
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            props={{
              control: control,
              name: 'warehouses',
              label: t(props.formFieldsLabels.warehouse.name),
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
