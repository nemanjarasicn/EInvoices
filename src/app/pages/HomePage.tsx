import React from "react";
import CardComponent, {
  CardProps,
} from "../../features/shared/components/CardComponent";
import { IProps } from "../../features/invoices/models/invoice.models";
import { useTranslation } from "react-i18next";
import { useFeatureSettings } from "../../features/invoices/settings";
import { GridValueGetterParams } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import { usePageStyles } from "../../features/invoices/pages/pages.styles";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import CustomButtonFc from "../../features/invoices/components/CustomButtonFc";
import  { getErrorLogs }  from  "../core/core.actions"
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import  { selecterrorLogs  }  from  "../core/core.selectors"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import TableNoRowsOverlay from "../../features/invoices/components/DataGrid/NoRowsOverlay";
import dayjs from "dayjs";
import { returnInvoiceMessage } from "../../features/invoices/utils/utils"
import { apiKeyExist, selectUser,  selectCompanyInfo } from "../core/core.selectors";


type HomePageProps = {
    IsFromHome?: boolean;
};

export default function HomePage({props}: IProps<HomePageProps>): JSX.Element {
  const { t } = useTranslation();
  const { cardsSettings } = useFeatureSettings();
  const { dashBoardStyles } = usePageStyles();
  const [itemsList, setItemsList] = React.useState<any[]>(useAppSelector(selecterrorLogs));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const boxMarginTop   =    window.devicePixelRatio === 1.5 ?  6 :  10;
  const fontSizeBreadcrumbs  =   window.devicePixelRatio === 1.5 ?  '16px' :  '20px';
  const fontSize  =    window.devicePixelRatio === 1.5 ?    '12px' :  '16px';
  const apiKey = useAppSelector(selectCompanyInfo)?.apiKey;
  

  React.useEffect(() => {
    dispatch(getErrorLogs());
    const newState = itemsList.filter((item) => item?.apiKey ===  apiKey );
    setItemsList(newState);
  }, []);



  const columns: GridColDef[] =  [
    {
      field: "message",
      headerName: t("Opis"),
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
          returnInvoiceMessage(params.row.message),
      headerAlign: "center",
      align: "center",
      hideable: false,
    }, 
    {
    field: "createDate",
    headerName: t("Datum"),
    flex: 1,
    valueGetter: (params: GridValueGetterParams) =>
      dayjs(params.row.createDate).format("DD-MM-YYYY HH:mm:ss "),
    headerAlign: "center",
    align: "center",
    hideable: false,
  }
]


  return (  
    <Grid container >
      <Grid item xs={12}  sx={{mt: boxMarginTop, }}>
          <Breadcrumbs aria-label="breadcrumb"  sx={{'& .MuiBreadcrumbs-separator': {color: 'red'}}}>
                <Typography  sx={{color: 'green', fontSize:   fontSizeBreadcrumbs, fontFamily:  "Roboto",  lineHeight:  "32px",  fontWeight:  700}}>{t("Pocetna")}</Typography>
          </Breadcrumbs>
      </Grid>
      {/*<Grid item  xs={8}   sx={{display:  'flex', alignItems:  'center', justifyContent:  'flex-end', mt: boxMarginTop}}   >
          <CustomButtonFc
                        groupButton={ [{
                          title: "ButtonsText.TemplatePage.createDocument",
                          disabled: false,
                          btnFn: () => navigate("/invoices/create"),
                          buttonId: 1,
                        }]}
                      />
                      </Grid>*/}
        <div style={dashBoardStyles.cardsWrapper}>
              {cardsSettings.map((card: CardProps, index: number) => {
                return <CardComponent key={index} props={card} />;
              })}
        </div>

        <Grid item xs={12}  >
          <DataGrid
                style={{ minHeight:  400,   backgroundColor: 'white',  fontSize:   fontSize,  marginTop: 20 }}
                disableColumnMenu
                pagination
                disableColumnFilter
                showCellRightBorder={false}
                components={{
                  NoRowsOverlay: TableNoRowsOverlay,
                  //Footer: CustomFooterTotalComponent
                }}
                rows={itemsList}
                getRowId={(row: any) =>  Math.random()}
                rowsPerPageOptions={[5, 10, 15, 30]}
                columns={columns}
                autoHeight={true}
                density="compact"
                componentsProps={{
                  noRowsOverlay: {
                    props: { message: t("Nije bilo gresaka u poslednja 24 h") },
                  },
                  pagination: {
                    labelRowsPerPage: t('redova po strani')
                  }
                }}
                pageSize={30}
                sx={{ "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
                {
                  display: "none",
                },
                
              ".MuiDataGrid-columnSeparator": {
                display: "none",
              },
              "&.MuiDataGrid-root": {
                border: "none",
              },}}
              />
      </Grid>
    </Grid>
  );
}
