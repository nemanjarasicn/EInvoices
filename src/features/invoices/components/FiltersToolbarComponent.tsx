/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { selectCompanyCurrent } from '../../../app/core/core.selectors';
import { useAppSelector } from '../../../app/hooks';
import { Path, TemplatePageTypes } from '../models';
import { IProps } from '../models/invoice.models';
import { useComponentsStyles } from './components.styles';
import { FilterComponentProps } from './FilterComponent';
import SelectAllActionsComponent, {
  SelectAllAction,
} from './SelectAllActionsComponent';

type FiltersToolbarComponentProps = {
  filters: FilterComponentProps[];
  actions: SelectAllAction[];
  type: TemplatePageTypes;
};

export default function FiltersToolbarComponent({
  props,
}: IProps<FiltersToolbarComponentProps>) {
  const { filersToolbarStyles } = useComponentsStyles();
  const id = useAppSelector(selectCompanyCurrent);

  React.useEffect(() => {
    let map = new Map<string, any>();
    props.filters.map((filter) => map.set(filter.paramKey, []));
    map.set('companyId', id);
    map.set(
      'inputAndOutputDocuments',
      Path[props.type.toString() as keyof Object]
    );
  }, []);

  /**
   * Handle change of filters async call API
   * @param paramKey filter name
   * @param items filters
   */

  return (
    <div style={filersToolbarStyles.wrapper}>
      {props.actions.length > 0 && (
        <div style={filersToolbarStyles.selectAllActions}>
          <SelectAllActionsComponent
            props={{ actions: props.actions, pageType: props.type }}
          />
        </div>
      )}
    </div>
  );
}
