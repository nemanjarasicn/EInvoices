import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useFeatureSettings } from "../settings";
import { TemplatePageRegistriesTypes } from "../models/registries.enums";
import { useTranslation } from "react-i18next";
import CustomButtonFc from "../../shared/components/CustomButtonFc";
import FormAutocompleteField from "../../shared/components/form-fields/FormAutocompleteField";
import { usePageStyles } from "./pages.styles";

import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { IProps } from "../models/registries.models";
import TableComponent from "../components/DataGrid/TableComponent";
import { useTableSettings } from "../components/DataGrid/table.settings";
import { getMarketPlacesAll, getPointOfSalesAll }  from  "../../shared/components/form-fields/store/form.actions"
import {
  getGroups,
  getWarehouses
} from "../../registries/store/registries.actions";
import { selectCompany } from "../../../app/core/core.selectors";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  fontSize: "1rem",
}));

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
  const company = useAppSelector(selectCompany) ?? "";
  const methods = useForm({
    defaultValues: {},
  });
  const {
    control,
  } = methods;

  const settings = tableSettings[props.templateType].dataGrid;

  const [selectValue, setSelectValue]  =  React.useState('');

  const getDataActionSelect = (selectType: string): any => {
    switch (selectType) {
      case "WAREHOUSES":
        return getWarehouses({uuid:  selectValue});
      case "GROUPS":
        return getGroups({uuid: selectValue});
      default:
        return  settings.getDataAction;
    }
  };


  React.useEffect(() => {
    if(props.templateType === "warehouses") { 
      dispatch(getMarketPlacesAll({companyId: company}))
    };
    if(props.templateType === "groups") { 
        dispatch(getPointOfSalesAll({companyId: company}));
    }
    if((!(props.templateType === 'warehouses'  ||  props.templateType  ===   'groups')))   {
          dispatch(getDataActionSelect(settings.selectType));
    }
  }, []);

  React.useEffect(() => {
    if((props.templateType === 'warehouses'  ||  props.templateType  ===   'groups')  &&  selectValue !==   "") {
      dispatch(getDataActionSelect(settings.selectType));
    }
  }, [selectValue]);

 
  const handleChangeSelect = (value: any) =>  {
    setSelectValue(value.item.uuid)
  }

  
  return (
    <Box sx={{ flexGrow: 1, m:2.5}}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item>
            <h3>{t(templatePageSettings[props.templateType].title)}</h3>
          </Item>
        </Grid>
        <Grid item xs={8} style={templatePageStyles.buttonsGrid}>
            <Grid item xs={4} sx={{alignItems: 'center'}} >
              {templatePageSettings[props.templateType].showBtnsSelect && (
                <FormAutocompleteField
                      props={{
                          name: templatePageSettings[props.templateType].buttonsSelect.name,
                          control: control,
                          label:  templatePageSettings[props.templateType].buttonsSelect.label,
                          disabled: true,
                          additional: {
                            parentFn: handleChangeSelect,
                            selector: templatePageSettings[props.templateType].buttonsSelect.selector,
                          },
                      }}
                />
              )}
            </Grid>
            <Grid item xs={4} style={templatePageStyles.buttonsGrid}>
              {templatePageSettings[props.templateType].showBtns && (
                <CustomButtonFc
                  groupButton={templatePageSettings[props.templateType].buttons}
                />
              )}
            </Grid>
        </Grid>
        <Grid item xs={12}>
          {templatePageSettings[props.templateType].showTable && (
            <div style={templatePageStyles.tableWrapper}>
              <TableComponent
                props={tableSettings[props.templateType].dataGrid}
              />
            </div>
          )}
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </Box>
  );
}
