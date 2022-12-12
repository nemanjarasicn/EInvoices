import { GridValueGetterParams } from "@mui/x-data-grid";
import { HeaderSettingsTypes } from "../../models/registries.enums";
import {
  sendObjects,
  getObjects,
  getMarketPlaces,
  getPointOfSales,
  getCompanies,
  getUnits,
  getVat,
  getGroups
} from "../../store/registries.actions";
import { TableComponentProps } from "./TableComponent";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectCompany } from "../../../../app/core/core.selectors";
import { selectObjects, selectIds, selectMarketPlaces, selectPointOfSales, selectCompanies, selectWarehouses, selectUnits, selectVat, selectGroups, selectUsers} from "../../store/registries.selectors";

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

  const company = useAppSelector(selectCompany) ?? "";

  return {
    tableSettings: {
      [HeaderSettingsTypes.OBJECTS]: {
        dataGrid: {
          columnsDef: [
            {
              field: "name",
              headerName: "Objects.name",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "idObject",
              headerName: "Objects.idObject",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "uuid",
              headerName: "Objects.uuid",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "latitude",
              headerName: "Objects.latitude",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "longitude",
              headerName: "Objects.longitude",
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
          getDataAction: getObjects({companyId: company}),
          selectType:  "OBJECTS",
          selector:  selectObjects,
          parentColumn: "idObject",
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
              headerName: "MarketPlace.uuidObject",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "marketPlaceName",
              headerName: "MarketPlace.name",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "id",
              headerName: "MarketPlace.idMarketPlace",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "idObject",
              headerName: "MarketPlace.idObject",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
            },
            
            {
              field: "idCompany",
              headerName: "MarketPlace.idCompany",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
            },
            
            {
              field: "uuid",
              headerName: "MarketPlace.uuidMarketPlace",
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
          getDataAction: getMarketPlaces({companyId: company}),
          selectType:  "MARKETPLACES",
          selector:  selectMarketPlaces,
          parentColumn: "id",
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
              field: "id",
              headerName: "PointOfSale.idPointOfSale",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "namePointOfSale",
              headerName: "PointOfSale.name",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
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
              field: "idCompany",
              headerName: "PointOfSale.idCompany",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            
            {
              field: "companyName",
              headerName: "PointOfSale.nameOfCompany",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },

            {
              field: "marketPlaceUuid",
              headerName: "Uuid prodajnog mesta",
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
          getDataAction: getPointOfSales({companyId: company}),
          selectType:  "POINTOFSALES",
          selector:   selectPointOfSales,
          parentColumn: "id",
          footerProps: {
            countTxt: "Table.FooterCountTxt",
            totalAmountTxt: "Table.FooterTotalAmountTxt",
          },
        },
      },
      [HeaderSettingsTypes.COMPANIES]: {
        dataGrid: {
          columnsDef: [
            {
              field: "idCompany",
              headerName: "Companies.idCompany",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "companyName",
              headerName: "Companies.nameOfCompany",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
            },
            {
              field: "pib",
              headerName: "Companies.pib",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "date",
              headerName: "Companies.date",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "mb",
              headerName: "Companies.mb",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
              hide: false,
            },
            {
              field: "address",
              headerName: "Companies.adress",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "zip",
              headerName: "Companies.zip",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "country",
              headerName: "Companies.country",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "city",
              headerName: "Companies.city",
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
           getDataAction: getCompanies(),
          selectType:  "COMPANIES",
          selector:  selectCompanies,
          parentColumn: "idCompany",
          footerProps: {
            countTxt: "Table.FooterCountTxt",
            totalAmountTxt: "Table.FooterTotalAmountTxt",
          },
        },
      },
      [HeaderSettingsTypes.WAREHOUSES]: {
        dataGrid: {
          columnsDef: [
            {
              field: "id",
              headerName: "Warehouses.idWarehouse",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "warehouseName",
              headerName: "Warehouses.name",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "idMarketPlace",
              headerName: "Warehouses.idMarketPlace",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "marketPlaceUuid",
              headerName: "Warehouses.uuidMarketPlace",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "uuid",
              headerName: "Warehouses.uuid",
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
           getDataAction: getObjects({companyId: company}),
          selectType:  "WAREHOUSES",
          selector: selectWarehouses,
          parentColumn: "id",
          footerProps: {
            countTxt: "Table.FooterCountTxt",
            totalAmountTxt: "Table.FooterTotalAmountTxt",
          },
        },
      },
      [HeaderSettingsTypes.UNITS]: {
        dataGrid: {
          columnsDef: [
            {
              field: "id",
              headerName: "Units.idUnit",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "productUnitName",
              headerName: "Units.nameUnit",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
            },
            {
              field: "productUnitCode",
              headerName: "Units.unitCode",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "productUnitPlural",
              headerName: "Units.unitPlural",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "productUnitDecimalShow",
              headerName: "Units.decimalShow",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
              hide: false,
            },
            {
              field: "productUnitPriority",
              headerName: "Units.unitPriority",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "deafult",
              headerName: "Units.default",
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
          getDataAction: getUnits(),
          selectType:  "UNITS",
          selector:  selectUnits,
          parentColumn: "id",
          footerProps: {
            countTxt: "Table.FooterCountTxt",
            totalAmountTxt: "Table.FooterTotalAmountTxt",
          },
        },
      },
      [HeaderSettingsTypes.VAT]: {
        dataGrid: {
          columnsDef: [
            {
              field: "name",
              headerName: "Ime vat",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "value1",
              headerName: "Value1",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "value2",
              headerName: "Value2",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "value3",
              headerName: "Value3",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "code",
              headerName: "Code",
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
          getDataAction: getVat(),
          selectType:  "VAT",
          selector:  selectVat,
          parentColumn: "id",
          footerProps: {
            countTxt: "Table.FooterCountTxt",
            totalAmountTxt: "Table.FooterTotalAmountTxt",
          },
        },
      },
      [HeaderSettingsTypes.USERS]: {
        dataGrid: {
          columnsDef: [
            {
              field: "username",
              headerName: "Korisnicko ime",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "compnyId",
              headerName: "Id kompanije",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "roleName",
              headerName: "role Name",
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
          getDataAction: getObjects({companyId: company}),
          selectType:  "USERS",
          selector:  selectUsers,
          parentColumn: "id",
          footerProps: {
            countTxt: "Table.FooterCountTxt",
            totalAmountTxt: "Table.FooterTotalAmountTxt",
          },
        },
      },
      [HeaderSettingsTypes.GROUPS]: {
        dataGrid: {
          columnsDef: [
            {
              field: "groupName",
              headerName: "Naziv grupe",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "idPointOfSale",
              headerName: "Id kase",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
      
            {
              field: "parentGroupId",
              headerName: "parentGroupId",
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
          getDataAction: getGroups({uuid: company}),
          selectType:  "GROUPS",
          selector:  selectGroups,
          parentColumn: "id",
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
