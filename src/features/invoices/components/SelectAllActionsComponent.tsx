/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Button, Checkbox, IconButton, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { IProps } from "../models/invoice.models";
import { useComponentsStyles } from "./components.styles";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectIds, selectInvoices } from "../store/invoice.selectors";
import {
  resetSelectionState,
  setSelection,
} from "./DataGrid/store/data-grid.reducer";
import { selectSelection } from "./DataGrid/store/data-grid.selectors";
import { InvoiceStatus, TemplatePageTypes } from "../models";
import ConfirmWithCommentDialog from "./ConfirmWithCommentDialog";
import { updateStatusInvoice } from "../store/invoice.actions";

export type SelectAllAction = {
  title: string;
  actionName: string;
  actionIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
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
        return ["storno"];
      // case InvoiceStatus.CANCELLED:
      //   return ["storno"];
      case InvoiceStatus.SENT:
        return ["cancel", "approve", "reject"];
      case InvoiceStatus.SENDING:
        return ["cancel", "approve", "reject"];
      case InvoiceStatus.NEW:
        return ["reject", "approve"];
      case InvoiceStatus.SEEN:
        return ["reject", "approve"];
      default:
        return [];
    }
  };

  const renderActions = (): React.ReactNode => {
    let actionsToRender = ["delete", "download", ...getStatus()];
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
  const handleActionClick = (action: SelectAllAction, id: number): void => {
    setActionValue({
      actionType: action.actionName,
      invoiceId: id,
      invoiceType: props.pageType,
      comment: "",
    });
    setOpenConfirm(true);
  };

  /**
   * Handle close dialog comment = false on cancel comment = string on confirm
   * @param comment input value on dialog
   */
  const handleClose = (comment?: string | boolean): void => {
    if (!comment) {
      setOpenConfirm(false);
      setActionValue(null);
    } else {
      const dataToSend = { ...actionValue, comment: comment };
      dispach(updateStatusInvoice({ ...dataToSend }));
      setOpenConfirm(false);
      setActionValue(null);
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
            "aria-labelledby": `checkBox_1`,
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
          id: "ringtone-menu",
          keepMounted: true,
          open: openConfirm,
          onClose: handleClose,
        }}
      ></ConfirmWithCommentDialog>
    </div>
  );
}
