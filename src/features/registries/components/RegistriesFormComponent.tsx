/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Paper, Typography, Grid, Box } from '@mui/material';
import { IProps } from '../models/registries.models';
import { useTranslation } from 'react-i18next';
import { useComponentsStyles } from '../../shared/components/components.styles';
import FormObjectComponent from './FormObjectComponents';
import FormMarketPlaceComponent from './FormMarketPlaceComponent';
import FormPointOfSaleComponents from './FormPointOfSale';
import FormCompaniesComponent from './FormCompaniesComponent';
import FormWarehouseComponent from './FormWarehouseComponent';
import FormUnitComponent from './FormUnitComponent';
import FormGroupComponent from './FormGroupComponent';
import FormVatComponent from './FormVatComponent';
import FormUsersComponent from './FormUsersComponents';

import FormDistributorComponent from './FormDistributorComponent';

export type RegistriesFormComponentProps = {
  invoiceTypeOptions: any;
  sectionTitles: any;
  formGrpsSettings?: any;
  formFieldsLabels?: any;
  createTitle: any;
  typeForm: any;
};

export default function RegistriesFormComponent({
  props,
}: IProps<RegistriesFormComponentProps>): JSX.Element {
  const { t } = useTranslation();
  const { formComponent } = useComponentsStyles();

  const FormComponent = (formType: string): any => {
    switch (formType) {
      case 'objects':
        return <FormObjectComponent props={props} />;
      case 'marketPlace':
        return <FormMarketPlaceComponent props={props} />;

      case 'pointOfSale':
        return <FormPointOfSaleComponents props={props} />;
      case 'companies':
        return <FormCompaniesComponent props={props} />;
      case 'distributor':
        return <FormDistributorComponent props={props} />;
      case 'warehouses':
        return <FormWarehouseComponent props={props} />;
      case 'units':
        return <FormUnitComponent props={props} />;
      case 'groups':
        return <FormGroupComponent props={props} />;
      case 'vats':
        return <FormVatComponent props={props} />;
      case 'users':
        return <FormUsersComponent props={props} />;
    }
    return <div>test</div>;
  };

  const marginTopBox = window.devicePixelRatio === 1.5 ? 4 : 10;

  return (
    <Box
      sx={{
        flexGrow: 1,
        rowGap: 1,
        display: 'flex',
        flexDirection: 'column',
        mt: marginTopBox,
      }}
    >
      <h3 style={{ color: 'white' }}>{t(props.createTitle.title)}</h3>

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
                {FormComponent(props.typeForm)}
              </Grid>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
