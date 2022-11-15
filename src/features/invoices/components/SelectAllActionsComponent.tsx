/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Button, Checkbox, IconButton, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { IProps } from "../models/invoice.models";
import { useComponentsStyles } from "./components.styles";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectIds } from "../store/invoice.selectors";
import {
  resetSelectionState,
  setSelection,
} from "./DataGrid/store/data-grid.reducer";
import { selectSelection } from "./DataGrid/store/data-grid.selectors";

export type SelectAllAction = {
  actionName: string;
  actionIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  actionFn: () => void;
};

type SelectAllActionsComponentProps = {
  actions: SelectAllAction[];
};

export default function SelectAllActionsComponent({
  props,
}: IProps<SelectAllActionsComponentProps>): JSX.Element {
  const [checked, setChecked] = React.useState<boolean>(false);

  const { filterComponentStyle, selectAllConmponentStyles } =
    useComponentsStyles();
  const { t } = useTranslation();
  const dispach = useAppDispatch();
  const tableDataIds = useAppSelector(selectIds);
  console.log("IDS", tableDataIds);

  const selectionLength: number = useAppSelector(selectSelection).length;

  React.useEffect(() => {
    if (selectionLength === 0) {
      setChecked(false);
    }
  }, [selectionLength]);

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
      {selectionLength > 0 && (
        <div style={filterComponentStyle.checkedFiltersInner}>
          {props.actions.map((action, index) => {
            const Icon = action.actionIcon;
            const key = `button-label-${action.actionName}.${index}.id`;
            return (
              <IconButton
                key={key}
                aria-label={key}
                color="primary"
                size="small"
                onClick={() => action.actionFn()}
              >
                <Icon />
                <span style={selectAllConmponentStyles.soloSelectAll}>
                  {`${t(action.actionName)}`}
                </span>
              </IconButton>
            );
          })}
        </div>
      )}
    </div>
  );
}
