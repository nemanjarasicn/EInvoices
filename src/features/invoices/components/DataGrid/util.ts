import { GridSelectionModel } from "@mui/x-data-grid";
import { TableData, InvoiceDto } from "../../models/invoice.models";

/**
 *
 * @param tableData current table data
 * @param selection selected data from current table data
 * @returns summ of selected data
 */
export const getTotalAmount = (
  tableData: TableData<InvoiceDto>[],
  selection: GridSelectionModel
): number => {
  let amount: number = 0;
  selection.forEach((model) => {
    let found: TableData<InvoiceDto> | undefined = tableData.find(
      (item) => item.id === model
    );
    if (found) amount = amount + Number(found.TotalToPay);
  });
  return amount;
};
