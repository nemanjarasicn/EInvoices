/* eslint-disable react-hooks/exhaustive-deps */
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
  Box,
  TextField,
} from "@mui/material";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import { useComponentsStyles } from "./components.styles";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { useTranslation } from "react-i18next";
import { IProps } from "../models/invoice.models";
import FormDateField from "./form-fields/FormDateField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Subscription } from "react-hook-form/dist/utils/createSubject";
import { format } from 'date-fns'
import dayjs from "dayjs";

export type FilterComponentProps = {
  filterTitle: string;
  transformedTitle: string;
  type: FilterType;
  multiOption?: boolean;
  filterItems: FillterItem[];
  parentFn?: Function;
  paramKey: string;
  soloValue?: any;
  filterId?: number;
};

export interface FillterItem {
  index: number;
  name: string;
  value: string | any;
}

type FilterType = "solo" | "multi" | "date";

const schema = yup
  .object({
    from: yup.string(),
    to: yup.string(),
  })
  .required();

export default function FilterComponent({
  props,
}: IProps<FilterComponentProps>): JSX.Element {

  //if want to dispalay date in data piker on load page
  /*const date  = new Date();
  const dateTmp = new Date(date)
  
  const today = format(date, 'yyyy-MM-dd');
  const yesterday  = format(dateTmp.setDate(dateTmp.getDate() - 1), 'yyyy-MM-dd');*/

  const methods = useForm({
    defaultValues: { from: "", to: "" },
    resolver: yupResolver(schema),
  });
  const { handleSubmit, reset, control, watch } = methods;
  const { filterComponentStyle } = useComponentsStyles();
  const { t } = useTranslation();
  const { parentFn, paramKey } = props;

  const [checked, setChecked] = React.useState<FillterItem[]>([]);

  const [openDate, setOpenDate] = React.useState<boolean>(false);

  const handleToggle = (value: FillterItem) => {
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

  React.useEffect(() => {
    const filterValues: string[] = [];
    checked.map((item) => filterValues.push(item.value));
    if (parentFn) parentFn(paramKey, filterValues);
  }, [checked]);

  const handleClearAll = () => setChecked([]);

  const handleRemoveFilterItem = (item: FillterItem) => () => {
    const newArr: FillterItem[] = checked.filter((element: FillterItem) => {
      return element.name !== item.name;
    });
    setChecked([...newArr]);
  };

  const handleDateFilter = () => {
    if (openDate) {
      reset();
      handleClearAll();
    }
    setOpenDate(!openDate);
  };

  React.useEffect(() => {
    const subscription: Subscription = watch((value, { name, type }) => {
      const { from, to } = value;
      if (from && to) {
        handleToggle({
          index: 0,
          name: props.filterTitle,
          value: {
            from: dayjs(from).format("YYYY-MM-DD"),
            to: dayjs(to).format("YYYY-MM-DD"),
          },
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

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
                          onClick={() => handleClearAll()}
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
                                          onClick={() => handleToggle(value)}
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
                  onClick={() =>
                    checked.length
                      ? handleClearAll()
                      : handleToggle({
                          index: 0,
                          name: props.filterTitle,
                          value: props.soloValue,
                        })
                  }
                >
                  {checked.length > 0 ? (
                    `${t(props.transformedTitle)}`
                  ) : (
                    <span style={filterComponentStyle.iconButtonStyles}>
                      {/* <CheckBoxOutlineBlankIcon fontSize="small" /> */}
                      {t(props.filterTitle)}
                    </span>
                  )}
                </Button>
              </div>
            );
          case "date":
            return (
              <div
                style={{
                  ...filterComponentStyle.wrapper,
                  border: "thin solid transparent",
                  background: "transparent",
                }}
              >
                {openDate && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignContent: "space-around",
                      height: "36.5px ",
                      scale: "0.8",
                      margin: "auto",
                      width: "max-content",
                      columnGap: "3%",
                      alignItems: "baseline",
                      marginTop: "-1px",
                    }}
                  >
                    {t(`Common.from`)}
                    <FormDateField
                      props={{
                        disabled: false,
                        name: "from",
                        control: control,
                        label: "",
                      }}
                    />
                    {t(`Common.to`)}
                    <FormDateField
                      props={{
                        disabled: false,
                        name: "to",
                        control: control,
                        label: "",
                      }}
                    />
                  </div>
                )}
                <Button
                  style={{
                    ...filterComponentStyle.buttonStyles,
                    background: "white",
                  }}
                  variant="text"
                  onClick={() => handleDateFilter()}
                >
                  {openDate ? (
                    `${t(props.transformedTitle)}`
                  ) : (
                    <span style={filterComponentStyle.iconButtonStyles}>
                      {/* <CheckBoxOutlineBlankIcon fontSize="small" /> */}
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
