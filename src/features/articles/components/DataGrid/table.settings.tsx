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
import { getArticles,  getSubject }   from "../../store/articles.actions"
import {
  Grid,
} from "@mui/material";
import  { selectArticles, selectSubject }  from "../../store/articles.selectors"

import { setopenModalCreateArticalPrice  }  from  "../../store/articles.reducer"


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
              headerName: "Id artikla",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "prodctId",
              headerName: "prodctId",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
              hide: true
            },
            {
              field: "productName",
              headerName: "Naziv artikla",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "decimalShow",
              headerName: "Prikaz decimala",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
    
            {
              field: "code",
              headerName: "Code artikla",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
              hide: false,
            },
            {
                field: "barCode",
                headerName: "Barcode",
                flex: 1,
                headerAlign: "center",
                align: "center",
                hideable: true,
                hide: false,
              },
              {
                field: "unitCode",
                headerName: "unitCode",
                flex: 1,
                headerAlign: "center",
                align: "center",
                hideable: true,
                hide: false,
              },
              {
                field: "vat",
                headerName: "Vat",
                flex: 1,
                headerAlign: "center",
                align: "center",
                hideable: true,
                hide: false,
              },
              {
                field: "groupName",
                headerName: "Grupa",
                flex: 1,
                headerAlign: "center",
                align: "center",
                hideable: true,
                hide: false,
              },
              {
                field: "typeName",
                headerName: "Tip artikla",
                flex: 1,
                headerAlign: "center",
                align: "center",
                hideable: true,
                hide: false,
              },
              {
                field: "price",
                headerName: "Cena",
                flex: 1,
                headerAlign: "center",
                align: "center",
                hideable: true,
                hide: false,
                editable: true
              },
              {
                field: 'action',
                headerName: 'Action',
                flex: 1,
                headerAlign: "center",
                align: "center",
                hideable: true,
                renderCell: (params) => (
                  <Grid  container sx={{display:  'flex'}}>
                        <Grid item xs={12} >
                        <LightTooltip title="Izmena cene">
                          <IconButton sx={{display:  'flex', justifyContent:  'center'}} color="primary" aria-label="pdf" component="label"  onClick={() => {console.log('asasasasasa', params.row);  dispatch(setopenModalCreateArticalPrice({open: true, data: params.row, flag: 'edit'}))}}>
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
              headerName: "Id komitenta",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "firstName",
              headerName: "Ime komitenta",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "lastName",
              headerName: "Prezime komitenta",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
    
            {
              field: "companyName",
              headerName: "Naziv kompanije",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
              hide: false,
            },
            {
                field: "pib",
                headerName: "PIB",
                flex: 1,
                headerAlign: "center",
                align: "center",
                hideable: true,
                hide: false,
              },
              {
                field: "mb",
                headerName: "mb",
                flex: 1,
                headerAlign: "center",
                align: "center",
                hideable: true,
                hide: false,
              },
        
              {
                field: "subjectIdCategory",
                headerName: "Kategorija komitenta",
                flex: 1,
                headerAlign: "center",
                align: "center",
                hideable: true,
                hide: false,
              },
              {
                field: "subjectIdType",
                headerName: "Tip komitenta",
                flex: 1,
                headerAlign: "center",
                align: "center",
                hideable: true,
                hide: false,
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