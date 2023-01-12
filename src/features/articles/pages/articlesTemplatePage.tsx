import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useFeatureSettings } from "../settings";
import { TemplatePageArticlesTypes } from "../models/articles.enums";
import { useTranslation } from "react-i18next";
import CustomButtonFc from "../../shared/components/CustomButtonFc";
import FormAutocompleteField from "../../shared/components/form-fields/FormAutocompleteField";
import FormAutocompleteFieldSelect from "../../shared/components/form-fields/FormAutocompleteFieldSelect";
import { usePageStyles } from "./pages.styles";
import TableComponent from "../components/DataGrid/TableComponent"; 
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { IProps } from "../models/articles.models";
//import TableComponent from "../components/DataGrid/TableComponent";
import { useTableSettings } from "../components/DataGrid/table.settings";
import { selectMarketPlaces } from "../../shared/components/form-fields/store/form.selectors";
import { getMarketPlacesAll, getPointOfSalesAll }  from  "../../shared/components/form-fields/store/form.actions"
import { selectCompanyCurrent } from "../../../app/core/core.selectors";
import { getArticles } from "../store/articles.actions";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';


import  { selectOpenCreateArtical,  selectOpenCreateArticalPrice, selectOpenSucessModal,  selectOpenCreateSubject }  from  "../store/articles.selectors"
import  ModalSucessArticles  from   "../components/ModalSucessArticles"
import ModalCreateSubject from "../components/ModalCreateSubject";
import ModalCreateArtical from "../components/ModalCreateArtical";
import ModalCreateArticalPrice from "../components/ModalCreateArticalPrice";
import { Navigate } from "react-router-dom";
import { faWindowRestore } from "@fortawesome/pro-solid-svg-icons";
import { useNavigate } from 'react-router-dom';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  fontSize: "1rem",
}));

type ArticlesTemplatePageProps = {
  templateType: TemplatePageArticlesTypes;
};

export default function InvoiceTemplatePage({
  props,
}: IProps<ArticlesTemplatePageProps>): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { templatePageSettings } = useFeatureSettings();
  const { tableSettings } = useTableSettings();
  const { templatePageStyles } = usePageStyles();
  const openSucessModalArtical = useAppSelector(selectOpenSucessModal);
  const openModalCreateSubject = useAppSelector(selectOpenCreateSubject);
  const openModalCreateArtical = useAppSelector(selectOpenCreateArtical);
  const navigate  = useNavigate();
  const openModalCreateArticalPrice = useAppSelector(selectOpenCreateArticalPrice);
  const company = useAppSelector(selectCompanyCurrent);
  const marketPlace = useAppSelector(templatePageSettings[props.templateType].buttonsSelect.selector);
  const methods = useForm({
    defaultValues: {},
  });
  const {
    control,
    getValues
  } = methods;

  const settings = tableSettings[props.templateType].dataGrid;

  const [selectValue, setSelectValue]  =  React.useState('');

  const getDataActionSelect = (selectType: string): any => {
    switch (selectType) {
      case "ARTICLES":
        return getArticles({uuid:  selectValue});
      default:
        return  settings.getDataAction;
    }
  };



  React.useEffect(() => {
    if(settings.selectType === 'ARTICLES')  {
        dispatch(getMarketPlacesAll({companyId: company}));
    } else  {
        dispatch(getDataActionSelect(settings.selectType));
    }
  }, []);

  React.useEffect(() => {
    if(selectValue !==   "") {
      dispatch(getDataActionSelect(settings.selectType));
    }
  }, [selectValue]);


  

 
  const handleChangeSelect = (value: any) =>  {
    setSelectValue(value.item.uuid);
  }

  
  return (
    <>
    <ModalCreateArtical    open={openModalCreateArtical} ></ModalCreateArtical>
    <ModalSucessArticles  open={openSucessModalArtical} ></ModalSucessArticles>
    <ModalCreateSubject    open={openModalCreateSubject.open}  data={openModalCreateSubject.data} flag={openModalCreateSubject.flag} ></ModalCreateSubject>
    <ModalCreateArticalPrice    open={openModalCreateArticalPrice.open}  data={openModalCreateArticalPrice.data} flag={openModalCreateArticalPrice.flag}></ModalCreateArticalPrice>
    <Box sx={{ flexGrow: 1, m: 2.5 }}>
      <Grid container spacing={2}  mt={8}>
        <Grid item xs={4} >
        
        
              <Breadcrumbs aria-label="breadcrumb"     sx={{'& .MuiBreadcrumbs-separator': {color: ' #60737C'}}}>
                <Link  sx={{color: '#60737C', fontSize:  "20px", fontFamily:  "Roboto",  lineHeight:  "32px",  fontWeight:  700}}  href="/articles">
                        ARTIKLI
                </Link>
                <Typography  sx={{color: 'white', fontSize:  "20px", fontFamily:  "Roboto",  lineHeight:  "32px",  fontWeight:  700}}>{t(templatePageSettings[props.templateType].title)}</Typography>
          </Breadcrumbs>  
        </Grid>
        <Grid item xs={8} style={templatePageStyles.buttonsGrid}>
            <Grid item xs={4} sx={{alignItems: 'center', mt: 2}} >
              
              {templatePageSettings[props.templateType].showBtnsSelect && (
                <FormAutocompleteFieldSelect
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
