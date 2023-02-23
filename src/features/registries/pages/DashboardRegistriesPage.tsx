import React from 'react';
import CardComponent, {
  CardProps,
} from '../../shared/components/CardComponent';
import { IProps } from '../models/registries.models';
import { useFeatureSettings } from '../settings';
import { usePageStyles } from './pages.styles';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

type DashboardPageProps = {};

// eslint-disable-next-line no-empty-pattern
export default function DashboardPage({}: IProps<DashboardPageProps>): JSX.Element {
  const { cardsSettings } = useFeatureSettings();
  const { dashBoardStyles } = usePageStyles();
  const { t } = useTranslation();

  const marginTopBox = window.devicePixelRatio === 1.5 ? 8 : 12;
  const fontSizeBreadcrumbs = window.devicePixelRatio === 1.5 ? '16px' : '20px';
  return (
    <Box sx={{ flexGrow: 1, mt: marginTopBox }}>
      <Grid
        container
        spacing={2}
        sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}
      >
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ '& .MuiBreadcrumbs-separator': { color: ' #60737C' } }}
        >
          <Typography
            sx={{
              color: 'white',
              fontSize: fontSizeBreadcrumbs,
              fontFamily: 'Roboto',
              lineHeight: '32px',
              fontWeight: 700,
            }}
          >
            {t('Menu.administration')}
          </Typography>
        </Breadcrumbs>

        <div style={dashBoardStyles.cardsWrapper}>
          {cardsSettings
            .filter((card) => card.typeOfCard === 'company')
            .map((card: CardProps, index: number) => {
              return <CardComponent key={index} props={card} />;
            })}
        </div>

        <div style={dashBoardStyles.cardsWrapper}>
          {cardsSettings
            .filter((card) => card.typeOfCard === 'articles')
            .map((card: CardProps, index: number) => {
              return <CardComponent key={index} props={card} />;
            })}
        </div>
      </Grid>
    </Box>
  );
}
