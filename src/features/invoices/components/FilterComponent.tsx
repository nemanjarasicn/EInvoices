import React from "react";
import {
  Button,
  Popper,
  Fade,
  Paper,
  ClickAwayListener,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import { useComponentsStyles } from "./components.styles";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { useTranslation } from "react-i18next";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { IProps } from "../models/invoice.models";

export type FilterComponentProps = {
  filterTitle: string;
  transformedTitle: string;
  type: FilterType;
  multiOption?: boolean;
  filterItems: FillterItem[];
};

export interface FillterItem {
  index: number;
  name: string;
}

type FilterType = "solo" | "multi" | "date";

export default function FilterComponent({
  props,
}: IProps<FilterComponentProps>): JSX.Element {
  const { filterComponentStyle } = useComponentsStyles();
  const { t } = useTranslation();

  const [checked, setChecked] = React.useState<FillterItem[]>([]);

  const handleToggle = (value: FillterItem) => () => {
    if (checked) {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
      currentIndex === -1
        ? newChecked.push(value)
        : newChecked.splice(currentIndex, 1);
      setChecked(newChecked);
    } else {
      setChecked([value]);
    }
  };

  const handleClearAll = () => () => setChecked([]);

  const handleRemoveFilterItem = (item: FillterItem) => () => {
    const newArr: FillterItem[] = checked.filter((element: FillterItem) => {
      return element.name !== item.name;
    });
    setChecked([...newArr]);
  };

  return (
    <>
      {(() => {
        switch (props.type) {
          case "multi":
            return (
              <PopupState variant="popper" popupId="popup-popper">
                {(popupState) => {
                  return (
                    <div style={filterComponentStyle.wrapper}>
                      {checked.length > 0 && (
                        <div style={filterComponentStyle.checkedFilters}>
                          {checked.map((item, index) => {
                            return (
                              <div
                                key={index}
                                style={filterComponentStyle.checkedFiltersInner}
                              >
                                <span>{`${t(item.name)}`}</span>
                                <IconButton
                                  aria-label="delete"
                                  size="small"
                                  onClick={handleRemoveFilterItem(item)}
                                >
                                  <CancelRoundedIcon fontSize="inherit" />
                                </IconButton>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      {checked && checked.length === 0 ? (
                        <Button
                          style={filterComponentStyle.buttonStyles}
                          variant="text"
                          {...bindToggle(popupState)}
                        >
                          {`${t(props.filterTitle)}`}
                        </Button>
                      ) : (
                        <Button
                          style={filterComponentStyle.buttonStyles}
                          variant="text"
                          onClick={handleClearAll()}
                        >
                          {`${t(props.transformedTitle)}`}
                        </Button>
                      )}
                      <Popper
                        {...bindPopper(popupState)}
                        transition
                        style={{ width: "200px" }}
                      >
                        {({ TransitionProps }) => (
                          <Fade {...TransitionProps} timeout={350}>
                            <Paper>
                              <ClickAwayListener
                                onClickAway={() => popupState.close()}
                              >
                                <List sx={filterComponentStyle.paperList}>
                                  {props.filterItems.map((value) => {
                                    const labelId = `checkbox-list-label-${value.index}.id`;

                                    return (
                                      <ListItem
                                        key={value.index}
                                        disablePadding
                                      >
                                        <ListItemButton
                                          role={undefined}
                                          onClick={handleToggle(value)}
                                          dense
                                        >
                                          <ListItemIcon>
                                            <Checkbox
                                              edge="start"
                                              checked={
                                                checked.length
                                                  ? checked.indexOf(value) !==
                                                    -1
                                                  : false
                                              }
                                              tabIndex={-1}
                                              disableRipple
                                              inputProps={{
                                                "aria-labelledby": labelId,
                                              }}
                                            />
                                          </ListItemIcon>
                                          <ListItemText
                                            tabIndex={-1}
                                            id={labelId}
                                            primary={`${t(value.name)}`}
                                          />
                                        </ListItemButton>
                                      </ListItem>
                                    );
                                  })}
                                </List>
                              </ClickAwayListener>
                            </Paper>
                          </Fade>
                        )}
                      </Popper>
                    </div>
                  );
                }}
              </PopupState>
            );

          case "solo":
            return (
              <div style={filterComponentStyle.wrapper}>
                {checked.length > 0 && (
                  <div style={filterComponentStyle.checkedFiltersInner}>
                    <span style={filterComponentStyle.soloFilterInner}>
                      {t(checked[0].name)}
                    </span>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={handleRemoveFilterItem(checked[0])}
                    >
                      <CancelRoundedIcon fontSize="inherit" />
                    </IconButton>
                  </div>
                )}
                <Button
                  style={filterComponentStyle.buttonStyles}
                  variant="text"
                  onClick={
                    checked.length
                      ? handleClearAll()
                      : handleToggle({ index: 0, name: props.filterTitle })
                  }
                >
                  {checked.length > 0 ? (
                    `${t(props.transformedTitle)}`
                  ) : (
                    <span style={filterComponentStyle.iconButtonStyles}>
                      <CheckBoxOutlineBlankIcon fontSize="small" />
                      {t(props.filterTitle)}
                    </span>
                  )}
                </Button>
              </div>
            );
          default:
            throw new Error("Wrong Type filter!!!");
        }
      })()}
    </>
  );
}
