/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Paper, Typography, Grid, Box } from '@mui/material';
import { IProps } from '../models/articles.models';
import { useTranslation } from 'react-i18next';
import { useComponentsStyles } from '../../shared/components/components.styles';
import FormArticleComponent from '../components/FormArticlesComponents';

export type ArticlesFormComponentProps = {
  invoiceTypeOptions: any;
  sectionTitles: any;
  formGrpsSettings?: any;
  formFieldsLabels?: any;
  createTitle: any;
  typeForm: any;
  data?: any;
  flag?: string;
};

export default function ArticlesFormComponent({
  props,
}: IProps<ArticlesFormComponentProps>): JSX.Element {
  const { t } = useTranslation();
  const { formComponent } = useComponentsStyles();

  const FormComponent = (formType: string): any => {
    switch (formType) {
      case 'articles':
        return <FormArticleComponent props={props} />;
    }
    return <div>test</div>;
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        rowGap: 1,
        display: 'flex',
        flexDirection: 'column',
        mt: 18,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              ...formComponent.basicBox,
              textAlign: 'start',
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
      </Grid>
    </Box>
  );
}
