/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button  from  "@mui/material/Button" 
import { useFeatureSettings } from "../settings";
import { Path, TemplatePageTypes } from "../models/invoice.enums";
import { useTranslation } from "react-i18next";
import CustomButtonFilters from "../components/form-fields/CustomButtonFilters";
import CustomButtonFc from "../components/CustomButtonFc";
import { usePageStyles } from "./pages.styles";
import FiltersToolbarComponent from "../components/FiltersToolbarComponent";
import { IProps } from "../models/invoice.models";
import TableComponent from "../components/DataGrid/TableComponent";
import FormDateField from "../components/form-fields/FormDateField";
import { useTableSettings } from "../components/DataGrid/table.settings";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { format } from 'date-fns'
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import CheckboxField from '../../shared/components/form-fields/FormCheckboxField';
import { searchInvoices } from "../store/invoice.actions";
import dayjs from "dayjs";
import { Subscription } from "react-hook-form/dist/utils/createSubject";
import { selectCompany } from "../../../app/core/core.selectors";
import { setFilters } from "../store/invoice.reducer";
import CustomFilterBox from "../../shared/components/form-fields/CustomFilterBox";
import { selectFilters }   from  "../store/invoice.selectors"
import { selectCompanyCurrent } from "../../../app/core/core.selectors";

//for zip
import JSZip from  'jszip';
import * as FileSaver from "file-saver";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  fontSize: "1rem",
}));

export type InvoiceTemplatePageProps = {
  templateType: TemplatePageTypes;
};

// --------------ZIP -------------------------------------
 //const dispatch = useAppDispatch();
 const zip = new JSZip();
 //const zipData = useAppSelector(selectZip);


 export const  unzipFileData = async (zipDataT: any) => {
  await zip.loadAsync(zipDataT.payload,{base64:true}).then(function (zip) {
    Object.keys(zip.files).map((filename) => {
      zip.files[filename].async("blob").then(async function (fileData) {
        return await (fileData.slice(2).text());
      });
    });
  });

}

 // function for unzip file
  export const  unzipFile = async (flag: string, zipDataT: any) => {
   await zip.loadAsync(zipDataT.payload,{base64:true}).then(function (zip) {
     Object.keys(zip.files).map((filename) => {
       const extName =  flag === 'PDF' ?  '.pdf'  :  '.xml';
       const filenameDownload  = filename.slice(0, filename.length-4) + extName;
       zip.files[filename].async("blob").then(async function (fileData) {
         const dataDownload =   await (fileData.slice(2).text());
         flag ===  'PDF' ?  downloadPDF(dataDownload,filenameDownload) :   downloadXml(fileData,filenameDownload)  ;
       });
     });
   });

 }

 function downloadPDF(pdf: string, fileName: string) {
   const linkSource = `data:application/pdf;base64,${pdf}`;
   const downloadLink = document.createElement("a");

   downloadLink.href = linkSource;
   downloadLink.download = fileName;
   downloadLink.click();
}

function downloadXml(data: Blob, fileName: string) {
 FileSaver.saveAs(data, fileName);
}
 

 // ---------------END ZIP ----------------------------------



export default function InvoiceTemplatePage({
  props,
}: IProps<InvoiceTemplatePageProps>): JSX.Element {
  const { t } = useTranslation();
  const { templatePageSettings } = useFeatureSettings();
  const { tableSettings } = useTableSettings();
  const { templatePageStyles } = usePageStyles();
  const [filtersSearch, setFiltersSearch]  =  React.useState(useAppSelector(selectFilters));

    const date  = new Date();
    //const dateTmp = new Date(date)
  
    const today = format(date, 'yyyy-MM-dd');
    //const yesterday  = format(dateTmp.setDate(dateTmp.getDate() - 1), 'yyyy-MM-dd');

  const schema = yup
  .object({
    from: yup.string(),
    to: yup.string(),
  })
  .required();

  const dispatch = useAppDispatch();
  const id = useAppSelector(selectCompanyCurrent);
  const methods = useForm({
    defaultValues: { 
      from: today, 
      to: today,
      sendToCir: false  },
    resolver: yupResolver(schema),
  });
  const { handleSubmit, reset, control, watch } = methods;

  
  React.useEffect(() => {
    const subscription = watch( async (value, { name, type }) => {
      const sendToCirValue  =   !value.sendToCir  ?   ""  :  "auto";
        setFiltersSearch((prevState)  => {
          return({
            ...prevState,
            date: 
            {from: dayjs(value.from).format("YYYY-MM-DD"), to:  dayjs(value.to).format("YYYY-MM-DD")},
            sendToCir:  sendToCirValue
          });
      });
    })
    return () => subscription.unsubscribe();
  }, [watch]);




  return (
    <Box sx={{ flexGrow: 1,  mt: 10  }}>
      <Grid container spacing={2}  pl={5} >
        <Grid item xs={4}>
          {/*<Item>*/}
            <h3 style={{color: 'grey'}}>{t('E-FAKTURA') + '/' + t(templatePageSettings[props.templateType].title)}</h3>
          {/*</Item>*/}
        </Grid>
        <Grid item  xs={8}   sx={{display:  'flex', alignItems:  'center',  justifyContent:  'flex-end'}} >
            <Grid item xs={12} style={templatePageStyles.buttonsActionGrid}    >
                    {templatePageSettings[props.templateType].showBtns && (
                      <CustomButtonFc
                        groupButton={templatePageSettings[props.templateType].buttons}
                      />
                    )}
            </Grid>
        </Grid>
    
        <Grid container  sx={{backgroundColor: 'white', mt: 2,   borderRadius:  '15px'}}   spacing={2}>

              <Grid item xs={12} style={templatePageStyles.buttonsGrid}>
                  <CustomFilterBox  props={{
                        filters: templatePageSettings[props.templateType].filters,
                        actions: templatePageSettings[props.templateType].actions,
                        type: props.templateType,
                      }} />
              </Grid>
              {/*<Grid item xs={1.5}  sx={{ml: 3}}>    
                      <CheckboxField 
                              props={{
                                  control: control,
                                  name: 'sendToCir',
                                  label: 'Registrovano u CRF',
                                  disabled: false,
                                  additional: { readonly: false, labelShrink: true ,  defaultValue: "1", color: 'black'},
                              
                              }}
                        />
                </Grid>
                <Grid item xs={3}>    
                      {templatePageSettings[props.templateType].filters && (
                        <CustomButtonFilters
                          groupButton={templatePageSettings[props.templateType].filters}
                        />
                      )}
                </Grid>
                <Grid item xs={6} sx={{display:  'flex'}}>  
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        border: "thin solid transparent",
                        background: "transparent",
                      }}
                    >
                      
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            //alignContent: "space-around",
                            height: "36.5px ",
                            scale: "0.8",
                            margin: "auto",
                            width: "max-content",
                            columnGap: "3%",
                            alignItems: "baseline",
                            marginTop: "-1px",
                          }}
                        >
                          {t(`Common.from`)}
                          <FormDateField
                            props={{
                              disabled: false,
                              name: "from",
                              control: control,
                              label: "",
                            }}
                          />
                          {t(`Common.to`)}
                          <FormDateField
                            props={{
                              disabled: false,
                              name: "to",
                              control: control,
                              label: "",
                            }}
                          />
                        </div>
                    </div>
                </Grid>
              </Grid>*/}
             <Grid item xs={12}>
                <FiltersToolbarComponent
                  props={{
                    filters: templatePageSettings[props.templateType].filters,
                    actions: templatePageSettings[props.templateType].actions,
                    type: props.templateType,
                  }}
                />
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
      </Grid>
    </Box>
  );
}
