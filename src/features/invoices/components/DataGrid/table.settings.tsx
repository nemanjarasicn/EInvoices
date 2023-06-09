import { GridValueGetterParams } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { HeaderSettingsTypes } from '../../models/invoice.enums';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from '../../../../app/hooks';

import { TableComponentProps } from './TableComponent';
import { styled } from '@mui/material/styles';
import {
  setopenModalConfirm,
  setopenModalPdf,
} from '../../store/invoice.reducer';
import { useTranslation } from 'react-i18next';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { getInvoiceDetails } from '../../store/invoice.actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/pro-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/pro-solid-svg-icons';
import { faFile } from '@fortawesome/pro-solid-svg-icons';
import { faFileCircleXmark } from '@fortawesome/pro-solid-svg-icons';
import { Grid } from '@mui/material';

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
  const { t } = useTranslation();

  const getZipData = async (
    flag: string,
    typeInvoicesZip: number,
    id: any,
    dataRows?: any
  ) => {
    if (flag === 'PDF') {
      dispach(getInvoiceDetails({ id: dataRows?.id })).then((res) => {
        dispach(
          setopenModalPdf({
            open: true,
            data: {
              dataXml: dataRows.xml,
              dataRows: res.payload,
              dataInfo: id,
              typeInvoicesZip: typeInvoicesZip,
              paramData: dataRows,
            },
          })
        );
      });
    }
  };

  const handleInvoiceStatus = (status: number | string): string => {
    switch (Number(status)) {
      case 380:
        return t('InvoiceTypes.debitInvoice');
      case 381:
        return t('InvoiceTypes.creditNote');
      case 383:
        return t('InvoiceTypes.debitNote');
      case 386:
        return t('InvoiceTypes.prepayment');
      default:
        throw new Error('No such type!!!');
    }
  };

  const handleStatus = (status: any) => {
    switch (status) {
      case 'Seen':
        return t('InvoiceStatuses.seen');
      case 'Approved':
        return t('InvoiceStatuses.approved');
      case 'Sent':
        return t('InvoiceStatuses.sent');
      case 'Cancelled':
        return t('InvoiceStatuses.cancelled');
      case 'Rejected':
        return t('InvoiceStatuses.rejected');
      case 'New':
        return t('InvoiceStatuses.new');
      case 'Storno':
        return t('InvoiceStatuses.storno');
      case 'Draft':
        return t('InvoiceStatuses.draft');
      case 'Mistake':
        return t('InvoiceStatuses.mistake');
      case 'Paid':
        return t('InvoiceStatuses.paid');
      default:
        return status;
    }
  };

  return {
    tableSettings: {
      [HeaderSettingsTypes.SALES]: {
        dataGrid: {
          columnsDef: [
            {
              field: 'numberDocument',
              headerName: 'TableColumns.InvoiceNumber',
              flex: 1,
              headerAlign: 'center',
              align: 'center',
              hideable: false,
            },
            {
              field: 'typeDocument',
              headerName: 'TableColumns.InvoiceType',
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                handleInvoiceStatus(params.row.typeDocument),
              headerAlign: 'center',
              align: 'center',
              hideable: false,
            },
            {
              field: 'crfInvoiceId',
              headerName: 'TableColumns.CirInvoiceId',
              flex: 1,
              headerAlign: 'center',
              align: 'center',
              hideable: false,
            },
            {
              field: 'CirStatus',
              headerName: 'TableColumns.CirStatus',
              flex: 1,
              headerAlign: 'center',
              align: 'center',
              hideable: false,
            },
            {
              field: 'invoiceStatus',
              headerName: 'TableColumns.Status',
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                handleStatus(params.row.invoiceStatus),
              headerAlign: 'center',
              align: 'center',
              hideable: true,
            },
            {
              field: 'clientName',
              headerName: 'TableColumns.Receiver',
              flex: 1,
              headerAlign: 'center',
              align: 'center',
              hideable: false,
            },
            {
              field: 'finalSum',
              headerName: 'TableColumns.TotalToPay',
              flex: 1,
              headerAlign: 'center',
              align: 'center',
              hideable: false,
            },
            {
              field: 'deliveryDate',
              headerName: 'TableColumns.InvoiceDateUtc',
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                dayjs(params.row.deliveryDate).format('DD/MM/YYYY'),
              headerAlign: 'center',
              align: 'center',
              hideable: true,
              hide: false,
            },
            {
              field: 'dateIssue',
              headerName: 'TableColumns.InvoiceSentDateUtc',
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                dayjs(params.row.dateIssue).format('DD/MM/YYYY'),
              headerAlign: 'center',
              align: 'center',
              hideable: false,
            },
            {
              field: 'dueDate',
              headerName: 'TableColumns.PaymentDateUtc',
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                dayjs(params.row.dueDate).format('YYYY-MM-DD'),
              headerAlign: 'center',
              align: 'center',
              hideable: true,
              hide: true,
            },
            {
              field: 'ReferenceNumber',
              headerName: 'TableColumns.ReferenceNumber',
              flex: 1,
              headerAlign: 'center',
              align: 'center',
              hideable: true,
              hide: true,
            },
            {
              field: 'ServiceProvider',
              headerName: 'TableColumns.ServiceProvider',
              flex: 1,
              headerAlign: 'center',
              align: 'center',
              hideable: true,
              hide: true,
            },
            {
              field: 'ChannelAdress',
              headerName: 'TableColumns.ChannelAdress',
              flex: 1,
              headerAlign: 'center',
              align: 'center',
              hideable: true,
              hide: true,
            },

            {
              field: 'action',
              headerName: 'Action',
              flex: 1,
              headerAlign: 'center',
              align: 'center',
              hideable: true,
              renderCell: (params) => (
                <Grid container sx={{ display: 'flex' }}>
                  <Grid item xs={3}>
                    <LightTooltip title="PDF preview">
                      <IconButton
                        sx={{ mr: 2 }}
                        color="primary"
                        aria-label="pdf"
                        component="label"
                        onClick={() => {
                          getZipData(
                            'PDF',
                            1,
                            params.row.salesInvoiceId,
                            params.row
                          );
                        }}
                      >
                        <FontAwesomeIcon icon={faFilePdf} color="#E9950C" />
                      </IconButton>
                    </LightTooltip>
                  </Grid>
                  <Grid item xs={3}>
                    <LightTooltip title="XML download">
                      <IconButton
                        color="primary"
                        aria-label="xml"
                        component="label"
                        onClick={() => {
                          getZipData('XML', 1, params.row.salesInvoiceId);
                        }}
                      >
                        <FontAwesomeIcon icon={faFile} color="#0D78DE" />
                      </IconButton>
                    </LightTooltip>
                  </Grid>
                  <Grid item xs={3}>
                    {(params.row.invoiceStatus === 'Sent' ||
                      params.row.invoiceStatus === 'Sending') && (
                      <LightTooltip title="Otkazi">
                        <IconButton
                          color="primary"
                          aria-label="pdf"
                          component="label"
                          onClick={() => {
                            dispach(
                              setopenModalConfirm({
                                open: true,
                                dataAction: {
                                  actionType: 'cancel',
                                  invoiceId: params.row.invoiceId,
                                  invoiceType: 'SALES',
                                  comment: '',
                                },
                              })
                            );
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faFileCircleXmark}
                            color="red"
                          />
                        </IconButton>
                      </LightTooltip>
                    )}
                  </Grid>
                </Grid>
              ),
            },
          ],
          toolbarProps: {
            showFilters: false,
            showDensity: false,
            showHideColumns: true,
            showExport: false,
          },
          footerProps: {
            countTxt: 'Table.FooterCountTxt',
            totalAmountTxt: 'Table.FooterTotalAmountTxt',
          },
          type: 'sales',
        },
      },
      [HeaderSettingsTypes.PURCHASES]: {
        dataGrid: {
          columnsDef: [
            {
              field: 'numberDocument',
              headerName: 'TableColumns.InvoiceNumber',
              flex: 1,
              headerAlign: 'center',
              align: 'center',
              hideable: false,
            },
            {
              field: 'typeDocument',
              headerName: 'TableColumns.InvoiceType',
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                handleInvoiceStatus(params.row.typeDocument),
              headerAlign: 'center',
              align: 'center',
              hideable: false,
            },
            {
              field: 'crfInvoiceId',
              headerName: 'TableColumns.CirInvoiceId',
              flex: 1,
              headerAlign: 'center',
              align: 'center',
              hideable: false,
            },
            {
              field: 'CirStatus',
              headerName: 'TableColumns.CirStatus',
              flex: 1,
              headerAlign: 'center',
              align: 'center',
              hideable: false,
            },
            {
              field: 'invoiceStatus',
              headerName: 'TableColumns.Status',
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                handleStatus(params.row.invoiceStatus),
              headerAlign: 'center',
              align: 'center',
              hideable: true,
            },
            {
              field: 'clientName',
              headerName: 'TableColumns.SupplierName',
              flex: 1,
              headerAlign: 'center',
              align: 'center',
              hideable: false,
            },
            {
              field: 'finalSum',
              headerName: 'TableColumns.TotalToPay',
              flex: 1,
              headerAlign: 'center',
              align: 'center',
              hideable: false,
            },
            {
              field: 'deliveryDate',
              headerName: 'TableColumns.InvoiceDateUtc',
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                dayjs(params.row.deliveryDate).format('DD/MM/YYYY'),
              headerAlign: 'center',
              align: 'center',
              hideable: true,
              hide: false,
            },
            {
              field: 'dateIssue',
              headerName: 'TableColumns.InvoiceSentDateUtc',
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                dayjs(params.row.dateIssue).format('DD/MM/YYYY'),
              headerAlign: 'center',
              align: 'center',
              hideable: false,
            },
            {
              field: 'dueDate',
              headerName: 'TableColumns.PaymentDateUtc',
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                dayjs(params.row.dueDate).format('YYYY-MM-DD'),
              headerAlign: 'center',
              align: 'center',
              hideable: true,
              hide: true,
            },
            {
              field: 'ReferenceNumber',
              headerName: 'TableColumns.ReferenceNumber',
              flex: 1,
              headerAlign: 'center',
              align: 'center',
              hideable: true,
              hide: true,
            },

            {
              field: 'action',
              headerName: 'Action',
              flex: 1,
              headerAlign: 'center',
              align: 'center',
              hideable: true,
              renderCell: (params) => (
                <Grid container sx={{ display: 'flex' }}>
                  <Grid item xs={3}>
                    <LightTooltip title="PDF preview">
                      <IconButton
                        sx={{ mr: 1 }}
                        color="primary"
                        aria-label="pdf"
                        component="label"
                        onClick={() => {
                          getZipData(
                            'PDF',
                            0,
                            params.row.purchaseInvoiceId,
                            params.row
                          );
                        }}
                      >
                        <FontAwesomeIcon icon={faFilePdf} color="#E9950C" />
                      </IconButton>
                    </LightTooltip>
                  </Grid>
                  <Grid item xs={3}>
                    <LightTooltip title="XML download">
                      <IconButton
                        color="primary"
                        aria-label="xml"
                        component="label"
                        onClick={() => {
                          getZipData('XML', 0, params.row.purchaseInvoiceId);
                        }}
                      >
                        <FontAwesomeIcon icon={faFile} color="#0D78DE" />
                      </IconButton>
                    </LightTooltip>
                  </Grid>
                  <Grid item xs={3}>
                    {params.row.invoiceStatus === 'Seen' && (
                      <LightTooltip title="Odbij">
                        <IconButton
                          color="primary"
                          aria-label="pdf"
                          component="label"
                          onClick={() => {
                            console.log(params.row);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faFileCircleXmark}
                            color="red"
                          />
                        </IconButton>
                      </LightTooltip>
                    )}
                  </Grid>
                  <Grid item xs={3}>
                    {params.row.invoiceStatus === 'Seen' && (
                      <LightTooltip title="Odobri">
                        <IconButton
                          color="primary"
                          aria-label="pdf"
                          component="label"
                          onClick={() => {
                            console.log(params.row);
                          }}
                        >
                          <FontAwesomeIcon icon={faCheckCircle} color="green" />
                        </IconButton>
                      </LightTooltip>
                    )}
                  </Grid>
                </Grid>
              ),
            },
          ],
          toolbarProps: {
            showFilters: false,
            showDensity: false,
            showHideColumns: true,
            showExport: false,
          },
          footerProps: {
            countTxt: 'Table.FooterCountTxt',
            totalAmountTxt: 'Table.FooterTotalAmountTxt',
          },
          type: 'purchases',
        },
      },
      [HeaderSettingsTypes.ERRORLOGS]: {
        dataGrid: {
          columnsDef: [
            {
              field: 'Opis',
              headerName: 'Opis',
              flex: 1,
              headerAlign: 'center',
              align: 'center',
              hideable: false,
            },
            {
              field: 'Datum',
              headerName: 'Datum',
              flex: 1,
              headerAlign: 'center',
              align: 'center',
              hideable: false,
            },
          ],
          toolbarProps: {
            showFilters: false,
            showDensity: false,
            showHideColumns: true,
            showExport: false,
          },
          footerProps: {
            countTxt: 'Table.FooterCountTxt',
            totalAmountTxt: 'Table.FooterTotalAmountTxt',
          },
          type: 'errorLogs',
        },
      },
    },
  };
};
export { useTableSettings };
