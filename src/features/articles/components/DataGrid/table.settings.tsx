import { GridValueGetterParams } from "@mui/x-data-grid";
import { HeaderSettingsTypes } from "../../models/articles.enums";
import { TableComponentProps } from "./TableComponent";
import IconButton from '@mui/material/IconButton';
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { styled } from '@mui/material/styles';
import { selectCompanyCurrent } from "../../../../app/core/core.selectors";
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faPenToSquare}   from '@fortawesome/pro-solid-svg-icons';
import {  faGrid2}   from '@fortawesome/pro-solid-svg-icons';
import { getArticles,  getSubject }   from "../../store/articles.actions"
import {
  Grid,
} from "@mui/material";
import  { selectArticles, selectSubject }  from "../../store/articles.selectors"

import { setopenModalCreateArticalPrice,   setopenModalCreateSubject , setopenModalCreateArtical }  from  "../../store/articles.reducer"


type TableSettings = {
  tableSettings: {
    [key in HeaderSettingsTypes]: {
      dataGrid: TableComponentProps;
    };
  };
};


const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));


/**
 * hook predefine table settings
 * @returns {TableSettings}
 */
const useTableSettings = (): TableSettings => {

   const dispatch = useAppDispatch();
  const company = useAppSelector(selectCompanyCurrent);

  return {
    tableSettings: {
      [HeaderSettingsTypes.LIST]: {
        dataGrid: {
          columnsDef: [
            {
              field: "id",
              headerName: "Articles.id",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
              hide: true
            },
            {
              field: "prodctId",
              headerName: "Articles.prodctId",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
              hide: true
            },
            {
              field: "productName",
              headerName: "Articles.nameOfArticles",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "decimalShow",
              headerName: "Articles.decimalShow",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
    
            {
              field: "code",
              headerName: "Articles.code",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
              hide: false,
            },
            {
                field: "barCode",
                headerName: "Articles.barCode",
                flex: 1,
                headerAlign: "center",
                align: "center",
                hideable: true,
                hide: false,
              },
              {
                field: "unitCode",
                headerName: "Articles.unitCode",
                flex: 1,
                headerAlign: "center",
                align: "center",
                hideable: true,
                hide: false,
              },
              {
                field: "vat",
                headerName: "Articles.vat",
                flex: 1,
                headerAlign: "center",
                align: "center",
                hideable: true,
                hide: false,
              },
              {
                field: "groupName",
                headerName: "Articles.group",
                flex: 1,
                headerAlign: "center",
                align: "center",
                hideable: true,
                hide: false,
              },
              {
                field: "typeName",
                headerName: "Articles.type",
                flex: 1,
                headerAlign: "center",
                align: "center",
                hideable: true,
                hide: false,
              },
              {
                field: "price",
                headerName: "Articles.price",
                flex: 1,
                headerAlign: "center",
                align: "center",
                hideable: true,
                hide: false,
                editable: true
              },
              {
                field: 'action',
                headerName: '',
                flex: 1,
                headerAlign: "center",
                align: "center",
                hideable: true,
                renderCell: (params) => (
                  <Grid  container sx={{display:  'flex'}}>
                        <Grid item xs={6} >
                          <LightTooltip title="Izmena artikla">
                                <IconButton sx={{display:  'flex', justifyContent:  'center'}} color="primary" aria-label="pdf" component="label"  onClick={() => {  console.log('asassasasasasas',  params.row); dispatch(setopenModalCreateArtical({open: true, data: params.row, flag: 'edit'}))}}>
                                      <FontAwesomeIcon icon={faGrid2}   color="#E9950C"   />
                                </IconButton>
                            </LightTooltip>
                        </Grid>

                        <Grid item xs={6} >
                          <LightTooltip title="Izmena cene">
                                <IconButton sx={{display:  'flex', justifyContent:  'center'}} color="primary" aria-label="pdf" component="label"  onClick={() => {  dispatch(setopenModalCreateArticalPrice({open: true, data: params.row, flag: 'edit'}))}}>
                                      <FontAwesomeIcon icon={faPenToSquare}   color="#E9950C"   />
                                </IconButton>
                            </LightTooltip>
                        </Grid>
                    
                  </Grid>
  
                )
              },
           
          ],
          toolbarProps: {
            showFilters: false,
            showDensity: false,
            showHideColumns: true,
            showExport: false,
          },
          getDataAction:  getArticles(company as any) ,
          selectType:  "ARTICLES",
          selector:  selectArticles,
          parentColumn: "id",
        },
      },

      [HeaderSettingsTypes.SUBJECT]: {
        dataGrid: {
          columnsDef: [
            {
              field: "id",
              headerName: "Subject.id",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
              hide: true
            },
            {
              field: "firstName",
              headerName: "Subject.firstName",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
              hide: true,
            },
            {
              field: "lastName",
              headerName: "Subject.lastName",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
              hide: true,
            },
    
            {
              field: "companyName",
              headerName: "Subject.companyName",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
              hide: false,
            },
            {
                field: "pib",
                headerName: "Subject.pib",
                flex: 1,
                headerAlign: "center",
                align: "center",
                hideable: true,
                hide: false,
              },
              {
                field: "mb",
                headerName: "Subject.mb",
                flex: 1,
                headerAlign: "center",
                align: "center",
                hideable: true,
                hide: false,
              },
        
              {
                field: "subjectIdCategory",
                headerName: "Subject.subjectIdCategory",
                flex: 1,
                valueGetter: (params: GridValueGetterParams) =>
                    params.row.subjectIdCategory === 1 ? "Pravno lice"  :  "Javna preduzeća",
                headerAlign: "center",
                align: "center",
                hideable: true,
                hide: false,
              },
              {
                field: "subjectIdType",
                headerName: "Subject.subjectIdType",
                flex: 1,
                valueGetter: (params: GridValueGetterParams) =>
                    params.row.subjectIdType === 1 ? "Pravno"  :  "Fizicko",
                headerAlign: "center",
                align: "center",
                hideable: true,
                hide: false,
              },
              {
                field: 'action',
                headerName: '',
                flex: 1,
                headerAlign: "center",
                align: "center",
                hideable: true,
                renderCell: (params) => (
                  <Grid  container sx={{display:  'flex'}}>
                        <Grid item xs={12} >
                        <LightTooltip title="Izmena komitenta">
                          <IconButton sx={{display:  'flex', justifyContent:  'center'}} color="primary" aria-label="pdf" component="label"  onClick={() => { dispatch(setopenModalCreateSubject({open: true, data: params.row, flag: 'edit'}))}}>
                          <FontAwesomeIcon icon={faPenToSquare}   color="#E9950C"   />
                          </IconButton>
                          </LightTooltip>
                        </Grid>
                    
                  </Grid>
  
                )
              },
      
  
              
          ],
          toolbarProps: {
            showFilters: false,
            showDensity: false,
            showHideColumns: true,
            showExport: false,
          },
          getDataAction:  getSubject({companyId: company}) ,
          selectType:  "SUBJECT",
          selector:  selectSubject,
          parentColumn: "id",
        },
      }
    },
  };
};
export { useTableSettings };
