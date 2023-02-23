import React from 'react';
import CardComponent, {
  CardProps,
} from '../../shared/components/CardComponent';
import { IProps } from '../models/articles.models';
import { useFeatureSettings } from '../settings';
import { usePageStyles } from './pages.styles';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

type DashboardPageProps = {};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  fontSize: '1rem',
}));

export default function DashboardArticlesPage({}: IProps<DashboardPageProps>): JSX.Element {
  const { cardsSettings } = useFeatureSettings();
  const { dashBoardStyles } = usePageStyles();
  const { t } = useTranslation();

  // for 150  zoom
  const boxMarginTop = window.devicePixelRatio === 1.5 ? -8 : -4;
  const fontSizeBreadcrumbs = window.devicePixelRatio === 1.5 ? '16px' : '20px';

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          ml: 1,
          mt: boxMarginTop,
        }}
      >
        <Grid item xs={4} mt={12}>
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
              {t('Menu.registries')}
            </Typography>
          </Breadcrumbs>
        </Grid>
        <div style={dashBoardStyles.cardsWrapper}>
          {cardsSettings.map((card: CardProps, index: number) => {
            return <CardComponent key={index} props={card} />;
          })}
        </div>
      </Grid>
    </Box>
  );
}
