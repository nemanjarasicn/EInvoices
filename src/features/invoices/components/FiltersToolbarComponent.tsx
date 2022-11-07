import React from "react";
import { useAppDispatch } from "../../../app/hooks";
import { IProps } from "../models/invoice.models";
import { searchInvoices } from "../store/invoice.actions";
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
  const [params, setParams] = React.useState<Map<string, any[]> | null>(null);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    let map = new Map<string, any[]>();
    props.filters.map((filter) => map.set(filter.paramKey, []));
    setParams(map);
  }, []);

  /**
   * Handle change of filters async call API
   * @param paramKey filter name
   * @param items filters
   */
  const handleFilters = (paramKey: string, items: any[]): void => {
    setParams((state) => {
      state?.set(paramKey, items);
      return state;
    });
    if (params) dispatch(searchInvoices({ params: params }));
  };

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
                props={{ ...filter, parentFn: handleFilters }}
                key={`checkbox-list-label-${index}.id`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
