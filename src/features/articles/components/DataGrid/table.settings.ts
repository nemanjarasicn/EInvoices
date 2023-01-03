import { GridValueGetterParams } from "@mui/x-data-grid";
import { HeaderSettingsTypes } from "../../models/articles.enums";
import { TableComponentProps } from "./TableComponent";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectCompanyCurrent } from "../../../../app/core/core.selectors";

import { getArticles,  getSubject }   from "../../store/articles.actions"
import  { selectArticles, selectSubject }  from "../../store/articles.selectors"

type TableSettings = {
  tableSettings: {
    [key in HeaderSettingsTypes]: {
      dataGrid: TableComponentProps;
    };
  };
};
/**
 * hook predefine table settings
 * @returns {TableSettings}
 */
const useTableSettings = (): TableSettings => {

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
