import React from "react";
import { IProps } from "../models/invoice.models";
import { useComponentsStyles } from "./components.styles";
import FilterComponent, { FilterComponentProps } from "./FilterComponent";
import SelectAllActionsComponent, {
  SelectAllAction,
} from "./SelectAllActionsComponent";

type FiltersToolbarComponentProps = {
  filters: FilterComponentProps[];
  actions: SelectAllAction[];
};

export default function FiltersToolbarComponent({
  props,
}: IProps<FiltersToolbarComponentProps>) {
  const { filersToolbarStyles } = useComponentsStyles();
  return (
    <div style={filersToolbarStyles.wrapper}>
      {props.actions.length > 0 && (
        <div style={filersToolbarStyles.selectAllActions}>
          <SelectAllActionsComponent props={{ actions: props.actions }} />
        </div>
      )}
      {props.filters.length > 0 && (
        <div style={filersToolbarStyles.basicFilters}>
          {props.filters.map((filter: FilterComponentProps, index) => {
            return (
              <FilterComponent
                props={filter}
                key={`checkbox-list-label-${index}.id`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
