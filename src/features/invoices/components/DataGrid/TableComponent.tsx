import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridColumnHeaderParams,
  GridValueGetterParams,
  GridSelectionModel,
} from "@mui/x-data-grid";

import React from "react";
import { useAppSelector } from "../../../../app/hooks";
import { IProps } from "../../models/invoice.models";
import { invoiceSelectors } from "../../store/invoice.selectors";
import { useComponentsStyles } from "../components.styles";

type TableComponentProps = {
  headerNames?: string[];
};
const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
    renderHeader: (params: GridColumnHeaderParams) => {
      return (
        <strong>
          {"Birthday "}
          <span role="img" aria-label="enjoy">
            🎂
          </span>
        </strong>
      );
    },
  },
  { field: "firstName", headerName: "First name", flex: 1 },
  { field: "lastName", headerName: "Last name", flex: 1 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    flex: 1,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    flex: 1,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

export default function TableComponent({
  props,
}: IProps<TableComponentProps>): JSX.Element {
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];
  const { tableComponentStyles } = useComponentsStyles();
  return (
    <div style={tableComponentStyles.wrapper}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        sx={tableComponentStyles.dataGrid}
        checkboxSelection
        onSelectionModelChange={(newSelectionModel) => {
          console.log("newSelection", newSelectionModel);

          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
      />
    </div>
  );
}
