/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  Paper,
  Typography,
  Grid,
  Box,
  Switch,
  FormControlLabel,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
} from "@mui/material";
import { IProps } from "../models/articles.models";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useComponentsStyles } from "../../shared/components/components.styles";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import RestoreRoundedIcon from "@mui/icons-material/RestoreRounded";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import  FormArticleComponent   from  "../components/FormArticlesComponents"


export type ArticlesFormComponentProps = {
  invoiceTypeOptions: any;
  sectionTitles: any;
  formGrpsSettings: any;
  formFieldsLabels: any;
  createTitle: any;
  typeForm: any;
};

/**
 * Register Form validation schema for every field
 */
const schema = yup
  .object({
    // client: yup
    //   .object({
    //     vatRegistrationCode: yup.string().required(),
    //   })
    //   .required(),
    // dropdownValue: yup.string().required(),
    // textAreaValue: yup.string().required(),
    // dateValue: yup.string().required(), //validate date format
    // autocompleteValue: yup.object().required(),
    // checkbox: yup.bool().required(),
    // numberValue: yup.number().required(),
    // invoiceLine: yup.array().of(
    //   yup.object({
    //     invoicedQuantity: yup.number().moreThan(0, ""),
    //   })
    // ),
  })
  .required();

export default function ArticlesFormComponent({
  props,
}: IProps<ArticlesFormComponentProps>): JSX.Element {
  const { t } = useTranslation();
  const { formComponent } = useComponentsStyles();


  const FormComponent = (formType: string) : any => {
    switch (formType) {
      case "articles":
        return <FormArticleComponent  props={props} />;
    }
    return <div>test</div>
  }
 

  return (
    <Box
      sx={{ flexGrow: 1, rowGap: 1, display: "flex", flexDirection: "column" }}
    >
      <Box
        sx={{
          ...formComponent.basicBox,
          width: "25%",
          textAlign: "center",
        }}
      >
        <Typography sx={formComponent.typography}>{t(props.createTitle.title)}</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Box
            sx={{
              ...formComponent.basicBox,
              textAlign: "start",
            }}
          >
            <Typography sx={formComponent.typography}>
              {t(props.sectionTitles.title_1).toUpperCase()}
            </Typography>
            <Paper style={formComponent.groupPaper}>
              <Grid container spacing={2}>
                  {FormComponent(props.typeForm)}
  
              </Grid>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Grid item xs={12}>
            <IconButton
              color="primary"
              aria-label="TextsmsOutlinedIcon"
              size="large"
              disabled
              sx={{
                backgroundColor: "#f5f5f5",
                "&:disabled": {
                  backgroundColor: "#f5f5f5"
                }
              }}
            >
              <TextsmsOutlinedIcon />
            </IconButton>
          </Grid>
          <br />
          <Grid item xs={12}>
            <IconButton
              color="primary"
              aria-label="AttachFileIcon"
              size="large"
              disabled
              sx={{
                backgroundColor: "#f5f5f5",
                "&:disabled": {
                  backgroundColor: "#f5f5f5"
                }
              }}
            >
              <AttachFileIcon />
            </IconButton>
          </Grid>
          <br />
          <Grid item xs={12}>
            <IconButton
              color="primary"
              aria-label="RestoreRoundedIcon"
              size="large"
              disabled
              sx={{
                backgroundColor: "#f5f5f5",
                "&:disabled": {
                  backgroundColor: "#f5f5f5"
                }
              }}
            >
              <RestoreRoundedIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}