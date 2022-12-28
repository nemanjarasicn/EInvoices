import { GridValueGetterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { HeaderSettingsTypes } from "../../models/invoice.enums";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {   useAppSelector, useAppDispatch } from "../../../../app/hooks";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import  { setopenModalPdf }  from   '../../store/invoice.reducer'
import Box from "@mui/material/Box";
import { handleInvoiceStatus } from "../../utils/utils";
import { TableComponentProps } from "./TableComponent";
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { unzipFile,  unzipFileData }  from  "../../pages/InvoiceTemplatePage"
import {getZip }  from  "../../store/invoice.actions"



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

  const dispach = useAppDispatch();

  const getZipData = async  (flag: string, typeInvoicesZip:  number,  id: any) =>  {
    const  typeInvoices =  flag ===  'XML'  ?   'downloadXml'  :  'printPdf';
    const zipData = await dispach(getZip({id: id,typeDocument: typeInvoicesZip, typeInvoices:  typeInvoices}));
    //const unzipData = await  unzipFileData(zipData);
    if(flag ===  'PDF') {
      //dispach(setopenModalPdf(true))
    }
    unzipFile(flag, zipData)
    .catch((err)   =>  console.log('greska prilikom download ' + flag));
  }

  return {
    tableSettings: {
      [HeaderSettingsTypes.SALES]: {
        dataGrid: {
          columnsDef: [
            {
              field: "numberDocument",
              headerName: "TableColumns.InvoiceNumber",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "typeDocument",
              headerName: "TableColumns.InvoiceType",
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                handleInvoiceStatus(params.row.typeDocument),
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "crfInvoiceId",
              headerName: "TableColumns.CirInvoiceId",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "CirStatus",
              headerName: "TableColumns.CirStatus",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "invoiceStatus",
              headerName: "TableColumns.Status",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
            },
            {
              field: "clientName",
              headerName: "TableColumns.Receiver",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "finalSum",
              headerName: "TableColumns.TotalToPay",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "deliveryDate",
              headerName: "TableColumns.InvoiceDateUtc",
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                dayjs(params.row.deliveryDate).format("YYYY-MM-DD"),
              headerAlign: "center",
              align: "center",
              hideable: true,
              hide: false,
            },
            {
              field: "dateIssue",
              headerName: "TableColumns.InvoiceSentDateUtc",
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                dayjs(params.row.dateIssue).format("YYYY-MM-DD"),
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "dueDate",
              headerName: "TableColumns.PaymentDateUtc",
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                dayjs(params.row.dueDate).format("YYYY-MM-DD"),
              headerAlign: "center",
              align: "center",
              hideable: true,
              hide: true,
            },
            {
              field: "ReferenceNumber",
              headerName: "TableColumns.ReferenceNumber",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
              hide: true,
            },
            {
              field: "ServiceProvider",
              headerName: "TableColumns.ServiceProvider",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
              hide: true,
            },
            {
              field: "ChannelAdress",
              headerName: "TableColumns.ChannelAdress",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
              hide: true,
            },


            {
              field: 'action',
              headerName: 'Action',
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
              renderCell: (params) => (
                <Box sx={{display:  'flex', justifyContent: 'space-between', p: 2}}>
                  <LightTooltip title="PDF preview">
                  <IconButton sx={{mr: 2}} color="primary" aria-label="pdf" component="label"  onClick={() => {getZipData('PDF', 1, params.row.salesInvoiceId)}}>
                    <PictureAsPdfIcon  sx={{ color: "#ef3e56" }} />
                  </IconButton>
                  </LightTooltip>
                  <LightTooltip title="XML download">
                  <IconButton color="primary" aria-label="xml" component="label"   onClick={() => {getZipData('XML', 1, params.row.salesInvoiceId)}} >
                    <CloudDownloadIcon  sx={{  color: "#0D78DE"}} />
                  </IconButton>
                  </LightTooltip>

                </Box>
              )
            },
          ],
          toolbarProps: {
            showFilters: false,
            showDensity: false,
            showHideColumns: true,
            showExport: false,
          },
          footerProps: {
            countTxt: "Table.FooterCountTxt",
            totalAmountTxt: "Table.FooterTotalAmountTxt",
          },
        },
      },
      [HeaderSettingsTypes.PURCHASES]: {
        dataGrid: {
          columnsDef: [
            {
              field: "numberDocument",
              headerName: "TableColumns.InvoiceNumber",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "typeDocument",
              headerName: "TableColumns.InvoiceType",
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                handleInvoiceStatus(params.row.typeDocument),
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "crfInvoiceId",
              headerName: "TableColumns.CirInvoiceId",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "CirStatus",
              headerName: "TableColumns.CirStatus",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "invoiceStatus",
              headerName: "TableColumns.Status",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
            },
            {
              field: "clientName",
              headerName: "TableColumns.Supplier",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "finalSum",
              headerName: "TableColumns.TotalToPay",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "deliveryDate",
              headerName: "TableColumns.InvoiceDateUtc",
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                dayjs(params.row.deliveryDate).format("YYYY-MM-DD"),
              headerAlign: "center",
              align: "center",
              hideable: true,
              hide: false,
            },
            {
              field: "dateIssue",
              headerName: "TableColumns.InvoiceSentDateUtc",
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                dayjs(params.row.dateIssue).format("YYYY-MM-DD"),
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "dueDate",
              headerName: "TableColumns.PaymentDateUtc",
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                dayjs(params.row.dueDate).format("YYYY-MM-DD"),
              headerAlign: "center",
              align: "center",
              hideable: true,
              hide: true,
            },
            {
              field: "ReferenceNumber",
              headerName: "TableColumns.ReferenceNumber",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
              hide: true,
            },


            {
              field: 'action',
              headerName: 'Action',
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
              renderCell: (params) => (
                <Box sx={{display:  'flex', justifyContent: 'space-between', p: 2}}>
                  <LightTooltip title="PDF preview">
                  <IconButton sx={{mr: 2}} color="primary" aria-label="pdf" component="label"  onClick={() => {getZipData('PDF', 0,  params.row.purchaseInvoiceId)}}>
                    <PictureAsPdfIcon  sx={{ color: "#ef3e56" }} />
                  </IconButton>
                  </LightTooltip>
                  <LightTooltip title="XML download">
                  <IconButton color="primary" aria-label="xml" component="label"   onClick={() => {getZipData('XML', 0,  params.row.purchaseInvoiceId)}} >
                    <CloudDownloadIcon  sx={{  color: "#0D78DE"}} />
                  </IconButton>
                  </LightTooltip>

                </Box>
              )
            },
          ],
          toolbarProps: {
            showFilters: false,
            showDensity: false,
            showHideColumns: true,
            showExport: false,
          },
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
