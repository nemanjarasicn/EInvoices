/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Button, Checkbox, IconButton, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { IProps } from '../models/invoice.models';
import { useComponentsStyles } from './components.styles';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectIds,
  selectInvoices,
  selectOpenConfirm,
} from '../store/invoice.selectors';
import {
  resetSelectionState,
  setSelection,
} from './DataGrid/store/data-grid.reducer';
import { selectSelection } from './DataGrid/store/data-grid.selectors';
import { setopenModalConfirm } from '../store/invoice.reducer';
import { selectOpenPdf } from '../store/invoice.selectors';
import { InvoiceStatus, TemplatePageTypes } from '../models';
import ConfirmWithCommentDialog from './ConfirmWithCommentDialog';
import { updateStatusInvoice } from '../store/invoice.actions';

//for zip
import JSZip from 'jszip';
import * as FileSaver from 'file-saver';
import { getZip } from '../store/invoice.actions';

export type SelectAllAction = {
  title: string;
  actionName: string;
  actionIcon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
  hidden: boolean;
  disabled: boolean;
};

type SelectAllActionsComponentProps = {
  actions: SelectAllAction[];
  pageType: TemplatePageTypes;
};

export default function SelectAllActionsComponent({
  props,
}: IProps<SelectAllActionsComponentProps>): JSX.Element {
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [checked, setChecked] = React.useState<boolean>(false);
  const [actions, setActions] = React.useState<SelectAllAction[]>(
    props.actions
  );
  const [actionValue, setActionValue] = React.useState<any>(null);
  const { filterComponentStyle, selectAllConmponentStyles } =
    useComponentsStyles();
  const { t } = useTranslation();
  const dispach = useAppDispatch();
  const tableDataIds = useAppSelector(selectIds);
  const selection: any[] = useAppSelector(selectSelection);
  const invoices = useAppSelector(selectInvoices);
  const navigate = useNavigate();

  const openConfirmModal = useAppSelector(selectOpenConfirm);

  // --------------ZIP -------------------------------------
  const dispatch = useAppDispatch();
  const zip = new JSZip();
  //const zipData = useAppSelector(selectZip);

  // function for unzip file
  const unzipFile = async (flag: string, zipDataT: any) => {
    await zip
      .loadAsync(zipDataT.payload, { base64: true })
      .then(function (zip) {
        Object.keys(zip.files).map((filename) => {
          const extName = flag === 'PDF' ? '.pdf' : '.xml';
          const filenameDownload =
            filename.slice(0, filename.length - 4) + extName;
          zip.files[filename].async('blob').then(async function (fileData) {
            const dataDownload = await fileData.slice(2).text();
            flag === 'PDF'
              ? downloadPDF(dataDownload, filenameDownload)
              : downloadXml(fileData, filenameDownload);
          });
        });
      });
  };

  function downloadPDF(pdf: string, fileName: string) {
    const linkSource = `data:application/pdf;base64,${pdf}`;
    const downloadLink = document.createElement('a');

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  function downloadXml(data: Blob, fileName: string) {
    FileSaver.saveAs(data, fileName);
  }

  // ---------------END ZIP ----------------------------------

  React.useEffect(() => {
    if (selection.length === 0) {
      setChecked(false);
    }
  }, [selection.length]);

  /**
   *  Unmount
   */
  React.useEffect(
    () => () => {
      dispach(resetSelectionState([]));
    },
    []
  );

  const handleCheckClick = () => {
    checked ? dispach(setSelection([])) : dispach(setSelection(tableDataIds));
    setChecked(!checked);
  };

  const getStatus = (): string[] => {
    if (selection.length > 1) return [];
    let status = invoices.find(
      (item) => item.id === selection[0]
    )?.invoiceStatus;
    switch (status) {
      case InvoiceStatus.APPROVED:
        return ['storno'];
      // case InvoiceStatus.CANCELLED:
      //   return ["storno"];
      case InvoiceStatus.SENT:
        return ['cancel', 'approve', 'reject'];
      case InvoiceStatus.SENDING:
        return ['cancel', 'approve', 'reject'];
      case InvoiceStatus.NEW:
        return ['reject', 'approve'];
      case InvoiceStatus.SEEN:
        return ['reject', 'approve'];
      default:
        return [];
    }
  };

  const renderActions = (): React.ReactNode => {
    let actionsToRender = [
      'delete',
      'downloadXml',
      'downloadPdf',
      ...getStatus(),
    ];
    return actions.map((action, index) => {
      const Icon = action.actionIcon;
      const key = `button-label-${action.title}.${index}.id`;
      return actionsToRender.includes(action.actionName) ? (
        <IconButton
          id={action.actionName}
          name={action.actionName}
          disabled={action.disabled}
          key={key}
          aria-label={key}
          color="primary"
          size="small"
          onClick={() => handleActionClick(action, selection[0])}
        >
          <Icon />
          <span style={selectAllConmponentStyles.soloSelectAll}>
            {`${t(action.title)}`}
          </span>
        </IconButton>
      ) : null;
    });
  };

  /**
   * Open Confirm dialog depends on action type
   * @param action Action object
   * @param id Invoice id
   */
  const handleActionClick = async (action: SelectAllAction, id: number) => {
    setActionValue({
      actionType: action.actionName,
      invoiceId: id,
      invoiceType: props.pageType,
      comment: '',
    });

    const typeInvoicesZip = (await props.pageType) === 'sales' ? 1 : 0;
    const typeColumn =
      typeInvoicesZip === 1 ? 'salesInvoiceId' : 'purchaseInvoiceId';
    if (action.actionName === 'downloadPdf') {
      const invoiceSelectpdf = await invoices.filter(
        (item) => item.id === id
      )[0][`${typeColumn}`];
      const zipData = await dispatch(
        getZip({
          id: invoiceSelectpdf,
          typeDocument: typeInvoicesZip,
          typeInvoices: 'printPdf',
        })
      );
      unzipFile('PDF', zipData).catch((err) => console.log('greska', err));
    } else if (action.actionName === 'downloadXml') {
      const invoiceSelectxml = await invoices.filter(
        (item) => item.id === id
      )[0].salesInvoiceId;
      const zipData = await dispatch(
        getZip({
          id: invoiceSelectxml,
          typeDocument: typeInvoicesZip,
          typeInvoices: 'downloadXml',
        })
      );
      unzipFile('XML', zipData).catch((err) => console.log('greska'));
    } else {
      setOpenConfirm(true);
    }
  };

  /**
   * Handle close dialog comment = false on cancel comment = string on confirm
   * @param comment input value on dialog
   */
  const handleClose = (data: {
    comment?: string | boolean;
    flagButton: string;
  }): void => {
    const dataFromAction = openConfirmModal.dataAction;
    if (data.flagButton === 'cancel') {
      setOpenConfirm(false);
      //dispach(setopenModalConfirm({open: false}));
      setActionValue(null);
    } else {
      const dataToSend = { ...actionValue, comment: data.comment };
      //const dataToSend = { ...actionValue, comment: data.comment };
      dispach(updateStatusInvoice({ ...dataToSend }));
      setOpenConfirm(false);
      //dispach(setopenModalConfirm({open:  false}))
      setActionValue(null);
      navigate(`/invoices/${props.pageType}`);
    }
  };

  return (
    <div style={filterComponentStyle.wrapper}>
      <Button
        style={selectAllConmponentStyles.buttonStyles}
        variant="text"
        onClick={handleCheckClick}
      >
        <Checkbox
          style={selectAllConmponentStyles.checkbox}
          edge="start"
          checked={checked}
          tabIndex={-1}
          disableRipple
          inputProps={{
            'aria-labelledby': `checkBox_1`,
          }}
        />
      </Button>
      {selection.length > 0 && (
        <div style={filterComponentStyle.checkedFiltersInner}>
          {renderActions()}
        </div>
      )}
      <ConfirmWithCommentDialog
        props={{
          id: 'ringtone-menu',
          keepMounted: true,
          open: openConfirm,
          onClose: handleClose,
          action: actionValue?.actionType,
        }}
      ></ConfirmWithCommentDialog>
    </div>
  );
}
