import React from "react";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import { IProps } from "../../models/invoice.models";
import { useDataGridStyles } from "./dataGrid.styles";

export type TableToolbarProps = {
  showHideColumns: boolean;
  showFilters: boolean;
  showDensity: boolean;
  showExport: boolean;
};

export default function TableToolbar({
  props,
}: IProps<TableToolbarProps>): JSX.Element {
  const { tableToolbar } = useDataGridStyles();

  return (
    <GridToolbarContainer sx={tableToolbar.container}>
      {props && props.showHideColumns && (
        <GridToolbarColumnsButton startIcon={<SettingsSharpIcon />} />
      )}
      {props && props.showFilters && <GridToolbarFilterButton />}
      {props && props.showDensity && <GridToolbarDensitySelector />}
      {props && props.showExport && <GridToolbarExport />}
    </GridToolbarContainer>
  );
}
