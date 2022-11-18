import { GridValueGetterParams } from "@mui/x-data-grid";
import { HeaderSettingsTypes } from "../../models/registries.enums";
import {
  sendObjects,
  getObjects
} from "../../store/registries.actions";
import { TableComponentProps } from "./TableComponent";

const dateFormater = new Intl.DateTimeFormat("en-US", {
  localeMatcher: "best fit",
});

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
  return {
    tableSettings: {
      [HeaderSettingsTypes.OBJECTS]: {
        dataGrid: {
          columnsDef: [
            {
              field: "name",
              headerName: "Ime objekta",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "idObject",
              headerName: "Id Objekta",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
            },
            {
              field: "uuid",
              headerName: "Uuid",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "Latitude",
              headerName: "Geografska Sirina",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "Longitude",
              headerName: "Geografska duzina",
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
          //getDataAction: getObjects(),
          footerProps: {
            countTxt: "Table.FooterCountTxt",
            totalAmountTxt: "Table.FooterTotalAmountTxt",
          },
        },
      },
      [HeaderSettingsTypes.MARKETPLACE]: {
        dataGrid: {
          columnsDef: [
            {
              field: "objectUuid",
              headerName: "Uuid objekta",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "Name",
              headerName: "Ime prodajnog mesta",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "marketPlaceId",
              headerName: "Id prodajnog mesta",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "IdObject",
              headerName: "Id objekta",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            
            {
              field: "IdCompany",
              headerName: "Id kompanije",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            
            {
              field: "MarketPlaceUuid",
              headerName: "UuidProdajnogMesta",
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                dateFormater.format(params.row.InvoiceDateUtc),
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
          //getDataAction: getObjects(),
          footerProps: {
            countTxt: "Table.FooterCountTxt",
            totalAmountTxt: "Table.FooterTotalAmountTxt",
          },
        },
      },
      [HeaderSettingsTypes.POINTOFSALE]: {
        dataGrid: {
          columnsDef: [
            {
              field: "IdPointOfSale",
              headerName: "Id kase",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "name",
              headerName: "Ime kase",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "CompanyId",
              headerName: "Id kompanije",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            
            {
              field: "CompanyName",
              headerName: "Ime kompanije",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
        
          ],
          toolbarProps: {
            showFilters: false,
            showDensity: false,
            showHideColumns: true,
            showExport: false,
          },
          //getDataAction: getObjects(),
          footerProps: {
            countTxt: "Table.FooterCountTxt",
            totalAmountTxt: "Table.FooterTotalAmountTxt",
          },
        },
      },
    },
  };
};
export { useTableSettings };
