import { HeaderSettingsTypes } from "../../models/registries.enums";

import {
  getObjects,
  getMarketPlaces,
  getPointOfSales,
  getCompanies,
  getUnits,
  getVat,
  getGroups,
  getUsers,
  getCompaniesDistributor
} from "../../store/registries.actions";
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { TableComponentProps } from "./TableComponent";
import IconButton from '@mui/material/IconButton';
import {
  Grid,
} from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile }   from '@fortawesome/pro-solid-svg-icons';
import { faFilePdf }   from '@fortawesome/pro-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import {   useAppSelector ,  useAppDispatch   } from "../../../../app/hooks";
import { selectUser } from "../../../../app/core/core.selectors";
import {  faPenToSquare}   from '@fortawesome/pro-solid-svg-icons';
import { faUserPen }   from '@fortawesome/pro-solid-svg-icons';
import { setUserCompanyId  }   from  "../../store/registries.reducer"
import { styled } from '@mui/material/styles';
import { selectCompanyCurrent } from "../../../../app/core/core.selectors";
import { selectObjects, 
         selectMarketPlaces, 
         selectPointOfSales, 
         selectCompanies, 
         selectWarehouses, 
         selectUnits, 
         selectVat, 
         selectGroups, 
         selectUsers, 
         selectDistributorCompanies,
         selectUserCompanyId} from "../../store/registries.selectors";


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

  const navigate  = useNavigate();
  const dispach = useAppDispatch();
  const company = useAppSelector(selectCompanyCurrent) ?? "";
  const isDistributor  =  useAppSelector(selectUser)?.authorities?.slice(0,1)[0].authority === "ROLE_DISTRIBUTER" ? true  :   false;
  const userCompanyId =    useAppSelector(selectUserCompanyId);



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
            {
              field: 'action',
              headerName: 'Action',
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
              renderCell: (params) => (
              <Grid container sx={{display: 'flex'}}>
                <Grid item xs={4}  sx={{display: 'flex', justifyContent:  'center'}} >
                <LightTooltip title="Informacije o kompaniji">
                  <IconButton  color="primary" aria-label="pdf" component="label"  onClick={() => {  
                  navigate('/registries/infoCompany', {
                    state: {
                      company: params.row.idCompany
                    }
                  })}}>
                  <FontAwesomeIcon icon={faFile}   color="#E9950C"   />
                  </IconButton>
                  </LightTooltip>
                </Grid>
                <Grid item  xs={4}  sx={{display: 'flex', justifyContent:  'center'}} >
                  <LightTooltip title="Izmena kompanije">
                      <IconButton sx={{display:  'flex', justifyContent:  'center'}} color="primary" aria-label="pdf" component="label"  onClick={() => {  
                          navigate(`/registries/createCompany/${params.row.idCompany}`, 
                            {state: 
                                {
                                   id: params.row.idCompany,
                                   data: params.row
                                }})
                          }}>
                          <FontAwesomeIcon icon={faPenToSquare}   color="#E9950C"   />
                      </IconButton>
                  </LightTooltip>
                </Grid>

                <Grid item xs={4}  sx={{display: 'flex', justifyContent:  'center'}} >
                <LightTooltip title="Izmena korisnika">
                  <IconButton  color="primary" aria-label="pdf" component="label"  onClick={() => {
                  dispach(setUserCompanyId(params.row.idCompany))  
                  navigate('/registries/users', {
                    state: {
                      company: params.row.idCompany
                    }
                  })}}>
                  <FontAwesomeIcon icon={faUserPen}   color="#E9950C"   />
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
           getDataAction: isDistributor ? getCompaniesDistributor({companyId:   company}) :  getCompanies(),
          selectType:  "COMPANIES",
          selector:  isDistributor ?  selectDistributorCompanies  :   selectCompanies,
          parentColumn:  "idCompany",
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
              headerName: "Vats.nameVat",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "value1",
              headerName: "Vats.value1",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "value2",
              headerName: "Vats.value2",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "value3",
              headerName: "Vats.value3",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "code",
              headerName: "Vats.code",
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
              headerName: "Users.username",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "companyId",
              headerName: "Users.compnyId",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "roleName",
              headerName: "Users.roleName",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },

            {
              field: 'action',
              headerName: 'Action',
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
              renderCell: (params) => (
              <Grid container sx={{display: 'flex'}}>
                <Grid item xs={12}  sx={{display: 'flex', justifyContent:  'center'}} >
                <LightTooltip title="Izmena korisnika">
                  <IconButton  color="primary" aria-label="pdf" component="label"  onClick={() => {    
                  navigate(`/registries/createUser/${params.row.id}`, {
                    state: {
                      id: params.row.id,
                      data:   params.row
                    }
                  })}}>
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
          getDataAction:getUsers({companyId: userCompanyId}),
          selectType:  "USERS",
          selector:  selectUsers,
          parentColumn: "username",
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
              headerName: "Groups.groupName",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "idPointOfSale",
              headerName: "Groups.idPointOfSale",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
      
            {
              field: "parentGroupId",
              headerName: "Groups.parentGroupId",
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
