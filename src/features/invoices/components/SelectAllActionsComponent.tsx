import { Button, Checkbox, IconButton, SvgIconTypeMap } from "@mui/material";
import React from "react";
import { IProps } from "../models/invoice.models";
import { useComponentsStyles } from "./components.styles";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { useTranslation } from "react-i18next";

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
  return (
    <div style={filterComponentStyle.wrapper}>
      <Button
        style={selectAllConmponentStyles.buttonStyles}
        variant="text"
        onClick={() => setChecked(!checked)}
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
      {checked && (
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
