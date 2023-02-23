import { GridSelectionModel } from '@mui/x-data-grid';
import { TableData } from '../../models/invoice.models';

/**
 *
 * @param tableData current table data
 * @param selection selected data from current table data
 * @returns summ of selected data
 */
export const getTotalAmount = (
  tableData: TableData<any>[],
  selection: GridSelectionModel
): number => {
  let amount: number = 0;
  selection.forEach((model) => {
    let found: TableData<any> | undefined = tableData.find(
      (item) => item.id === model
    );
    if (found) amount = amount + Number(found.finalSum);
  });
  return Number(amount.toFixed(2));
};
