import { GridValueGetterParams } from "@mui/x-data-grid";
import { HeaderSettingsTypes } from "../../models/articles.enums";
import { TableComponentProps } from "./TableComponent";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectCompanyCurrent } from "../../../../app/core/core.selectors";

import { getArticles }   from "../../store/articles.actions"
import  { selectArticles }  from "../../store/articles.selectors"

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
      }
    },
  };
};
export { useTableSettings };
