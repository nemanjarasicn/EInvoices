import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useFeatureSettings } from "../settings";
import { TemplatePageTypes } from "../models/invoice.enums";
import { useTranslation } from "react-i18next";
import CustomButtonFc from "../components/CustomButtonFc";
import { usePageStyles } from "./pages.styles";
import FiltersToolbarComponent from "../components/FiltersToolbarComponent";
import { IProps } from "../models/invoice.models";
import TableComponent from "../components/DataGrid/TableComponent";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  fontSize: "1rem",
}));

type InvoiceTemplatePageProps = {
  templateType: TemplatePageTypes;
};

export default function InvoiceTemplatePage({
  props,
}: IProps<InvoiceTemplatePageProps>): JSX.Element {
  const { t } = useTranslation();
  const { templatePageSettings } = useFeatureSettings();
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
          <FiltersToolbarComponent
            props={{
              filters: templatePageSettings[props.templateType].filters,
              actions: templatePageSettings[props.templateType].actions,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TableComponent props={{}} />
        </Grid>
      </Grid>
    </Box>
  );
}
