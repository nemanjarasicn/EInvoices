import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useFeatureSettings } from "../settings";
import { TemplatePageRegistriesTypes } from "../models/registries.enums";
import { useTranslation } from "react-i18next";
import CustomButtonFc from "../components/CustomButtonFc";
import { usePageStyles } from "./pages.styles";

import { IProps } from "../models/registries.models";
import TableComponent from "../components/DataGrid/TableComponent";
import { useTableSettings } from "../components/DataGrid/table.settings";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  fontSize: "1rem",
}));

type InvoiceTemplatePageProps = {
  templateType: TemplatePageRegistriesTypes;
};

export default function InvoiceTemplatePage({
  props,
}: IProps<InvoiceTemplatePageProps>): JSX.Element {
  const { t } = useTranslation();
  const { templatePageSettings } = useFeatureSettings();
  const { tableSettings } = useTableSettings();
  const { templatePageStyles } = usePageStyles();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item>
            <h3>{t(templatePageSettings[props.templateType].title)}</h3>
          </Item>
        </Grid>
        <Grid item xs={8} style={templatePageStyles.buttonsGrid}>
          {templatePageSettings[props.templateType].showBtns && (
            <CustomButtonFc
              groupButton={templatePageSettings[props.templateType].buttons}
            />
          )}
        </Grid>
        
        <Grid item xs={12}>
          {templatePageSettings[props.templateType].showTable && (
            <div style={templatePageStyles.tableWrapper}>
              <TableComponent
                props={tableSettings[props.templateType].dataGrid}
              />
            </div>
          )}
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </Box>
  );
}
