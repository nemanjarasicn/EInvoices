/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { selectCompanyCurrent } from '../../../app/core/core.selectors';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Path, TemplatePageTypes } from '../models';
import { InvoiceSearchParams, IProps } from '../models/invoice.models';
import { searchInvoices } from '../store/invoice.actions';
import { useComponentsStyles } from './components.styles';
import FilterComponent, { FilterComponentProps } from './FilterComponent';
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
  const [params, setParams] = React.useState<Map<string, any> | null>(null);
  const dispatch = useAppDispatch();
  const id = useAppSelector(selectCompanyCurrent);

  React.useEffect(() => {
    let map = new Map<string, any>();
    props.filters.map((filter) => map.set(filter.paramKey, []));
    map.set('companyId', id);
    map.set(
      'inputAndOutputDocuments',
      Path[props.type.toString() as keyof Object]
    );
    setParams(map);
  }, []);

  /**
   * Handle change of filters async call API
   * @param paramKey filter name
   * @param items filters
   */
  const handleFilters = (paramKey: string, items: any): void => {
    setParams((state) => {
      state?.set(paramKey, items);
      return state;
    });

    if (params) {
      dispatch(
        searchInvoices({
          params: {
            companyId: String(params?.get('companyId')),
            inputAndOutputDocuments: String(
              params?.get('inputAndOutputDocuments')
            ),
            sendToCir: String(params?.get('sendToCir')[0] ?? ''),
            invoiceStatus: params?.get('invoiceStatus').length
              ? params?.get('invoiceStatus')
              : '',
            typeDocument: params?.get('typeDocument').length
              ? params?.get('typeDocument')
              : '',
            // // subjectId?: string; klijent
            date:
              params.get('date') && params?.get('date')[0]
                ? { ...params?.get('date')[0] }
                : '',
          } as InvoiceSearchParams,
        })
      );
    }
  };

  return (
    <div style={filersToolbarStyles.wrapper}>
      {props.actions.length > 0 && (
        <div style={filersToolbarStyles.selectAllActions}>
          <SelectAllActionsComponent
            props={{ actions: props.actions, pageType: props.type }}
          />
        </div>
      )}
      {/*{props.filters.length > 0 && (
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
        )}*/}
    </div>
  );
}
