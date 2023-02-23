import * as React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { useFeatureSettings } from '../settings';
import { TemplatePageRegistriesTypes } from '../models/registries.enums';
import { useTranslation } from 'react-i18next';
import { usePageStyles } from './pages.styles';

import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { IProps } from '../models/registries.models';
import CustomButtonFc from '../../shared/components/CustomButtonFc';
import FormAutocompleteField from '../../shared/components/form-fields/FormAutocompleteField';
import TableComponent from '../components/DataGrid/TableComponent';
import { useTableSettings } from '../components/DataGrid/table.settings';
import {
  getMarketPlacesAll,
  getPointOfSalesAll,
} from '../../shared/components/form-fields/store/form.actions';
import {
  getGroups,
  getWarehouses,
} from '../../registries/store/registries.actions';
import { selectCompany } from '../../../app/core/core.selectors';
import { selectUser } from '../../../app/core/core.selectors';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { selectOpenDistributor } from '../store/registries.selectors';
import ModalDistributor from '../components/ModalDistributor';

type InvoiceTemplatePageProps = {
  templateType: TemplatePageRegistriesTypes;
};

export default function InvoiceTemplatePage({
  props,
}: IProps<InvoiceTemplatePageProps>): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { templatePageSettings } = useFeatureSettings();
  const { tableSettings } = useTableSettings();
  const { templatePageStyles } = usePageStyles();
  const company = useAppSelector(selectCompany) ?? '';
  const openModalCreateDistributor = useAppSelector(selectOpenDistributor);
  const methods = useForm({
    defaultValues: {},
  });
  const { control } = methods;

  const settings = tableSettings[props.templateType].dataGrid;

  const [selectValue, setSelectValue] = React.useState('');

  const getDataActionSelect = (selectType: string): any => {
    switch (selectType) {
      case 'WAREHOUSES':
        return getWarehouses({ uuid: selectValue });
      case 'GROUPS':
        return getGroups({ uuid: selectValue });
      default:
        return settings.getDataAction;
    }
  };

  React.useEffect(() => {
    if (props.templateType === 'warehouses') {
      dispatch(getMarketPlacesAll({ companyId: company[0] }));
    }
    if (props.templateType === 'groups') {
      dispatch(getPointOfSalesAll({ companyId: company[0] }));
    }
    if (
      !(props.templateType === 'warehouses' || props.templateType === 'groups')
    ) {
      dispatch(getDataActionSelect(settings.selectType));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (
      (props.templateType === 'warehouses' ||
        props.templateType === 'groups') &&
      selectValue !== ''
    ) {
      dispatch(getDataActionSelect(settings.selectType));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectValue]);

  const handleChangeSelect = (value: any) => {
    setSelectValue(value.item.uuid);
  };

  const marginTopBox = window.devicePixelRatio === 1.5 ? 6 : 10;
  const userAuthority =
    useAppSelector(selectUser)?.authorities?.slice(0, 1)[0].authority ===
    'ROLE_ADMIN'
      ? true
      : false;
  const hrefAdmin = userAuthority ? '#' : '/registries';
  const fontSizeBreadcrumbs = window.devicePixelRatio === 1.5 ? '16px' : '20px';

  return (
    <>
      <ModalDistributor open={openModalCreateDistributor}></ModalDistributor>
      <Box sx={{ flexGrow: 1, mt: marginTopBox }}>
        <Grid container>
          <Grid item xs={4}>
            <Breadcrumbs
              aria-label="breadcrumb"
              sx={{ '& .MuiBreadcrumbs-separator': { color: ' #60737C' } }}
            >
              <Link
                sx={{
                  color: '#60737C',
                  fontSize: fontSizeBreadcrumbs,
                  fontFamily: 'Roboto',
                  lineHeight: '32px',
                  fontWeight: 700,
                }}
                href={hrefAdmin}
              >
                ADMINISTRACIJA
              </Link>
              <Typography
                sx={{
                  color: 'white',
                  fontSize: fontSizeBreadcrumbs,
                  fontFamily: 'Roboto',
                  lineHeight: '32px',
                  fontWeight: 700,
                }}
              >
                {t(templatePageSettings[props.templateType].title)}
              </Typography>
            </Breadcrumbs>
          </Grid>
          <Grid
            item
            xs={8}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Grid item xs={12} style={templatePageStyles.buttonsActionGrid}>
              {templatePageSettings[props.templateType].showBtns && (
                <CustomButtonFc
                  groupButton={templatePageSettings[props.templateType].buttons}
                />
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} style={templatePageStyles.buttonsConteiner}>
            <Grid item xs={4} sx={{ alignItems: 'center' }}>
              {templatePageSettings[props.templateType].showBtnsSelect && (
                <FormAutocompleteField
                  props={{
                    name: templatePageSettings[props.templateType].buttonsSelect
                      .name,
                    control: control,
                    label:
                      templatePageSettings[props.templateType].buttonsSelect
                        .label,
                    disabled: true,
                    additional: {
                      parentFn: handleChangeSelect,
                      selector:
                        templatePageSettings[props.templateType].buttonsSelect
                          .selector,
                    },
                  }}
                />
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {templatePageSettings[props.templateType].showTable && (
              <TableComponent
                props={tableSettings[props.templateType].dataGrid}
              />
            )}
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </Box>
    </>
  );
}
